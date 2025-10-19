# System Design: Twitter

## Requirements

### Functional Requirements
- Post tweets (280 characters)
- Follow users
- View timeline (home feed)
- Search tweets
- Like and retweet
- Notifications

### Non-Functional Requirements
- High availability
- Low latency feeds (<200ms)
- Eventual consistency acceptable
- Scale: 500M users, 100M daily active

## Scale Estimation

- **Daily Active Users:** 100M
- **Tweets per day:** 500M
- **Timeline requests:** 2B/day
- **Read:Write ratio:** 100:1
- **Storage:** 500M × 280 bytes × 365 × 5 years = 255TB

## API Design

```typescript
// Post tweet
POST /api/tweets
Body: { content: string, media?: string[] }

// Get timeline
GET /api/timeline?userId=:id&cursor=:cursor

// Follow user
POST /api/follow/:userId

// Search tweets
GET /api/search?q=:query
```

## High-Level Architecture

```
[Clients] --> [Load Balancer] --> [API Gateway]
                                        |
              +-------------------------+-------------------------+
              |                         |                         |
         [Tweet Service]          [Timeline Service]      [Follow Service]
              |                         |                         |
         [Tweet DB]              [Timeline Cache]           [Graph DB]
              |                         |
         [Message Queue] --------> [Fan-out Service]
```

## Database Schema

```sql
-- Tweets (Cassandra/NoSQL)
CREATE TABLE tweets (
  tweet_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP,
  likes_count INT DEFAULT 0,
  retweets_count INT DEFAULT 0
);

-- User follows (Graph DB or SQL)
CREATE TABLE follows (
  follower_id BIGINT,
  followee_id BIGINT,
  created_at TIMESTAMP,
  PRIMARY KEY (follower_id, followee_id)
);

-- Timeline cache (Redis)
Key: timeline:{user_id}
Value: [tweet_id_1, tweet_id_2, ...] (sorted by timestamp)
```

## Tweet Creation Flow

```
User posts tweet
    |
    v
Tweet Service
    |
    +---> Store in Tweet DB
    |
    +---> Publish to Message Queue
              |
              v
        Fan-out Service
              |
              +---> Get followers from Graph DB
              |
              +---> Push tweet to followers' timelines (Redis)
```

## Timeline Generation

### Push Model (Fan-out on Write)

```typescript
async function fanOutTweet(tweetId: string, userId: string) {
  // Get user's followers
  const followers = await getFollowers(userId)
  
  // Push tweet to each follower's timeline
  for (const followerId of followers) {
    await redis.zadd(
      `timeline:${followerId}`,
      Date.now(),
      tweetId
    )
  }
}
```

**Pros:** Fast read (timeline pre-computed)
**Cons:** Slow write for users with many followers

### Pull Model (Fan-out on Read)

```typescript
async function getTimeline(userId: string) {
  // Get users I follow
  const following = await getFollowing(userId)
  
  // Get recent tweets from each
  const tweets = []
  for (const followeeId of following) {
    const userTweets = await getTweets(followeeId, limit: 10)
    tweets.push(...userTweets)
  }
  
  // Merge and sort by timestamp
  return tweets.sort((a, b) => b.timestamp - a.timestamp)
}
```

**Pros:** Fast write, handles celebrity users
**Cons:** Slow read (compute on every request)

### Hybrid Approach

- **Regular users:** Push model (fan-out on write)
- **Celebrities (>1M followers):** Pull model
- **Timeline:** Merge both approaches

```typescript
async function getTimeline(userId: string) {
  // Get pre-computed timeline (push model)
  const cachedTweets = await redis.zrange(
    `timeline:${userId}`,
    0,
    100
  )
  
  // Get celebrity tweets (pull model)
  const celebrityIds = await getCelebritiesIFollow(userId)
  const celebrityTweets = await getCelebrityTweets(celebrityIds)
  
  // Merge and sort
  return merge(cachedTweets, celebrityTweets)
}
```

## Scalability

### Sharding Strategy

**Tweet DB:** Shard by tweet_id

```
shard = hash(tweet_id) % num_shards
```

**User DB:** Shard by user_id

```
shard = hash(user_id) % num_shards
```

### Caching

- **Timeline:** Redis (sorted sets)
- **Hot tweets:** CDN edge caching
- **User profiles:** Application cache

### Message Queue

- **Kafka/RabbitMQ** for tweet fan-out
- **Partitioned** by user_id
- **Multiple consumers** for parallel processing

## Search

Use **Elasticsearch** for full-text search:

```
Tweets --> Kafka --> Elasticsearch indexer --> Elasticsearch cluster
```

## Notifications

Real-time via **WebSockets** or **Push notifications**:

```
Event --> Notification Service --> WebSocket Server --> Client
```

## Trade-offs

| Aspect | Decision | Reason |
|--------|----------|--------|
| Timeline | Hybrid push/pull | Balance read/write performance |
| Database | NoSQL for tweets | Better scalability |
| Cache | Redis sorted sets | Fast timeline access |
| Search | Elasticsearch | Full-text search capability |
| Fan-out | Async via queue | Don't block tweet creation |

## Bottlenecks & Solutions

1. **Celebrity tweets:** Use pull model, don't fan-out
2. **Hot tweets:** Serve from CDN
3. **Database load:** Use caching and read replicas
4. **Timeline freshness:** Background jobs to refresh
5. **Search latency:** Pre-compute trending topics
