import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Navbar from "../components/Navbar.jsx"
import PostDetail from "../pages/PostDetail.jsx"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Profile from "../pages/Profile.jsx"

function AppRouter() {
  return (
    <BrowserRouter>

      {/* 🔝 Navbar sempre visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 NOVA RUTA PERFIL */}
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter