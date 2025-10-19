import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const history = ref<number[]>([])
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  const isPositive = computed(() => count.value > 0)
  
  // Actions
  function increment() {
    history.value.push(count.value)
    count.value++
  }
  
  function decrement() {
    history.value.push(count.value)
    count.value--
  }
  
  function incrementBy(amount: number) {
    history.value.push(count.value)
    count.value += amount
  }
  
  function reset() {
    history.value.push(count.value)
    count.value = 0
  }
  
  function undo() {
    if (history.value.length > 0) {
      count.value = history.value.pop()!
    }
  }
  
  return {
    // State
    count,
    history,
    // Getters
    doubleCount,
    isEven,
    isPositive,
    // Actions
    increment,
    decrement,
    incrementBy,
    reset,
    undo
  }
})
