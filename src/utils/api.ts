const API_BASE_URL = 'http://localhost:3000'

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, ...fetchOptions } = options

  const headers = new Headers(fetchOptions.headers || {})
  
  if (fetchOptions.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // This is important for sending cookies
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'An error occurred')
  }

  return response.json()
}

// Example usage:
// GET request
// const data = await apiRequest('/products')

// POST request
// const data = await apiRequest('/products', {
//   method: 'POST',
//   body: JSON.stringify({ name: 'Product' })
// }) 