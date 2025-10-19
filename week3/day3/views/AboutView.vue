<template>
  <div class="about">
    <h1>About Us</h1>
    
    <div class="content">
      <section>
        <h2>Our Story</h2>
        <p>
          We are passionate about building amazing Vue.js applications. 
          Our journey started with a simple goal: make web development more enjoyable.
        </p>
      </section>
      
      <section>
        <h2>Our Mission</h2>
        <p>
          To provide the best learning resources for Vue developers worldwide.
          We believe in hands-on learning and practical examples.
        </p>
      </section>
      
      <section>
        <h2>What We Do</h2>
        <ul>
          <li>Comprehensive Vue.js tutorials</li>
          <li>Real-world project examples</li>
          <li>Best practices and patterns</li>
          <li>Community support</li>
        </ul>
      </section>
    </div>
    
    <div class="cta">
      <router-link to="/services" class="btn">View Our Services</router-link>
      <router-link to="/contact" class="btn secondary">Contact Us</router-link>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.content section {
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #35495e;
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b883;
  font-weight: bold;
}

.cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 3rem 0;
}

.btn {
  padding: 1rem 2rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
}

.btn:hover {
  background: #35495e;
}

.btn.secondary {
  background: #667eea;
}
</style>
