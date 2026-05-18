import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      general: ""
    });
  };

  const validate = () => {

    let newErrors = {};

    if (!form.name.trim()) {

      newErrors.name = "El nom és obligatori";

    } else if (form.name.length > 15) {

      newErrors.name =
        "El nom no pot superar els 15 caràcters";
    }

    // EMAIL
    if (!form.email.trim()) {

      newErrors.email = "L'email és obligatori";

    } else if (!form.email.includes("@")) {

      newErrors.email =
        "L'email ha de contenir @";
    }

    if (!form.password.trim()) {

      newErrors.password =
        "La contrasenya és obligatòria";

    } else if (form.password.length < 6) {

      newErrors.password =
        "La contrasenya ha de tenir mínim 6 caràcters";

    } else if (
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password)
    ) {

      newErrors.password =
        "La contrasenya ha de tenir majúscules i minúscules";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const res = await api.post("/register", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Registre correcte!");

      navigate("/profile");

    } catch (error) {

      console.error(error);

      if (error.response?.data?.errors) {

        const backendErrors = error.response.data.errors;

        let newErrors = {};

        if (backendErrors.name) {
          newErrors.name =
            "Aquest nom d'usuari ja existeix";
        }

        if (backendErrors.email) {
          newErrors.email =
            "Aquest email ja està registrat";
        }

        setErrors(newErrors);

      } else {

        setErrors({
          general: "Error al registrar usuari"
        });
      }

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="register-page container">

      <div className="register-card">

        <h2 className="register-title">
          Register
        </h2>

        {errors.general && (
          <div className="alert alert-danger">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Nom"
            className="mb-1 register-input w-100"
            onChange={handleChange}
            value={form.name}
          />

          {errors.name && (
            <div className="text-white mb-3">
              {errors.name}
            </div>
          )}

          <input
            name="email"
            placeholder="Email"
            className="mb-1 register-input w-100"
            onChange={handleChange}
            value={form.email}
          />

          {errors.email && (
            <div className="text-white mb-3">
              {errors.email}
            </div>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-1 register-input w-100"
            onChange={handleChange}
            value={form.password}
          />

          {errors.password && (
            <div className="text-white mb-3">
              {errors.password}
            </div>
          )}

          <button
            className="register-btn w-100"
            disabled={loading}
          >

            {loading
              ? "Registrant..."
              : "Registrar"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;