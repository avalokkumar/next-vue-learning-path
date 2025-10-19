# Day 5 (Day 68): Best Practices & Code Quality 📚

**Duration:** 3-5 hours | **Difficulty:** ⭐⭐⭐ Intermediate

---

## 📖 Learning Objectives

- Master code quality principles
- Implement best practices
- Write maintainable code
- Set up proper tooling
- Establish team standards

---

## 🎯 Code Quality Pillars

```mermaid
mindmap
  root((Code<br/>Quality))
    Readability
      Clear naming
      Proper formatting
      Comments
      Documentation
    Maintainability
      DRY principle
      SOLID principles
      Modular design
      Refactoring
    Testability
      Unit tests
      Integration tests
      E2E tests
      Test coverage
    Security
      Input validation
      Authentication
      Authorization
      Data encryption
    Performance
      Optimization
      Profiling
      Monitoring
```

---

## 📝 Clean Code Principles

### **1. Meaningful Names**

**See:** [`examples/naming-conventions.ts`](examples/naming-conventions.ts)

```typescript
// ❌ BAD - Unclear names
const d = new Date()
const x = users.filter(u => u.a)
function calc(a, b) { return a + b }

// ✅ GOOD - Clear, descriptive names
const currentDate = new Date()
const activeUsers = users.filter(user => user.isActive)
function calculateTotal(price, quantity) {
  return price * quantity
}
```

---

### **2. Functions Should Do One Thing**

```typescript
// ❌ BAD - Does too much
function processUser(user) {
  validateUser(user)
  saveToDatabase(user)
  sendEmail(user)
  logActivity(user)
  updateCache(user)
}

// ✅ GOOD - Single responsibility
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function notifyUser(user) { /* ... */ }

async function processUser(user) {
  await validateUser(user)
  await saveUser(user)
  await notifyUser(user)
}
```

---

### **3. Keep Functions Small**

```mermaid
graph LR
    A[Large Function] --> B[Extract Method]
    B --> C[Small Function 1]
    B --> D[Small Function 2]
    B --> E[Small Function 3]
    
    style A fill:#F44336,color:#fff
    style C fill:#4CAF50
    style D fill:#4CAF50
    style E fill:#4CAF50
```

**Rule of Thumb:** If a function is more than 20-30 lines, consider splitting it.

---

## 🏗️ Project Structure Best Practices

**See:** [`examples/project-structure.md`](examples/project-structure.md)

```
src/
├── app/                  # Next.js pages
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   └── features/        # Feature-specific components
├── lib/                  # Utility functions
├── hooks/                # Custom hooks
├── types/                # TypeScript types
├── constants/            # Constants
├── config/               # Configuration
└── tests/                # Test files
```

---

## 🔧 Essential Tooling

### **1. ESLint Configuration**

**See:** [`examples/.eslintrc.json`](examples/.eslintrc.json)

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

---

### **2. Prettier Configuration**

**See:** [`examples/.prettierrc`](examples/.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

### **3. TypeScript Configuration**

**See:** [`examples/tsconfig.json`](examples/tsconfig.json)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

---

## 🧪 Testing Best Practices

**See:** [`examples/testing-examples/`](examples/testing-examples/)

```mermaid
graph TD
    A[Testing Pyramid] --> B[E2E Tests<br/>10%]
    A --> C[Integration Tests<br/>30%]
    A --> D[Unit Tests<br/>60%]
    
    style D fill:#4CAF50
    style C fill:#2196F3
    style B fill:#FF9800
```

### **Unit Testing**

```typescript
// user.test.ts
import { validateEmail } from './user'

describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })
  
  it('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})
```

---

### **Component Testing**

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## 📚 Documentation Standards

### **Code Comments**

```typescript
/**
 * Calculates the total price with tax
 * @param price - Base price
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including tax
 * @example
 * calculatePriceWithTax(100, 0.08) // Returns 108
 */
function calculatePriceWithTax(price: number, taxRate: number): number {
  return price * (1 + taxRate)
}
```

---

### **README Standards**

**See:** [`examples/README-template.md`](examples/README-template.md)

Essential sections:

1. Project description
2. Installation
3. Usage examples
4. API documentation
5. Contributing guidelines
6. License

---

## 🔒 Security Best Practices

**See:** [`examples/security-checklist.md`](examples/security-checklist.md)

```mermaid
graph TD
    A[Security] --> B[Authentication]
    A --> C[Authorization]
    A --> D[Input Validation]
    A --> E[Data Protection]
    
    B --> B1[Strong passwords]
    B --> B2[MFA]
    
    C --> C1[RBAC]
    C --> C2[Principle of least privilege]
    
    D --> D1[Sanitize inputs]
    D --> D2[Validate types]
    
    E --> E1[Encryption]
    E --> E2[Secure storage]
    
    style A fill:#F44336,color:#fff
```

**Key Practices:**

- ✅ Never store secrets in code
- ✅ Use environment variables
- ✅ Validate all inputs
- ✅ Sanitize user data
- ✅ Use HTTPS
- ✅ Implement rate limiting
- ✅ Keep dependencies updated

---

## 📊 Code Review Checklist

```mermaid
flowchart TD
    A[Code Review] --> B{Functionality}
    B -->|Pass| C{Code Quality}
    B -->|Fail| Z[Request Changes]
    
    C -->|Pass| D{Tests}
    C -->|Fail| Z
    
    D -->|Pass| E{Documentation}
    D -->|Fail| Z
    
    E -->|Pass| F{Security}
    E -->|Fail| Z
    
    F -->|Pass| G[Approve]
    F -->|Fail| Z
    
    style G fill:#4CAF50
    style Z fill:#F44336,color:#fff
```

**Review Points:**

- [ ] Code works as expected
- [ ] Follows style guide
- [ ] No unnecessary complexity
- [ ] Tests included
- [ ] Documentation updated
- [ ] No security issues
- [ ] Performance considered
- [ ] Error handling present

---

## 🎨 Component Best Practices

**See:** [`components/best-practices-examples.tsx`](components/best-practices-examples.tsx)

### **1. Props Interface**

```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  )
}
```

---

### **2. Error Boundaries**

```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

---

### **3. Loading & Error States**

```typescript
function UserProfile({ userId }) {
  const { data, loading, error } = useUser(userId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <NotFound />

  return <UserCard user={data} />
}
```

---

## 🔄 Git Best Practices

**See:** [`examples/git-workflow.md`](examples/git-workflow.md)

### **Commit Messages**

```
type(scope): subject

body

footer
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Example:**

```
feat(auth): add Google OAuth login

Implemented Google OAuth authentication flow with NextAuth.js.
Users can now sign in with their Google account.

Closes #123
```

---

## ✅ Daily Code Quality Checklist

**Before Committing:**

- [ ] Code linted (ESLint)
- [ ] Code formatted (Prettier)
- [ ] Types checked (TypeScript)
- [ ] Tests passing
- [ ] No console.logs
- [ ] No commented code
- [ ] Meaningful commit message

**Before PR:**

- [ ] Branch up to date
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Self-reviewed code
- [ ] Screenshots added (if UI change)

---

## 📈 Continuous Improvement

```mermaid
graph LR
    A[Write Code] --> B[Review]
    B --> C[Learn]
    C --> D[Improve]
    D --> A
    
    style D fill:#4CAF50
```

**Growth Practices:**

- 📚 Read code daily
- 💬 Participate in code reviews
- 🎓 Learn new patterns
- 🔧 Refactor regularly
- 📝 Document learnings
- 👥 Share knowledge

---

**Tomorrow:** Career Development! 🚀
