import { useEffect, useState } from "react"
import api from "../services/api"
import metalBg from "../assets/fons.avif"

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
      <div className="adminusers-bg adminusers-denied">
        No tens permisos per accedir aquí
      </div>
    )
  }

  return (
    <div className="adminusers-bg">

      <div className="container">

        <h1 className="adminusers-title">
          Panell d’Administració
        </h1>

        {loading ? (
          <p className="adminusers-loading">
            Carregant usuaris...
          </p>
        ) : (
          <div className="table-responsive">

            <table className="adminusers-table table table-hover text-white">

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
                        className="adminusers-select"
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
                        className="adminusers-delete-btn"
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