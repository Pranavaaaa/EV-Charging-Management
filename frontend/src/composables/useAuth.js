import { ref } from 'vue'

export function useAuth() {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = async (userData) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}