import axiosClient from './axiosClient';

export const getTasksApi = async (params = {}) => {
  const response = await axiosClient.get('/tasks', { params });
  return response.data;
};

export const getTaskByIdApi = async (id) => {
  const response = await axiosClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTaskApi = async (taskData) => {
  const response = await axiosClient.post('/tasks', taskData);
  return response.data;
};

export const updateTaskApi = async (id, taskData) => {
  const response = await axiosClient.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTaskApi = async (id) => {
  const response = await axiosClient.delete(`/tasks/${id}`);
  return response.data;
};
