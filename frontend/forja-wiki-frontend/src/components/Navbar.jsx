import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        ForjaWiki
      </Link>

      <div className="d-flex gap-2">

        {user ? (
          <>
            <Link className="btn btn-outline-light" to="/profile">
              {user.name}
            </Link>

            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>

            <Link className="btn btn-success" to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar