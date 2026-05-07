import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Navbar from "../components/Navbar.jsx"
import PostDetail from "../pages/PostDetail.jsx"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Profile from "../pages/Profile.jsx"
import CreatePost from "../pages/CreatePost.jsx"
import UpdatePost from "../pages/UpdatePost.jsx"
import Category from "../pages/Category"

function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id/edit" element={<UpdatePost />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/category/:id" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter