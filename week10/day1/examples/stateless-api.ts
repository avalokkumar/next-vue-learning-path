/**
 * Stateless API Design for Horizontal Scaling
 * 
 * This example demonstrates how to design APIs that can scale horizontally
 * by avoiding in-memory state and using external storage (Redis, Database)
 */

import { Redis } from '@upstash/redis'
import { db } from '@/lib/db'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

// ❌ BAD EXAMPLE - Uses in-memory state
// This will NOT work with multiple server instances
class StatefulAPI {
  private sessions = new Map<string, any>()
  private cache = new Map<string, any>()

  async handleRequest(userId: string) {
    // Session only exists on this server instance
    const session = this.sessions.get(userId)
    
    // Cache only exists on this server instance
    const cachedData = this.cache.get(`user:${userId}`)
    
    return { session, cachedData }
  }
}

// ✅ GOOD EXAMPLE - Stateless with external storage
class StatelessAPI {
  // All state is stored externally
  async handleRequest(userId: string) {
    // Session stored in Redis - accessible from any server
    const session = await redis.get(`session:${userId}`)
    
    // Cache stored in Redis - accessible from any server
    const cachedData = await redis.get(`user:${userId}`)
    
    return { session, cachedData }
  }

  // Create session in external storage
  async createSession(userId: string, sessionData: any) {
    const sessionId = crypto.randomUUID()
    
    // Store in Redis with TTL
    await redis.setex(
      `session:${sessionId}`,
      3600, // 1 hour
      JSON.stringify({
        userId,
        ...sessionData,
        createdAt: Date.now()
      })
    )
    
    return sessionId
  }

  // Get session from external storage
  async getSession(sessionId: string) {
    const session = await redis.get(`session:${sessionId}`)
    return session ? JSON.parse(session as string) : null
  }

  // Caching with Redis
  async getCachedUser(userId: string) {
    // Try cache first
    const cached = await redis.get(`user:${userId}`)
    
    if (cached) {
      return JSON.parse(cached as string)
    }
    
    // Cache miss - fetch from database
    const user = await db.user.findUnique({
      where: { id: userId }
    })
    
    // Store in cache
    if (user) {
      await redis.setex(
        `user:${userId}`,
        300, // 5 minutes
        JSON.stringify(user)
      )
    }
    
    return user
  }
}

// Example usage in Next.js API Route
export async function GET(request: Request) {
  const sessionId = request.headers.get('x-session-id')
  
  if (!sessionId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const api = new StatelessAPI()
  const session = await api.getSession(sessionId)
  
  if (!session) {
    return Response.json({ error: 'Invalid session' }, { status: 401 })
  }
  
  const user = await api.getCachedUser(session.userId)
  
  return Response.json({ user })
}

/**
 * Key Principles for Stateless APIs:
 * 
 * 1. Store sessions externally (Redis, Database)
 * 2. Use distributed caching (Redis, Memcached)
 * 3. Avoid file system for temporary data
 * 4. Use database for persistent state
 * 5. Design for any request to hit any server
 * 6. Use sticky sessions only as last resort
 */
