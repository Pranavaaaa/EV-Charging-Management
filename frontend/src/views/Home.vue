<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../services/api'

const stations = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()

// Fetch all stations
const fetchStations = async () => {
  try {
    loading.value = true
    stations.value = (await apiService.get('/ev/stations')).data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Delete station
const deleteStation = async (stationId) => {
  if (!confirm('Are you sure you want to delete this station?')) return

  try {
    await apiService.delete(`/ev/stations/${stationId}`)
    stations.value = stations.value.filter(station => station._id !== stationId)
  } catch (err) {
    error.value = err.message
  }
}

// Edit station
const editStation = (stationId) => {
  router.push(`/edit-station/${stationId}`)
}

// Add logout handler
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(fetchStations)
</script>

<template>
  <div class="page-container">
    <!-- Header Card -->
    <div class="header-card">
      <div class="header-actions">
        <button class="header-button map">
          <i class="fas fa-map-marked-alt"></i>
          View Map
        </button>
        <button class="header-button add" @click="router.push('/add-station')">
          <i class="fas fa-plus"></i>
          Add Station
        </button>
        <button class="header-button stats">
          <i class="fas fa-chart-line"></i>
          Statistics
        </button>
        <button class="header-button logout" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>

    <!-- Content Card -->
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <h1>My Charging Stations</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading stations...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </div>

      <!-- No Stations State -->
      <div v-else-if="stations.length === 0" class="empty-state">
        <i class="fas fa-charging-station"></i>
        <p>No charging stations found. Add your first station!</p>
      </div>

      <!-- Stations Table -->
      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Power Output</th>
              <th>Connector Type</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="station in stations" :key="station._id">
              <td>{{ station.name }}</td>
              <td>
                <span :class="['status-badge', station.status === 'Active' ? 'active' : 'inactive']">
                  {{ station.status }}
                </span>
              </td>
              <td>{{ station.powerOutput }} kW</td>
              <td>{{ station.connectorType }}</td>
              <td>{{ station.latitude.toFixed(4) }}, {{ station.longitude.toFixed(4) }}</td>
              <td class="actions">
                <button class="action-button edit" @click="editStation(station._id)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-button delete" @click="deleteStation(station._id)" title="Delete">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.header-card {
  max-width: 1200px;
  margin: 0 auto 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-button {
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.header-button i {
  font-size: 1.2rem;
}

.header-button.map {
  background: #4299e1;
  color: white;
}

.header-button.map:hover {
  background: #3182ce;
}

.header-button.add {
  background: #48bb78;
  color: white;
}

.header-button.add:hover {
  background: #38a169;
}

.header-button.stats {
  background: #9f7aea;
  color: white;
}

.header-button.stats:hover {
  background: #805ad5;
}

.header-button.logout {
  background: #f56565;
  color: white;
}

.header-button.logout:hover {
  background: #e53e3e;
}

.header-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eef2f7;
}

.header-section h1 {
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eef2f7;
}

th {
  background: #f8fafc;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f8fafc;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: #c6f6d5;
  color: #2f855a;
}

.status-badge.inactive {
  background-color: #fed7d7;
  color: #c53030;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.action-button.edit {
  color: #4299e1;
}

.action-button.delete {
  color: #f56565;
}

.action-button:hover {
  transform: scale(1.1);
}

.loading-container {
  text-align: center;
  padding: 3rem;
  color: #4a5568;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4299e1;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.error-message {
  background: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #cbd5e0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .header-section {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }

  .header-actions {
    flex-direction: column;
  }

  .header-button {
    width: 100%;
  }

  .header-card {
    margin: 1rem auto;
    padding: 1rem;
  }
}
</style>
