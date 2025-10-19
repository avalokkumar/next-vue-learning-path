<template>
  <div class="pinia-examples">
    <h1>Pinia Store Examples</h1>
    
    <!-- Counter Store Example -->
    <section class="example-section">
      <h2>1. Counter Store</h2>
      <div class="counter-demo">
        <div class="display">
          <p class="count">{{ counter.count }}</p>
          <p class="info">Double: {{ counter.doubleCount }}</p>
          <p class="info">Is Even: {{ counter.isEven ? 'Yes ✓' : 'No ✗' }}</p>
          <p class="info">Is Positive: {{ counter.isPositive ? 'Yes ✓' : 'No ✗' }}</p>
        </div>
        
        <div class="controls">
          <button @click="counter.decrement">-1</button>
          <button @click="counter.incrementBy(5)">+5</button>
          <button @click="counter.increment">+1</button>
          <button @click="counter.reset">Reset</button>
          <button @click="counter.undo" :disabled="counter.history.length === 0">
            Undo
          </button>
        </div>
        
        <p class="history">History: {{ counter.history.join(', ') || 'None' }}</p>
      </div>
    </section>
    
    <!-- User Store Example -->
    <section class="example-section">
      <h2>2. User Store</h2>
      <div class="user-demo">
        <div v-if="!user.isLoggedIn" class="login-form">
          <h3>Login</h3>
          <input v-model="loginForm.name" placeholder="Name" />
          <input v-model="loginForm.email" placeholder="Email" type="email" />
          <select v-model="loginForm.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button @click="handleLogin">Login</button>
        </div>
        
        <div v-else class="user-info">
          <h3>Welcome, {{ user.userName }}!</h3>
          <p>Email: {{ user.user?.email }}</p>
          <p>Role: {{ user.user?.role }}</p>
          <p>Is Admin: {{ user.isAdmin ? 'Yes ✓' : 'No ✗' }}</p>
          <button @click="user.logout">Logout</button>
        </div>
      </div>
    </section>
    
    <!-- Todo Store Example -->
    <section class="example-section">
      <h2>3. Todo Store</h2>
      <div class="todo-demo">
        <div class="todo-input">
          <input 
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="Add a new todo..."
          />
          <button @click="addTodo">Add</button>
        </div>
        
        <div class="todo-filters">
          <button 
            v-for="f in ['all', 'active', 'completed']" 
            :key="f"
            @click="todos.setFilter(f as any)"
            :class="{ active: todos.filter === f }"
          >
            {{ f }}
          </button>
        </div>
        
        <div class="todo-stats">
          <p>Total: {{ todos.stats.total }}</p>
          <p>Active: {{ todos.stats.active }}</p>
          <p>Completed: {{ todos.stats.completed }} ({{ todos.stats.percentage }}%)</p>
        </div>
        
        <div class="todo-list">
          <div 
            v-for="todo in todos.filteredTodos" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <input 
              type="checkbox"
              :checked="todo.completed"
              @change="todos.toggleTodo(todo.id)"
            />
            <span>{{ todo.text }}</span>
            <button @click="todos.deleteTodo(todo.id)" class="delete-btn">×</button>
          </div>
        </div>
        
        <button 
          v-if="todos.stats.completed > 0"
          @click="todos.clearCompleted"
          class="clear-btn"
        >
          Clear Completed
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from './stores/counter'
import { useUserStore } from './stores/user'
import { useTodoStore } from './stores/todos'

// Stores
const counter = useCounterStore()
const user = useUserStore()
const todos = useTodoStore()

// Login form
const loginForm = ref({
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin' as 'admin' | 'user'
})

const handleLogin = () => {
  user.login(
    {
      id: Date.now(),
      name: loginForm.value.name,
      email: loginForm.value.email,
      role: loginForm.value.role
    },
    'fake-token-' + Date.now()
  )
}

// Todo input
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>

<style scoped>
.pinia-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 3rem;
}

.example-section {
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #35495e;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

/* Counter Styles */
.counter-demo {
  text-align: center;
}

.display {
  margin: 2rem 0;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #42b883;
  margin: 0;
}

.info {
  margin: 0.5rem 0;
  color: #666;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1.5rem 0;
}

button {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  background: #35495e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.history {
  color: #999;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* User Styles */
.user-demo {
  max-width: 400px;
  margin: 0 auto;
}

.login-form,
.user-info {
  text-align: center;
}

.login-form input,
.login-form select {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.user-info p {
  margin: 0.5rem 0;
  color: #666;
}

/* Todo Styles */
.todo-demo {
  max-width: 600px;
  margin: 0 auto;
}

.todo-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-input input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.todo-filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  justify-content: center;
}

.todo-filters button {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  color: #333;
}

.todo-filters button.active {
  background: #42b883;
  color: white;
}

.todo-stats {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 6px;
}

.todo-stats p {
  margin: 0;
  font-weight: 500;
}

.todo-list {
  margin: 1.5rem 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 6px;
  margin: 0.5rem 0;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed span {
  text-decoration: line-through;
}

.todo-item span {
  flex: 1;
}

.delete-btn {
  background: #f44336;
  padding: 0.25rem 0.75rem;
  font-size: 1.5rem;
  line-height: 1;
}

.clear-btn {
  width: 100%;
  margin-top: 1rem;
  background: #ff9800;
}
</style>
