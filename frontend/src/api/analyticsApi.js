import axiosClient from './axiosClient';

export const getAnalyticsApi = async () => {
  const response = await axiosClient.get('/analytics');
  return response.data;
};
