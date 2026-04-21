import { useState } from "react"
import { register } from "../services/api.js"

function Register() {
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

    const res = await register(form)
    console.log(res)
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" className="form-control mb-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />

        <button className="btn btn-primary">Registrar</button>
      </form>
    </div>
  )
}

export default Register