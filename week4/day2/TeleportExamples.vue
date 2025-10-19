<template>
  <div class="teleport-examples">
    <h1>Teleport & Suspense Examples</h1>
    
    <!-- Example 1: Basic Modal -->
    <section class="example">
      <h2>1. Modal with Teleport</h2>
      <button @click="showModal = true">Open Modal</button>
      
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
            <div class="modal-container">
              <h3>Welcome to the Modal!</h3>
              <p>This modal is teleported to the body element.</p>
              <button @click="showModal = false">Close</button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </section>
    
    <!-- Example 2: Notification Toast -->
    <section class="example">
      <h2>2. Notification Toast</h2>
      <button @click="showNotification">Show Notification</button>
      
      <Teleport to="body">
        <TransitionGroup name="toast" tag="div" class="toast-container">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="toast"
            :class="`toast-${notification.type}`"
          >
            {{ notification.message }}
            <button @click="removeNotification(notification.id)" class="toast-close">×</button>
          </div>
        </TransitionGroup>
      </Teleport>
    </section>
    
    <!-- Example 3: Tooltip -->
    <section class="example">
      <h2>3. Tooltip</h2>
      <div class="tooltip-demo">
        <button
          @mouseenter="showTooltip($event, 'This is a tooltip!')"
          @mouseleave="hideTooltip"
        >
          Hover me
        </button>
        
        <button
          @mouseenter="showTooltip($event, 'Another tooltip here')"
          @mouseleave="hideTooltip"
        >
          Hover me too
        </button>
      </div>
      
      <Teleport to="body">
        <div v-if="tooltip.visible" class="tooltip" :style="tooltipStyle">
          {{ tooltip.text }}
        </div>
      </Teleport>
    </section>
    
    <!-- Example 4: Drawer -->
    <section class="example">
      <h2>4. Drawer/Sidebar</h2>
      <button @click="showDrawer = true">Open Drawer</button>
      
      <Teleport to="body">
        <Transition name="drawer">
          <div v-if="showDrawer" class="drawer-mask" @click.self="showDrawer = false">
            <div class="drawer">
              <h3>Drawer Menu</h3>
              <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
              </ul>
              <button @click="showDrawer = false">Close</button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Modal
const showModal = ref(false)

// Notifications
interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const notifications = ref<Notification[]>([])
let notificationId = 1

function showNotification() {
  const types: Array<'success' | 'error' | 'info'> = ['success', 'error', 'info']
  const type = types[Math.floor(Math.random() * types.length)]
  
  const notification: Notification = {
    id: notificationId++,
    message: `This is a ${type} notification!`,
    type
  }
  
  notifications.value.push(notification)
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    removeNotification(notification.id)
  }, 3000)
}

function removeNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

// Tooltip
const tooltip = ref({
  visible: false,
  text: '',
  x: 0,
  y: 0
})

function showTooltip(event: MouseEvent, text: string) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  tooltip.value = {
    visible: true,
    text,
    x: rect.left + rect.width / 2,
    y: rect.bottom + 8
  }
}

function hideTooltip() {
  tooltip.value.visible = false
}

const tooltipStyle = computed(() => ({
  top: `${tooltip.value.y}px`,
  left: `${tooltip.value.x}px`,
  transform: 'translateX(-50%)'
}))

// Drawer
const showDrawer = ref(false)
</script>

<style scoped>
.teleport-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 3rem;
}

.example {
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #35495e;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  margin: 0.5rem 0.5rem 0 0;
}

button:hover {
  background: #35495e;
}

.tooltip-demo {
  display: flex;
  gap: 1rem;
}
</style>

<style>
/* Modal Styles (global) */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-container h3 {
  margin-top: 0;
  color: #42b883;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 250px;
}

.toast-success {
  border-left: 4px solid #4CAF50;
}

.toast-error {
  border-left: 4px solid #F44336;
}

.toast-info {
  border-left: 4px solid #2196F3;
}

.toast-close {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s;
}

/* Tooltip */
.tooltip {
  position: fixed;
  background: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 10000;
  pointer-events: none;
}

.tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-bottom-color: #333;
}

/* Drawer */
.drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background: white;
  padding: 2rem;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
}

.drawer h3 {
  margin-top: 0;
  color: #42b883;
}

.drawer ul {
  list-style: none;
  padding: 0;
}

.drawer li {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s;
}

.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.3s;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}
</style>
