/**
 * Multi-Layer Caching Strategy
 * 
 * Implements multiple caching layers to optimize performance:
 * 1. Browser Cache (HTTP headers)
 * 2. CDN Cache (Edge caching)
 * 3. Application Cache (Redis)
 * 4. Database Query Cache (Prisma)
 */

import { Redis } from '@upstash/redis'
import { db } from '@/lib/db'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

/**
 * Cache-Aside Pattern (Lazy Loading)
 * 
 * Application checks cache before database:
 * 1. Try to get from cache
 * 2. If miss, fetch from database
 * 3. Store in cache for next time
 */
export async function getCacheAside<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  // Try cache first
  const cached = await redis.get<T>(key)
  
  if (cached) {
    console.log(`Cache HIT: ${key}`)
    return cached
  }
  
  console.log(`Cache MISS: ${key}`)
  
  // Fetch from source
  const data = await fetcher()
  
  // Store in cache
  await redis.setex(key, ttl, JSON.stringify(data))
  
  return data
}

/**
 * Write-Through Cache
 * 
 * Write to cache and database simultaneously:
 * 1. Write to database
 * 2. Write to cache
 * 3. Return result
 */
export async function setWriteThrough<T>(
  key: string,
  value: T,
  dbWriter: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  // Write to database first
  const result = await dbWriter()
  
  // Then update cache
  await redis.setex(key, ttl, JSON.stringify(result))
  
  return result
}

/**
 * Write-Behind Cache (Write-Back)
 * 
 * Write to cache immediately, database asynchronously:
 * 1. Write to cache (fast)
 * 2. Queue database write (async)
 * 3. Return immediately
 */
export async function setWriteBehind<T>(
  key: string,
  value: T,
  dbWriter: () => Promise<void>,
  ttl: number = 3600
): Promise<void> {
  // Write to cache immediately
  await redis.setex(key, ttl, JSON.stringify(value))
  
  // Queue database write (don't await)
  dbWriter().catch(error => {
    console.error('Write-behind failed:', error)
    // Implement retry logic here
  })
}

/**
 * Cache Invalidation Strategies
 */
export class CacheInvalidation {
  /**
   * Invalidate single key
   */
  static async invalidate(key: string) {
    await redis.del(key)
  }

  /**
   * Invalidate by pattern
   */
  static async invalidatePattern(pattern: string) {
    const keys = await redis.keys(pattern)
    
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }

  /**
   * Invalidate multiple keys
   */
  static async invalidateMany(keys: string[]) {
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }

  /**
   * Time-based invalidation (TTL)
   * Cache automatically expires
   */
  static async setWithTTL(key: string, value: any, seconds: number) {
    await redis.setex(key, seconds, JSON.stringify(value))
  }
}

/**
 * Product Service with Multi-Layer Caching
 */
export class ProductService {
  /**
   * Get product with caching
   */
  async getProduct(id: string) {
    return await getCacheAside(
      `product:${id}`,
      async () => {
        return await db.product.findUnique({
          where: { id },
          include: {
            category: true,
            reviews: {
              take: 5,
              orderBy: { createdAt: 'desc' }
            }
          }
        })
      },
      3600 // 1 hour
    )
  }

  /**
   * Create product with write-through
   */
  async createProduct(data: any) {
    const product = await db.product.create({ data })
    
    // Cache the new product
    await redis.setex(
      `product:${product.id}`,
      3600,
      JSON.stringify(product)
    )
    
    // Invalidate product list caches
    await CacheInvalidation.invalidatePattern('products:list:*')
    
    return product
  }

  /**
   * Update product
   */
  async updateProduct(id: string, data: any) {
    const product = await db.product.update({
      where: { id },
      data
    })
    
    // Update cache
    await redis.setex(
      `product:${id}`,
      3600,
      JSON.stringify(product)
    )
    
    // Invalidate related caches
    await CacheInvalidation.invalidateMany([
      `products:list:*`,
      `product:${id}:stats`
    ])
    
    return product
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string) {
    await db.product.delete({ where: { id } })
    
    // Invalidate caches
    await CacheInvalidation.invalidateMany([
      `product:${id}`,
      `products:list:*`
    ])
  }

  /**
   * List products with pagination and caching
   */
  async listProducts(page: number = 1, limit: number = 20) {
    const cacheKey = `products:list:${page}:${limit}`
    
    return await getCacheAside(
      cacheKey,
      async () => {
        const products = await db.product.findMany({
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: 'desc' }
        })
        
        return products
      },
      300 // 5 minutes (shorter TTL for lists)
    )
  }

  /**
   * Search products (no caching - dynamic queries)
   */
  async searchProducts(query: string) {
    // Don't cache search results - too many variations
    return await db.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 20
    })
  }
}

/**
 * HTTP Caching Headers for Browser/CDN
 */
export function getCacheHeaders(maxAge: number = 3600) {
  return {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
    'CDN-Cache-Control': `max-age=${maxAge}`,
    'Expires': new Date(Date.now() + maxAge * 1000).toUTCString(),
  }
}

/**
 * Next.js API Route with Caching
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productService = new ProductService()
  const product = await productService.getProduct(params.id)
  
  if (!product) {
    return Response.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  // Return with cache headers
  return Response.json(product, {
    headers: getCacheHeaders(3600) // 1 hour
  })
}

/**
 * Cache Warming Strategy
 * 
 * Pre-populate cache with popular/predictable data
 */
export async function warmCache() {
  const productService = new ProductService()
  
  // Cache popular products
  const popularProducts = await db.product.findMany({
    where: { featured: true },
    take: 50
  })
  
  // Store in cache
  for (const product of popularProducts) {
    await redis.setex(
      `product:${product.id}`,
      3600,
      JSON.stringify(product)
    )
  }
  
  console.log(`Warmed cache with ${popularProducts.length} products`)
}

/**
 * Cache Statistics
 */
export async function getCacheStats() {
  // This is pseudo-code - actual implementation depends on Redis setup
  return {
    hits: await redis.get('cache:hits') || 0,
    misses: await redis.get('cache:misses') || 0,
    hitRate: 0, // Calculate based on hits/misses
    size: await redis.dbsize(),
  }
}

/**
 * Best Practices:
 * 
 * 1. Cache frequently accessed data
 * 2. Don't cache dynamic/personalized data
 * 3. Set appropriate TTLs
 * 4. Invalidate on updates
 * 5. Monitor cache hit rates
 * 6. Use cache warming for predictable data
 * 7. Consider cache stampede prevention
 * 8. Implement fallback to database
 */
