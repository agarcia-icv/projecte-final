import { useState } from "react"
import { login } from "../services/api.js"

function Login() {
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

    const res = await login(form)
    console.log(res)
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />

        <button className="btn btn-success">Login</button>
      </form>
    </div>
  )
}

export default Login