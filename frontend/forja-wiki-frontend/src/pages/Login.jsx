import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login correcte!");

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Credencials incorrectes");
    }
  };

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