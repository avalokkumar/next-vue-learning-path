# Week 2: Composition API & Components 🧩

**Focus:** Building reusable components and mastering Vue's Composition API

---

## 📊 Weekly Flow

```mermaid
flowchart LR
    A[Day 8: Component Basics] --> B[Day 9: Props & Emit]
    B --> C[Day 10: Slots]
    C --> D[Day 11: Lifecycle]
    D --> E[Day 12: Composables]
    E --> F[Day 13: Provide/Inject]
    F --> G[Day 14: Blog Project]
    
    style A fill:#4CAF50
    style G fill:#2196F3
```

---

## 📚 Daily Topics

| Day | Topic | Key Concepts | Difficulty |
|-----|-------|--------------|------------|
| **Day 8** | Component Basics | SFC, registration, naming conventions | ⭐⭐ |
| **Day 9** | Props & Emit | Parent-child communication, validation | ⭐⭐ |
| **Day 10** | Slots | Default, named, scoped slots | ⭐⭐⭐ |
| **Day 11** | Lifecycle Hooks | onMounted, onUpdated, onUnmounted | ⭐⭐ |
| **Day 12** | Composables | Reusable logic, use* pattern | ⭐⭐⭐ |
| **Day 13** | Provide/Inject | Dependency injection | ⭐⭐⭐ |
| **Day 14** | **Mini Project** | Blog component system | ⭐⭐⭐ |

---

## 🎯 Component Communication

```mermaid
graph TD
    A[Parent Component] -->|Props| B[Child Component]
    B -->|Emit Events| A
    
    C[Ancestor] -->|Provide| D[Descendant]
    D -->|Inject| C
    
    E[Sibling 1] -.->|Shared Composable| F[Sibling 2]
    
    style A fill:#42b883
    style B fill:#4ECDC4
    style C fill:#FF6B6B
```

---

## 🔧 Composition API Patterns

```mermaid
flowchart TD
    A[Composition API] --> B[ref/reactive]
    A --> C[computed]
    A --> D[watch]
    A --> E[Lifecycle Hooks]
    A --> F[Composables]
    
    B --> B1[Reactive State]
    C --> C1[Derived State]
    D --> D1[Side Effects]
    E --> E1[Component Lifecycle]
    F --> F1[Reusable Logic]
    
    style A fill:#42b883
```

---

## 📂 Week Project: Blog System

Build a blog with:

- `PostList` component (list of posts)
- `PostCard` component (individual post preview)
- `PostDetail` component (full post view)
- `CommentSection` component (nested comments)
- Reusable composables (`useFetch`, `useLocalStorage`)

---

**Start with Day 8!** 🚀
