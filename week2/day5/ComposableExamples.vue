<template>
  <div class="composables-demo">
    <h1>Composables Examples</h1>
    
    <!-- Example 1: Counter -->
    <section>
      <h2>1. useCounter</h2>
      <div class="counter">
        <p>Count: {{ count }}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="reset">Reset</button>
      </div>
    </section>
    
    <!-- Example 2: Toggle -->
    <section>
      <h2>2. useToggle</h2>
      <div class="toggle">
        <p>State: {{ isOn ? 'ON' : 'OFF' }}</p>
        <button @click="toggle">Toggle</button>
      </div>
    </section>
    
    <!-- Example 3: Mouse Position -->
    <section>
      <h2>3. useMouse</h2>
      <div class="mouse-tracker">
        <p>Mouse Position: X={{ x }}, Y={{ y }}</p>
      </div>
    </section>
    
    <!-- Example 4: LocalStorage -->
    <section>
      <h2>4. useLocalStorage</h2>
      <input v-model="name" placeholder="Enter your name" />
      <p>Saved: {{ name }} (persists across reloads)</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from './useCounter'
import { useToggle } from './useToggle'
import { useMouse } from './useMouse'
import { useLocalStorage } from './useLocalStorage'

// Use composables
const { count, increment, decrement, reset } = useCounter(0)
const { isOn, toggle } = useToggle()
const { x, y } = useMouse()
const name = useLocalStorage('user-name', '')
</script>

<style scoped>
.composables-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin: 2rem 0;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

h2 {
  color: #42b883;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35495e;
}

input {
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.mouse-tracker {
  padding: 2rem;
  background: white;
  border-radius: 6px;
  text-align: center;
}
</style>
