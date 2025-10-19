/**
 * Database Replication Strategy
 * 
 * This example shows how to implement read/write splitting
 * for database replication to improve scalability
 */

import { PrismaClient } from '@prisma/client'

/**
 * Primary Database Connection
 * - Handles all write operations
 * - Source of truth
 * - Replicates to read replicas
 */
const primaryDB = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL // Primary database
    }
  },
  log: ['query', 'error', 'warn'],
})

/**
 * Read Replica Database Connection
 * - Handles read operations
 * - Reduces load on primary
 * - May have slight replication lag
 */
const replicaDB = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_REPLICA_URL // Read replica
    }
  },
  log: ['error', 'warn'],
})

/**
 * Database Router
 * Routes queries to appropriate database based on operation type
 */
class DatabaseRouter {
  /**
   * Get database connection based on operation type
   */
  getDB(readonly: boolean = false) {
    return readonly ? replicaDB : primaryDB
  }

  /**
   * Execute write operation (goes to primary)
   */
  async write<T>(operation: () => Promise<T>): Promise<T> {
    return operation()
  }

  /**
   * Execute read operation (goes to replica)
   */
  async read<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      // Fallback to primary if replica fails
      console.warn('Replica read failed, falling back to primary', error)
      return operation()
    }
  }
}

export const dbRouter = new DatabaseRouter()

/**
 * User Service with Read/Write Splitting
 */
export class UserService {
  /**
   * Create user - Write operation (Primary DB)
   */
  async createUser(data: { email: string; name: string }) {
    return await primaryDB.user.create({
      data
    })
  }

  /**
   * Get user - Read operation (Replica DB)
   */
  async getUser(id: string) {
    return await replicaDB.user.findUnique({
      where: { id }
    })
  }

  /**
   * Update user - Write operation (Primary DB)
   */
  async updateUser(id: string, data: any) {
    return await primaryDB.user.update({
      where: { id },
      data
    })
  }

  /**
   * List users - Read operation (Replica DB)
   */
  async listUsers(filters?: any) {
    return await replicaDB.user.findMany({
      where: filters,
      take: 100
    })
  }

  /**
   * Search users - Read operation (Replica DB)
   */
  async searchUsers(query: string) {
    return await replicaDB.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 20
    })
  }

  /**
   * Get user with posts - Read operation but needs fresh data
   * Use primary DB to avoid replication lag issues
   */
  async getUserWithPosts(id: string) {
    return await primaryDB.user.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })
  }

  /**
   * Delete user - Write operation (Primary DB)
   */
  async deleteUser(id: string) {
    return await primaryDB.user.delete({
      where: { id }
    })
  }
}

/**
 * Next.js API Route Example
 */

// GET /api/users - Read from replica
export async function GET(request: Request) {
  const userService = new UserService()
  const users = await userService.listUsers()
  
  return Response.json({ users })
}

// POST /api/users - Write to primary
export async function POST(request: Request) {
  const data = await request.json()
  const userService = new UserService()
  
  const user = await userService.createUser(data)
  
  return Response.json({ user }, { status: 201 })
}

/**
 * Advanced: Connection Pooling
 */
class DatabaseConnectionPool {
  private primaryPool: PrismaClient[]
  private replicaPool: PrismaClient[]
  private currentPrimaryIndex = 0
  private currentReplicaIndex = 0

  constructor(poolSize: number = 5) {
    // Create pool of primary connections
    this.primaryPool = Array.from({ length: poolSize }, () => 
      new PrismaClient({
        datasources: {
          db: { url: process.env.DATABASE_URL }
        }
      })
    )

    // Create pool of replica connections
    this.replicaPool = Array.from({ length: poolSize }, () =>
      new PrismaClient({
        datasources: {
          db: { url: process.env.DATABASE_REPLICA_URL }
        }
      })
    )
  }

  /**
   * Get connection from primary pool (Round-robin)
   */
  getPrimaryConnection() {
    const connection = this.primaryPool[this.currentPrimaryIndex]
    this.currentPrimaryIndex = (this.currentPrimaryIndex + 1) % this.primaryPool.length
    return connection
  }

  /**
   * Get connection from replica pool (Round-robin)
   */
  getReplicaConnection() {
    const connection = this.replicaPool[this.currentReplicaIndex]
    this.currentReplicaIndex = (this.currentReplicaIndex + 1) % this.replicaPool.length
    return connection
  }

  /**
   * Cleanup on shutdown
   */
  async disconnect() {
    await Promise.all([
      ...this.primaryPool.map(db => db.$disconnect()),
      ...this.replicaPool.map(db => db.$disconnect())
    ])
  }
}

export const dbPool = new DatabaseConnectionPool(5)

/**
 * Key Considerations:
 * 
 * 1. Replication Lag: Read replicas may be behind primary by seconds
 * 2. Eventual Consistency: Accept that reads might not reflect latest writes
 * 3. Fallback Strategy: Always have fallback to primary if replica fails
 * 4. Read-After-Write: Use primary for reads immediately after writes
 * 5. Load Distribution: Distribute reads across multiple replicas
 * 6. Monitoring: Track replication lag and connection health
 */
