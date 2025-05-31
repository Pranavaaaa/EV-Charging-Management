<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  fullname: {
    firstname: '',
    lastname: ''
  },
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const loading = ref(false)
const successMessage = ref('')

const handleRegister = async (e) => {
  e.preventDefault()
  
  // Basic validation
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (formData.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const response = await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: formData.value.fullname,
        email: formData.value.email,
        password: formData.value.password
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    // Show success message
    successMessage.value = 'Registration successful! Redirecting to login...'
    
    // Clear form
    formData.value = {
      fullname: { firstname: '', lastname: '' },
      email: '',
      password: '',
      confirmPassword: ''
    }

    // Redirect after delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <form class="register-form" @submit="handleRegister">
      <h2>Create Account</h2>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-alert">
        {{ successMessage }}
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="error-alert">
        {{ error }}
      </div>

      <!-- First Name -->
      <div class="form-group">
        <label for="firstname">First Name*</label>
        <input
          id="firstname"
          v-model="formData.fullname.firstname"
          type="text"
          required
          placeholder="Enter your first name"
          :disabled="loading"
          minlength="2"
        />
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastname">Last Name*</label>
        <input
          id="lastname"
          v-model="formData.fullname.lastname"
          type="text"
          required
          placeholder="Enter your last name"
          :disabled="loading"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email*</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="Enter your email"
          :disabled="loading"
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password*</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          placeholder="Enter your password"
          :disabled="loading"
          minlength="6"
        />
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password*</label>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
          :disabled="loading"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating Account...' : 'Register' }}
      </button>

      <!-- Login Link -->
      <div class="login-link">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  padding: 1rem;
}

.register-form {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.register-form h2 {
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

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-alert {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.success-alert {
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  color: #15803d;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.login-link {
  text-align: center;
  font-size: 0.875rem;
  color: #666;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.25rem;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
