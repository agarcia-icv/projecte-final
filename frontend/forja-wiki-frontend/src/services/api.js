const API_URL = "http://127.0.0.1:8000/api"
export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`)
  const data = await response.json()

  return data.data
}

export async function getPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`)
  const data = await response.json()

  return data
}

export async function register(userData) {
  const response = await fetch("http://127.0.0.1:8000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })

  return await response.json()
}

export async function login(userData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })

  return await response.json()
}