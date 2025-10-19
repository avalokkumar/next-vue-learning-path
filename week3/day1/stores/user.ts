import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  
  // Load from localStorage
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')
  if (savedUser && savedToken) {
    user.value = JSON.parse(savedUser)
    token.value = savedToken
  }
  
  // Getters
  const isLoggedIn = computed(() => user.value !== null && token.value !== null)
  const userName = computed(() => user.value?.name || 'Guest')
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Actions
  function login(userData: User, authToken: string) {
    user.value = userData
    token.value = authToken
    
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', authToken)
  }
  
  function logout() {
    user.value = null
    token.value = null
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  
  function updateProfile(updates: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }
  
  return {
    // State
    user,
    token,
    // Getters
    isLoggedIn,
    userName,
    isAdmin,
    // Actions
    login,
    logout,
    updateProfile
  }
})
