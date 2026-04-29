import { useEffect, useState } from "react"

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>No hi ha usuari loguejat</h3>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h2>Perfil d'usuari</h2>

      <div className="card p-3 mt-3">

        <img
          src={user.avatar || "https://i.pravatar.cc/300"}
          alt="avatar"
          style={{ width: "150px", borderRadius: "50%" }}
        />

        <h4 className="mt-3">{user.name}</h4>
        <p>{user.email}</p>

        <p className="text-muted">
          {user.bio || "Aquest usuari encara no té descripció"}
        </p>

      </div>
    </div>
  )
}

export default Profile