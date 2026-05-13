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
        <img
            src="/logo_forjawiki.png"
            alt="ForjaWiki"
            style={{
              height: "60px",
              width: "auto",
              display: "block",
              margin: "0 auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px #ff6a00) drop-shadow(0 0 25px #ff2a00)",
            }}
          />
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
            {user?.rol === "admin" && (
              <Link className="btn btn-success me-2" to="/admin/users">
                List Users
              </Link>
            )}

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