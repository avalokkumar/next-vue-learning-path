<template>
  <div class="transition-examples">
    <h1>Vue Transitions & Animations</h1>
    
    <!-- Example 1: Fade -->
    <section class="example">
      <h2>1. Fade Transition</h2>
      <button @click="showFade = !showFade">Toggle Fade</button>
      <Transition name="fade">
        <div v-if="showFade" class="box">Fade In/Out</div>
      </Transition>
    </section>
    
    <!-- Example 2: Slide -->
    <section class="example">
      <h2>2. Slide Transition</h2>
      <button @click="showSlide = !showSlide">Toggle Slide</button>
      <Transition name="slide">
        <div v-if="showSlide" class="box">Slide In/Out</div>
      </Transition>
    </section>
    
    <!-- Example 3: Scale -->
    <section class="example">
      <h2>3. Scale Transition</h2>
      <button @click="showScale = !showScale">Toggle Scale</button>
      <Transition name="scale">
        <div v-if="showScale" class="box">Scale In/Out</div>
      </Transition>
    </section>
    
    <!-- Example 4: Bounce -->
    <section class="example">
      <h2>4. Bounce Animation</h2>
      <button @click="showBounce = !showBounce">Toggle Bounce</button>
      <Transition name="bounce">
        <div v-if="showBounce" class="box">Bounce!</div>
      </Transition>
    </section>
    
    <!-- Example 5: List Transitions -->
    <section class="example">
      <h2>5. List Transitions</h2>
      <div class="controls">
        <button @click="addItem">Add Item</button>
        <button @click="removeItem">Remove Item</button>
        <button @click="shuffle">Shuffle</button>
      </div>
      <TransitionGroup name="list" tag="ul" class="list">
        <li v-for="item in items" :key="item.id" class="list-item">
          {{ item.text }}
          <button @click="removeSpecific(item.id)" class="remove-btn">×</button>
        </li>
      </TransitionGroup>
    </section>
    
    <!-- Example 6: Mode out-in -->
    <section class="example">
      <h2>6. Transition Mode (out-in)</h2>
      <div class="controls">
        <button @click="currentView = 'view1'">View 1</button>
        <button @click="currentView = 'view2'">View 2</button>
        <button @click="currentView = 'view3'">View 3</button>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="currentView === 'view1'" class="view" key="view1">
          <h3>View 1</h3>
          <p>This is the first view</p>
        </div>
        <div v-else-if="currentView === 'view2'" class="view" key="view2">
          <h3>View 2</h3>
          <p>This is the second view</p>
        </div>
        <div v-else class="view" key="view3">
          <h3>View 3</h3>
          <p>This is the third view</p>
        </div>
      </Transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Simple toggles
const showFade = ref(true)
const showSlide = ref(true)
const showScale = ref(true)
const showBounce = ref(true)

// List items
const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' }
])

let nextId = 4

function addItem() {
  items.value.push({
    id: nextId++,
    text: `Item ${nextId - 1}`
  })
}

function removeItem() {
  if (items.value.length > 0) {
    items.value.pop()
  }
}

function removeSpecific(id: number) {
  items.value = items.value.filter(item => item.id !== id)
}

function shuffle() {
  items.value = items.value.sort(() => Math.random() - 0.5)
}

// View switcher
const currentView = ref('view1')
</script>

<style scoped>
.transition-examples {
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

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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
  transition: background 0.3s;
}

button:hover {
  background: #35495e;
}

.box {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Scale Transition */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* Bounce Animation */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* List Transitions */
.list {
  list-style: none;
  padding: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: #f5f5f5;
  border-radius: 6px;
  transition: background 0.3s;
}

.list-item:hover {
  background: #e0e0e0;
}

.remove-btn {
  padding: 0.25rem 0.75rem;
  background: #f44336;
  font-size: 1.5rem;
  line-height: 1;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Smooth move for list reordering */
.list-move {
  transition: transform 0.5s ease;
}

/* View Container */
.view {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 1rem;
}

.view h3 {
  color: #42b883;
  margin-top: 0;
}
</style>
