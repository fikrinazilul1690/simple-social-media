import axios from './axios';

export const getComments = async (postId, controller) => {
  return await axios.get(`/comments/`, {
    signal: controller.signal,
    params: { postId },
  });
};

export const addComment = async (name, email, postId, body) => {
  return await axios.post('/comments', { postId, name, email, body });
};
