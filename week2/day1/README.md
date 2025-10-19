# Day 1 (Day 8): Components Basics 🧩

**Duration:** 3-4 hours  
**Difficulty:** ⭐⭐ Medium

---

## 📖 Learning Objectives

- Understand component architecture
- Create single file components (SFC)
- Component registration (local vs global)
- Component naming conventions
- Component communication overview
- Reusable component patterns

---

## 🧩 What Are Components?

```mermaid
graph TD
    A[Vue Application] --> B[App Component]
    B --> C[Header Component]
    B --> D[Main Component]
    B --> E[Footer Component]
    
    D --> F[Sidebar Component]
    D --> G[Content Component]
    
    G --> H[Card Component]
    G --> I[Card Component]
    G --> J[Card Component]
    
    style A fill:#42b883,color:#fff
    style B fill:#FFD700
    style H fill:#4CAF50
    style I fill:#4CAF50
    style J fill:#4CAF50
```

**Components are reusable, self-contained pieces of UI that can be composed together.**

---

## 🏗️ Component Architecture

```mermaid
flowchart TD
    A[Component] --> B[Template]
    A --> C[Script]
    A --> D[Style]
    
    B --> B1[HTML Structure]
    B --> B2[Vue Directives]
    B --> B3[Data Binding]
    
    C --> C1[Reactive State]
    C --> C2[Methods]
    C --> C3[Computed]
    C --> C4[Watchers]
    
    D --> D1[Scoped Styles]
    D --> D2[CSS/SCSS]
    D --> D3[Component-specific]
    
    style A fill:#42b883,color:#fff
    style B fill:#4CAF50
    style C fill:#2196F3,color:#fff
    style D fill:#FF9800
```

---

## 📄 Single File Component (SFC) Structure

```vue
<template>
  <!-- HTML template -->
  <div class="component">
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script setup lang="ts">
// JavaScript/TypeScript logic
import { ref } from 'vue'

interface Props {
  title: string
}

const props = defineProps<Props>()
const count = ref(0)

const handleClick = () => {
  count.value++
  console.log('Clicked!', count.value)
}
</script>

<style scoped>
/* Component-specific CSS */
.component {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

h1 {
  color: #42b883;
}
</style>
```

---

## 🎨 Component Anatomy

```mermaid
graph LR
    A[SFC File .vue] --> B[template block]
    A --> C[script setup block]
    A --> D[style scoped block]
    
    B --> B1[HTML + Vue syntax]
    B --> B2[Reactive to data changes]
    
    C --> C1[Composition API]
    C --> C2[TypeScript support]
    C --> C3[Auto-exposed to template]
    
    D --> D1[CSS isolation]
    D --> D2[No style leakage]
    
    style A fill:#42b883,color:#fff
    style B fill:#4CAF50
    style C fill:#2196F3,color:#fff
    style D fill:#FF9800
```

---

## 🔄 Component Lifecycle Overview

```mermaid
stateDiagram-v2
    [*] --> Created: Component Instance Created
    Created --> Mounted: Mounted to DOM
    Mounted --> Active: Component Active
    Active --> Updated: Data Changes
    Updated --> Active: Re-rendered
    Active --> Unmounted: Component Destroyed
    Unmounted --> [*]
    
    note right of Created
        setup() runs
        Reactive data initialized
    end note
    
    note right of Mounted
        DOM is ready
        Can access refs
    end note
    
    note right of Updated
        After reactive data changes
        DOM updated
    end note
    
    note right of Unmounted
        Cleanup
        Remove event listeners
    end note
```

---

## 📝 Creating Your First Component

### **Step 1: Create the Component File**

```vue
<!-- components/HelloWorld.vue -->
<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="changeGreeting">Change Greeting</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const greeting = ref('Hello, Vue!')
const message = ref('Welcome to component-based development')

const changeGreeting = () => {
  greeting.value = greeting.value === 'Hello, Vue!' 
    ? 'Hi there!' 
    : 'Hello, Vue!'
}
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  transform: scale(1.05);
}
</style>
```

### **Step 2: Use the Component**

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>
```

---

## 🌍 Component Registration

```mermaid
graph TD
    A[Component Registration] --> B[Local Registration]
    A --> C[Global Registration]
    
    B --> B1[Import in parent]
    B --> B2[Use directly in template]
    B --> B3[Only available in parent]
    B --> B4["import MyComp from './MyComp.vue'"]
    
    C --> C1[Register in main.ts]
    C --> C2[Available everywhere]
    C --> C3[Larger bundle size]
    C --> C4["app.component('MyComp', MyComp)"]
    
    style B fill:#4CAF50
    style B1 fill:#E8F5E9
    style B2 fill:#E8F5E9
    style B3 fill:#E8F5E9
    
    style C fill:#FF9800
    style C1 fill:#FFF3E0
    style C2 fill:#FFF3E0
    style C3 fill:#FFF3E0
```

### **Local Registration (Recommended)**
```vue
<script setup lang="ts">
// Automatically registered in this component
import UserCard from './components/UserCard.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <UserCard />
  <ProductList />
</template>
```

### **Global Registration (Use Sparingly)**
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

// Register globally
app.component('BaseButton', BaseButton)

app.mount('#app')
```

---

## 📛 Component Naming Conventions

```mermaid
graph LR
    A[Component Names] --> B[PascalCase File]
    A --> C[Usage in Template]
    
    B --> B1[UserProfile.vue]
    B --> B2[ProductCard.vue]
    B --> B3[NavBar.vue]
    
    C --> C1["<UserProfile />"]
    C --> C2["<ProductCard />"]
    C --> C3["<NavBar />"]
    
    D[Alternative] --> D1["<user-profile>"]
    D --> D2["<product-card>"]
    
    style B1 fill:#4CAF50
    style B2 fill:#4CAF50
    style B3 fill:#4CAF50
    style C1 fill:#2196F3
    style C2 fill:#2196F3
    style C3 fill:#2196F3
```

**Best Practices:**
- ✅ Use **PascalCase** for component files: `UserCard.vue`
- ✅ Use **PascalCase** in templates: `<UserCard />`
- ✅ Multi-word names: `UserProfile`, not `User`
- ✅ Descriptive names: `ProductCard`, not `Card`

---

## 🔄 Component Communication Overview

```mermaid
flowchart TD
    A[Parent Component] -->|Props down| B[Child Component]
    B -->|Events up| A
    
    C[Sibling A] -->|Emit to Parent| D[Parent]
    D -->|Props to| E[Sibling B]
    
    F[Deep Child] -->|Provide/Inject| G[Ancestor]
    
    style A fill:#42b883,color:#fff
    style B fill:#4CAF50
    style D fill:#42b883,color:#fff
```

**We'll learn these in upcoming days:**
- **Day 2:** Props (parent → child)
- **Day 3:** Emits (child → parent)
- **Day 4:** Slots (content distribution)
- **Day 6:** Provide/Inject (ancestor → descendant)

---

## 🎯 Component Best Practices

```mermaid
mindmap
  root((Component<br/>Best Practices))
    Single Responsibility
      One job per component
      Easy to understand
      Reusable
    Small & Focused
      Less than 200 lines
      Clear purpose
      Easy to test
    Props Interface
      Define types
      Default values
      Validation
    Naming
      PascalCase files
      Descriptive names
      Multi-word names
    Styles
      Use scoped
      No global leakage
      Component-specific
    Composition
      Build from smaller parts
      Reuse components
      DRY principle
```

---

## 💻 Practical Examples

### **Example 1: Button Component**

```vue
<!-- components/BaseButton.vue -->
<template>
  <button 
    class="base-button"
    :class="[variant, size]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.primary {
  background: #42b883;
  color: white;
}

.secondary {
  background: #f5f5f5;
  color: #333;
}

.danger {
  background: #f44336;
  color: white;
}

.small {
  font-size: 12px;
  padding: 0.25rem 0.5rem;
}

.medium {
  font-size: 14px;
}

.large {
  font-size: 16px;
  padding: 0.75rem 1.5rem;
}
</style>
```

### **Example 2: Card Component**

See `UserCard.vue` for complete example.

---

## ✅ Practice Exercise

Create these components:

1. **Alert Component**
   - Props: type (success/warning/error), message
   - Displays colored alert box
   - Close button emits event

2. **Avatar Component**
   - Props: src, alt, size
   - Displays user avatar
   - Fallback to initials if no image

3. **Badge Component**
   - Props: count, color
   - Displays notification badge
   - Hide if count is 0

---

## 📌 Key Takeaways

```mermaid
graph TD
    A[Components] --> B[Reusable UI pieces]
    A --> C[Self-contained]
    A --> D[Composable]
    
    B --> B1[Write once, use many]
    C --> C1[Own template, script, style]
    D --> D1[Build complex UIs from simple parts]
    
    E[SFC Benefits] --> E1[Organization]
    E --> E2[Scoped styles]
    E --> E3[TypeScript support]
    E --> E4[Hot reload]
    
    style A fill:#42b883,color:#fff
    style E fill:#4CAF50
```

- ✅ Components are the building blocks of Vue apps
- ✅ Use `.vue` Single File Components
- ✅ Prefer local registration over global
- ✅ Follow PascalCase naming convention
- ✅ Keep components small and focused
- ✅ Use scoped styles to prevent leakage

---

**Tomorrow:** Props & Emit - Parent-Child Communication! 📡
