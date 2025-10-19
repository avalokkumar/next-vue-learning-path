<template>
  <div class="directives-demo">
    <h1>Vue Directives Practice</h1>
    
    <!-- v-if / v-else-if / v-else -->
    <section class="demo-section">
      <h2>1. Conditional Rendering</h2>
      <button @click="userType = 'admin'">Admin</button>
      <button @click="userType = 'user'">User</button>
      <button @click="userType = 'guest'">Guest</button>
      
      <div v-if="userType === 'admin'" class="admin">🔐 Admin Dashboard</div>
      <div v-else-if="userType === 'user'" class="user">👤 User Dashboard</div>
      <div v-else class="guest">👁️ Guest View</div>
    </section>
    
    <!-- v-show -->
    <section class="demo-section">
      <h2>2. Toggle Visibility (v-show)</h2>
      <button @click="showDetails = !showDetails">Toggle Details</button>
      <div v-show="showDetails" class="details">Always in DOM, just hidden!</div>
    </section>
    
    <!-- v-for Array -->
    <section class="demo-section">
      <h2>3. List Rendering</h2>
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <h4>{{ product.name }}</h4>
          <p>${{ product.price }}</p>
          <span v-if="product.inStock" class="badge">In Stock</span>
          <span v-else class="badge out">Out of Stock</span>
        </div>
      </div>
    </section>
    
    <!-- Filtered -->
    <section class="demo-section">
      <h2>4. Filtered List</h2>
      <button @click="filterCategory = 'all'">All</button>
      <button @click="filterCategory = 'electronics'">Electronics</button>
      <button @click="filterCategory = 'clothing'">Clothing</button>
      
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        {{ product.name }} - {{ product.category }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const userType = ref('guest')
const showDetails = ref(false)
const filterCategory = ref('all')

interface Product {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
}

const products = ref<Product[]>([
  { id: 1, name: 'Laptop', category: 'electronics', price: 999, inStock: true },
  { id: 2, name: 'T-Shirt', category: 'clothing', price: 29, inStock: true },
  { id: 3, name: 'Phone', category: 'electronics', price: 699, inStock: false }
])

const filteredProducts = computed(() => {
  if (filterCategory.value === 'all') return products.value
  return products.value.filter(p => p.category === filterCategory.value)
})
</script>

<style scoped>
.directives-demo { padding: 20px; }
.demo-section { margin: 30px 0; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; }
h2 { color: #42b883; }
button { padding: 8px 16px; margin: 5px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
.product-card { padding: 15px; border: 1px solid #ddd; border-radius: 6px; background: white; }
.badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; background: #4CAF50; color: white; }
.badge.out { background: #F44336; }
</style>
