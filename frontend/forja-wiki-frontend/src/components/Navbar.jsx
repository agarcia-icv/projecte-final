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

  const getAvatar = (avatar) => {
    if (!avatar) {
      return "http://localhost:8080/storage/users/default.png";
    }

    if (avatar.startsWith("http")) return avatar;

    return `http://localhost:8080/storage/${avatar}`;
  };

  return (
    <nav className="navbar navbar-expand-lg forge-navbar px-3">

      <Link className="navbar-brand" to="/">
        <img
          src="/logo_forjawiki.png"
          alt="ForjaWiki"
          className="forge-logo"
        />
      </Link>

      {canCreate && (
        <Link
          className="btn forge-btn-warning ms-3"
          to="/create-post"
        >
          Crear Post
        </Link>
      )}

      <div className="ms-auto d-flex align-items-center">

        {!user && (
          <>
            <Link to="/login" className="me-3">
              <img
                src="/login.png"
                alt="Login"
                className="forge-nav-icon"
              />
            </Link>

            <Link to="/register">
              <img
                src="/register.png"
                alt="Register"
                className="forge-nav-icon"
              />
            </Link>
          </>
        )}

        {user && (
          <>

            {user?.rol === "admin" && (
              <Link
                className="btn forge-btn-admin me-3"
                to="/admin/users"
              >
                Admin Panel
              </Link>
            )}

            <Link
              to="/profile"
              className="forge-profile-link me-3"
            >

              <img
                src={getAvatar(user.avatar)}
                alt="avatar"
                className="forge-avatar"
              />

              <span className="forge-username">
                {user.name}
              </span>

            </Link>

            <button
              className="btn forge-btn-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;