<template>
  <div class="counter">
    <h3>Counter Component</h3>
    <div class="display">{{ count }}</div>
    <div class="controls">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeMount, onBeforeUnmount, watch } from 'vue'

const emit = defineEmits<{
  'lifecycle-event': [hook: string, message: string]
}>()

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}

// Watch count changes
watch(count, (newVal) => {
  emit('lifecycle-event', 'watch', `Counter value changed to ${newVal}`)
})

// Lifecycle hooks
onBeforeMount(() => {
  emit('lifecycle-event', 'onBeforeMount', 'Counter: Before mounting')
})

onMounted(() => {
  emit('lifecycle-event', 'onMounted', 'Counter: Component mounted!')
  
  // Simulate fetching initial data
  setTimeout(() => {
    emit('lifecycle-event', 'onMounted', 'Counter: Data fetch complete')
  }, 500)
})

onBeforeUnmount(() => {
  emit('lifecycle-event', 'onBeforeUnmount', 'Counter: About to unmount')
})

onUnmounted(() => {
  emit('lifecycle-event', 'onUnmounted', 'Counter: Successfully unmounted')
  console.log('Counter component destroyed')
})
</script>

<style scoped>
.counter {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 250px;
}

h3 {
  margin: 0 0 1rem;
  color: #35495e;
}

.display {
  font-size: 4rem;
  font-weight: bold;
  color: #667eea;
  margin: 1.5rem 0;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  background: #667eea;
  color: white;
  transition: all 0.3s;
}

button:hover {
  background: #764ba2;
  transform: scale(1.05);
}
</style>
