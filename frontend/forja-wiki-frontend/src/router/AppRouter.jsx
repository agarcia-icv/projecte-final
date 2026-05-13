import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

import Layout from "../layouts/Layout"

import Home from "../pages/Home.jsx"
import PostDetail from "../pages/PostDetail.jsx"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Profile from "../pages/Profile.jsx"
import CreatePost from "../pages/CreatePost.jsx"
import UpdatePost from "../pages/UpdatePost.jsx"
import Category from "../pages/Category"
import AllPosts from "../pages/AllPosts"
import AdminUsers from "../pages/AdminUsers"

function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id/edit" element={<UpdatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter