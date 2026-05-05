import { useState, useEffect } from "react";
import api from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    avatar: null
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
      setForm({
        bio: storedUser.bio || "",
        avatar: null
      });
    }
  }, []);

  const handleBioChange = (e) => {
    setForm({ ...form, bio: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
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

    if (avatar.startsWith("http")) return avatar;

    return `http://127.0.0.1:8000/storage/${avatar}`;
  };

  return (
    <div className="container mt-5">

      <div className="card p-4">

     

        {/* INFO */}
        <div className="mb-3">
          <label>Nom</label>
          <div className="form-control bg-light">{user.name}</div>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <div className="form-control bg-light">{user.email}</div>
        </div>

        {/* AVATAR INPUT */}
        {editing && (
          <div className="mb-3">
            <label>Avatar</label>
            <input type="file" className="form-control" onChange={handleAvatarChange} />
          </div>
        )}

        {/* BIO */}
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

        {/* BOTONS */}
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