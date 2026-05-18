import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreatePost() {

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

  const [errors, setErrors] = useState({});

  useEffect(() => {

    const fetchTipus = async () => {

      try {

        const res = await api.get("/tipus-eines");
        setTipusEines(res.data.data || res.data);

      } catch (error) {

        console.error("ERROR GET TIPUS:", error);
      }
    };

    if (isAllowed) fetchTipus();

  }, [isAllowed]);

  if (!isAllowed) {

    return (
      <div className="container mt-5 text-white">
        No tens permisos per crear posts
      </div>
    );
  }

  const validate = () => {

    let newErrors = {};

    if (!titol.trim()) {

      newErrors.titol = "El títol és obligatori";

    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(titol)) {

      newErrors.titol = "El títol només pot contenir paraules";
    }

    if (!descripcio.trim()) {

      newErrors.descripcio = "La descripció és obligatòria";
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
        "Has de seleccionar una categoria";
    }

    if (!imatge) {

      newErrors.imatge = "La imatge és obligatòria";
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

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/", { state: { refresh: true } });

    } catch (error) {

      console.error("ERROR CREATE POST:", error);
    }
  };

  return (
    <div className="createpost-bg">

      <div className="container">

        <div className="createpost-card">

          <h2 className="createpost-title">
            Crear nou post
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
                <div className="text-white mt-1">
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
                <div className="text-white mt-1">
                  {errors.descripcio}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label className="createpost-label">
                Època (any)
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
                <div className="text-white mt-1">
                  {errors.epoca}
                </div>
              )}

            </div>

            <div className="mb-3">

              <label className="createpost-label">
                Categoria
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
                <div className="text-white mt-1">
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
                <div className="text-white mt-1">
                  {errors.imatge}
                </div>
              )}

            </div>

            <button className="createpost-btn">
              Crear Post
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreatePost;