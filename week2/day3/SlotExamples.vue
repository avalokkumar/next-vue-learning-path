<template>
  <div class="slot-examples">
    <h1>Slot Examples</h1>
    
    <!-- Example 1: Default Slot -->
    <section>
      <h2>1. Default Slot</h2>
      <Card>
        <h3>My Custom Content</h3>
        <p>This content is injected via the default slot!</p>
      </Card>
    </section>
    
    <!-- Example 2: Named Slots -->
    <section>
      <h2>2. Named Slots</h2>
      <Layout>
        <template #header>
          <h1>Welcome to My App</h1>
          <nav>Home | About | Contact</nav>
        </template>
        
        <p>This is the main content area.</p>
        <p>Multiple paragraphs work great!</p>
        
        <template #footer>
          <p>© 2024 My Company</p>
        </template>
      </Layout>
    </section>
    
    <!-- Example 3: Scoped Slots -->
    <section>
      <h2>3. Scoped Slots</h2>
      <ProductList :products="products">
        <template #default="{ product }">
          <div class="custom-product">
            <strong>{{ product.name }}</strong>
            <span>${{ product.price }}</span>
            <button @click="addToCart(product)">Add to Cart</button>
          </div>
        </template>
      </ProductList>
    </section>
    
    <!-- Example 4: Modal with Slots -->
    <section>
      <h2>4. Modal Component</h2>
      <button @click="showModal = true">Open Modal</button>
      
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <h2>Confirm Action</h2>
        </template>
        
        <p>Are you sure you want to proceed?</p>
        
        <template #footer>
          <button @click="handleConfirm" class="btn-primary">Confirm</button>
          <button @click="showModal = false" class="btn-secondary">Cancel</button>
        </template>
      </Modal>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import Layout from './Layout.vue'
import ProductList from './ProductList.vue'
import Modal from './Modal.vue'

interface Product {
  id: number
  name: string
  price: number
}

const products = ref<Product[]>([
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 3, name: 'Keyboard', price: 79 }
])

const showModal = ref(false)

const addToCart = (product: Product) => {
  console.log('Added to cart:', product.name)
}

const handleConfirm = () => {
  console.log('Confirmed!')
  showModal.value = false
}
</script>

<style scoped>
.slot-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
}

section {
  margin: 3rem 0;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

h2 {
  color: #35495e;
  margin-bottom: 1.5rem;
}

.custom-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  margin: 0.5rem 0;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}
</style>
