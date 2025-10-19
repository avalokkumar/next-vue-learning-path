<template>
  <div class="timer">
    <h3>Timer Component</h3>
    <div class="display">{{ formattedTime }}</div>
    <div class="controls">
      <button @click="toggleTimer" :class="{ active: isRunning }">
        {{ isRunning ? 'Pause' : 'Start' }}
      </button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue'

const emit = defineEmits<{
  'lifecycle-event': [hook: string, message: string]
}>()

const seconds = ref(0)
const isRunning = ref(false)
let intervalId: number | undefined

const formattedTime = computed(() => {
  const mins = Math.floor(seconds.value / 60)
  const secs = seconds.value % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

const toggleTimer = () => {
  isRunning.value = !isRunning.value
  
  if (isRunning.value) {
    intervalId = setInterval(() => {
      seconds.value++
    }, 1000)
    emit('lifecycle-event', 'Timer', 'Timer started')
  } else {
    clearInterval(intervalId)
    emit('lifecycle-event', 'Timer', 'Timer paused')
  }
}

const reset = () => {
  clearInterval(intervalId)
  seconds.value = 0
  isRunning.value = false
  emit('lifecycle-event', 'Timer', 'Timer reset')
}

// Lifecycle hooks
onBeforeMount(() => {
  emit('lifecycle-event', 'onBeforeMount', 'Timer: Before mounting')
  // Load saved time from localStorage
  const saved = localStorage.getItem('timer-seconds')
  if (saved) {
    seconds.value = parseInt(saved)
  }
})

onMounted(() => {
  emit('lifecycle-event', 'onMounted', 'Timer: Component mounted and ready')
  console.log('Timer mounted!')
})

onUpdated(() => {
  // Save to localStorage on every update
  localStorage.setItem('timer-seconds', seconds.value.toString())
})

onBeforeUnmount(() => {
  emit('lifecycle-event', 'onBeforeUnmount', 'Timer: About to be destroyed')
})

onUnmounted(() => {
  emit('lifecycle-event', 'onUnmounted', 'Timer: Cleanup completed')
  // Cleanup: Clear interval
  clearInterval(intervalId)
  console.log('Timer unmounted and cleaned up!')
})
</script>

<style scoped>
.timer {
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
  font-size: 3rem;
  font-weight: bold;
  color: #42b883;
  font-family: 'Courier New', monospace;
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
  cursor: pointer;
  background: #f5f5f5;
  color: #333;
  transition: all 0.3s;
}

button:hover {
  background: #e0e0e0;
}

button.active {
  background: #42b883;
  color: white;
}

button.active:hover {
  background: #35495e;
}
</style>
