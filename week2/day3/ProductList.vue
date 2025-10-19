<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-item">
      <slot :product="product">
        <!-- Default rendering if no scoped slot provided -->
        <div class="default-product">
          <span>{{ product.name }}</span>
          <span>${{ product.price }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
}

interface Props {
  products: Product[]
}

defineProps<Props>()
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-item {
  background: white;
  border-radius: 6px;
}

.default-product {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
