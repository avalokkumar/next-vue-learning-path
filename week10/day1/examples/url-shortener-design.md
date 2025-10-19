# System Design: URL Shortener

## Requirements

### Functional Requirements

- Generate short URL from long URL
- Redirect short URL to original URL
- Custom aliases (optional)
- Analytics (click tracking)
- Expiration (TTL)

### Non-Functional Requirements

- High availability (99.9%)
- Low latency (<100ms redirects)
- Scalable (millions of URLs)
- Durable (no data loss)

## Scale Estimation

- **Daily Active Users:** 100M
- **URLs created/day:** 100M
- **Read:Write ratio:** 100:1 (more redirects than creations)
- **Storage:** 100M URLs × 365 days × 5 years = 183B URLs
- **Storage size:** 183B × 500 bytes = 91.5TB

## API Design

```typescript
// Create short URL
POST /api/shorten
Body: { url: string, customAlias?: string, ttl?: number }
Response: { shortUrl: string, shortCode: string }

// Redirect
GET /:shortCode
Response: 302 Redirect to original URL

// Get analytics
GET /api/analytics/:shortCode
Response: { clicks: number, lastAccessed: Date }
```

## High-Level Design

```
[Client] --> [Load Balancer] --> [API Servers]
                                      |
                        +-------------+-------------+
                        |             |             |
                   [Redis Cache]  [Database]  [Analytics Queue]
```

## Database Schema

```sql
CREATE TABLE urls (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  user_id BIGINT,
  INDEX idx_short_code (short_code),
  INDEX idx_expires_at (expires_at)
);

CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(10) NOT NULL,
  clicked_at TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  INDEX idx_short_code (short_code)
);
```

## Short Code Generation

### Base62 Encoding

```typescript
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateShortCode(id: number): string {
  let code = ''
  
  while (id > 0) {
    code = BASE62[id % 62] + code
    id = Math.floor(id / 62)
  }
  
  return code.padStart(7, '0')
}

// Example: ID 12345 => "03d7"
```

### Random Generation + Collision Check

```typescript
function generateRandomCode(length: number = 7): string {
  let code = ''
  
  for (let i = 0; i < length; i++) {
    code += BASE62[Math.floor(Math.random() * 62)]
  }
  
  return code
}

// Check uniqueness in database
async function getUniqueCode(): Promise<string> {
  let attempts = 0
  const maxAttempts = 5
  
  while (attempts < maxAttempts) {
    const code = generateRandomCode()
    const exists = await db.url.findUnique({ where: { shortCode: code } })
    
    if (!exists) return code
    
    attempts++
  }
  
  throw new Error('Failed to generate unique code')
}
```

## Implementation

```typescript
// See: ../lib/url-shortener.ts
```

## Caching Strategy

```
Request --> Check Redis --> Found? Return : Query DB --> Cache --> Return
```

- Cache TTL: 1 hour for popular URLs
- Cache popular URLs proactively
- Use LRU eviction policy

## Scalability

### Database Sharding

Shard by short_code hash:

```
shard_id = hash(short_code) % num_shards
```

### Read Replicas

- 1 Primary for writes
- 3+ Replicas for reads
- Cache layer reduces DB load

## Analytics

Use message queue for async processing:

```
Click Event --> Kafka --> Analytics Service --> Time-series DB
```

## Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| Base62 encoding | Predictable, sequential | Exposes usage stats |
| Random generation | Unpredictable | Collision handling needed |
| Redis caching | Fast reads | Extra infrastructure |
| Async analytics | Non-blocking | Eventual consistency |

## Bottlenecks & Solutions

1. **Database writes:** Use batch inserts, connection pooling
2. **Cache stampede:** Use cache locking or pre-warming
3. **Single point of failure:** Deploy across multiple regions
4. **Hot URLs:** Serve from CDN edge locations
