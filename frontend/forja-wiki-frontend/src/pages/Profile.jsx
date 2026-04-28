import { useState, useEffect } from "react"

function Profile() {

  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) {
      setUser(storedUser)
      setForm(storedUser)
    }
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(form))
    setUser(form)
    setEditing(false)
  }

  if (!user) {
    return <div className="container mt-5">No estàs logejat</div>
  }

  return (
    <div className="container mt-5">

      <div className="card p-4">

        {/* AVATAR */}
        <div className="text-center mb-3">
          <img
            src={user.avatar}
            alt="avatar"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        </div>

        <div className="mt-3">

          {/* NOM */}
          <div className="mb-3">
            <label className="form-label">Nom:</label>

            {editing ? (
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            ) : (
              <div className="form-control bg-light">
                {user.name}
              </div>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email:</label>

            <div className="form-control bg-light">
              {user.email}
            </div>
          </div>

          {/* IMATGE */}
          <div className="mb-3">
            <label className="form-label">Imatge de perfil:</label>

            {editing ? (
              <input
                name="avatar"
                className="form-control"
                value={form.avatar}
                onChange={handleChange}
              />
            ) : (
              <div className="form-control bg-light text-truncate">
                {user.avatar}
              </div>
            )}
          </div>

          {/* BIO */}
          <div className="mb-3">
            <label className="form-label">Descripció:</label>

            {editing ? (
              <textarea
                name="bio"
                className="form-control"
                value={form.bio}
                onChange={handleChange}
              />
            ) : (
              <div className="form-control bg-light">
                {user.bio}
              </div>
            )}
          </div>

        </div>

        {/* BOTONS */}
        <div className="mt-3">

          {editing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Guardar
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel·lar
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Editar perfil
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default Profile