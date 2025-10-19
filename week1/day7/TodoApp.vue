<template>
  <div class="todo-app">
    <header class="app-header">
      <h1>📝 Vue Todo App</h1>
      <p>Week 1 Project - All Concepts Combined!</p>
    </header>
    
    <!-- Add Todo Form -->
    <div class="todo-form">
      <input 
        v-model.trim="newTodoText"
        @keyup.enter="addTodo"
        type="text"
        placeholder="What needs to be done?"
        class="todo-input"
        :class="{ error: showError }"
      />
      <button @click="addTodo" class="add-btn">
        Add Todo
      </button>
      <span v-if="showError" class="error-message">
        Todo cannot be empty!
      </span>
    </div>
    
    <!-- Filters and Search -->
    <div class="controls">
      <div class="filters">
        <button 
          v-for="filterOption in filters" 
          :key="filterOption"
          @click="currentFilter = filterOption"
          :class="{ active: currentFilter === filterOption }"
          class="filter-btn"
        >
          {{ filterOption }}
        </button>
      </div>
      
      <div class="search">
        <input 
          v-model="searchQuery"
          type="search"
          placeholder="🔍 Search todos..."
          class="search-input"
        />
      </div>
    </div>
    
    <!-- Statistics -->
    <div class="stats">
      <span class="stat-item">
        <strong>{{ stats.total }}</strong> total
      </span>
      <span class="stat-item active">
        <strong>{{ stats.active }}</strong> active
      </span>
      <span class="stat-item completed">
        <strong>{{ stats.completed }}</strong> completed
      </span>
    </div>
    
    <!-- Todo List -->
    <div class="todo-list">
      <div v-if="filteredTodos.length === 0" class="empty-state">
        <p v-if="todos.length === 0">🎉 No todos yet! Add one above.</p>
        <p v-else>No todos match your filter/search.</p>
      </div>
      
      <transition-group name="todo-list">
        <div 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed, editing: editingId === todo.id }"
        >
          <!-- View Mode -->
          <template v-if="editingId !== todo.id">
            <input 
              type="checkbox"
              v-model="todo.completed"
              class="todo-checkbox"
            />
            
            <span class="todo-text" @dblclick="startEdit(todo)">
              {{ todo.text }}
            </span>
            
            <div class="todo-actions">
              <button @click="startEdit(todo)" class="edit-btn" title="Edit">
                ✏️
              </button>
              <button @click="deleteTodo(todo.id)" class="delete-btn" title="Delete">
                🗑️
              </button>
            </div>
          </template>
          
          <!-- Edit Mode -->
          <template v-else>
            <input 
              v-model="editText"
              @keyup.enter="saveEdit(todo)"
              @keyup.esc="cancelEdit"
              @blur="saveEdit(todo)"
              class="edit-input"
              ref="editInput"
            />
            <button @click="saveEdit(todo)" class="save-btn">💾</button>
            <button @click="cancelEdit" class="cancel-btn">❌</button>
          </template>
          
          <span class="todo-date">
            {{ formatDate(todo.createdAt) }}
          </span>
        </div>
      </transition-group>
    </div>
    
    <!-- Footer Actions -->
    <div class="footer-actions" v-if="todos.length > 0">
      <button 
        @click="clearCompleted"
        :disabled="stats.completed === 0"
        class="clear-btn"
      >
        Clear Completed ({{ stats.completed }})
      </button>
      
      <button @click="deleteAll" class="danger-btn">
        Delete All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = 'all' | 'active' | 'completed'

// State
const todos = ref<Todo[]>([])
const newTodoText = ref('')
const currentFilter = ref<FilterType>('all')
const searchQuery = ref('')
const editingId = ref<number | null>(null)
const editText = ref('')
const showError = ref(false)
const filters: FilterType[] = ['all', 'active', 'completed']
let nextId = 1

// Computed: Filtered and searched todos
const filteredTodos = computed(() => {
  let result = todos.value
  
  // Apply status filter
  switch (currentFilter.value) {
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
  
  // Sort: incomplete first, then by creation date
  return result.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
})

// Computed: Statistics
const stats = computed(() => ({
  total: todos.value.length,
  active: todos.value.filter(t => !t.completed).length,
  completed: todos.value.filter(t => t.completed).length
}))

// Methods
const addTodo = () => {
  if (!newTodoText.value) {
    showError.value = true
    setTimeout(() => showError.value = false, 2000)
    return
  }
  
  todos.value.push({
    id: nextId++,
    text: newTodoText.value,
    completed: false,
    createdAt: new Date()
  })
  
  newTodoText.value = ''
  showError.value = false
}

const deleteTodo = (id: number) => {
  if (confirm('Delete this todo?')) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }
}

const startEdit = (todo: Todo) => {
  editingId.value = todo.id
  editText.value = todo.text
  
  // Focus input after render
  nextTick(() => {
    const input = document.querySelector('.edit-input') as HTMLInputElement
    input?.focus()
  })
}

const saveEdit = (todo: Todo) => {
  if (editText.value.trim()) {
    todo.text = editText.value.trim()
  }
  cancelEdit()
}

const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

const clearCompleted = () => {
  if (confirm(`Delete ${stats.value.completed} completed todos?`)) {
    todos.value = todos.value.filter(t => !t.completed)
  }
}

const deleteAll = () => {
  if (confirm('Delete ALL todos? This cannot be undone!')) {
    todos.value = []
  }
}

const formatDate = (date: Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch: Save to localStorage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
    console.log('💾 Saved to localStorage:', newTodos.length, 'todos')
  },
  { deep: true }
)

// Watch: Log filter changes
watch(currentFilter, (newFilter) => {
  console.log('🔍 Filter changed to:', newFilter)
})

// Load from localStorage on mount
const loadTodos = () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      todos.value = parsed.map((t: Todo) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      }))
      
      // Update nextId
      if (todos.value.length > 0) {
        nextId = Math.max(...todos.value.map(t => t.id)) + 1
      }
      
      console.log('📥 Loaded from localStorage:', todos.value.length, 'todos')
    } catch (error) {
      console.error('Error loading todos:', error)
    }
  }
}

loadTodos()
</script>

<style scoped>
.todo-app {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  color: #42b883;
  margin: 0;
  font-size: 36px;
}

.app-header p {
  color: #666;
  margin: 5px 0 0;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  position: relative;
}

.todo-input {
  flex: 1;
  padding: 14px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #42b883;
}

.todo-input.error {
  border-color: #f44336;
}

.error-message {
  position: absolute;
  bottom: -20px;
  left: 0;
  color: #f44336;
  font-size: 12px;
}

.add-btn {
  padding: 14px 24px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #35495e;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.filters {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #42b883;
}

.filter-btn.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.search-input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  width: 200px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.stat-item {
  padding: 5px 10px;
  border-radius: 4px;
}

.stat-item.active {
  background: #e3f2fd;
  color: #1976d2;
}

.stat-item.completed {
  background: #e8f5e9;
  color: #4caf50;
}

.todo-list {
  min-height: 200px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  border-color: #42b883;
  transform: translateX(5px);
}

.todo-item.completed {
  opacity: 0.6;
  background: #f5f5f5;
}

.todo-item.editing {
  background: #fff3e0;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn,
.save-btn,
.cancel-btn {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #f5f5f5;
  transition: all 0.3s;
}

.edit-btn:hover {
  background: #e3f2fd;
}

.delete-btn:hover {
  background: #ffebee;
}

.edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #42b883;
  border-radius: 4px;
  font-size: 16px;
}

.todo-date {
  font-size: 12px;
  color: #999;
}

.footer-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  justify-content: center;
}

.clear-btn,
.danger-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.clear-btn {
  background: #e0e0e0;
  color: #333;
}

.clear-btn:hover:not(:disabled) {
  background: #bdbdbd;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.danger-btn {
  background: #f44336;
  color: white;
}

.danger-btn:hover {
  background: #d32f2f;
}

/* Animations */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
