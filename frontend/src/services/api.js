import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // API giả
});

export const getPosts = () => api.get('/posts');
