# Day 3 (Day 10): Slots - Content Distribution 🎰

**Duration:** 3-4 hours | **Difficulty:** ⭐⭐⭐ Hard

---

## 📖 Learning Objectives

- Understand slots for content distribution
- Master default slots
- Use named slots
- Implement scoped slots
- Create flexible, reusable components

---

## 🎰 What Are Slots?

```mermaid
graph TD
    A[Parent Component] -->|Content| B[Slot]
    B -->|Renders| C[Child Component]
    
    A --> A1[Provides Content]
    C --> C1[Defines Where Content Goes]
    
    style A fill:#42b883,color:#fff
    style C fill:#4CAF50
    style B fill:#FFD700
```

**Slots allow parents to inject content into child components.**

---

## 📦 Default Slot

```mermaid
sequenceDiagram
    participant Parent
    participant Slot
    participant Child
    
    Parent->>Slot: Provide content
    Slot->>Child: Render at <slot />
    Child->>Child: Display content
```

### **Basic Example:**
```vue
<!-- Card.vue (Child) -->
<template>
  <div class="card">
    <slot>Default content if no slot provided</slot>
  </div>
</template>

<!-- Parent.vue -->
<template>
  <Card>
    <h2>Custom Title</h2>
    <p>Custom paragraph content!</p>
  </Card>
</template>
```

---

## 🏷️ Named Slots

```mermaid
graph TD
    A[Parent] --> B[header slot]
    A --> C[default slot]
    A --> D[footer slot]
    
    E[Child Component] --> F["<slot name='header' />"]
    E --> G["<slot />"]
    E --> H["<slot name='footer' />"]
    
    B --> F
    C --> G
    D --> H
    
    style A fill:#42b883,color:#fff
    style E fill:#4CAF50
```

### **Named Slots Example:**
```vue
<!-- Layout.vue (Child) -->
<template>
  <div class="layout">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    
    <main>
      <slot>Default Main Content</slot>
    </main>
    
    <footer>
      <slot name="footer">Default Footer</slot>
    </footer>
  </div>
</template>

<!-- Parent.vue -->
<template>
  <Layout>
    <template #header>
      <h1>My Page Title</h1>
    </template>
    
    <p>Main content goes here</p>
    <p>Multiple elements allowed</p>
    
    <template #footer>
      <p>© 2024 My App</p>
    </template>
  </Layout>
</template>
```

---

## 🔍 Scoped Slots

```mermaid
flowchart LR
    A[Child Component] -->|Provides Data| B[Slot Props]
    B -->|Available in| C[Parent Template]
    C -->|Custom Rendering| D[Display]
    
    style A fill:#4CAF50
    style B fill:#FFD700
    style C fill:#42b883,color:#fff
```

### **Scoped Slot Example:**
```vue
<!-- List.vue (Child) -->
<template>
  <div class="list">
    <div v-for="item in items" :key="item.id">
      <slot :item="item" :index="item.id">
        {{ item.name }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items: Array<{ id: number; name: string; price: number }>
}

defineProps<Props>()
</script>

<!-- Parent.vue -->
<template>
  <List :items="products">
    <template #default="{ item, index }">
      <div class="custom-item">
        <strong>{{ index }}:</strong> {{ item.name }} - ${{ item.price }}
      </div>
    </template>
  </List>
</template>
```

---

## 🎨 Slot Patterns

```mermaid
mindmap
  root((Slot Patterns))
    Default Slot
      Simple content
      Fallback content
      Single slot
    Named Slots
      Multiple sections
      Layout components
      Structured content
    Scoped Slots
      Data from child
      Custom rendering
      List patterns
    Dynamic Slots
      v-slot:[dynamic]
      Runtime slot names
```

---

## 🏗️ Real-World: Modal Component

```vue
<!-- Modal.vue -->
<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay" @click="handleClose">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <h2>Modal Title</h2>
          </slot>
          <button @click="handleClose" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <slot>Modal content</slot>
        </div>
        
        <div class="modal-footer">
          <slot name="footer">
            <button @click="handleClose">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<!-- Usage -->
<template>
  <Modal :show="showModal" @close="showModal = false">
    <template #header>
      <h2>Custom Header</h2>
    </template>
    
    <p>This is my custom modal content!</p>
    
    <template #footer>
      <button @click="save">Save</button>
      <button @click="showModal = false">Cancel</button>
    </template>
  </Modal>
</template>
```

---

## 📊 Slot Decision Tree

```mermaid
flowchart TD
    A{Need flexible content?} -->|No| B[Use Props]
    A -->|Yes| C{Multiple sections?}
    
    C -->|No| D[Default Slot]
    C -->|Yes| E[Named Slots]
    
    F{Need child data?} -->|Yes| G[Scoped Slot]
    F -->|No| E
    
    style D fill:#4CAF50
    style E fill:#2196F3,color:#fff
    style G fill:#FF9800
```

---

## ✅ Practice Exercise

Build a **Card Component** with:
- Named slots: `header`, `default`, `footer`
- Scoped slot for custom item rendering
- Props: `title`, `collapsible`
- Emit: `toggle` event

Build a **DataTable Component** with:
- Scoped slot for custom column rendering
- Named slot for table header
- Props: `data`, `columns`

---

**Tomorrow:** Lifecycle Hooks! ⏰
