<template>
  <div class="props-demo">
    <h2>Props Examples</h2>
    
    <!-- Example 1: Simple Props -->
    <UserCard
      name="Alice Johnson"
      :age="28"
      email="alice@example.com"
      role="Developer"
    />
    
    <!-- Example 2: Object Props -->
    <ProductCard :product="product1" />
    <ProductCard :product="product2" />
    
    <!-- Example 3: Array Props -->
    <TagList :tags="tags" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import UserCard from './UserCard.vue'
import ProductCard from './ProductCard.vue'
import TagList from './TagList.vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const product1 = reactive<Product>({
  id: 1,
  name: 'Laptop',
  price: 999,
  image: 'https://via.placeholder.com/200'
})

const product2 = reactive<Product>({
  id: 2,
  name: 'Mouse',
  price: 29,
  image: 'https://via.placeholder.com/200'
})

const tags = ['vue', 'typescript', 'javascript', 'frontend']
</script>

<style scoped>
.props-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #42b883;
  margin-bottom: 2rem;
}
</style>
