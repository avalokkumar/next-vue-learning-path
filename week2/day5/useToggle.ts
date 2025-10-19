import { ref } from 'vue'

export function useToggle(initialValue = false) {
  const isOn = ref(initialValue)
  
  const toggle = () => {
    isOn.value = !isOn.value
  }
  
  const setOn = () => {
    isOn.value = true
  }
  
  const setOff = () => {
    isOn.value = false
  }
  
  return {
    isOn,
    toggle,
    setOn,
    setOff
  }
}
