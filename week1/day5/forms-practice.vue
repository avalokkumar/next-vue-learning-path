<template>
  <div class="forms-demo">
    <h2>Vue Forms Practice</h2>
    
    <!-- Text Inputs -->
    <div class="form-section">
      <h3>Text Inputs</h3>
      <input v-model="name" placeholder="Name" />
      <input v-model.lazy="email" type="email" placeholder="Email (lazy)" />
      <input v-model.number="age" type="number" placeholder="Age (number)" />
      <p>Name: {{ name }}, Email: {{ email }}, Age: {{ age }}</p>
    </div>
    
    <!-- Checkboxes -->
    <div class="form-section">
      <h3>Checkboxes</h3>
      <label><input type="checkbox" v-model="agreed" /> Agree to terms</label>
      <div>
        <label><input type="checkbox" v-model="skills" value="vue" /> Vue</label>
        <label><input type="checkbox" v-model="skills" value="react" /> React</label>
        <label><input type="checkbox" v-model="skills" value="angular" /> Angular</label>
      </div>
      <p>Skills: {{ skills }}</p>
    </div>
    
    <!-- Radio Buttons -->
    <div class="form-section">
      <h3>Radio Buttons</h3>
      <label><input type="radio" v-model="level" value="beginner" /> Beginner</label>
      <label><input type="radio" v-model="level" value="intermediate" /> Intermediate</label>
      <label><input type="radio" v-model="level" value="advanced" /> Advanced</label>
      <p>Level: {{ level }}</p>
    </div>
    
    <!-- Select -->
    <div class="form-section">
      <h3>Select</h3>
      <select v-model="country">
        <option value="">Choose...</option>
        <option value="us">USA</option>
        <option value="uk">UK</option>
        <option value="ca">Canada</option>
      </select>
      <p>Country: {{ country }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const age = ref(0)
const agreed = ref(false)
const skills = ref<string[]>([])
const level = ref('beginner')
const country = ref('')
</script>

<style scoped>
.forms-demo { padding: 20px; max-width: 600px; margin: 0 auto; }
.form-section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
input, select, textarea { margin: 5px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
label { display: block; margin: 10px 0; }
</style>
