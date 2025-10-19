<template>
  <div class="shopping-cart">
    <h2>🛒 Shopping Cart with Computed & Watchers</h2>
    
    <!-- Add Item Form -->
    <div class="add-item-form">
      <h3>Add New Item</h3>
      <input v-model="newItem.name" placeholder="Item name" />
      <input v-model.number="newItem.price" type="number" placeholder="Price" />
      <input v-model.number="newItem.quantity" type="number" placeholder="Quantity" min="1" />
      <button @click="addItem">Add to Cart</button>
    </div>
    
    <!-- Filters & Sorting -->
    <div class="controls">
      <div>
        <label>Filter by price:</label>
        <input v-model.number="priceFilter.min" type="number" placeholder="Min" />
        <input v-model.number="priceFilter.max" type="number" placeholder="Max" />
      </div>
      
      <div>
        <label>Sort by:</label>
        <select v-model="sortBy">
          <option value="name">Name</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
    
    <!-- Cart Items -->
    <div class="cart-items">
      <h3>Cart Items ({{ filteredAndSortedItems.length }})</h3>
      <div v-if="filteredAndSortedItems.length === 0" class="empty">
        Cart is empty or no items match filter
      </div>
      
      <div 
        v-for="item in filteredAndSortedItems" 
        :key="item.id"
        class="cart-item"
      >
        <div class="item-details">
          <h4>{{ item.name }}</h4>
          <p>${{ item.price }} x {{ item.quantity }}</p>
        </div>
        <div class="item-actions">
          <button @click="item.quantity++">+</button>
          <button @click="item.quantity > 1 ? item.quantity-- : removeItem(item.id)">-</button>
          <button @click="removeItem(item.id)" class="remove">🗑️</button>
        </div>
        <div class="item-total">
          ${{ itemTotal(item) }}
        </div>
      </div>
    </div>
    
    <!-- Cart Summary -->
    <div class="cart-summary">
      <h3>Cart Summary</h3>
      
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      
      <div class="summary-row">
        <span>Tax (10%):</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>
      
      <div v-if="discount > 0" class="summary-row discount">
        <span>Discount (5% off $100+):</span>
        <span>-${{ discount.toFixed(2) }}</span>
      </div>
      
      <div class="summary-row total">
        <span><strong>Total:</strong></span>
        <span><strong>${{ total.toFixed(2) }}</strong></span>
      </div>
      
      <button @click="checkout" class="checkout-btn" :disabled="items.length === 0">
        Checkout
      </button>
    </div>
    
    <!-- Watch Log -->
    <div class="watch-log">
      <h4>Watch Log (last 5 changes)</h4>
      <div v-for="(log, index) in watchLogs.slice(-5)" :key="index" class="log-entry">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

// State
const items = ref<CartItem[]>([])
let nextId = 1

const newItem = reactive({
  name: '',
  price: 0,
  quantity: 1
})

const priceFilter = reactive({
  min: 0,
  max: 1000
})

const sortBy = ref('name')
const watchLogs = ref<string[]>([])

// Computed: Subtotal
const subtotal = computed(() => {
  return items.value.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  )
})

// Computed: Tax
const tax = computed(() => {
  return subtotal.value * 0.1
})

// Computed: Discount (5% off if subtotal > $100)
const discount = computed(() => {
  return subtotal.value > 100 ? subtotal.value * 0.05 : 0
})

// Computed: Total
const total = computed(() => {
  return subtotal.value + tax.value - discount.value
})

// Computed: Filtered items by price range
const filteredItems = computed(() => {
  return items.value.filter(item => 
    item.price >= priceFilter.min && item.price <= priceFilter.max
  )
})

// Computed: Filtered and sorted items
const filteredAndSortedItems = computed(() => {
  const filtered = [...filteredItems.value]
  
  switch (sortBy.value) {
    case 'name':
      return filtered.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-asc':
      return filtered.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return filtered.sort((a, b) => b.price - a.price)
    default:
      return filtered
  }
})

// Computed: Item total helper
const itemTotal = (item: CartItem) => {
  return (item.price * item.quantity).toFixed(2)
}

// Methods
const addItem = () => {
  if (!newItem.name || newItem.price <= 0) {
    alert('Please enter valid item details')
    return
  }
  
  items.value.push({
    id: nextId++,
    name: newItem.name,
    price: newItem.price,
    quantity: newItem.quantity
  })
  
  // Reset form
  newItem.name = ''
  newItem.price = 0
  newItem.quantity = 1
}

const removeItem = (id: number) => {
  const index = items.value.findIndex(item => item.id === id)
  if (index !== -1) {
    items.value.splice(index, 1)
  }
}

const checkout = () => {
  alert(`Order total: $${total.value.toFixed(2)}\nThank you for your purchase!`)
  items.value = []
}

// Watch: Save cart to localStorage
watch(
  items,
  (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
    watchLogs.value.push(`💾 Saved ${newItems.length} items to localStorage`)
  },
  { deep: true }
)

// Watch: Log when total changes significantly
watch(total, (newTotal, oldTotal) => {
  if (oldTotal && Math.abs(newTotal - oldTotal) > 10) {
    watchLogs.value.push(
      `💰 Total changed significantly: $${oldTotal.toFixed(2)} → $${newTotal.toFixed(2)}`
    )
  }
})

// Watch: Alert when discount becomes available
watch(discount, (newDiscount, oldDiscount) => {
  if (oldDiscount === 0 && newDiscount > 0) {
    watchLogs.value.push(`🎉 Discount unlocked! You saved $${newDiscount.toFixed(2)}`)
  }
})

// watchEffect: Auto-log cart stats
watchEffect(() => {
  const itemCount = items.value.length
  const totalValue = subtotal.value
  
  if (itemCount > 0) {
    console.log(`Cart Stats: ${itemCount} items, $${totalValue.toFixed(2)} subtotal`)
  }
})

// Load cart from localStorage on mount
const loadCart = () => {
  const saved = localStorage.getItem('cart')
  if (saved) {
    items.value = JSON.parse(saved)
    const maxId = items.value.reduce((max, item) => Math.max(max, item.id), 0)
    nextId = maxId + 1
    watchLogs.value.push(`📥 Loaded ${items.value.length} items from localStorage`)
  }
}

loadCart()
</script>

<style scoped>
.shopping-cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #42b883;
  text-align: center;
}

.add-item-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.add-item-form input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-item-form button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.controls input,
.controls select {
  padding: 6px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.cart-items {
  margin: 20px 0;
}

.empty {
  text-align: center;
  color: #999;
  padding: 40px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin: 10px 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.item-details h4 {
  margin: 0 0 5px 0;
  color: #35495e;
}

.item-actions button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.item-actions button.remove {
  background: #f44336;
  color: white;
  border: none;
}

.item-total {
  font-weight: bold;
  color: #42b883;
  font-size: 18px;
}

.cart-summary {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.summary-row.discount {
  color: #4caf50;
}

.summary-row.total {
  font-size: 20px;
  border-bottom: none;
  margin-top: 10px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.watch-log {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.log-entry {
  padding: 5px 0;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ddd;
}
</style>
