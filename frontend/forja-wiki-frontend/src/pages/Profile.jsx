import { useState, useEffect } from "react";
import api from "../services/api";

function Profile() {

  const DEFAULT_AVATAR = "http://127.0.0.1:8000/storage/users/default.png";

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    bio: "",
    avatar: null
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
      setForm({
        bio: storedUser.bio || "",
        avatar: null
      });
      setPreview(null);
    }
  }, []);

  const handleBioChange = (e) => {
    setForm({ ...form, bio: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, avatar: file });
    setPreview(URL.createObjectURL(file));
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return DEFAULT_AVATAR;
    if (avatar.startsWith("http")) return avatar;
    return `http://127.0.0.1:8000/storage/${avatar}`;
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", form.bio || "");

      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const res = await api.post("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const updatedUser = res.data.user ?? res.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditing(false);
      setPreview(null);

    } catch (err) {
      console.log("ERROR SAVE PROFILE:", err.response?.data || err);
    }
  };

  if (!user) {
    return <div className="container mt-5">No estàs logejat</div>;
  }

  return (
    <div className="profile-page">

      <div className="container">

        <div className="profile-card">

          <div className="profile-avatar-section">

            <img
              src={preview || getAvatarUrl(user.avatar)}
              alt="avatar"
              className="profile-avatar"
            />

            {editing && (
              <input
                type="file"
                className="home-search-input mt-3"
                onChange={handleAvatarChange}
              />
            )}

          </div>

          <div className="profile-info">

            <div className="profile-field">
              <label>Nom</label>
              <div className="profile-static">{user.name}</div>
            </div>

            <div className="profile-field">
              <label>Email</label>
              <div className="profile-static">{user.email}</div>
            </div>

            <div className="profile-field">
              <label>Bio</label>

              {editing ? (
                <textarea
                  className="home-search-input profile-textarea"
                  value={form.bio}
                  onChange={handleBioChange}
                />
              ) : (
                <div className="profile-static">
                  {user.bio || "Sense bio"}
                </div>
              )}
            </div>

            <div className="profile-actions">

              {editing ? (
                <>
                  <button
                    className="home-search-btn me-2"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>

                  <button
                    className="btn forge-btn-logout"
                    style={{ color: "white" }}
                    onClick={() => setEditing(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="home-main-btn"
                  onClick={() => setEditing(true)}
                >
                  Editar perfil
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;