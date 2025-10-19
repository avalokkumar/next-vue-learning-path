<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to Vue Router</h1>
      <p>Learn client-side routing with Vue</p>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>🚀 Fast Navigation</h3>
        <p>No page reloads, instant transitions</p>
      </div>
      <div class="feature-card">
        <h3>📱 Single Page App</h3>
        <p>Smooth user experience</p>
      </div>
      <div class="feature-card">
        <h3>🎯 Easy to Use</h3>
        <p>Simple and intuitive API</p>
      </div>
    </div>
    
    <div class="actions">
      <button @click="goToAbout">Learn More</button>
      <button @click="goToContact" class="secondary">Get in Touch</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}

const goToContact = () => {
  router.push({ name: 'contact' })
}
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin: 0 0 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin: 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: #42b883;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 3rem 0;
}

button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #35495e;
  transform: translateY(-2px);
}

button.secondary {
  background: #667eea;
}
</style>
