# Week 5: Next.js Fundamentals ⚡

**Focus:** Getting started with Next.js 14 and the App Router

---

## 📊 Weekly Flow

```mermaid
flowchart LR
    A[Day 29: Setup] --> B[Day 30: Routing]
    B --> C[Day 31: Layouts]
    C --> D[Day 32: Navigation]
    D --> E[Day 33: Dynamic Routes]
    E --> F[Day 34: Loading States]
    F --> G[Day 35: Website Project]
    
    style A fill:#9C27B0
    style G fill:#2196F3
```

---

## 📚 Daily Topics

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| **Day 29** | Next.js Setup | create-next-app, project structure, App Router |
| **Day 30** | File-based Routing | page.tsx, nested routes, route groups |
| **Day 31** | Layouts & Templates | layout.tsx, template.tsx, root layout |
| **Day 32** | Navigation & Links | Link component, useRouter, usePathname |
| **Day 33** | Static & Dynamic Routes | [id], [...slug], [[...slug]] |
| **Day 34** | Loading & Error States | loading.tsx, error.tsx, not-found.tsx |
| **Day 35** | **Project: Marketing Website** | Multi-page site with layouts |

---

## 🗂️ Next.js App Router Structure

```mermaid
graph TD
    A[app/] --> B[layout.tsx - Root Layout]
    A --> C[page.tsx - Home /]
    A --> D[about/page.tsx - /about]
    A --> E[blog/]
    
    E --> E1[layout.tsx - Blog Layout]
    E --> E2[page.tsx - /blog]
    E --> E3["[id]/page.tsx - /blog/:id"]
    
    A --> F[loading.tsx - Loading UI]
    A --> G[error.tsx - Error Boundary]
    
    style A fill:#9C27B0
    style B fill:#4CAF50
```

---

## 🔄 Route File Conventions

```mermaid
flowchart TD
    A[Route Segment] --> B[page.tsx]
    A --> C[layout.tsx]
    A --> D[loading.tsx]
    A --> E[error.tsx]
    A --> F[not-found.tsx]
    A --> G[route.ts]
    
    B --> B1[UI for route]
    C --> C1[Shared UI wrapper]
    D --> D1[Suspense fallback]
    E --> E1[Error boundary]
    F --> F1[404 page]
    G --> G1[API endpoint]
    
    style A fill:#9C27B0
```

---

## 📂 Week Project: Marketing Site

Build a professional website with:

- Home page with hero section
- About page
- Services page with cards
- Blog listing + individual post pages
- Contact form
- Shared header/footer layouts
- Loading states and error handling

---

**Start Day 29!** 🚀
