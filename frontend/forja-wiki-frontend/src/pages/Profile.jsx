import { useState, useEffect } from "react";
import api from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const DEFAULT_AVATAR = "http://127.0.0.1:8000/storage/users/default.png";

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
      setPreview(storedUser.avatar || null);
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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", form.bio || "");

      if (form.avatar instanceof File) {
        formData.append("avatar", form.avatar);
      }

      const res = await api.post("/user/profile", formData);

      const updatedUser = res.data.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditing(false);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  if (!user) {
    return <div className="container mt-5">No estàs logejat</div>;
  }

  const getAvatar = (avatar) => {
    if (!avatar) return "https://i.pravatar.cc/150";
    return avatar;
  };

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <div className="text-center mb-4">

          <img
            src={
              preview
                ? (preview instanceof File ? URL.createObjectURL(preview) : preview)
                : user.avatar || DEFAULT_AVATAR
            }
            alt="avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ff6a00"
            }}
          />

          {editing && (
            <div className="mt-2">
              <input
                type="file"
                className="form-control"
                onChange={handleAvatarChange}
              />
            </div>
          )}

        </div>

        <div className="mb-3">
          <label>Nom</label>
          <div className="form-control bg-light">{user.name}</div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <div className="form-control bg-light">{user.email}</div>
        </div>

        <div className="mb-3">
          <label>Bio</label>

          {editing ? (
            <textarea
              className="form-control"
              value={form.bio}
              onChange={handleBioChange}
            />
          ) : (
            <div className="form-control bg-light">
              {user.bio || "Sense bio"}
            </div>
          )}
        </div>

        {editing ? (
          <>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Guardar
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>
              Cancel·lar
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Editar perfil
          </button>
        )}

      </div>
    </div>
  );
}

export default Profile;