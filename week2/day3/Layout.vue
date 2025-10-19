<template>
  <div class="layout">
    <header class="layout-header">
      <slot name="header">
        <h1>Default Header</h1>
      </slot>
    </header>
    
    <main class="layout-main">
      <slot>
        <p>Default main content</p>
      </slot>
    </main>
    
    <footer class="layout-footer">
      <slot name="footer">
        <p>Default Footer</p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.layout-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
}

.layout-main {
  flex: 1;
  padding: 2rem;
  background: white;
}

.layout-footer {
  background: #f5f5f5;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}
</style>
