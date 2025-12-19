import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY || 'demo'
// Using /latest endpoint with correct pagination
const API_BASE_URL = 'https://newsdata.io/api/1/latest'

// Create axios instance with default config
const newsAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
newsAPI.interceptors.request.use(
  (config) => {
    // Add API key to all requests
    config.params = {
      ...config.params,
      apikey: API_KEY,
    }
    console.log('📡 API Request:', config.params)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
newsAPI.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Status:', response.data.status)
    // Handle NewsData.io specific response structure
    if (response.data.status === 'success') {
      return response.data
    } else {
      // Handle API errors
      const errorMessage = response.data.results?.message || response.data.message || 'Failed to fetch news'
      console.error('❌ API Error:', errorMessage)
      throw new Error(errorMessage)
    }
  },
  (error) => {
    // Handle network errors
    let errorMessage = 'Network error'

    if (error.response) {
      // Server responded with error status
      console.error('❌ HTTP Error:', error.response.status, error.response.data)
      
      // Handle specific HTTP errors
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid query parameters'
          break
        case 401:
          errorMessage = 'Unauthorized: Invalid or expired API key'
          break
        case 403:
          errorMessage = 'Forbidden: Access denied to this resource'
          break
        case 404:
          errorMessage = 'Not Found: Endpoint not found'
          break
        case 422:
          // Extract detailed error message from NewsData.io
          const apiError = error.response.data?.results || error.response.data
          if (apiError?.code === 'UnsupportedFilter') {
            errorMessage = 'Invalid pagination token. Starting fresh...'
          } else {
            errorMessage = `Unprocessable Entity: ${apiError?.message || 'Check your query parameters'}`
          }
          break
        case 429:
          errorMessage = 'Rate Limited: Too many requests. Please wait.'
          break
        case 500:
          errorMessage = 'Server Error: NewsData.io server is having issues'
          break
        default:
          errorMessage = `Server Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`
      }
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No Response:', error.request)
      errorMessage = 'Network error: No response from server'
    } else {
      // Error in request setup
      console.error('❌ Request Error:', error.message)
      errorMessage = 'Error: ' + error.message
    }

    return Promise.reject(new Error(errorMessage))
  }
)

/**
 * Fetch news articles with filters
 * @param {Object} params - Query parameters
 * @param {string} params.country - Country code (us, gb, in, etc.)
 * @param {string} [params.q] - Search query
 * @param {string} [params.page] - Page token (from nextPage in response, NOT a number!)
 * @param {string} [params.category] - News category
 * @param {string} [params.language] - Language code
 * @returns {Promise<Object>} NewsData.io response with results array and nextPage token
 */
export const fetchNews = async (params = {}) => {
  try {
    // Validate required parameters
    if (!params.country) {
      throw new Error('Country parameter is required')
    }

    // IMPORTANT: Don't send page parameter with numeric values
    // Only send page if it's a valid token from nextPage
    if (params.page === 0 || params.page === null || params.page === undefined) {
      delete params.page
    }

    const response = await newsAPI.get('', { params })
    return response
  } catch (error) {
    throw error
  }
}

/**
 * Search news with query
 * @param {string} query - Search query
 * @param {string} country - Country code
 * @param {string} pageToken - Page token from nextPage (optional, for pagination)
 * @returns {Promise<Object>} NewsData.io response
 */
export const searchNews = async (query, country = 'us', pageToken = null) => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty')
  }

  const params = {
    q: query,
    country: country,
  }

  // Only add page if it's a valid token string
  if (pageToken && typeof pageToken === 'string') {
    params.page = pageToken
  }

  return fetchNews(params)
}

/**
 * Get news by country
 * @param {string} country - Country code (us, gb, in, au, ca, etc.)
 * @param {string} pageToken - Page token from nextPage (optional, for pagination)
 * @returns {Promise<Object>} NewsData.io response with nextPage token
 */
export const getNewsByCountry = async (country = 'us', pageToken = null) => {
  const params = {
    country: country,
  }

  // Only add page if it's a valid token string
  if (pageToken && typeof pageToken === 'string') {
    params.page = pageToken
  }

  return fetchNews(params)
}

/**
 * Get news by category
 * @param {string} category - News category (business, sports, politics, etc.)
 * @param {string} country - Country code
 * @param {string} pageToken - Page token from nextPage (optional)
 * @returns {Promise<Object>} NewsData.io response
 */
export const getNewsByCategory = async (category, country = 'us', pageToken = null) => {
  const params = {
    category: category,
    country: country,
  }

  if (pageToken && typeof pageToken === 'string') {
    params.page = pageToken
  }

  return fetchNews(params)
}

/**
 * Get news with multiple filters
 * @param {Object} filters - Object with filters
 * @param {string} filters.country - Country code (required)
 * @param {string} [filters.q] - Search query
 * @param {string} [filters.category] - Category
 * @param {string} [filters.language] - Language
 * @param {string} [filters.page] - Page token from nextPage
 * @returns {Promise<Object>} NewsData.io response
 */
export const getNewsWithFilters = async (filters = {}) => {
  const { country = 'us', page = null, ...restFilters } = filters
  
  const params = {
    country,
    ...restFilters,
  }

  // Only add page if it's a valid token
  if (page && typeof page === 'string') {
    params.page = page
  }

  return fetchNews(params)
}

export default newsAPI