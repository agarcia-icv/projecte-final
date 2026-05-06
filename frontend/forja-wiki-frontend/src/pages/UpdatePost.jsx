import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

function UpdatePost() {
  const { id } = useParams()
  const navigate = useNavigate()

  let currentUser = null

  try {
    const stored = localStorage.getItem("user")
    if (stored && stored !== "undefined") {
      currentUser = JSON.parse(stored)
    }
  } catch (error) {
    console.error("USER LOCALSTORAGE CORRUPT:", error)
    localStorage.removeItem("user")
  }

  const isAllowed =
    currentUser?.rol === "admin" || currentUser?.rol === "editor"

  const [titol, setTitol] = useState("")
  const [descripcio, setDescripcio] = useState("")
  const [epoca, setEpoca] = useState("")
  const [imatge, setImatge] = useState(null)
  const [tipusEinaId, setTipusEinaId] = useState("")
  const [tipusEines, setTipusEines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, tipusRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get("/tipus-eines")
        ])

        // 🔥 IMPORTANT: backend pot retornar data o directe
        const post = postRes.data.data ?? postRes.data

        setTitol(post.titol || "")
        setDescripcio(post.descripcio || "")
        setEpoca(post.epoca || "")
        setTipusEinaId(post.tipus_eina_id || "")

        // 🔥 IMPORTANT: assegurar array
        const tipus = tipusRes.data.data ?? tipusRes.data ?? []
        setTipusEines(Array.isArray(tipus) ? tipus : [])

        setLoading(false)

      } catch (error) {
        console.error("ERROR LOAD POST:", error)
      }
    }

    if (isAllowed) fetchData()
  }, [id, isAllowed])

  if (!isAllowed) {
    return (
      <div className="container mt-5">
        <h3>No tens permisos per editar posts</h3>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Carregant...</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("titol", titol)
      formData.append("descripcio", descripcio)
      formData.append("epoca", epoca)
      formData.append("tipus_eina_id", tipusEinaId)

      if (imatge) {
        formData.append("imatge", imatge)
      }

      await api.post(`/posts/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      navigate(`/post/${id}`)

    } catch (error) {
      console.error("ERROR UPDATE POST:", error)
    }
  }

  return (
    <div className="container mt-5">
      <h2>Editar post</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label>Títol</label>
          <input
            type="text"
            className="form-control"
            value={titol}
            onChange={(e) => setTitol(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Descripció</label>
          <textarea
            className="form-control"
            value={descripcio}
            onChange={(e) => setDescripcio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Època</label>
          <input
            type="text"
            className="form-control"
            value={epoca}
            onChange={(e) => setEpoca(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Tipus d'eina</label>
          <select
            className="form-control"
            value={tipusEinaId}
            onChange={(e) => setTipusEinaId(e.target.value)}
            required
          >
            <option value="">Selecciona...</option>

            {tipusEines.map(t => (
              <option key={t.id} value={t.id}>
                {t.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Imatge (opcional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImatge(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary">
          Guardar canvis
        </button>

      </form>
    </div>
  )
}

export default UpdatePost