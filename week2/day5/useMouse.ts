import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  const updateMouse = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })
  
  return { x, y }
}
