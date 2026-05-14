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

        const post = postRes.data.data ?? postRes.data

        setTitol(post.titol || "")
        setDescripcio(post.descripcio || "")
        setEpoca(post.epoca || "")
        setTipusEinaId(post.tipus_eina_id || "")

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
    <div className="createpost-bg">
      <div className="container">

        <div className="createpost-card">

          <h2 className="createpost-title">
            Editar post
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="createpost-label">Títol</label>
              <input
                type="text"
                className="createpost-input"
                value={titol}
                onChange={(e) => setTitol(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="createpost-label">Descripció</label>
              <textarea
                className="createpost-input"
                value={descripcio}
                onChange={(e) => setDescripcio(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="createpost-label">Època</label>
              <input
                type="text"
                className="createpost-input"
                value={epoca}
                onChange={(e) => setEpoca(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="createpost-label">Tipus d'eina</label>
              <select
                className="createpost-input"
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
              <label className="createpost-label">Imatge (opcional)</label>
              <input
                type="file"
                className="createpost-input"
                onChange={(e) => setImatge(e.target.files[0])}
              />
            </div>

            <button className="createpost-btn">
              Guardar canvis
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default UpdatePost 