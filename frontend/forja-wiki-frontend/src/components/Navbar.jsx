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
    if (!avatar) return "http://127.0.0.1:8000/storage/users/default.png";

    if (avatar.startsWith("http")) return avatar;

    return `http://127.0.0.1:8000/storage/${avatar}`;
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-3"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,106,0,0.4)"
      }}
    >

      {/* LOGO */}
      <Link className="navbar-brand" to="/">
        <img
          src="/logo_forjawiki.png"
          alt="ForjaWiki"
          style={{
            height: "60px",
            width: "auto",
            objectFit: "contain",
            filter:
              "drop-shadow(0 0 10px #ff6a00) drop-shadow(0 0 25px #ff2a00)",
          }}
        />
      </Link>

      {/* CREATE POST */}
      {canCreate && (
        <Link
          className="btn btn-warning ms-3"
          to="/create-post"
          style={{
            boxShadow: "0 0 10px #ff6a00"
          }}
        >
          Crear Post
        </Link>
      )}

      <div className="ms-auto d-flex align-items-center">

        {/* NO LOGIN */}
        {!user && (
          <>
            {/* LOGIN PNG */}
            <Link to="/login" className="me-3">
              <img
                src="/login.png"
                alt="Login"
                style={{
                  height: "55px",
                  width: "auto",
                  cursor: "pointer",
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 0 8px #ff6a00) drop-shadow(0 0 20px #ff2a00)",
                  transition: "0.2s"
                }}
              />
            </Link>

            {/* REGISTER PNG */}
            <Link to="/register">
              <img
                src="/register.png"
                alt="Register"
                style={{
                  height: "55px",
                  width: "auto",
                  cursor: "pointer",
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 0 8px #ff6a00) drop-shadow(0 0 20px #ff2a00)",
                  transition: "0.2s"
                }}
              />
            </Link>
          </>
        )}

        {/* USER LOGGED */}
        {user && (
          <>
            {user?.rol === "admin" && (
              <Link
                className="btn btn-success me-3"
                to="/admin/users"
              >
                List Users
              </Link>
            )}

            <Link
              to="/profile"
              className="d-flex align-items-center text-light me-3 text-decoration-none"
              style={{ gap: "8px" }}
            >
              <img
                src={getAvatar(user.avatar)}
                alt="avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ff6a00",
                  boxShadow: "0 0 10px #ff6a00"
                }}
              />

              <span
                style={{
                  fontWeight: "bold",
                  textShadow: "0 0 10px #ff6a00"
                }}
              >
                {user.name}
              </span>
            </Link>

            <button
              className="btn btn-danger"
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