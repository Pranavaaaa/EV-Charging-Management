<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../services/api';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const router = useRouter();
const stations = ref([]);
const loading = ref(true);
const error = ref(null);
const center = ref([20.5937, 78.9629]); // India's center coordinates
const zoom = ref(5);

// Fetch all stations
const fetchStations = async () => {
  try {
    loading.value = true;
    const response = await apiService.get('/ev/stations');
    stations.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Handle marker click
const handleMarkerClick = (station) => {
  // You can customize what happens when a marker is clicked
  console.log('Station clicked:', station);
};

onMounted(() => {
  fetchStations();
});
</script>

<template>
  <div class="map-container">
    <!-- Header Card (similar to Home.vue) -->
    <div class="header-card">
      <div class="header-actions">
        <button class="header-button list" @click="router.push('/home')">
          <i class="fas fa-list"></i>
          List View
        </button>
        <button class="header-button add" @click="router.push('/add-station')">
          <i class="fas fa-plus"></i>
          Add Station
        </button>
        <button class="header-button logout" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>

    <!-- Map Content -->
    <div class="content-wrapper">
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

      <!-- Map -->
      <div v-else class="map-wrapper">
        <l-map
          v-model:zoom="zoom"
          v-model:center="center"
          :use-global-leaflet="false"
          class="map"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>

          <!-- Markers for each station -->
          <l-marker
            v-for="station in stations"
            :key="station._id"
            :lat-lng="[station.latitude, station.longitude]"
            @click="handleMarkerClick(station)"
          >
            <l-popup>
              <div class="popup-content">
                <h3>{{ station.name }}</h3>
                <div class="station-details">
                  <p>
                    <span class="label">Status:</span>
                    <span :class="['status-badge', station.status === 'Active' ? 'active' : 'inactive']">
                      {{ station.status }}
                    </span>
                  </p>
                  <p><span class="label">Power Output:</span> {{ station.powerOutput }} kW</p>
                  <p><span class="label">Connector Type:</span> {{ station.connectorType }}</p>
                  <p><span class="label">Location:</span> {{ station.latitude.toFixed(4) }}, {{ station.longitude.toFixed(4) }}</p>
                </div>
                <div class="popup-actions">
                  <button @click="router.push(`/edit-station/${station._id}`)" class="edit-button">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.map-wrapper {
  height: 70vh;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.map {
  height: 100%;
  width: 100%;
}

.popup-content {
  padding: 0.5rem;
  min-width: 200px;
}

.popup-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.station-details {
  margin: 0.5rem 0;
}

.station-details p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.label {
  font-weight: 500;
  color: #4a5568;
  margin-right: 0.5rem;
}

.status-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
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

.popup-actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.edit-button {
  padding: 0.3rem 0.6rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: background 0.2s;
}

.edit-button:hover {
  background: #3182ce;
}

/* Reuse existing styles from Home.vue for header buttons, loading, and error states */
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

.filters-section {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 2rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-group label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #2d3748;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:hover {
  border-color: #cbd5e0;
}

.filter-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.clear-filters-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #edf2f7;
  border: none;
  border-radius: 6px;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-button:hover {
  background: #e2e8f0;
  color: #2d3748;
}

.clear-filters-button i {
  font-size: 0.75rem;
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

  .filters-section {
    flex-direction: column;
    padding: 1rem;
  }

  .filter-group {
    width: 100%;
  }

  .clear-filters-button {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>