<template>
  <div class="counter">
    <h3>Smart Counter</h3>
    <div class="display">{{ count }}</div>
    <div class="controls">
      <button @click="decrement" :disabled="count <= min">-{{ step }}</button>
      <button @click="reset">Reset</button>
      <button @click="increment" :disabled="count >= max">+{{ step }}</button>
    </div>
    <small>Range: {{ min }} - {{ max }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  initialValue?: number
  step?: number
  max?: number
  min?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: 0,
  step: 1,
  max: 100,
  min: 0
})

const emit = defineEmits<{
  change: [value: number]
  'max-reached': [max: number]
  'min-reached': [min: number]
}>()

const count = ref(props.initialValue)

const increment = () => {
  if (count.value + props.step <= props.max) {
    count.value += props.step
  } else {
    count.value = props.max
    emit('max-reached', props.max)
  }
}

const decrement = () => {
  if (count.value - props.step >= props.min) {
    count.value -= props.step
  } else {
    count.value = props.min
    emit('min-reached', props.min)
  }
}

const reset = () => {
  count.value = props.initialValue
}

watch(count, (newVal) => {
  emit('change', newVal)
})
</script>

<style scoped>
.counter {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.display {
  font-size: 3rem;
  font-weight: bold;
  color: #42b883;
  margin: 1rem 0;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #42b883;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover:not(:disabled) {
  background: #35495e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

small {
  color: #666;
}
</style>
