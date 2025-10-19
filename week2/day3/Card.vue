<template>
  <div class="card">
    <slot>
      <p class="default-content">No content provided. Add content between Card tags!</p>
    </slot>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.default-content {
  color: #999;
  font-style: italic;
}
</style>
