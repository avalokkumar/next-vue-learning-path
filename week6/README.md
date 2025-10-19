# Week 6: Data Fetching & Server Components 🔄

**Focus:** Mastering Server Components and data fetching patterns

---

## 📊 Weekly Flow

```mermaid
flowchart LR
    A[Day 36: Server Components] --> B[Day 37: Client Components]
    B --> C[Day 38: Data Fetching]
    C --> D[Day 39: Parallel Data]
    D --> E[Day 40: Streaming]
    E --> F[Day 41: TanStack Query]
    F --> G[Day 42: Blog Project]
    
    style A fill:#4CAF50
    style B fill:#2196F3
    style G fill:#FF9800
```

---

## 📚 Daily Topics

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| **Day 36** | Server Components | RSC, benefits, when to use |
| **Day 37** | Client Components | 'use client', interactivity, hydration |
| **Day 38** | Data Fetching Patterns | fetch API, cache, revalidate |
| **Day 39** | Parallel & Sequential | Promise.all, waterfall prevention |
| **Day 40** | Streaming & Suspense | Streaming SSR, Suspense boundaries |
| **Day 41** | TanStack Query | Client-side caching, mutations |
| **Day 42** | **Project: Blog with CMS** | Full data fetching patterns |

---

## 🖥️ Server vs Client Components

```mermaid
graph TD
    A[Component Decision] --> B{Needs Interactivity?}
    B -->|No| C[Server Component]
    B -->|Yes| D{Needs Server Data?}
    
    C --> C1[Fetch data directly]
    C --> C2[Access backend resources]
    C --> C3[Keep sensitive data secure]
    C --> C4[Reduce bundle size]
    
    D -->|Yes| E[Server Component + Client Child]
    D -->|No| F[Client Component]
    
    F --> F1[useState, useEffect]
    F --> F2[Event handlers]
    F --> F3[Browser APIs]
    
    style C fill:#4CAF50
    style F fill:#2196F3
```

---

## 🔄 Data Fetching Patterns

```mermaid
sequenceDiagram
    participant User
    participant Next
    participant Server
    participant DB
    
    User->>Next: Request Page
    Note over Next: Server Component
    Next->>Server: fetch(url, {cache})
    Server->>DB: Query Data
    DB-->>Server: Return Data
    Server-->>Next: JSON Response
    Note over Next: Render HTML
    Next-->>User: Send HTML + Client JS
    Note over User: Hydration
```

---

## ⚡ Streaming & Suspense

```mermaid
flowchart TD
    A[Page Request] --> B[Send Shell Immediately]
    B --> C[User Sees Layout]
    
    D[Slow Component] -.->|Suspense| E[Fallback Loading]
    E --> F[Stream Content When Ready]
    F --> G[Replace Fallback]
    
    H[Fast Component] --> I[Render Immediately]
    
    style B fill:#4CAF50
    style E fill:#FF9800
    style I fill:#4CAF50
```

---

## 📂 Week Project: Blog Platform

- Homepage with post list (Server Component)
- Individual post pages (Dynamic routes + SSR)
- Comments section (Client Component)
- Search functionality (Client-side)
- Loading skeletons (Suspense)
- TanStack Query for client mutations

---

**Start Day 36!** 🚀
