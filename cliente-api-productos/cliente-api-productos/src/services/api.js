import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// --- Métodos CRUD ---
export const getProductos = async () => {
  const { data } = await api.get('/productos')
  return data
}

export const createProducto = async (producto) => {
  const { data } = await api.post('/productos', producto)
  return data
}

export const updateProducto = async (id, producto) => {
  const { data } = await api.put(`/productos/${id}`, producto)
  return data
}

export const deleteProducto = async (id) => {
  const { data } = await api.delete(`/productos/${id}`)
  return data
}
