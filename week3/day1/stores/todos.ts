import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export const useTodoStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')
  
  // Load from localStorage
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved, (key, value) => {
      if (key === 'createdAt') return new Date(value)
      return value
    })
  }
  
  // Persist to localStorage
  watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }, { deep: true })
  
  // Getters
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  })
  
  const stats = computed(() => ({
    total: todos.value.length,
    active: todos.value.filter(t => !t.completed).length,
    completed: todos.value.filter(t => t.completed).length,
    percentage: todos.value.length > 0 
      ? Math.round((todos.value.filter(t => t.completed).length / todos.value.length) * 100)
      : 0
  }))
  
  // Actions
  function addTodo(text: string) {
    if (!text.trim()) return
    
    todos.value.push({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    })
  }
  
  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  function updateTodo(id: number, text: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.text = text
    }
  }
  
  function setFilter(newFilter: typeof filter.value) {
    filter.value = newFilter
  }
  
  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
  }
  
  return {
    // State
    todos,
    filter,
    // Getters
    filteredTodos,
    stats,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    clearCompleted
  }
})
