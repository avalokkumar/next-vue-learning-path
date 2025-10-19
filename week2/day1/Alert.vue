<template>
  <div class="alert" :class="`alert--${type}`">
    <div class="alert__icon">{{ icon }}</div>
    <div class="alert__content">
      <p class="alert__message">{{ message }}</p>
    </div>
    <button @click="handleClose" class="alert__close">×</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const icon = computed(() => {
  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  }
  return icons[props.type]
})

const handleClose = () => {
  emit('close')
  console.log('Alert closed')
}
</script>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.alert--success {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.alert--warning {
  background: #fff3e0;
  border-color: #ff9800;
  color: #e65100;
}

.alert--error {
  background: #ffebee;
  border-color: #f44336;
  color: #c62828;
}

.alert--info {
  background: #e3f2fd;
  border-color: #2196f3;
  color: #1565c0;
}

.alert__icon {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.alert__content {
  flex: 1;
}

.alert__message {
  margin: 0;
  font-weight: 500;
}

.alert__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.alert__close:hover {
  opacity: 1;
}
</style>
