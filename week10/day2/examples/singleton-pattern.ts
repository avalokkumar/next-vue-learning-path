/**
 * Singleton Pattern
 * 
 * Ensures a class has only one instance and provides global access to it.
 * Common use cases: Database connections, configuration, logging
 */

// ✅ GOOD - Singleton with TypeScript
class DatabaseConnection {
  private static instance: DatabaseConnection | null = null
  private connected: boolean = false

  // Private constructor prevents direct instantiation
  private constructor() {
    console.log('Database connection created')
  }

  // Static method to get the single instance
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public connect(): void {
    if (!this.connected) {
      this.connected = true
      console.log('Connected to database')
    }
  }

  public query(sql: string): void {
    if (!this.connected) {
      throw new Error('Not connected to database')
    }
    console.log(`Executing query: ${sql}`)
  }

  public disconnect(): void {
    this.connected = false
    console.log('Disconnected from database')
  }
}

// Usage
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()

console.log(db1 === db2) // true - same instance

db1.connect()
db1.query('SELECT * FROM users')

/**
 * Logger Singleton
 */
class Logger {
  private static instance: Logger
  private logs: string[] = []

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public log(message: string): void {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] ${message}`
    this.logs.push(logEntry)
    console.log(logEntry)
  }

  public getLogs(): string[] {
    return [...this.logs]
  }

  public clearLogs(): void {
    this.logs = []
  }
}

// Usage in Next.js API route
export async function GET(request: Request) {
  const logger = Logger.getInstance()
  logger.log('API route accessed')
  
  return Response.json({
    message: 'Success',
    logs: logger.getLogs()
  })
}

/**
 * Configuration Singleton
 */
class AppConfig {
  private static instance: AppConfig
  private config: Record<string, any> = {}

  private constructor() {
    // Load configuration
    this.config = {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      environment: process.env.NODE_ENV,
      features: {
        enableAnalytics: true,
        enableNotifications: true
      }
    }
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig()
    }
    return AppConfig.instance
  }

  public get(key: string): any {
    return this.config[key]
  }

  public set(key: string, value: any): void {
    this.config[key] = value
  }

  public getAll(): Record<string, any> {
    return { ...this.config }
  }
}

// Usage
const config = AppConfig.getInstance()
const apiUrl = config.get('apiUrl')

/**
 * Modern Singleton with Module Pattern
 * 
 * In modern JavaScript/TypeScript, you can use module scope
 * for simpler singletons
 */

// cache.ts
class CacheManager {
  private cache = new Map<string, any>()

  public set(key: string, value: any, ttl?: number): void {
    this.cache.set(key, {
      value,
      expires: ttl ? Date.now() + ttl : null
    })
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    if (item.expires && Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  public delete(key: string): void {
    this.cache.delete(key)
  }

  public clear(): void {
    this.cache.clear()
  }

  public size(): number {
    return this.cache.size
  }
}

// Export single instance
export const cacheManager = new CacheManager()

// Usage in other files
// import { cacheManager } from './cache'
// cacheManager.set('user:123', userData, 3600)
