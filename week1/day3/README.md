# Day 3: Vue Directives (v-if, v-for, v-show) 🔀

**Duration:** 3-4 hours  
**Difficulty:** ⭐⭐ Medium

---

## 📖 Learning Objectives

- Master conditional rendering (v-if, v-else, v-else-if, v-show)
- Understand list rendering with v-for
- Learn when to use v-if vs v-show
- Work with keys in v-for
- Handle edge cases and best practices

---

## 🎯 Vue Directives Overview

```mermaid
graph TD
    A[Vue Directives] --> B[Conditional Rendering]
    A --> C[List Rendering]
    A --> D[Attribute Binding]
    A --> E[Event Handling]
    
    B --> B1[v-if]
    B --> B2[v-else-if]
    B --> B3[v-else]
    B --> B4[v-show]
    
    C --> C1[v-for]
    C --> C2[v-for with index]
    C --> C3[v-for with key]
    
    style A fill:#42b883
    style B fill:#FF6B6B
    style C fill:#4ECDC4
```

---

## 🔀 1. Conditional Rendering: v-if

```mermaid
flowchart TD
    A[Evaluate Condition] --> B{v-if=true?}
    B -->|Yes| C[Render Element]
    B -->|No| D[Remove from DOM]
    
    D --> E{v-else-if exists?}
    E -->|Yes| F{Condition true?}
    E -->|No| G{v-else exists?}
    
    F -->|Yes| C
    F -->|No| G
    
    G -->|Yes| H[Render v-else]
    G -->|No| I[Render Nothing]
    
    style C fill:#4CAF50
    style D fill:#F44336
```

### Example:
```vue
<template>
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Type C</div>
  
  <!-- Group multiple elements -->
  <template v-if="isLoggedIn">
    <h1>Welcome back!</h1>
    <p>Your dashboard</p>
  </template>
</template>
```

---

## 👁️ 2. v-show vs v-if

```mermaid
graph LR
    A[Visibility Control] --> B[v-if]
    A --> C[v-show]
    
    B --> B1[Adds/Removes from DOM]
    B --> B2[Higher toggle cost]
    B --> B3[Lazy rendering]
    B --> B4[Use for rare changes]
    
    C --> C1[CSS display toggle]
    C --> C2[Lower toggle cost]
    C --> C3[Always in DOM]
    C --> C4[Use for frequent changes]
    
    style B fill:#FF6B6B
    style C fill:#4ECDC4
```

### Performance Comparison:
```vue
<template>
  <!-- v-if: Element not in DOM when false -->
  <div v-if="isVisible">
    Removed from DOM when hidden
  </div>
  
  <!-- v-show: Element in DOM, display:none when false -->
  <div v-show="isVisible">
    Always in DOM, just hidden
  </div>
</template>
```

**When to use:**
- **v-if**: Condition rarely changes, expensive components
- **v-show**: Toggle frequently, simple elements

---

## 🔁 3. List Rendering: v-for

```mermaid
flowchart LR
    A[Array/Object] --> B[v-for directive]
    B --> C[Iterate Items]
    C --> D[Render for each]
    D --> E[Apply :key]
    E --> F[Track Identity]
    F --> G[Efficient Updates]
    
    style A fill:#42b883
    style E fill:#FF9800
    style G fill:#4CAF50
```

### Basic v-for Syntax:
```vue
<template>
  <!-- Array iteration -->
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
  
  <!-- With index -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }}: {{ item.name }}
  </li>
  
  <!-- Object iteration -->
  <div v-for="(value, key) in user" :key="key">
    {{ key }}: {{ value }}
  </div>
  
  <!-- Range -->
  <span v-for="n in 10" :key="n">{{ n }}</span>
</template>
```

---

## 🔑 4. The Importance of :key

```mermaid
sequenceDiagram
    participant Vue
    participant VirtualDOM
    participant RealDOM
    
    Note over Vue: Array Updated
    Vue->>VirtualDOM: Diff with :key
    VirtualDOM->>VirtualDOM: Match elements by key
    VirtualDOM->>RealDOM: Update only changed items
    
    Note over RealDOM: Efficient update!
    
    Note over Vue: WITHOUT :key
    Vue->>VirtualDOM: Diff without key
    VirtualDOM->>VirtualDOM: Can't track identity
    VirtualDOM->>RealDOM: Re-render all items
    
    Note over RealDOM: Inefficient!
```

### Why :key is important:
```vue
<template>
  <!-- ❌ Bad: No key or index as key -->
  <div v-for="item in items">{{ item.name }}</div>
  <div v-for="(item, index) in items" :key="index">{{ item.name }}</div>
  
  <!-- ✅ Good: Unique, stable key -->
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</template>
```

---

## 🎨 5. v-for with v-if (Avoid!)

```mermaid
graph TD
    A[v-for + v-if on same element] --> B[❌ Anti-pattern]
    B --> C[v-for has higher priority]
    C --> D[Inefficient filtering]
    
    E[Solution 1] --> F[Computed Property]
    E[Solution 2] --> G[Template wrapper]
    
    F --> H[✅ Filter before render]
    G --> I[✅ Conditional wrapper]
    
    style B fill:#F44336
    style H fill:#4CAF50
    style I fill:#4CAF50
```

### Anti-pattern (Avoid):
```vue
<template>
  <!-- ❌ Bad: v-if on same element as v-for -->
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</template>
```

### Solution 1: Computed Property:
```vue
<template>
  <!-- ✅ Good: Use computed property -->
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const activeUsers = computed(() => 
  users.value.filter(u => u.isActive)
)
</script>
```

### Solution 2: Template Wrapper:
```vue
<template>
  <!-- ✅ Good: Wrap with template -->
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</template>
```

---

## 🧩 Complex Example: Todo List

```mermaid
stateDiagram-v2
    [*] --> AllTodos
    AllTodos --> Filtered
    
    Filtered --> Active: filter='active'
    Filtered --> Completed: filter='completed'
    Filtered --> AllTodos: filter='all'
    
    Active --> [*]: Display incomplete
    Completed --> [*]: Display complete
```

See `directives-practice.vue` for implementation.

---

## ✅ Practice Exercise

Build a **Product Catalog** with:
1. List of products with v-for
2. Filter by category using v-if/v-else-if
3. Toggle product details with v-show
4. Display "No products" message conditionally
5. Sort products by price

**Required Features:**
- Array of products with id, name, category, price
- Category filter buttons (All, Electronics, Clothing, Books)
- "Show Details" toggle for each product
- Proper :key usage

---

## 📌 Key Takeaways

```mermaid
mindmap
  root((Directives))
    v-if
      Conditional Rendering
      Removes from DOM
      Use for rare changes
    v-show
      CSS Display Toggle
      Always in DOM
      Use for frequent toggles
    v-for
      List Rendering
      Always use :key
      Avoid with v-if
      Can iterate arrays objects ranges
```

---

## 🔗 Cheat Sheet

| Directive | Purpose | Performance | Use Case |
|-----------|---------|-------------|----------|
| `v-if` | Conditional render | Higher toggle cost | Rare changes |
| `v-show` | Toggle visibility | Lower toggle cost | Frequent toggles |
| `v-for` | List rendering | N/A | Iterate collections |
| `v-else-if` | Alternative condition | N/A | Multiple conditions |
| `v-else` | Fallback | N/A | Default case |

---

**Tomorrow:** Event Handling & Methods ⚡
