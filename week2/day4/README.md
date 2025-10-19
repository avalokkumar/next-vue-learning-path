# Day 4 (Day 11): Lifecycle Hooks ⏰

**Duration:** 3-4 hours | **Difficulty:** ⭐⭐⭐ Hard

---

## 📖 Learning Objectives

- Understand component lifecycle
- Master lifecycle hooks
- Use onMounted, onUpdated, onUnmounted
- Handle async operations in lifecycle
- Clean up resources properly

---

## 🔄 Component Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Setup: Component Created
    Setup --> Mounted: DOM Ready
    Mounted --> Active: Component Active
    Active --> Updated: Data Changes
    Updated --> Active: Continue
    Active --> Unmounted: Component Removed
    Unmounted --> [*]: Destroyed
    
    note right of Setup
        setup() runs
        Composition API setup
        ref(), reactive(), computed()
    end note
    
    note right of Mounted
        onMounted()
        DOM is accessible
        API calls, timers
    end note
    
    note right of Updated
        onUpdated()
        After DOM update
        Post-render logic
    end note
    
    note right of Unmounted
        onUnmounted()
        Cleanup
        Clear timers, listeners
    end note
```

---

## 🎯 Lifecycle Hooks Overview

```mermaid
graph TD
    A[Lifecycle Hooks] --> B[Creation Phase]
    A --> C[Mounting Phase]
    A --> D[Update Phase]
    A --> E[Unmounting Phase]
    
    B --> B1[setup - Composition API]
    
    C --> C1[onBeforeMount]
    C --> C2[onMounted]
    
    D --> D1[onBeforeUpdate]
    D --> D2[onUpdated]
    
    E --> E1[onBeforeUnmount]
    E --> E2[onUnmounted]
    
    style A fill:#42b883,color:#fff
    style C2 fill:#4CAF50
    style D2 fill:#2196F3,color:#fff
    style E2 fill:#FF9800
```

---

## 📝 Basic Lifecycle Hooks

### **onMounted - After DOM is Ready**
```vue
<template>
  <div ref="container">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const container = ref<HTMLElement>()
const title = ref('Hello')

onMounted(() => {
  console.log('Component mounted!')
  console.log('DOM element:', container.value)
  
  // Safe to:
  // - Access DOM elements
  // - Fetch data from API
  // - Set up event listeners
  // - Initialize third-party libraries
})
</script>
```

### **onUpdated - After Component Updates**
```vue
<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  console.log('Component updated!')
  console.log('New count:', count.value)
  
  // Runs after any reactive data changes
  // DOM has been updated
})
</script>
```

### **onUnmounted - Before Component is Destroyed**
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    console.log('Tick')
  }, 1000)
})

onUnmounted(() => {
  console.log('Cleaning up...')
  clearInterval(intervalId)
  
  // Clean up:
  // - Clear timers
  // - Remove event listeners
  // - Cancel API requests
  // - Disconnect websockets
})
</script>
```

---

## ⏰ Lifecycle Execution Order

```mermaid
sequenceDiagram
    participant Vue
    participant Component
    participant DOM
    
    Vue->>Component: setup() runs
    Component->>Component: Initialize reactive state
    
    Vue->>Component: onBeforeMount()
    Note over Component: Template compiled, not rendered yet
    
    Vue->>DOM: Render to DOM
    DOM->>Vue: DOM ready
    
    Vue->>Component: onMounted()
    Note over Component: Can access DOM, fetch data
    
    Component->>Component: User interaction
    Component->>Component: Data changes
    
    Vue->>Component: onBeforeUpdate()
    Vue->>DOM: Re-render
    Vue->>Component: onUpdated()
    
    Vue->>Component: v-if=false or navigation
    Vue->>Component: onBeforeUnmount()
    Vue->>DOM: Remove from DOM
    Vue->>Component: onUnmounted()
```

---

## 🎨 Common Patterns

### **Pattern 1: Fetch Data on Mount**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string>()

onMounted(async () => {
  loading.value = true
  
  try {
    const response = await fetch('https://api.example.com/users')
    users.value = await response.json()
  } catch (e) {
    error.value = 'Failed to fetch users'
  } finally {
    loading.value = false
  }
})
</script>
```

### **Pattern 2: Set up Event Listeners**
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const handleResize = () => {
  console.log('Window resized:', window.innerWidth)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
```

### **Pattern 3: Timer/Interval**
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
```

### **Pattern 4: Third-Party Library Init**
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref<HTMLCanvasElement>()
let chartInstance: Chart

onMounted(() => {
  if (chartRef.value) {
    chartInstance = new Chart(chartRef.value, {
      type: 'bar',
      data: { /* chart data */ }
    })
  }
})

onUnmounted(() => {
  chartInstance?.destroy()
})
</script>

<template>
  <canvas ref="chartRef"></canvas>
</template>
```

---

## 🔍 All Lifecycle Hooks

```mermaid
graph LR
    A[setup] --> B[onBeforeMount]
    B --> C[onMounted]
    C --> D[onBeforeUpdate]
    D --> E[onUpdated]
    D --> C
    C --> F[onBeforeUnmount]
    F --> G[onUnmounted]
    
    style A fill:#42b883,color:#fff
    style C fill:#4CAF50
    style E fill:#2196F3,color:#fff
    style G fill:#FF9800
```

| Hook | When | Use Case |
|------|------|----------|
| `setup` | Component created | Initialize state |
| `onBeforeMount` | Before mounting | Rarely used |
| `onMounted` | DOM ready | Fetch data, DOM access |
| `onBeforeUpdate` | Before re-render | Rarely used |
| `onUpdated` | After re-render | Post-update logic |
| `onBeforeUnmount` | Before destroy | Confirm navigation |
| `onUnmounted` | Component destroyed | Cleanup |

---

## 💡 Best Practices

```mermaid
mindmap
  root((Lifecycle<br/>Best Practices))
    onMounted
      API calls
      DOM manipulation
      Event listeners
      Third-party init
    onUnmounted
      Clear timers
      Remove listeners
      Cancel requests
      Cleanup resources
    Avoid
      Heavy work in setup
      Forget cleanup
      Direct DOM in updated
```

---

## ⚠️ Common Mistakes

```vue
<!-- ❌ BAD: Forgetting cleanup -->
<script setup lang="ts">
onMounted(() => {
  setInterval(() => {
    console.log('Memory leak!')
  }, 1000)
  // ❌ No cleanup! Interval runs forever
})
</script>

<!-- ✅ GOOD: Proper cleanup -->
<script setup lang="ts">
let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    console.log('Safe!')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
```

---

## ✅ Practice Exercise

Build a **Timer Component** with:
- Start/Stop/Reset buttons
- Display elapsed time
- Use onMounted to start
- Use onUnmounted to cleanup
- Store state in localStorage
- Resume on remount

Build a **Data Fetcher** component:
- Fetch on mount
- Show loading state
- Handle errors
- Cancel on unmount

---

**Tomorrow:** Composables - Reusable Logic! 🔧
