# Day 2: Template Syntax & Interpolation 🎨

**Duration:** 2-3 hours  
**Difficulty:** ⭐ Easy

---

## 📖 Learning Objectives

- Master Vue template syntax
- Understand text and HTML interpolation
- Learn attribute binding
- Use JavaScript expressions in templates
- Understand template directives basics

---

## 🔄 Data Flow in Vue Templates

```mermaid
graph LR
    A[Component Data] --> B[Template Expressions]
    B --> C[Interpolation {{ }}]
    B --> D[Attribute Binding :]
    B --> E[Event Binding @]
    
    C --> F[Rendered Text]
    D --> G[HTML Attributes]
    E --> H[Event Handlers]
    
    style A fill:#42b883
    style F fill:#4CAF50
    style G fill:#2196F3
    style H fill:#FF9800
```

---

## 📝 1. Text Interpolation

**Mustache Syntax:** `{{ }}`

```mermaid
flowchart LR
    A[Reactive Data] -->|Update| B["{{ message }}"]
    B --> C[DOM Text Node]
    C -->|Automatically Updates| D[User Sees Change]
    
    style A fill:#42b883
    style D fill:#4CAF50
```

### Example

```vue
<template>
  <p>{{ message }}</p>
  <p>{{ 1 + 1 }}</p>
  <p>{{ ok ? 'YES' : 'NO' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('Hello Vue!')
const ok = ref(true)
</script>
```

---

## 🏷️ 2. Attribute Binding

Use `v-bind:` or shorthand `:`

```mermaid
graph TD
    A[Dynamic Value] --> B["v-bind:attribute or :attribute"]
    B --> C[HTML Attribute]
    
    A1[id='myId'] --> B
    A2[class='active'] --> B
    A3[disabled=true] --> B
    A4[src='image.jpg'] --> B
    
    style A fill:#42b883
    style C fill:#2196F3
```

### Example

```vue
<template>
  <!-- Full syntax -->
  <img v-bind:src="imageSrc" />
  
  <!-- Shorthand -->
  <img :src="imageSrc" />
  <a :href="url">Link</a>
  <button :disabled="isDisabled">Click</button>
  <div :class="activeClass">Content</div>
</template>
```

---

## 🎨 3. Class and Style Binding

```mermaid
graph TD
    A[Class Binding] --> B[String]
    A --> C[Object]
    A --> D[Array]
    
    B --> B1["class='active'"]
    C --> C1["{active: isActive}"]
    D --> D1["[baseClass, activeClass]"]
    
    E[Style Binding] --> F[Object]
    E --> G[Array of Objects]
    
    F --> F1["{color: red}"]
    G --> G1["[baseStyle, overrideStyle]"]
    
    style A fill:#FF6B6B
    style E fill:#4ECDC4
```

### Example

```vue
<template>
  <!-- Class binding -->
  <div :class="{ active: isActive, 'text-bold': isBold }">
    Class Object
  </div>
  
  <div :class="[baseClass, activeClass]">
    Class Array
  </div>
  
  <!-- Style binding -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    Styled Text
  </div>
</template>
```

---

## 🔢 4. JavaScript Expressions

```mermaid
flowchart TD
    A[Template Expressions] --> B[Allowed]
    A --> C[Not Allowed]
    
    B --> B1[Ternary Operators]
    B --> B2[Math Operations]
    B --> B3[String Methods]
    B --> B4[Array Methods]
    
    C --> C1[Statements if/for]
    C --> C2[Multiple Expressions]
    C --> C3[Flow Control]
    
    style B fill:#4CAF50
    style C fill:#F44336
```

### Allowed

```vue
<template>
  <p>{{ number + 1 }}</p>
  <p>{{ ok ? 'YES' : 'NO' }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>
  <p>{{ items.filter(i => i.active).length }}</p>
</template>
```

### NOT Allowed

```vue
<template>
  <!-- ❌ Wrong: This is a statement -->
  <p>{{ if (ok) { return 'YES' } }}</p>
  
  <!-- ❌ Wrong: Multiple statements -->
  <p>{{ var a = 1; a + 1 }}</p>
</template>
```

---

## 📌 5. Raw HTML with v-html

```mermaid
sequenceDiagram
    participant Data
    participant vhtml as v-html
    participant DOM
    
    Data->>vhtml: HTML String
    Note over vhtml: Security Check
    vhtml->>DOM: Render as HTML
    Note over DOM: ⚠️ XSS Risk
```

### Example

```vue
<template>
  <div v-html="htmlContent"></div>
</template>

<script setup lang="ts">
const htmlContent = ref('<strong>Bold Text</strong>')
</script>
```

**⚠️ Warning:** Never use v-html with user-provided content (XSS vulnerability)!

---

## ✅ Practice Exercise

Create a **User Profile Card** with:

1. Dynamic name and avatar
2. Conditional "Online" badge (green if online, gray if offline)
3. Dynamic email link
4. Bio text with character count
5. Style the card background based on user status

See `template-practice.vue` for starter code.

---

## 🔗 Key Concepts Summary

```mermaid
mindmap
  root((Template Syntax))
    Interpolation
      Text {{ }}
      Raw HTML v-html
    Attribute Binding
      v-bind or :
      Class Binding
      Style Binding
    Expressions
      JS Operations
      Ternary
      Methods
    Directives
      v-bind
      v-html
      v-text
```

---

## 📌 Key Takeaways

- Use `{{ }}` for text interpolation
- Use `:attribute` for dynamic attributes
- Use `:class` and `:style` for dynamic styling
- Template expressions must be single expressions
- Never use `v-html` with untrusted content

---

**Tomorrow:** Directives (v-if, v-for, v-show) 🔀
