import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()

    // 👤 usuari mock
    if (form.email === "daniel@test.com" && form.password === "123456") {

      const user = {
        id: 1,
        name: "Daniel",
        email: form.email,
        bio: "Apasionat de la forja 🔨",
        avatar: "https://i.pravatar.cc/300"
      }

      localStorage.setItem("user", JSON.stringify(user))

      alert("Login correcte!")

      navigate("/profile")

    } else {
      alert("Credencials incorrectes")
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