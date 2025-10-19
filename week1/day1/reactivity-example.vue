<template>
  <div class="reactivity-demo">
    <h2>Vue Reactivity System Demo</h2>
    
    <!-- Reactive Primitive -->
    <div class="demo-section">
      <h3>1. Reactive Primitive (ref)</h3>
      <p>Count: {{ count }}</p>
      <button @click="count++">Increment</button>
    </div>
    
    <!-- Reactive Object -->
    <div class="demo-section">
      <h3>2. Reactive Object (reactive)</h3>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="updateUser">Update User</button>
    </div>
    
    <!-- Computed Property -->
    <div class="demo-section">
      <h3>3. Computed Property</h3>
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <p><strong>Full Name (Computed): {{ fullName }}</strong></p>
      <button @click="changeNames">Change Names</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 1. ref() - For primitive values
const count = ref(0)

// 2. reactive() - For objects
const user = reactive({
  name: 'Alice',
  email: 'alice@example.com'
})

// 3. Computed property - Derived state
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// Methods
const updateUser = () => {
  user.name = 'Bob'
  user.email = 'bob@example.com'
}

const changeNames = () => {
  firstName.value = 'Jane'
  lastName.value = 'Smith'
}
</script>

<style scoped>
.reactivity-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
}

h3 {
  color: #42b883;
  margin-top: 0;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #35495e;
}
</style>
