import { config } from '../router/config.js'

class ApiService {
  constructor() {
    this.baseUrl = config.apiBaseUrl
  }

  getHeaders(requiresAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (requiresAuth) {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  async get(endpoint, requiresAuth = true) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(requiresAuth)
    })
    return await this.handleResponse(response)
  }

  async post(endpoint, data, requiresAuth = true) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(requiresAuth),
      body: JSON.stringify(data)
    })
    return await this.handleResponse(response)
  }

  async put(endpoint, data, requiresAuth = true) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(requiresAuth),
      body: JSON.stringify(data)
    })
    return await this.handleResponse(response)
  }

  async delete(endpoint, requiresAuth = true) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(requiresAuth)
    })
    return await this.handleResponse(response)
  }

  async handleResponse(response) {
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  }
}

export const apiService = new ApiService()