<template>
  <div class="child" :class="`theme-${theme}`">
    <h3>Child Component</h3>
    <p>Theme from inject: {{ theme }}</p>
    <p>User from inject: {{ user?.name }}</p>
    
    <GrandchildComponent />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import GrandchildComponent from './GrandchildComponent.vue'
import { ThemeKey, UserKey } from './keys'

// Inject from ancestor
const theme = inject(ThemeKey)
const user = inject(UserKey)
</script>

<style scoped>
.child {
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 2px solid #42b883;
}

.theme-light {
  background: white;
  color: #333;
}

.theme-dark {
  background: #2c3e50;
  color: white;
}
</style>
