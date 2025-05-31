<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiService } from '../services/api'

const router = useRouter()
const route = useRoute()
const stationId = route.params.id

const formData = ref({
  name: '',
  latitude: '',
  longitude: '',
  powerOutput: '',
  status: '',
  connectorType: ''
})

const loading = ref(false)
const error = ref('')
const successMessage = ref('')

// Connector types from backend schema
const connectorTypes = ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'Other']
const statusTypes = ['Active', 'Inactive']

// Fetch station data
const fetchStationData = async () => {
  try {
    loading.value = true
    const data = await apiService.get(`/ev/stations/${stationId}`)
    formData.value = data.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Validate coordinates
const validateCoordinates = () => {
  const lat = parseFloat(formData.value.latitude)
  const lng = parseFloat(formData.value.longitude)

  if (isNaN(lat) || lat < -90 || lat > 90) {
    error.value = 'Invalid latitude. Must be between -90 and 90'
    return false
  }

  if (isNaN(lng) || lng < -180 || lng > 180) {
    error.value = 'Invalid longitude. Must be between -180 and 180'
    return false
  }

  return true
}

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateCoordinates()) return

  try {
    loading.value = true
    await apiService.put(`/ev/stations/${stationId}`, formData.value)
    successMessage.value = 'Station updated successfully!'
    setTimeout(() => router.push('/home'), 2000)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Fetch station data on component mount
onMounted(fetchStationData)
</script>

<template>
  <div class="edit-station-container">
    <form class="station-form" @submit="handleSubmit">
      <h2>Edit Charging Station</h2>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-alert">
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="error-alert">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading && !successMessage" class="loading-state">
        <div class="spinner"></div>
        <p>Loading station data...</p>
      </div>

      <div v-else>
        <!-- Station Name -->
        <div class="form-group">
          <label for="name">Station Name*</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Enter station name"
            :disabled="loading"
          />
        </div>

        <!-- Coordinates -->
        <div class="coordinates-group">
          <div class="form-group">
            <label for="latitude">Latitude*</label>
            <input
              id="latitude"
              v-model="formData.latitude"
              type="number"
              step="any"
              required
              placeholder="Enter latitude (-90 to 90)"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="longitude">Longitude*</label>
            <input
              id="longitude"
              v-model="formData.longitude"
              type="number"
              step="any"
              required
              placeholder="Enter longitude (-180 to 180)"
              :disabled="loading"
            />
          </div>
        </div>

        <!-- Power Output -->
        <div class="form-group">
          <label for="powerOutput">Power Output (kW)*</label>
          <input
            id="powerOutput"
            v-model="formData.powerOutput"
            type="number"
            step="0.1"
            required
            placeholder="Enter power output"
            :disabled="loading"
          />
        </div>

        <!-- Status Dropdown -->
        <div class="form-group">
          <label for="status">Status*</label>
          <select
            id="status"
            v-model="formData.status"
            required
            :disabled="loading"
            class="custom-select"
          >
            <option v-for="status in statusTypes" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <!-- Connector Type Dropdown -->
        <div class="form-group">
          <label for="connectorType">Connector Type*</label>
          <select
            id="connectorType"
            v-model="formData.connectorType"
            required
            :disabled="loading"
            class="custom-select"
          >
            <option v-for="type in connectorTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <button 
            type="button" 
            class="cancel-button"
            @click="router.push('/home')"
            :disabled="loading"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="submit-button"
            :disabled="loading"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            {{ loading ? 'Updating...' : 'Update Station' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.edit-station-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.loading-state {
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3182ce;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ... Include all other styles from AddStation.vue ... */
.add-station-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.station-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.station-form h2 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.coordinates-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

input,
.custom-select {
  width: 100%;
  padding: 0.75rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

input:focus,
.custom-select:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  outline: none;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button,
.submit-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background: #edf2f7;
  color: #4a5568;
  border: none;
}

.cancel-button:hover {
  background: #e2e8f0;
}

.submit-button {
  background: #4299e1;
  color: white;
  border: none;
}

.submit-button:hover {
  background: #3182ce;
}

.submit-button:disabled,
.cancel-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-alert,
.success-alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-alert {
  background: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.success-alert {
  background: #f0fff4;
  color: #2f855a;
  border: 1px solid #9ae6b4;
}

@media (max-width: 640px) {
  .coordinates-group {
    grid-template-columns: 1fr;
  }

  .add-station-container {
    padding: 1rem;
  }

  .station-form {
    padding: 1.5rem;
  }
}
</style>