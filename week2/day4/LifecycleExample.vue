<template>
  <div class="lifecycle-demo">
    <h2>Lifecycle Hooks Demo</h2>
    
    <div class="log-container">
      <h3>Lifecycle Events Log:</h3>
      <div class="logs">
        <div v-for="(log, index) in logs" :key="index" class="log-entry">
          <span class="timestamp">{{ log.time }}</span>
          <span class="hook-name">{{ log.hook }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>
    </div>
    
    <div class="components">
      <button @click="showCounter = !showCounter">
        {{ showCounter ? 'Hide' : 'Show' }} Counter
      </button>
      
      <Transition name="fade">
        <Counter v-if="showCounter" @lifecycle-event="addLog" />
      </Transition>
      
      <button @click="showTimer = !showTimer">
        {{ showTimer ? 'Hide' : 'Show' }} Timer
      </button>
      
      <Transition name="fade">
        <Timer v-if="showTimer" @lifecycle-event="addLog" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Counter from './Counter.vue'
import Timer from './Timer.vue'

interface Log {
  time: string
  hook: string
  message: string
}

const logs = ref<Log[]>([])
const showCounter = ref(true)
const showTimer = ref(true)

const addLog = (hook: string, message: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.push({ time, hook, message })
  
  // Keep only last 20 logs
  if (logs.value.length > 20) {
    logs.value.shift()
  }
}
</script>

<style scoped>
.lifecycle-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #42b883;
  margin-bottom: 2rem;
}

.log-container {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.log-container h3 {
  color: #42b883;
  margin-top: 0;
}

.logs {
  max-height: 300px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.log-entry {
  padding: 0.5rem;
  border-bottom: 1px solid #333;
  display: grid;
  grid-template-columns: 100px 150px 1fr;
  gap: 1rem;
}

.timestamp {
  color: #808080;
}

.hook-name {
  color: #4ec9b0;
  font-weight: bold;
}

.message {
  color: #ce9178;
}

.components {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

button {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background: #35495e;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
