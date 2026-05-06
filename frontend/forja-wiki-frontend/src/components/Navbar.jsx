import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  const canCreate =
    user && (user.rol === "admin" || user.rol === "editor");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      
      <Link className="navbar-brand" to="/">
        ForjaWiki
      </Link>

      {canCreate && (
        <Link className="btn btn-warning ms-3" to="/create-post">
          Crear Post
        </Link>
      )}

      <div className="ms-auto">

        {!user && (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-light" to="/register">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link className="btn btn-outline-light me-2" to="/profile">
              Profile
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;