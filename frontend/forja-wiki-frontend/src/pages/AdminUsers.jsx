import { useEffect, useState } from "react"
import api from "../services/api"

function AdminUsers() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const currentUser = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setUsers(res.data)
      setLoading(false)

    } catch (error) {
      console.error("ERROR USERS:", error)
      setLoading(false)
    }
  }

  const changeRole = async (userId, role) => {
    try {
      await api.post(
        `/users/${userId}/role`,
        { rol: role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      fetchUsers()

    } catch (error) {
      console.error("ERROR CHANGE ROLE:", error)
    }
  }

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Segur que vols eliminar aquest usuari?")
    if (!confirmDelete) return

    try {
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      fetchUsers()

    } catch (error) {
      console.error("ERROR DELETE USER:", error)
    }
  }

  if (currentUser?.rol !== "admin") {
    return (
      <div className="container mt-5 text-white">
        <h3>No tens permisos per accedir aquí</h3>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: "#2f2f2f", minHeight: "100vh", padding: "30px" }}>
      <div className="container">

        <h1 className="text-center text-white mb-4">
          Panell d’Administració
        </h1>

        {loading ? (
          <p className="text-white text-center">Carregant usuaris...</p>
        ) : (
          <div className="table-responsive">

            <table className="table table-dark table-hover">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Accions</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user.id}>

                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={user.rol}
                        onChange={(e) => changeRole(user.id, e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="editor">editor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  )
}

export default AdminUsers