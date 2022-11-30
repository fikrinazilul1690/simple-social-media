import axios from './axios';

export const getUser = async (userId, controller) => {
  return await axios.get(`/users/${userId}`, {
    signal: controller.signal,
  });
};

export const getUsers = async (controller) => {
  return await axios.get(`/users`, {
    signal: controller.signal,
    params: { _sort: 'name', _order: 'asc' },
  });
};

export const addUser = async (name, email) => {
  return await axios.post('/users', { name, email });
};
