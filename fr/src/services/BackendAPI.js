import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_HOST_API,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 10000,
})

const upload = async (formData, fileName, callbackFunction) => {
  const response = await apiClient.post('upload', formData, {
    onUploadProgress: (progressEvent) => {
      callbackFunction(progressEvent, fileName)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

const createDemographic = async (formData) => {
  const response = await apiClient.post('create/demographic', formData)
  return response.data
}

const getAvailableFiles = async () => {
  const response = await apiClient.get('files')
  return response.data
}

const getAvailableDemographics = async () => {
  const response = await apiClient.get('demographics')
  return response.data
}

const getMarkers = async (hash) => {
  const response = await apiClient.get('markers/' + hash)
  return response.data
}

const processData = async (
  id,
  file,
  demographic,
  essentialMarkers,
  trackingMarkers
) => {
  const response = await apiClient.post('process', {
    id,
    file,
    demographic,
    essentialMarkers,
    trackingMarkers,
  })
  return response.data
}

export {
  upload,
  createDemographic,
  getAvailableFiles,
  getAvailableDemographics,
  getMarkers,
  processData,
}
