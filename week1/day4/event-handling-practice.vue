<template>
  <div class="events-demo">
    <h2>Event Handling Practice</h2>
    
    <!-- Click Events -->
    <section class="demo-section">
      <h3>1. Click Events</h3>
      <div class="counter">
        <button @click="count++">Simple Click ({{ count }})</button>
        <button @click="handleClick">Method Handler</button>
        <button @click="greet('Vue.js')">With Parameter</button>
      </div>
    </section>
    
    <!-- Event Modifiers -->
    <section class="demo-section">
      <h3>2. Event Modifiers</h3>
      
      <!-- .stop -->
      <div class="modifier-demo" @click="parentClick">
        Parent (click me)
        <button @click.stop="childClick">Child with .stop</button>
        <button @click="childClick">Child without .stop</button>
      </div>
      
      <!-- .prevent -->
      <form @submit.prevent="handleSubmit">
        <input v-model="formData" placeholder="Try submit" />
        <button type="submit">Submit (.prevent)</button>
      </form>
      
      <!-- .once -->
      <button @click.once="initOnce">Click Only Once</button>
    </section>
    
    <!-- Keyboard Events -->
    <section class="demo-section">
      <h3>3. Keyboard Events</h3>
      <input 
        @keyup.enter="handleEnter"
        @keyup.esc="handleEscape"
        @keyup.delete="handleDelete"
        v-model="keyboardInput"
        placeholder="Try Enter, Esc, Delete"
        class="keyboard-input"
      />
      <p>{{ keyMessage }}</p>
      
      <!-- Arrow Keys -->
      <div 
        class="arrow-box"
        tabindex="0"
        @keyup.up="moveBox('up')"
        @keyup.down="moveBox('down')"
        @keyup.left="moveBox('left')"
        @keyup.right="moveBox('right')"
      >
        <div 
          class="movable-box"
          :style="{ top: boxY + 'px', left: boxX + 'px' }"
        >
          Use Arrow Keys ⌨️
        </div>
      </div>
    </section>
    
    <!-- Mouse Events -->
    <section class="demo-section">
      <h3>4. Mouse Events</h3>
      
      <!-- Hover -->
      <div 
        class="hover-box"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        :class="{ hovered: isHovered }"
      >
        {{ isHovered ? 'Hovering! 🎉' : 'Hover over me' }}
      </div>
      
      <!-- Mouse Position -->
      <div 
        class="track-mouse"
        @mousemove="trackMouse"
      >
        Mouse Position: X={{ mouseX }}, Y={{ mouseY }}
      </div>
      
      <!-- Double Click -->
      <button @dblclick="handleDoubleClick">
        Double Click Me ({{ doubleClickCount }})
      </button>
      
      <!-- Right Click -->
      <div 
        class="context-menu-box"
        @contextmenu.prevent="showContextMenu"
      >
        Right click me ({{ contextMenuText }})
      </div>
    </section>
    
    <!-- Input Events -->
    <section class="demo-section">
      <h3>5. Input Events</h3>
      
      <!-- @input (real-time) -->
      <div>
        <label>Type something (@input):</label>
        <input @input="handleInput" placeholder="Real-time tracking" />
        <p>Characters: {{ inputLength }}</p>
      </div>
      
      <!-- @change (on blur) -->
      <div>
        <label>Change event (@change):</label>
        <input @change="handleChange" placeholder="Fires on blur" />
        <p>{{ changeMessage }}</p>
      </div>
      
      <!-- Focus/Blur -->
      <div>
        <input 
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="Focus/Blur detection"
          :class="{ focused: isFocused }"
        />
        <span v-if="isFocused" class="focus-indicator">Focused!</span>
      </div>
    </section>
    
    <!-- Advanced: Counter with Multiple Controls -->
    <section class="demo-section">
      <h3>6. Interactive Counter</h3>
      <div class="interactive-counter">
        <h4>Counter: {{ advancedCount }}</h4>
        <div class="counter-controls">
          <button @click="advancedCount++">+ (Click)</button>
          <button @click="advancedCount--">- (Click)</button>
          <button @dblclick="advancedCount += 10">+10 (DblClick)</button>
          <button @click.once="advancedCount = 0">Reset (Once)</button>
        </div>
        <p>Keyboard: ↑ increment, ↓ decrement, R reset</p>
        <input 
          @keyup.up="advancedCount++"
          @keyup.down="advancedCount--"
          @keyup.r="advancedCount = 0"
          placeholder="Focus & use keyboard"
          class="keyboard-control"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Click Events
const count = ref(0)

const handleClick = () => {
  alert('Method handler called!')
}

const greet = (name: string) => {
  alert(`Hello, ${name}!`)
}

// Event Modifiers
const parentClick = () => {
  console.log('Parent clicked')
}

const childClick = () => {
  console.log('Child clicked')
}

const formData = ref('')
const handleSubmit = () => {
  alert(`Form submitted: ${formData.value}`)
}

const initOnce = () => {
  alert('This only fires once!')
}

// Keyboard Events
const keyboardInput = ref('')
const keyMessage = ref('Press a key...')

const handleEnter = () => {
  keyMessage.value = `Enter pressed! Value: ${keyboardInput.value}`
}

const handleEscape = () => {
  keyboardInput.value = ''
  keyMessage.value = 'Escaped! Input cleared.'
}

const handleDelete = () => {
  keyMessage.value = 'Delete key pressed'
}

// Arrow Keys - Move Box
const boxX = ref(150)
const boxY = ref(100)

const moveBox = (direction: string) => {
  const step = 10
  switch (direction) {
    case 'up':
      boxY.value = Math.max(0, boxY.value - step)
      break
    case 'down':
      boxY.value = Math.min(150, boxY.value + step)
      break
    case 'left':
      boxX.value = Math.max(0, boxX.value - step)
      break
    case 'right':
      boxX.value = Math.min(250, boxX.value + step)
      break
  }
}

// Mouse Events
const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const trackMouse = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = Math.floor(event.clientX - rect.left)
  mouseY.value = Math.floor(event.clientY - rect.top)
}

const doubleClickCount = ref(0)
const handleDoubleClick = () => {
  doubleClickCount.value++
}

const contextMenuText = ref('Not clicked')
const showContextMenu = () => {
  contextMenuText.value = 'Right clicked!'
  setTimeout(() => {
    contextMenuText.value = 'Not clicked'
  }, 2000)
}

// Input Events
const inputLength = ref(0)
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputLength.value = target.value.length
}

const changeMessage = ref('Type and blur...')
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  changeMessage.value = `Changed to: ${target.value}`
}

const isFocused = ref(false)

// Advanced Counter
const advancedCount = ref(0)
</script>

<style scoped>
.events-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #42b883;
  text-align: center;
  margin-bottom: 30px;
}

.demo-section {
  margin: 30px 0;
  padding: 25px;
  background: #f9f9f9;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

h3 {
  color: #35495e;
  margin-top: 0;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

button:hover {
  background: #35495e;
  transform: translateY(-2px);
}

.counter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modifier-demo {
  padding: 20px;
  background: #e3f2fd;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
}

form {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

.keyboard-input {
  width: 100%;
  margin: 10px 0;
  font-size: 16px;
}

.arrow-box {
  width: 400px;
  height: 250px;
  background: #f5f5f5;
  border: 2px dashed #42b883;
  border-radius: 8px;
  margin: 20px 0;
  position: relative;
  outline: none;
}

.movable-box {
  position: absolute;
  width: 100px;
  height: 50px;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.1s ease;
  font-size: 12px;
}

.hover-box {
  padding: 40px;
  background: #e0e0e0;
  text-align: center;
  border-radius: 8px;
  margin: 15px 0;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 18px;
}

.hover-box.hovered {
  background: #42b883;
  color: white;
  transform: scale(1.05);
}

.track-mouse {
  padding: 60px;
  background: #f0f0f0;
  text-align: center;
  border-radius: 8px;
  margin: 15px 0;
  font-family: monospace;
  font-size: 18px;
  cursor: crosshair;
}

.context-menu-box {
  padding: 40px;
  background: #fff3e0;
  text-align: center;
  border-radius: 8px;
  cursor: context-menu;
  font-size: 16px;
  margin: 15px 0;
}

input.focused {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.focus-indicator {
  color: #4caf50;
  font-weight: bold;
  margin-left: 10px;
}

.interactive-counter {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 3px solid #42b883;
}

.interactive-counter h4 {
  font-size: 36px;
  color: #42b883;
  margin: 10px 0;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.keyboard-control {
  width: 300px;
  margin-top: 10px;
  text-align: center;
}

label {
  display: block;
  margin: 15px 0 5px;
  font-weight: 500;
  color: #35495e;
}

p {
  margin: 10px 0;
  color: #666;
}
</style>
