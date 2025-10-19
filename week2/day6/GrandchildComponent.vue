<template>
  <div class="grandchild">
    <h4>Grandchild Component</h4>
    <p>Still has access to theme: {{ theme }}</p>
    <p>And user: {{ user?.name }} ({{ user?.role }})</p>
    <button @click="toggleTheme">Toggle from Deep Child</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ThemeKey, UserKey } from './keys'

const theme = inject(ThemeKey)
const user = inject(UserKey)
const toggleTheme = inject<() => void>('toggleTheme')
</script>

<style scoped>
.grandchild {
  padding: 1rem;
  margin: 1rem 0;
  background: rgba(66, 184, 131, 0.1);
  border-radius: 6px;
  border-left: 4px solid #42b883;
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
