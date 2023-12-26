import axios from 'axios';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export const registerUser = (userData) => apiService.post('/user/register', userData);
export const loginUser = (userData) => apiService.post('/user/login', userData,);

export const uploadDocument = (formData, config) => apiService.post('/docs/upload', formData, config);
export const getAllDocuments = () => apiService.get('/docs');
export const getDocumentById = (documentId) => apiService.get(`/docs/${documentId}`);

export const editDocument = (documentId, token, newData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  return apiService.patch(`/docs/${documentId}`, config, newData);
};
export const deleteDocument = (documentId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  return apiService.delete(`/docs/${documentId}`, config);
};

export const searchDocument = (query) => apiService.get(`/docs/search?query=${query}`)
export const getProfile = (userId) => apiService.get(`/user/${userId}`);