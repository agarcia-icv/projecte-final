import { useState } from "react"

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      console.log("REGISTER ENVIANT:", form)

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      console.log("STATUS:", response.status)
      console.log("URL:", response.url)

      const data = await response.json()

      console.log("RESPOSTA BACKEND:", data)

      if (!response.ok) {
        console.error("ERROR BACKEND:", data)
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        console.log("USUARI GUARDAT")
      }

    } catch (error) {
      console.error("ERROR FETCH:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Nom"
          className="form-control mb-2"
          onChange={handleChange}
          value={form.name}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
          value={form.email}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={handleChange}
          value={form.password}
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Registrant..." : "Registrar"}
        </button>

      </form>
    </div>
  )
}

export default Register