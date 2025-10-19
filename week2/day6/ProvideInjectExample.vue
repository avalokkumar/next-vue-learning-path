<template>
  <div class="provide-inject-demo">
    <h1>Provide/Inject Example</h1>
    
    <div class="controls">
      <button @click="toggleTheme">Toggle Theme</button>
      <button @click="changeUser">Change User</button>
    </div>
    
    <div class="info">
      <p>Current Theme: {{ theme }}</p>
      <p>Current User: {{ user.name }} ({{ user.role }})</p>
    </div>
    
    <div class="components">
      <ChildComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import ChildComponent from './ChildComponent.vue'
import { ThemeKey, UserKey } from './keys'

interface User {
  name: string
  role: string
}

const theme = ref('light')
const user = ref<User>({ name: 'Alice', role: 'admin' })

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const changeUser = () => {
  user.value = user.value.name === 'Alice'
    ? { name: 'Bob', role: 'user' }
    : { name: 'Alice', role: 'admin' }
}

// Provide to all descendants
provide(ThemeKey, theme)
provide(UserKey, user)
provide('toggleTheme', toggleTheme)
</script>

<style scoped>
.provide-inject-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.controls {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.info {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.components {
  margin-top: 2rem;
}
</style>
