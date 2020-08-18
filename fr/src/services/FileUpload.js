import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BACKEND_SERVER,
  withCredentials: false,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 10000,
})

const upload = async (formData) => {
  const response = await apiClient.post('upload', formData)
  return response.data
}
export {
  upload,
}
