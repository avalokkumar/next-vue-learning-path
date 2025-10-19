<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <p>Welcome to Vue 3!</p>
    
    <div class="user-info">
      <h2>User Information</h2>
      <p>Name: {{ userName }}</p>
      <p>Age: {{ userAge }}</p>
      <button @click="incrementAge">Increase Age</button>
    </div>
    
    <div class="counter">
      <h2>Counter: {{ count }}</h2>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive data using ref()
const title = ref('My First Vue App')
const userName = ref('John Doe')
const userAge = ref(25)
const count = ref(0)

// Methods
const incrementAge = () => {
  userAge.value++
}

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}
</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #42b883;
  text-align: center;
}

.user-info, .counter {
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #35495e;
}

p {
  font-size: 18px;
  margin: 10px 0;
}
</style>
