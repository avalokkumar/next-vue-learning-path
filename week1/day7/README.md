# Day 7: Week 1 Project - Todo App 🎯

**Duration:** 4-6 hours  
**Difficulty:** ⭐⭐⭐ Project Day

---

## 🎯 Project Overview

Build a **feature-rich Todo Application** that demonstrates all concepts learned in Week 1!

```mermaid
mindmap
  root((Todo App))
    Features
      Add Tasks
      Edit Tasks
      Delete Tasks
      Mark Complete
      Filter by Status
      Search Tasks
      Clear Completed
    Concepts Used
      Reactive Data ref reactive
      v-model
      v-for with :key
      v-if v-show
      Event Handling
      Computed Properties
      Watchers
      Form Validation
```

---

## 📋 Requirements

### **Must Have Features:**
1. ✅ Add new todos
2. ✅ Mark todos as complete/incomplete
3. ✅ Delete individual todos
4. ✅ Edit existing todos
5. ✅ Filter by: All, Active, Completed
6. ✅ Clear all completed todos
7. ✅ Todo counter (active/completed)
8. ✅ Persist to localStorage
9. ✅ Form validation (no empty todos)
10. ✅ Search/filter todos

### **Nice to Have:**
- Priority levels (High, Medium, Low)
- Due dates
- Categories/tags
- Dark mode toggle
- Animations

---

## 🏗️ Application Architecture

```mermaid
graph TD
    A[Todo App] --> B[Components]
    A --> C[State Management]
    A --> D[Features]
    
    B --> B1[TodoForm - Add new]
    B --> B2[TodoList - Display list]
    B --> B3[TodoItem - Individual todo]
    B --> B4[TodoFilters - Filter controls]
    B --> B5[TodoStats - Statistics]
    
    C --> C1[todos ref Array]
    C --> C2[filter ref String]
    C --> C3[searchQuery ref String]
    
    D --> D1[Computed filteredTodos]
    D --> D2[Computed stats]
    D --> D3[Watch localStorage]
    
    style A fill:#42b883
    style C fill:#FFD700
    style D fill:#4CAF50
```

---

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant State
    participant Computed
    participant Storage
    participant UI
    
    User->>Form: Enter todo text
    Form->>State: Add todo to array
    State->>Computed: Filter & sort
    State->>Storage: Save to localStorage
    Computed->>UI: Update display
    UI->>User: Show new todo
    
    User->>UI: Toggle complete
    UI->>State: Update todo status
    State->>Computed: Re-calculate
    State->>Storage: Persist change
    Computed->>UI: Re-render list
```

---

## 📊 State Structure

```typescript
interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  priority?: 'high' | 'medium' | 'low'
}

interface AppState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  searchQuery: string
  editingId: number | null
}
```

```mermaid
classDiagram
    class Todo {
        +number id
        +string text
        +boolean completed
        +Date createdAt
        +string priority
    }
    
    class AppState {
        +Todo[] todos
        +string filter
        +string searchQuery
        +number editingId
    }
    
    AppState --> Todo : contains
```

---

## 🎨 UI Layout

```mermaid
graph TD
    A[Todo App Container] --> B[Header]
    A --> C[Todo Form]
    A --> D[Filters & Search]
    A --> E[Todo List]
    A --> F[Footer Stats]
    
    B --> B1[Title & Logo]
    C --> C1[Input Field]
    C --> C2[Add Button]
    
    D --> D1[All/Active/Completed]
    D --> D2[Search Box]
    
    E --> E1[TodoItem 1]
    E --> E2[TodoItem 2]
    E --> E3[TodoItem n]
    
    E1 --> E1A[Checkbox]
    E1 --> E1B[Text]
    E1 --> E1C[Edit/Delete]
    
    F --> F1[Active Count]
    F --> F2[Clear Completed]
    
    style A fill:#42b883
```

---

## 💻 Implementation Steps

### **Step 1: Setup (15 min)**
```bash
# Create new Vue project
npm create vite@latest todo-app -- --template vue-ts
cd todo-app
npm install
npm run dev
```

### **Step 2: Create Data Structure (20 min)**
Define interfaces and initial state

### **Step 3: Build TodoForm Component (30 min)**
- Input field with v-model
- Add button
- Validation
- Handle submit

### **Step 4: Build TodoList (40 min)**
- Display todos with v-for
- Checkbox to toggle completion
- Delete button
- Edit functionality

### **Step 5: Add Filtering (30 min)**
- Filter buttons (All/Active/Completed)
- Computed property for filtered todos
- Search functionality

### **Step 6: Add Statistics (20 min)**
- Count active todos
- Count completed todos
- Show total

### **Step 7: LocalStorage (20 min)**
- Watch todos and save
- Load on mount

### **Step 8: Polish & Styling (1-2 hours)**
- CSS styling
- Transitions
- Responsive design

---

## 🔍 Key Computed Properties

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Filtered todos based on active filter
const filteredTodos = computed(() => {
  let result = todos.value
  
  // Apply status filter
  switch (filter.value) {
    case 'active':
      result = result.filter(t => !t.completed)
      break
    case 'completed':
      result = result.filter(t => t.completed)
      break
  }
  
  // Apply search
  if (searchQuery.value) {
    result = result.filter(t => 
      t.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return result
})

// Statistics
const stats = computed(() => ({
  total: todos.value.length,
  active: todos.value.filter(t => !t.completed).length,
  completed: todos.value.filter(t => t.completed).length
}))
</script>
```

---

## 💾 LocalStorage Integration

```mermaid
flowchart LR
    A[App Loads] --> B[Check localStorage]
    B --> C{Data exists?}
    C -->|Yes| D[Load data]
    C -->|No| E[Start empty]
    
    F[User makes change] --> G[Update state]
    G --> H[Watch detects change]
    H --> I[Save to localStorage]
    
    style B fill:#FFD700
    style I fill:#4CAF50
```

```vue
<script setup lang="ts">
// Load from localStorage
const loadTodos = () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
}

// Watch and save
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true }
)

// Load on mount
loadTodos()
</script>
```

---

## ✅ Testing Checklist

Before considering your project complete, test these scenarios:

**Basic Operations:**
- [ ] Add a todo
- [ ] Add multiple todos
- [ ] Try to add empty todo (should be prevented)
- [ ] Mark todo as complete
- [ ] Mark todo as incomplete
- [ ] Edit a todo
- [ ] Delete a todo

**Filtering:**
- [ ] Switch to "Active" filter
- [ ] Switch to "Completed" filter
- [ ] Switch back to "All"
- [ ] Search for todos by text

**Persistence:**
- [ ] Add todos and refresh page (should persist)
- [ ] Complete todos and refresh (status should persist)
- [ ] Clear all completed and refresh

**Edge Cases:**
- [ ] What happens with 0 todos?
- [ ] What happens with 100 todos?
- [ ] Long todo text handling
- [ ] Special characters in todo text

---

## 🎨 Styling Guidelines

```mermaid
graph LR
    A[Design System] --> B[Colors]
    A --> C[Typography]
    A --> D[Spacing]
    
    B --> B1[Primary: #42b883]
    B --> B2[Secondary: #35495e]
    B --> B3[Success: #4CAF50]
    B --> B4[Danger: #F44336]
    
    C --> C1[Font: System Sans]
    C --> C2[Size: 14-18px]
    
    D --> D1[Gap: 8px 16px 24px]
    
    style A fill:#9C27B0
```

---

## 🚀 Bonus Challenges

Once you complete the basic app, try these:

1. **Priority System**: Add High/Medium/Low priority with color coding
2. **Due Dates**: Add date picker and show overdue todos
3. **Categories**: Tag todos with categories (Work, Personal, Shopping)
4. **Drag & Drop**: Reorder todos by dragging
5. **Dark Mode**: Toggle between light/dark themes
6. **Export/Import**: Download todos as JSON
7. **Animations**: Add Vue transitions for add/remove
8. **Keyboard Shortcuts**: Press 'N' for new todo, 'Escape' to cancel edit

---

## 📁 Project Files

Your project should have:
```
src/
├── App.vue              (Main app container)
├── components/
│   ├── TodoForm.vue     (Add/Edit form)
│   ├── TodoList.vue     (List container)
│   ├── TodoItem.vue     (Individual todo)
│   ├── TodoFilters.vue  (Filter buttons)
│   └── TodoStats.vue    (Statistics)
├── types/
│   └── Todo.ts          (TypeScript interfaces)
└── composables/
    └── useTodos.ts      (Reusable todo logic)
```

---

## 📸 Expected Result

Your final app should look professional and include:
- Clean, modern UI
- Smooth interactions
- Clear visual feedback
- Responsive design
- No bugs in core functionality

See `TodoApp.vue` for complete reference implementation!

---

## 🎓 What You Learned This Week

```mermaid
graph TD
    A[Week 1 Complete!] --> B[Vue Basics]
    A --> C[Reactive Data]
    A --> D[Templates]
    A --> E[Events]
    A --> F[Forms]
    A --> G[Computed & Watch]
    
    B --> B1[Setup & Instance]
    C --> C1[ref & reactive]
    D --> D1[Interpolation, Directives]
    E --> E1[Event handling, Modifiers]
    F --> F1[v-model, Validation]
    G --> G1[Derived state, Side effects]
    
    H[Ready for Week 2!] --> I[Components]
    H --> J[Composition API]
    H --> K[Props & Emits]
    
    style A fill:#FFD700
    style H fill:#4CAF50
```

---

## 🎉 Congratulations!

You've completed Week 1! You now understand:
- ✅ Vue reactivity system
- ✅ Template syntax and directives
- ✅ Event handling
- ✅ Form bindings
- ✅ Computed properties
- ✅ Watchers
- ✅ Building a complete application

**Next Week:** Components, Props, Composition API! 🚀

---

**Take a break, celebrate your progress, then move to Week 2!** 🎊
