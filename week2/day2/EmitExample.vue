<template>
  <div class="emit-demo">
    <h2>Emit Examples</h2>
    
    <div class="counters">
      <Counter
        :initial-value="0"
        :step="1"
        @change="handleCounterChange"
        @max-reached="handleMaxReached"
      />
      
      <Counter
        :initial-value="50"
        :step="5"
        :max="100"
        :min="0"
        @change="handleCounterChange"
      />
    </div>
    
    <div class="log">
      <h3>Event Log:</h3>
      <div v-for="(log, index) in logs" :key="index" class="log-entry">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Counter from './Counter.vue'

const logs = ref<string[]>([])

const handleCounterChange = (value: number) => {
  logs.value.push(`Counter changed to: ${value}`)
}

const handleMaxReached = (max: number) => {
  logs.value.push(`Maximum value reached: ${max}`)
}
</script>

<style scoped>
.emit-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.counters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.log {
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.log-entry {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}
</style>
