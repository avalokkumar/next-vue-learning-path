import type { InjectionKey, Ref } from 'vue'

export interface User {
  name: string
  role: string
}

// Create typed injection keys for type safety
export const ThemeKey: InjectionKey<Ref<string>> = Symbol('theme')
export const UserKey: InjectionKey<Ref<User>> = Symbol('user')
