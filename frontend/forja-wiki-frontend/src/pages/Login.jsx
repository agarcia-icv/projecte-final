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

      window.location.href = "/";
      alert("Login correcte!");

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Credencials incorrectes");
    }
  };

  return (
    <div className="login-bg container">

      <div className="login-card">

        <h2 className="login-title">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            className="login-input mb-3 w-100"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="login-input mb-3 w-100"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="login-btn w-100">
            Entrar
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login