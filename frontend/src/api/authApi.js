import axiosClient from './axiosClient';

export const registerUserApi = async (userData) => {
  const response = await axiosClient.post('/auth/register', userData);
  return response.data;
};

export const loginUserApi = async (credentials) => {
  const response = await axiosClient.post('/auth/login', credentials);
  return response.data;
};

export const getMeApi = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};
