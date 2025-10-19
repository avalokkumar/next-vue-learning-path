# Day 1 (Day 64): System Design Mastery 🏗️

**Duration:** 4-6 hours | **Difficulty:** ⭐⭐⭐⭐ Advanced

---

## 📖 Learning Objectives

- Master system design principles
- Understand scalability patterns
- Learn architecture trade-offs
- Design distributed systems
- Handle system design interviews

---

## 🎯 System Design Fundamentals

```mermaid
mindmap
  root((System Design))
    Requirements
      Functional
      Non-Functional
      Constraints
      Scale Estimations
    Architecture
      Monolith vs Microservices
      Client-Server
      Event-Driven
      Layered
    Components
      Load Balancer
      API Gateway
      Cache
      Database
      Message Queue
    Scalability
      Horizontal
      Vertical
      Database Sharding
      Caching Strategy
    Reliability
      Redundancy
      Failover
      Backup
      Monitoring
```

---

## 📊 System Design Process

```mermaid
flowchart TD
    A[Requirements] --> B[Clarify Scope]
    B --> C[Estimate Scale]
    C --> D[Define APIs]
    D --> E[High-Level Design]
    E --> F[Database Schema]
    F --> G[Detailed Components]
    G --> H[Identify Bottlenecks]
    H --> I[Scalability Solutions]
    I --> J[Trade-offs Discussion]
    
    style A fill:#4CAF50
    style J fill:#2196F3
```

---

## 🏗️ Common Architecture Patterns

### **1. Microservices Architecture**

**See:** [`examples/microservices-architecture.md`](examples/microservices-architecture.md)

```mermaid
graph TD
    A[API Gateway] --> B[Auth Service]
    A --> C[User Service]
    A --> D[Product Service]
    A --> E[Order Service]
    A --> F[Notification Service]
    
    B --> G[Auth DB]
    C --> H[User DB]
    D --> I[Product DB]
    E --> J[Order DB]
    
    K[Message Queue] --> F
    E --> K
    C --> K
    
    style A fill:#42b883,color:#fff
    style K fill:#FF6B6B
```

**Key Characteristics:**
- Independent deployment
- Technology diversity
- Fault isolation
- Scalability per service
- Complexity trade-off

**When to Use:**
- Large, complex applications
- Multiple teams
- Different scaling requirements
- Long-term evolution needs

---

### **2. Event-Driven Architecture**

**See:** [`examples/event-driven-system.md`](examples/event-driven-system.md)

```mermaid
sequenceDiagram
    participant U as User
    participant API as API Server
    participant Q as Event Queue
    participant S1 as Email Service
    participant S2 as Analytics Service
    participant S3 as Notification Service
    
    U->>API: Create Order
    API->>Q: Publish OrderCreated Event
    Q->>S1: Send Confirmation Email
    Q->>S2: Track Analytics
    Q->>S3: Send Push Notification
    API->>U: Order ID
```

**Benefits:**
- Loose coupling
- Asynchronous processing
- Easy to add new consumers
- Better fault tolerance

---

### **3. CQRS (Command Query Responsibility Segregation)**

**See:** [`examples/cqrs-pattern.md`](examples/cqrs-pattern.md)

```mermaid
graph LR
    A[Client] --> B{Command or Query?}
    
    B -->|Command| C[Write Model]
    C --> D[Event Store]
    D --> E[Event Handlers]
    E --> F[Read Model]
    
    B -->|Query| G[Read API]
    G --> F
    F --> H[Optimized DB]
    
    style C fill:#F44336,color:#fff
    style G fill:#4CAF50
```

---

## 📈 Scalability Strategies

### **Horizontal vs Vertical Scaling**

```mermaid
graph TD
    A[Scalability] --> B[Horizontal Scaling]
    A --> C[Vertical Scaling]
    
    B --> B1[Add More Servers]
    B --> B2[Load Balancer]
    B --> B3[Stateless Services]
    B --> B4[Better Availability]
    
    C --> C1[Upgrade Server]
    C --> C2[More CPU/RAM]
    C --> C3[Easier Initially]
    C --> C4[Physical Limits]
    
    style B fill:#4CAF50
    style C fill:#FF9800
```

**Horizontal Scaling (Preferred):**
```typescript
// Example: Stateless API design for horizontal scaling
// See: examples/stateless-api.ts

// ❌ BAD - Uses in-memory state
let userSessions = new Map()

export async function POST(req: Request) {
  const session = userSessions.get(userId)
  // Problem: session only exists on this server instance
}

// ✅ GOOD - Uses external state (Redis/DB)
export async function POST(req: Request) {
  const session = await redis.get(`session:${userId}`)
  // Works across all server instances
}
```

---

## 🗄️ Database Strategies

### **Database Sharding**

**See:** [`examples/database-sharding.md`](examples/database-sharding.md)

```mermaid
graph TD
    A[Application] --> B[Shard Router]
    
    B --> C[Shard 1<br/>Users 0-999]
    B --> D[Shard 2<br/>Users 1000-1999]
    B --> E[Shard 3<br/>Users 2000-2999]
    
    C --> F[DB 1]
    D --> G[DB 2]
    E --> H[DB 3]
    
    style B fill:#2196F3
```

**Sharding Strategies:**
1. **Range-based:** User IDs 0-1000, 1001-2000
2. **Hash-based:** hash(userId) % num_shards
3. **Geography-based:** US users, EU users
4. **Directory-based:** Lookup table

---

### **Database Replication**

**See:** [`examples/database-replication.ts`](examples/database-replication.ts)

```mermaid
graph TD
    A[Application] --> B{Read or Write?}
    
    B -->|Write| C[Primary DB]
    B -->|Read| D[Read Load Balancer]
    
    C --> E[Replication]
    E --> F[Replica 1]
    E --> G[Replica 2]
    E --> H[Replica 3]
    
    D --> F
    D --> G
    D --> H
    
    style C fill:#F44336,color:#fff
    style D fill:#4CAF50
```

---

## 🚀 Caching Strategies

### **Multi-Layer Caching**

**See:** [`examples/caching-strategy.ts`](examples/caching-strategy.ts)

```mermaid
graph TD
    A[Request] --> B[Browser Cache]
    B --> C{Hit?}
    C -->|Yes| D[Return]
    C -->|No| E[CDN Cache]
    E --> F{Hit?}
    F -->|Yes| D
    F -->|No| G[Application Cache]
    G --> H{Hit?}
    H -->|Yes| D
    H -->|No| I[Database Cache]
    I --> J{Hit?}
    J -->|Yes| D
    J -->|No| K[Database Query]
    K --> D
    
    style D fill:#4CAF50
```

**Cache Patterns:**
1. **Cache-Aside:** Application manages cache
2. **Read-Through:** Cache loads from DB
3. **Write-Through:** Write to cache and DB
4. **Write-Behind:** Async DB writes

---

## ⚖️ Load Balancing

**See:** [`examples/load-balancer-config.md`](examples/load-balancer-config.md)

```mermaid
graph TD
    A[Users] --> B[Load Balancer]
    B --> C[Health Check]
    
    B --> D[Server 1<br/>Health: OK]
    B --> E[Server 2<br/>Health: OK]
    B --> F[Server 3<br/>Health: FAIL]
    
    style F fill:#F44336,color:#fff
    style D fill:#4CAF50
    style E fill:#4CAF50
```

**Algorithms:**
- **Round Robin:** Distribute evenly
- **Least Connections:** To server with fewest connections
- **IP Hash:** Same user to same server
- **Weighted:** Based on server capacity

---

## 🔄 Message Queues

**See:** [`examples/message-queue-pattern.md`](examples/message-queue-pattern.md)

```mermaid
graph LR
    A[Producer 1] --> B[Message Queue]
    C[Producer 2] --> B
    D[Producer 3] --> B
    
    B --> E[Consumer 1]
    B --> F[Consumer 2]
    B --> G[Consumer 3]
    
    H[Dead Letter Queue] -.-> B
    
    style B fill:#FF6B6B
    style H fill:#F44336,color:#fff
```

**Use Cases:**
- Async processing
- Task queues
- Event distribution
- Rate limiting
- Retry logic

---

## 🎯 Real-World Examples

### **Example 1: Design URL Shortener**

**See:** [`examples/url-shortener-design.md`](examples/url-shortener-design.md)

```mermaid
graph TD
    A[User] --> B[API Gateway]
    B --> C[Shorten Service]
    B --> D[Redirect Service]
    
    C --> E[Generate Short Code]
    E --> F[Write to Database]
    E --> G[Write to Cache]
    
    D --> H[Check Cache]
    H --> I{Hit?}
    I -->|Yes| J[Redirect]
    I -->|No| K[Query Database]
    K --> G
    K --> J
    
    style G fill:#4CAF50
```

---

### **Example 2: Design Twitter**

**See:** [`examples/twitter-design.md`](examples/twitter-design.md)

```mermaid
graph TD
    A[Users] --> B[API Gateway]
    B --> C[Tweet Service]
    B --> D[Timeline Service]
    B --> E[Follow Service]
    
    C --> F[Tweet DB]
    D --> G[Timeline Cache<br/>Redis]
    E --> H[Graph DB]
    
    I[Message Queue] --> J[Fan-out Service]
    C --> I
    J --> G
    
    style G fill:#4CAF50
    style I fill:#FF6B6B
```

---

### **Example 3: Design WhatsApp**

**See:** [`examples/whatsapp-design.md`](examples/whatsapp-design.md)

```mermaid
sequenceDiagram
    participant U1 as User 1
    participant WS as WebSocket Server
    participant MQ as Message Queue
    participant DB as Message DB
    participant U2 as User 2
    
    U1->>WS: Send Message
    WS->>MQ: Queue Message
    MQ->>DB: Store Message
    MQ->>WS: Deliver to User 2
    WS->>U2: Receive Message
    U2->>WS: Acknowledgment
    WS->>U1: Delivered Status
```

---

## 📝 System Design Interview Tips

### **Framework: RESHADED**

1. **R**equirements (Functional & Non-Functional)
2. **E**stimation (Users, Storage, Bandwidth)
3. **S**ystem Interface (API endpoints)
4. **H**igh-level Design (Architecture diagram)
5. **A**PI & Database Design
6. **D**etailed Component Design
7. **E**valuate (Bottlenecks, Trade-offs)
8. **D**iscuss Alternatives

---

## ✅ Practice Exercises

1. **Design Instagram**
   - Photo upload and storage
   - News feed generation
   - Following system
   - See: [`examples/instagram-design.md`](examples/instagram-design.md)

2. **Design Uber**
   - Real-time location tracking
   - Matching algorithm
   - ETA calculation
   - See: [`examples/uber-design.md`](examples/uber-design.md)

3. **Design Netflix**
   - Video streaming
   - Recommendation system
   - CDN strategy
   - See: [`examples/netflix-design.md`](examples/netflix-design.md)

---

## 📚 Additional Resources

- **Code Examples:** See [`examples/`](examples/) directory
- **Architecture Diagrams:** All diagrams are Mermaid-based
- **Implementation References:** Check Next.js example implementations

---

**Tomorrow:** Design Patterns Deep Dive! 🎨
