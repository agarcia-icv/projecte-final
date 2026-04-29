const API_URL = "http://127.0.0.1:8000/api"

// 🔹 POSTS
export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`)
  const data = await res.json()
  return data.data
}

export async function getPost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`)
  return await res.json()
}

// 🔹 LOGIN
export async function loginUser(form) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })

  return await res.json()
}

// 🔹 REGISTER
export async function registerUser(form) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })

  return await res.json()
}

// 🔹 CREAR COMENTARI
export async function createComment(data) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/comentaris`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  return await res.json()
}