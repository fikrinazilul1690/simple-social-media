import axios from './axios';

export const getPosts = async (controller, title) => {
  return await axios.get('/posts', {
    signal: controller.signal,
    params: { title_like: title, _sort: 'id', _order: 'desc' },
  });
};

export const getPost = async (postId, controller) => {
  return await axios.get(`/posts/${postId}`, {
    signal: controller.signal,
  });
};

export const addPost = async (title, body, userId) => {
  return await axios.post('/posts', { title, body, userId });
};
