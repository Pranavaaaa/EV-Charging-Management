<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-card">
      <div class="error-icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <button @click="router.push('/')">
        <i class="fas fa-home"></i>
        Return to Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  padding: 1rem;
}

.not-found-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.error-icon {
  font-size: 4rem;
  color: #dc2626;
  margin-bottom: 1rem;
}

h1 {
  font-size: 3.5rem;
  color: #333;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 1.5rem;
  color: #4b5563;
  margin: 1rem 0;
}

p {
  color: #6b7280;
  margin-bottom: 2rem;
}

button {
  padding: 0.7rem 1.5rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  background: #0056b3;
}

button i {
  font-size: 0.9em;
}
</style>
