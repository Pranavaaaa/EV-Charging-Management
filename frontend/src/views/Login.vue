<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Login</h2>
      
      <!-- Error Alert -->
      <div v-if="error" class="error-alert">
        {{ error }}
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
          :disabled="loading"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          :disabled="loading"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <!-- Register Link -->
      <div class="register-link">
        Don't have an account? 
        <router-link to="/register">Register here</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Store token and user data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Update auth state
    await login(data.user)

    // Redirect to home
    router.push('/home')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}

.login-form {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-size: 0.95rem;
  color: #555;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border-color: #007bff;
}

button {
  padding: 0.7rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0056b3;
}

.error-alert {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.25rem;
}

.register-link a:hover {
  text-decoration: underline;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>