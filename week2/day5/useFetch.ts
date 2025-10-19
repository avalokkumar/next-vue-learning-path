import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T>()
  const error = ref<Error>()
  const loading = ref(false)
  
  const fetchData = async () => {
    loading.value = true
    error.value = undefined
    
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Fetch failed')
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  // Auto-fetch on creation
  fetchData()
  
  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}
