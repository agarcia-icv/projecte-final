import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
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
export const getPostsByCategory = async (id) => {
  const res = await api.get(`/posts?tipus=${id}`)
  return res.data
}

export const getSortedPosts = async (
  sort = "created_at",
  direction = "desc"
) => {

  const res = await api.get(
    `/posts?sort=${sort}&direction=${direction}`
  )

  return res.data.posts || res.data
}

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