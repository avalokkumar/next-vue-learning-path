<template>
  <div class="counter">
    <h3 class="counter__title">{{ title }}</h3>
    <div class="counter__display">
      <span class="counter__value">{{ count }}</span>
    </div>
    <div class="counter__controls">
      <button @click="decrement" class="counter__btn counter__btn--minus">
        -
      </button>
      <button @click="reset" class="counter__btn counter__btn--reset">
        Reset
      </button>
      <button @click="increment" class="counter__btn counter__btn--plus">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0
})

const count = ref(props.initialCount)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = props.initialCount
}
</script>

<style scoped>
.counter {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.counter__title {
  margin: 0 0 1rem;
  color: #35495e;
  font-size: 1.2rem;
}

.counter__display {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
}

.counter__value {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.counter__controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.counter__btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.counter__btn--minus {
  background: #f44336;
  color: white;
}

.counter__btn--minus:hover {
  background: #d32f2f;
  transform: scale(1.05);
}

.counter__btn--reset {
  background: #f5f5f5;
  color: #333;
}

.counter__btn--reset:hover {
  background: #e0e0e0;
}

.counter__btn--plus {
  background: #42b883;
  color: white;
}

.counter__btn--plus:hover {
  background: #35495e;
  transform: scale(1.05);
}
</style>
