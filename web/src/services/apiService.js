import axios from 'axios';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export const registerUser = (userData) => apiService.post('/user/register', userData);
export const loginUser = (userData) => apiService.post('/user/login', userData,);

export const uploadDocument = (formData, config) => apiService.post('/docs/upload', formData, config);
export const getAllDocuments = () => apiService.get('/docs');
export const getDocumentById = (documentId) => apiService.get(`/docs/${documentId}`);
export const editDocument = (documentId, newData) => apiService.patch(`/docs/${documentId}`, newData);
export const deleteDocument = (documentId) => apiService.delete(`/docs/${documentId}`);

export const getProfile = (userId) => apiService.get(`/user/${userId}`);