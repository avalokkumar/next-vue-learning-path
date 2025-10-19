# Day 1: Vue Setup & Instance 🎯

**Duration:** 2-3 hours  
**Difficulty:** ⭐ Easy

---

## 📖 Learning Objectives

- Understand what Vue.js is and why use it
- Set up a Vue 3 project with Vite
- Create your first Vue instance
- Understand the Vue application structure
- Learn about reactive data

---

## 🧠 What is Vue.js?

Vue.js is a **progressive JavaScript framework** for building user interfaces. It's designed to be incrementally adoptable.

```mermaid
graph LR
    A[Vue.js] --> B[Declarative Rendering]
    A --> C[Component System]
    A --> D[Reactivity System]
    A --> E[Ecosystem Tools]
    
    B --> B1[Templates]
    C --> C1[Reusable Components]
    D --> D1[Automatic Updates]
    E --> E1[Router, Pinia, Vite]
    
    style A fill:#42b883
    style B fill:#35495e
    style C fill:#35495e
    style D fill:#35495e
    style E fill:#35495e
```

---

## 🚀 Vue vs React vs Angular

```mermaid
graph TD
    A[Framework Comparison] --> B[Vue.js]
    A --> C[React]
    A --> D[Angular]
    
    B --> B1[Progressive & Flexible]
    B --> B2[Easy Learning Curve]
    B --> B3[Great Documentation]
    
    C --> C1[Component-Based]
    C --> C2[Large Ecosystem]
    C --> C3[JSX Syntax]
    
    D --> D1[Full Framework]
    D --> D2[TypeScript First]
    D --> D3[Opinionated]
    
    style B fill:#42b883
    style C fill:#61dafb
    style D fill:#dd1b16
```

---

## 🛠️ Setup Vue 3 Project

### Step 1: Create Project with Vite

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

### Step 2: Project Structure

```mermaid
graph TD
    A[my-vue-app/] --> B[src/]
    A --> C[public/]
    A --> D[index.html]
    A --> E[vite.config.ts]
    A --> F[package.json]
    
    B --> B1[main.ts - Entry Point]
    B --> B2[App.vue - Root Component]
    B --> B3[components/]
    B --> B4[assets/]
    
    style A fill:#4CAF50
    style B fill:#2196F3
```

---

## 💻 Your First Vue Instance

### The Vue Application Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant main.ts
    participant App.vue
    participant DOM
    
    User->>main.ts: Load Application
    main.ts->>main.ts: Import createApp
    main.ts->>App.vue: Import Root Component
    main.ts->>main.ts: createApp(App)
    main.ts->>DOM: mount('#app')
    DOM->>User: Render UI
```

---

## 📝 Code Example: main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Create Vue application instance
const app = createApp(App)

// Mount to DOM element with id="app"
app.mount('#app')
```

---

## 📝 Code Example: App.vue

See `app-example.vue` for the complete component structure.

---

## 🔄 Vue Component Anatomy

```mermaid
graph TD
    A[Vue Component .vue] --> B[Template Section]
    A --> C[Script Section]
    A --> D[Style Section]
    
    B --> B1[HTML Template]
    B --> B2[Vue Directives]
    B --> B3[Data Binding]
    
    C --> C1[Component Logic]
    C --> C2[Reactive Data]
    C --> C3[Methods]
    
    D --> D1[Scoped Styles]
    D --> D2[CSS/SCSS]
    
    style A fill:#42b883
    style B fill:#FF6B6B
    style C fill:#4ECDC4
    style D fill:#95E1D3
```

---

## ✅ Practice Exercise

**Task:** Create a simple Vue app that displays your name and age.

1. Create a new Vue component
2. Define reactive data for name and age
3. Display them in the template
4. Add a button that increases age by 1

**Expected Output:**
```
Name: John Doe
Age: 25
[Increase Age Button]
```

---

## 🔗 Additional Resources

- [Vue.js Official Docs](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue School (Free courses)](https://vueschool.io/)

---

## 📌 Key Takeaways

- Vue uses a **component-based architecture**
- `createApp()` creates a Vue application instance
- `.mount()` connects Vue to the DOM
- Components have **template**, **script**, and **style** sections
- Data defined in `data()` or `ref()` is **reactive**

---

**Tomorrow:** Template Syntax & Interpolation 🎨
