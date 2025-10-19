# Day 6 (Day 41): Deployment & Optimization 🚀

**Duration:** 2-3 hours | **Difficulty:** ⭐⭐ Medium

---

## 📖 Learning Objectives

- Deploy to Vercel
- Optimize performance
- Configure environment variables
- Implement caching strategies
- Monitor applications

---

## 🚀 Deployment to Vercel

```mermaid
flowchart TD
    A[Local Dev] --> B[Git Push]
    B --> C[Vercel Detects Push]
    C --> D[Build Project]
    D --> E{Build Success?}
    E -->|Yes| F[Deploy to Production]
    E -->|No| G[Show Error]
    F --> H[Live Website]
    
    style A fill:#42b883,color:#fff
    style F fill:#4CAF50
    style H fill:#FFD700
```

---

## 📝 Vercel Deployment Steps

### **1. Install Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login to Vercel**
```bash
vercel login
```

### **3. Deploy**
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

---

## 🔧 Environment Variables

```bash
# .env.local (Development)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
```

### **Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add variables for Production/Preview/Development
4. Redeploy for changes to take effect

---

## ⚡ Performance Optimization

### **1. Image Optimization**
```tsx
import Image from 'next/image'

export default function OptimizedImage() {
  return (
    <Image
      src="/photo.jpg"
      alt="Optimized"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="/photo-blur.jpg"
      quality={85}
      priority // For above-the-fold images
    />
  )
}
```

---

### **2. Font Optimization**
```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

---

### **3. Route Segment Config**
```tsx
// app/blog/page.tsx

// Static rendering (default)
export const dynamic = 'force-static'

// Dynamic rendering
export const dynamic = 'force-dynamic'

// Revalidate every hour
export const revalidate = 3600

// Runtime edge
export const runtime = 'edge'
```

---

## 🎯 Caching Strategies

```mermaid
graph TD
    A[Caching Strategies] --> B[Static Generation]
    A --> C[ISR]
    A --> D[On-Demand Revalidation]
    
    B --> B1[Build time]
    B --> B2[Fastest]
    
    C --> C1[Periodic updates]
    C --> C2[Stale-while-revalidate]
    
    D --> D1[Manual trigger]
    D --> D2[Full control]
    
    style A fill:#42b883,color:#fff
```

### **Static Generation**
```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    select: { slug: true }
  })
  
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function PostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await db.post.findUnique({
    where: { slug: params.slug }
  })
  
  return <article>{post?.content}</article>
}
```

### **ISR (Incremental Static Regeneration)**
```tsx
// Revalidate every 60 seconds
export const revalidate = 60

export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }
  }).then(r => r.json())
  
  return <PostList posts={posts} />
}
```

### **On-Demand Revalidation**
```tsx
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const { path, tag } = await request.json()
  
  if (path) {
    revalidatePath(path)
  }
  
  if (tag) {
    revalidateTag(tag)
  }
  
  return NextResponse.json({ revalidated: true })
}
```

---

## 📊 Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your Next.js config
})

# Run analysis
ANALYZE=true npm run build
```

---

## 🎨 next.config.js Best Practices

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  
  // Experimental features
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

---

## 📈 Monitoring

### **Vercel Analytics**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### **Performance Monitoring**
```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## 🎯 SEO Optimization

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: { slug: params.slug }
  })
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}
```

---

## 🌐 Sitemap Generation

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db.post.findMany({
    where: { published: true },
    select: {
      slug: true,
      updatedAt: true
    }
  })
  
  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries,
  ]
}
```

---

## 📱 PWA Configuration

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // Your Next.js config
})
```

---

## ✅ Deployment Checklist

**Before Deployment:**
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] SEO metadata added
- [ ] Images optimized
- [ ] API routes secured
- [ ] Tests passing

**After Deployment:**
- [ ] Check all pages load
- [ ] Test authentication flow
- [ ] Verify API endpoints
- [ ] Check database connections
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Configure custom domain

---

## ✅ Practice Exercise

Deploy your application:
1. Setup Vercel account
2. Configure environment variables
3. Deploy to production
4. Optimize images & fonts
5. Add analytics
6. Generate sitemap
7. Monitor performance

---

**Tomorrow:** Advanced Project! 🎉
