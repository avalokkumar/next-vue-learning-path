# Day 6: Computed Properties & Watchers 🔍

**Duration:** 3-4 hours  
**Difficulty:** ⭐⭐⭐ Hard

---

## 📖 Learning Objectives

- Understand computed properties vs methods
- Master computed property caching
- Learn watch() and watchEffect()
- Handle deep watching for objects/arrays
- Know when to use computed vs watchers

---

## 🧮 Computed Properties Concept

```mermaid
flowchart TD
    A[Reactive Dependencies] --> B[Computed Property]
    B --> C{Dependencies Changed?}
    C -->|No| D[Return Cached Value]
    C -->|Yes| E[Re-compute Value]
    E --> F[Cache New Result]
    F --> G[Return New Value]
    D --> H[Template Uses Value]
    G --> H
    
    style B fill:#42b883
    style D fill:#4CAF50
    style E fill:#FF9800
```

**Computed properties are cached based on their reactive dependencies.**

---

## 📊 Computed vs Methods

```mermaid
graph TD
    A[When to Use?] --> B[Computed Property]
    A --> C[Method]
    
    B --> B1[Derived/calculated data]
    B --> B2[Depends on reactive state]
    B --> B3[Needs caching]
    B --> B4[Read-only usually]
    
    C --> C1[Actions/operations]
    C --> C2[Event handlers]
    C --> C3[No caching needed]
    C --> C4[May have side effects]
    
    style B fill:#4CAF50
    style C fill:#2196F3
```

### Comparison Example:

```vue
<template>
  <div>
    <!-- Method: Called every re-render -->
    <p>{{ calculateTotal() }}</p>
    <p>{{ calculateTotal() }}</p> <!-- Computed twice! -->
    
    <!-- Computed: Cached, computed once -->
    <p>{{ totalPrice }}</p>
    <p>{{ totalPrice }}</p> <!-- Uses cached value -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 }
])

// Method: Runs every time it's called
const calculateTotal = () => {
  console.log('Method called')
  return items.value.reduce((sum, item) => sum + item.price, 0)
}

// Computed: Cached, only re-runs when items changes
const totalPrice = computed(() => {
  console.log('Computed called')
  return items.value.reduce((sum, item) => sum + item.price, 0)
})
</script>
```

**Result:** Method logs twice, Computed logs once (cached)!

---

## 🎯 Computed Property Patterns

```mermaid
graph LR
    A[Computed Patterns] --> B[Filtering]
    A --> C[Sorting]
    A --> D[Calculations]
    A --> E[Formatting]
    A --> F[Validations]
    
    B --> B1[Filter arrays]
    C --> C1[Sort data]
    D --> D1[Math operations]
    E --> E1[Format display]
    F --> F1[Form validation]
    
    style A fill:#42b883
```

### 1. Filtering Data:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const items = ref(['Apple', 'Banana', 'Cherry', 'Date'])

const filteredItems = computed(() => {
  return items.value.filter(item => 
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
```

### 2. Sorting Data:
```vue
<script setup lang="ts">
const products = ref([
  { name: 'Laptop', price: 999 },
  { name: 'Mouse', price: 29 },
  { name: 'Keyboard', price: 79 }
])

const sortedProducts = computed(() => {
  return [...products.value].sort((a, b) => a.price - b.price)
})
</script>
```

### 3. Calculations:
```vue
<script setup lang="ts">
const cartItems = ref([
  { name: 'Item 1', price: 10, quantity: 2 },
  { name: 'Item 2', price: 20, quantity: 1 }
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  )
})

const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + tax.value)
</script>
```

### 4. Formatting:
```vue
<script setup lang="ts">
const user = ref({
  firstName: 'John',
  lastName: 'Doe'
})

const fullName = computed(() => {
  return `${user.value.firstName} ${user.value.lastName}`
})

const initials = computed(() => {
  return `${user.value.firstName[0]}${user.value.lastName[0]}`
})
</script>
```

---

## 👁️ Watchers Concept

```mermaid
sequenceDiagram
    participant Data
    participant Watcher
    participant SideEffect
    
    Data->>Data: Value Changes
    Data->>Watcher: Detect Change
    Watcher->>Watcher: Compare old vs new
    Watcher->>SideEffect: Execute callback
    SideEffect->>SideEffect: API call, localStorage, etc.
    
    Note over Watcher: Can watch single or multiple sources
```

**Watchers perform side effects in response to data changes.**

---

## 🔍 watch() API

```mermaid
graph TD
    A[watch Function] --> B[Watch Single ref]
    A --> C[Watch Reactive Object]
    A --> D[Watch Multiple Sources]
    A --> E[Watch Getter Function]
    
    B --> B1["watch(count, callback)"]
    C --> C1["watch(() => obj.prop, callback)"]
    D --> D1["watch([source1, source2], callback)"]
    E --> E1["watch(() => x + y, callback)"]
    
    style A fill:#FF6B6B
```

### Watch Single Source:
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

// Watch a single ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
</script>
```

### Watch Object Property (getter):
```vue
<script setup lang="ts">
import { reactive, watch } from 'vue'

const user = reactive({
  name: 'John',
  age: 30
})

// Watch specific property
watch(
  () => user.age,
  (newAge, oldAge) => {
    console.log(`Age changed from ${oldAge} to ${newAge}`)
  }
)
</script>
```

### Watch Multiple Sources:
```vue
<script setup lang="ts">
const firstName = ref('John')
const lastName = ref('Doe')

watch(
  [firstName, lastName],
  ([newFirst, newLast], [oldFirst, oldLast]) => {
    console.log(`Name changed from ${oldFirst} ${oldLast} to ${newFirst} ${newLast}`)
  }
)
</script>
```

---

## 🔬 Deep Watching

```mermaid
flowchart TD
    A[Watch Options] --> B[immediate: true]
    A --> C[deep: true]
    A --> D[flush: 'post']
    
    B --> B1[Run immediately on mount]
    C --> C1[Watch nested properties]
    D --> D1[Run after component update]
    
    style A fill:#9C27B0
```

### Deep Watch Object:
```vue
<script setup lang="ts">
import { reactive, watch } from 'vue'

const user = reactive({
  profile: {
    name: 'John',
    address: {
      city: 'New York'
    }
  }
})

// Deep watch - detects nested changes
watch(
  () => user.profile,
  (newProfile) => {
    console.log('Profile changed:', newProfile)
  },
  { deep: true } // Enable deep watching
)

// Now this will trigger the watcher:
user.profile.address.city = 'Los Angeles'
</script>
```

### Immediate Watch:
```vue
<script setup lang="ts">
const searchQuery = ref('')

watch(
  searchQuery,
  (newQuery) => {
    // Fetch search results
    console.log('Searching for:', newQuery)
  },
  { immediate: true } // Run immediately on mount
)
</script>
```

---

## ⚡ watchEffect()

```mermaid
graph TD
    A[watchEffect] --> B[Auto-tracks Dependencies]
    A --> C[Runs Immediately]
    A --> D[No old/new values]
    
    E[Use When] --> E1[Don't need old value]
    E --> E2[Multiple dependencies]
    E --> E3[Side effects only]
    
    style A fill:#4ECDC4
```

### watchEffect Example:
```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const count = ref(0)
const multiplier = ref(2)

// Auto-tracks count AND multiplier
watchEffect(() => {
  console.log(`Result: ${count.value * multiplier.value}`)
})

// Changes to either count or multiplier trigger this watcher
count.value = 5 // Logs: "Result: 10"
multiplier.value = 3 // Logs: "Result: 15"
</script>
```

---

## 🆚 Computed vs Watch

```mermaid
graph TD
    A{What do you need?} --> B[Derive new value]
    A --> C[Side effect]
    
    B --> D[Use Computed]
    C --> E[Use Watch]
    
    D --> D1[Filtering data]
    D --> D2[Calculations]
    D --> D3[Formatting]
    
    E --> E1[API calls]
    E --> E2[localStorage]
    E --> E3[Logging]
    E --> E4[Navigate routes]
    
    style D fill:#4CAF50
    style E fill:#FF9800
```

### Use Computed For:
- Deriving values from existing data
- Filtering, sorting, formatting
- Calculations
- **Synchronous** operations

### Use Watch For:
- API calls based on data changes
- Saving to localStorage
- **Asynchronous** operations
- Side effects (logging, analytics)

---

## 🛠️ Real-World Example: Search with Debounce

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <p v-if="loading">Searching...</p>
    <ul>
      <li v-for="result in searchResults" :key="result">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')
const searchResults = ref<string[]>([])
const loading = ref(false)

// Watch with debounce
let timeoutId: ReturnType<typeof setTimeout>

watch(searchQuery, (newQuery) => {
  // Clear previous timeout
  clearTimeout(timeoutId)
  
  // Set new timeout (debounce)
  timeoutId = setTimeout(async () => {
    if (newQuery.length < 3) {
      searchResults.value = []
      return
    }
    
    loading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    searchResults.value = [
      `Result 1 for "${newQuery}"`,
      `Result 2 for "${newQuery}"`,
      `Result 3 for "${newQuery}"`
    ]
    
    loading.value = false
  }, 500) // 500ms debounce
})
</script>
```

---

## ✅ Practice Exercise

Build a **Shopping Cart Calculator** with:

**Features:**
1. Add items with name, price, quantity
2. Computed properties for:
   - Subtotal
   - Tax (10%)
   - Discount (if subtotal > $100, 5% off)
   - Final total
3. Watch for cart changes and:
   - Save to localStorage
   - Log to console
4. Filter items by price range (computed)
5. Sort items by price or name (computed)

See `shopping-cart.vue` for starter code.

---

## 📌 Key Takeaways

```mermaid
mindmap
  root((Reactivity))
    Computed
      Cached
      Synchronous
      Derived Values
      Multiple dependents OK
    Watch
      Side Effects
      Async operations
      Old and new values
      Multiple sources
    watchEffect
      Auto-track deps
      Immediate
      No old/new
      Simpler API
```

---

## 🔗 Cheat Sheet

| Feature | Computed | watch() | watchEffect() |
|---------|----------|---------|---------------|
| **Purpose** | Derive value | Side effects | Side effects |
| **Caching** | ✅ Yes | ❌ No | ❌ No |
| **Dependencies** | Auto-tracked | Explicit | Auto-tracked |
| **Old value** | ❌ No | ✅ Yes | ❌ No |
| **Immediate** | ❌ No | ⚙️ Optional | ✅ Yes |
| **Async** | ❌ No | ✅ Yes | ✅ Yes |

---

**Tomorrow:** Week 1 Project - Todo App! 🎉
