import { useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
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
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registre correcte!");

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Error al registrar usuari");
    } finally {
      setLoading(false);
    }
  };
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