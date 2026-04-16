import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">Wiki Forja</Link>

      <div>
        <Link to="/login" className="btn btn-outline-light me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-warning">
          Register
        </Link>
      </div>
    </nav>
  )
}

export default Navbar