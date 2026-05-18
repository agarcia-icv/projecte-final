import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function UpdatePost() {

  const { id } = useParams();
  const navigate = useNavigate();

  let currentUser = null;

  try {

    const stored = localStorage.getItem("user");

    if (stored && stored !== "undefined") {
      currentUser = JSON.parse(stored);
    }

  } catch (error) {

    console.error("USER LOCALSTORAGE CORRUPT:", error);
    localStorage.removeItem("user");
  }

  const isAllowed =
    currentUser?.rol === "admin" || currentUser?.rol === "editor";

  const [titol, setTitol] = useState("");
  const [descripcio, setDescripcio] = useState("");
  const [epoca, setEpoca] = useState("");
  const [imatge, setImatge] = useState(null);
  const [tipusEinaId, setTipusEinaId] = useState("");
  const [tipusEines, setTipusEines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [postRes, tipusRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get("/tipus-eines")
        ]);

        const post = postRes.data.data ?? postRes.data;

        setTitol(post.titol || "");
        setDescripcio(post.descripcio || "");
        setEpoca(post.epoca || "");
        setTipusEinaId(post.tipus_eina_id || "");

        const tipus = tipusRes.data.data ?? tipusRes.data ?? [];

        setTipusEines(Array.isArray(tipus) ? tipus : []);

        setLoading(false);

      } catch (error) {

        console.error("ERROR LOAD POST:", error);
      }
    };

    if (isAllowed) fetchData();

  }, [id, isAllowed]);

  if (!isAllowed) {

    return (
      <div className="container mt-5">
        <h3>No tens permisos per editar posts</h3>
      </div>
    );
  }

  if (loading) {

    return (
      <div className="container mt-5">
        <p>Carregant...</p>
      </div>
    );
  }

  const validate = () => {

    let newErrors = {};

    if (!titol.trim()) {

      newErrors.titol = "El títol és obligatori";

    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(titol)) {

      newErrors.titol =
        "El títol només pot contenir paraules";
    }

    if (!descripcio.trim()) {

      newErrors.descripcio =
        "La descripció és obligatòria";
    }

    if (!epoca.trim()) {

      newErrors.epoca = "L'època és obligatòria";

    } else {

      const currentYear = new Date().getFullYear();

      if (isNaN(epoca) || Number(epoca) >= currentYear) {

        newErrors.epoca =
          "L'època ha de ser anterior a l'any actual";
      }
    }

    if (!tipusEinaId) {

      newErrors.tipusEinaId =
        "Has de seleccionar un tipus d'eina";
    }

    if (!imatge) {

      newErrors.imatge =
        "Has de seleccionar una imatge";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const formData = new FormData();

      formData.append("titol", titol);
      formData.append("descripcio", descripcio);
      formData.append("epoca", epoca);
      formData.append("tipus_eina_id", tipusEinaId);

      if (imatge) {
        formData.append("imatge", imatge);
      }

      await api.post(`/posts/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate(`/post/${id}`);

    } catch (error) {

      console.error("ERROR UPDATE POST:", error);
    }
  };

  return (
    <div className="createpost-bg">

      <div className="container">

        <div className="createpost-card">

          <h2 className="createpost-title">
            Editar post
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="createpost-label">
                Títol
              </label>

              <input
                type="text"
                className="createpost-input"
                value={titol}
                onChange={(e) => {

                  setTitol(e.target.value);

                  setErrors({
                    ...errors,
                    titol: ""
                  });
                }}
              />

              {errors.titol && (
                <div className="text-danger mt-1">
                  {errors.titol}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label className="createpost-label">
                Descripció
              </label>

              <textarea
                className="createpost-input"
                value={descripcio}
                onChange={(e) => {

                  setDescripcio(e.target.value);

                  setErrors({
                    ...errors,
                    descripcio: ""
                  });
                }}
              />

              {errors.descripcio && (
                <div className="text-danger mt-1">
                  {errors.descripcio}
                </div>
              )}

            </div>

            {/* EPOCA */}
            <div className="mb-3">

              <label className="createpost-label">
                Època
              </label>

              <input
                type="number"
                className="createpost-input"
                value={epoca}
                onChange={(e) => {

                  setEpoca(e.target.value);

                  setErrors({
                    ...errors,
                    epoca: ""
                  });
                }}
              />

              {errors.epoca && (
                <div className="text-danger mt-1">
                  {errors.epoca}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label className="createpost-label">
                Tipus d'eina
              </label>

              <select
                className="createpost-input"
                value={tipusEinaId}
                onChange={(e) => {

                  setTipusEinaId(e.target.value);

                  setErrors({
                    ...errors,
                    tipusEinaId: ""
                  });
                }}
              >

                <option value="">
                  Selecciona...
                </option>

                {tipusEines.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nom}
                  </option>
                ))}

              </select>

              {errors.tipusEinaId && (
                <div className="text-danger mt-1">
                  {errors.tipusEinaId}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label className="createpost-label">
                Imatge
              </label>

              <input
                type="file"
                className="createpost-input"
                accept="image/*"
                onChange={(e) => {

                  setImatge(e.target.files[0]);

                  setErrors({
                    ...errors,
                    imatge: ""
                  });
                }}
              />

              {errors.imatge && (
                <div className="text-danger mt-1">
                  {errors.imatge}
                </div>
              )}

            </div>

            <button className="createpost-btn">
              Guardar canvis
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default UpdatePost;