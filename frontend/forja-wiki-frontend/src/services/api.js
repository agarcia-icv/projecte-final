import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const getPostsByCategory = async (tipusId) => {
  const res = await api.get(`/posts?tipus=${tipusId}`);
  return res.data;
};



export const loginUser = async (form) => {
  const res = await api.post("/login", form);
  return res.data;
};

export const registerUser = async (form) => {
  const res = await api.post("/register", form);
  return res.data;
};



export const createComment = async (postId, data) => {
  const res = await api.post(`/posts/${postId}/comentaris`, data);
  return res.data;
};


export default api;