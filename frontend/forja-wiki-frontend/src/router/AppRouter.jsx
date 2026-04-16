import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Navbar from "../components/Navbar.jsx"
import PostDetail from "../pages/PostDetail.jsx"

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter