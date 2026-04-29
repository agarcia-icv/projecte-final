import { useState } from "react"
import { loginUser } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
const { login } = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password
      })

      console.log("LOGIN:", res)

      if (res.token) {
        login(res)

        navigate("/")
      } else {
        alert(res.message || "Login error")
      }

    } catch (err) {
      console.error("ERROR LOGIN:", err)
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login