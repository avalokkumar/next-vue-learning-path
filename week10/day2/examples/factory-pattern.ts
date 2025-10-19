/**
 * Factory Pattern
 * 
 * Creates objects without specifying exact class to create.
 * Useful when creation logic is complex or depends on conditions.
 */

// Payment interface
interface Payment {
  process(amount: number): Promise<{ success: boolean; transactionId: string }>
  refund(transactionId: string): Promise<boolean>
}

// Concrete implementations
class StripePayment implements Payment {
  async process(amount: number) {
    console.log(`Processing $${amount} via Stripe`)
    // Stripe-specific logic
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`
    }
  }

  async refund(transactionId: string) {
    console.log(`Refunding Stripe transaction: ${transactionId}`)
    return true
  }
}

class PayPalPayment implements Payment {
  async process(amount: number) {
    console.log(`Processing $${amount} via PayPal`)
    // PayPal-specific logic
    return {
      success: true,
      transactionId: `paypal_${Date.now()}`
    }
  }

  async refund(transactionId: string) {
    console.log(`Refunding PayPal transaction: ${transactionId}`)
    return true
  }
}

class CryptoPayment implements Payment {
  async process(amount: number) {
    console.log(`Processing $${amount} via Crypto`)
    // Crypto-specific logic
    return {
      success: true,
      transactionId: `crypto_${Date.now()}`
    }
  }

  async refund(transactionId: string) {
    console.log(`Refunding Crypto transaction: ${transactionId}`)
    return true
  }
}

// Factory class
class PaymentFactory {
  static createPayment(type: 'stripe' | 'paypal' | 'crypto'): Payment {
    switch (type) {
      case 'stripe':
        return new StripePayment()
      case 'paypal':
        return new PayPalPayment()
      case 'crypto':
        return new CryptoPayment()
      default:
        throw new Error(`Unknown payment type: ${type}`)
    }
  }
}

// Usage
const paymentMethod = 'stripe'
const payment = PaymentFactory.createPayment(paymentMethod)
await payment.process(99.99)

/**
 * Notification Factory Example
 */
interface Notification {
  send(recipient: string, message: string): Promise<void>
}

class EmailNotification implements Notification {
  async send(recipient: string, message: string) {
    console.log(`Sending email to ${recipient}: ${message}`)
    // Email sending logic
  }
}

class SMSNotification implements Notification {
  async send(recipient: string, message: string) {
    console.log(`Sending SMS to ${recipient}: ${message}`)
    // SMS sending logic
  }
}

class PushNotification implements Notification {
  async send(recipient: string, message: string) {
    console.log(`Sending push notification to ${recipient}: ${message}`)
    // Push notification logic
  }
}

class NotificationFactory {
  static create(type: 'email' | 'sms' | 'push'): Notification {
    const notifications = {
      email: EmailNotification,
      sms: SMSNotification,
      push: PushNotification
    }

    const NotificationClass = notifications[type]
    if (!NotificationClass) {
      throw new Error(`Unknown notification type: ${type}`)
    }

    return new NotificationClass()
  }
}

// Usage in Next.js API route
export async function POST(request: Request) {
  const { type, recipient, message } = await request.json()
  
  try {
    const notification = NotificationFactory.create(type)
    await notification.send(recipient, message)
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    )
  }
}

/**
 * Abstract Factory Pattern
 * 
 * Factory of factories - creates families of related objects
 */
interface Button {
  render(): string
}

interface Input {
  render(): string
}

// Light theme components
class LightButton implements Button {
  render() {
    return '<button class="light-button">Click me</button>'
  }
}

class LightInput implements Input {
  render() {
    return '<input class="light-input" />'
  }
}

// Dark theme components
class DarkButton implements Button {
  render() {
    return '<button class="dark-button">Click me</button>'
  }
}

class DarkInput implements Input {
  render() {
    return '<input class="dark-input" />'
  }
}

// Abstract factory interface
interface ThemeFactory {
  createButton(): Button
  createInput(): Input
}

// Concrete factories
class LightThemeFactory implements ThemeFactory {
  createButton() {
    return new LightButton()
  }
  
  createInput() {
    return new LightInput()
  }
}

class DarkThemeFactory implements ThemeFactory {
  createButton() {
    return new DarkButton()
  }
  
  createInput() {
    return new DarkInput()
  }
}

// Factory selector
class UIFactory {
  static getFactory(theme: 'light' | 'dark'): ThemeFactory {
    return theme === 'light' 
      ? new LightThemeFactory() 
      : new DarkThemeFactory()
  }
}

// Usage
const theme = 'dark'
const factory = UIFactory.getFactory(theme)
const button = factory.createButton()
const input = factory.createInput()

console.log(button.render())
console.log(input.render())

/**
 * Real-world Next.js Example: API Client Factory
 */
interface APIClient {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data: any): Promise<T>
}

class RESTClient implements APIClient {
  constructor(private baseURL: string) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`)
    return response.json()
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

class GraphQLClient implements APIClient {
  constructor(private baseURL: string) {}

  async get<T>(query: string): Promise<T> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const { data } = await response.json()
    return data
  }

  async post<T>(mutation: string, variables: any): Promise<T> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    })
    const { data } = await response.json()
    return data
  }
}

class APIClientFactory {
  static create(type: 'rest' | 'graphql'): APIClient {
    const baseURL = process.env.NEXT_PUBLIC_API_URL!
    
    return type === 'rest' 
      ? new RESTClient(baseURL)
      : new GraphQLClient(baseURL)
  }
}

// Usage
const apiClient = APIClientFactory.create('rest')
const users = await apiClient.get('/users')
