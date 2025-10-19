# Week 3: State Management & Routing 🗺️

**Focus:** Managing global state with Pinia and navigation with Vue Router

---

## 📊 Weekly Flow

```mermaid
flowchart LR
    A[Day 15: Pinia Setup] --> B[Day 16: Advanced Pinia]
    B --> C[Day 17: Vue Router Basics]
    C --> D[Day 18: Dynamic Routes]
    D --> E[Day 19: Navigation Guards]
    E --> F[Day 20: Route Meta]
    F --> G[Day 21: Multi-page Project]
    
    style A fill:#FFD700
    style D fill:#FF6B6B
    style G fill:#2196F3
```

---

## 📚 Daily Topics

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| **Day 15** | Pinia Basics | Stores, state, getters, actions |
| **Day 16** | Pinia Advanced | Store composition, plugins, subscriptions |
| **Day 17** | Vue Router Basics | createRouter, routes, router-view |
| **Day 18** | Dynamic Routing | Route params, query strings, nested routes |
| **Day 19** | Navigation Guards | beforeEach, beforeEnter, route protection |
| **Day 20** | Route Meta & Lazy Loading | Code splitting, meta fields |
| **Day 21** | **Project: Multi-page App** | E-commerce with routing + state |

---

## 🏪 Pinia Store Pattern

```mermaid
graph TD
    A[Component] -->|dispatch action| B[Pinia Store]
    B -->|mutate| C[State]
    C -->|reactive| D[Getters]
    D -->|return| A
    
    B --> B1[Actions - Async Logic]
    C --> C1[State - Single Source of Truth]
    D --> D1[Getters - Computed State]
    
    style B fill:#FFD700
    style C fill:#4CAF50
```

---

## 🛣️ Vue Router Architecture

```mermaid
graph LR
    A[User Clicks Link] --> B[Vue Router]
    B --> C{Route Match?}
    C -->|Yes| D[Navigation Guards]
    C -->|No| E[404 Page]
    
    D --> F{Guard Allow?}
    F -->|Yes| G[Load Component]
    F -->|No| H[Redirect]
    
    G --> I[Render in router-view]
    
    style B fill:#FF6B6B
    style G fill:#4CAF50
```

---

## 📂 Week Project Features

- Product catalog with categories
- Shopping cart (Pinia store)
- Product detail pages (dynamic routes)
- User authentication (navigation guards)
- Checkout flow (multi-step routing)

---

**Start Day 15!** 🚀
