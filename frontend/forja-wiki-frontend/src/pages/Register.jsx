import { useState } from "react"
import { registerUser } from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
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

    const res = await registerUser(form)

    if (res.token) {
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))

      navigate("/")
    } else {
      alert("Error al registrar")
    }
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Nom"
          onChange={handleChange}
        />

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

        <button className="btn btn-success">Crear compte</button>
      </form>
    </div>
  )
}

export default Register