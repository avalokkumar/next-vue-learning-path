<template>
  <div class="component-examples">
    <h1>Component Examples</h1>
    
    <!-- Example 1: User Card -->
    <section class="example-section">
      <h2>Example 1: User Card Component</h2>
      <div class="card-grid">
        <UserCard
          name="Alice Johnson"
          role="Senior Developer"
          bio="Passionate about Vue.js and building amazing user experiences. Love clean code and great design."
          avatar="https://i.pravatar.cc/150?img=1"
          :followers="1234"
          :following="567"
          :posts="89"
        />
        
        <UserCard
          name="Bob Smith"
          role="UI/UX Designer"
          bio="Creating beautiful and intuitive interfaces. Believer in design thinking and user-centered design."
          avatar="https://i.pravatar.cc/150?img=2"
          :followers="892"
          :following="423"
          :posts="156"
        />
      </div>
    </section>
    
    <!-- Example 2: Counter Component -->
    <section class="example-section">
      <h2>Example 2: Counter Component</h2>
      <div class="counter-grid">
        <Counter title="Clicks" :initial-count="0" />
        <Counter title="Visitors" :initial-count="100" />
        <Counter title="Sales" :initial-count="50" />
      </div>
    </section>
    
    <!-- Example 3: Alert Component -->
    <section class="example-section">
      <h2>Example 3: Alert Component</h2>
      <div class="alert-stack">
        <Alert type="success" message="Operation completed successfully!" />
        <Alert type="warning" message="Please review your settings." />
        <Alert type="error" message="An error occurred. Please try again." />
        <Alert type="info" message="New features are available!" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import UserCard from './UserCard.vue'
import Counter from './Counter.vue'
import Alert from './Alert.vue'
</script>

<style scoped>
.component-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.example-section {
  margin-bottom: 4rem;
}

h2 {
  color: #35495e;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b883;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.counter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.alert-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem 0;
}
</style>
