import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"
import { useLocation } from "react-router-dom"
import metalBg from "../assets/fons.avif"

function PostList() {
  const [posts, setPosts] = useState([])
  const location = useLocation()

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts")
      setPosts(res.data.posts || res.data)
    } catch (error) {
      console.error("ERROR GET POSTS:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts()
    }
  }, [location.state])

  return (
    <div
      style={{
        backgroundImage: `url(${metalBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px 0"
      }}
    >
      <div className="container">

        <h1
          style={{
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontSize: "52px",
            color: "#ff6a00",
            marginBottom: "35px",
            textShadow: "0 0 15px black"
          }}
        >
          ForjaWiki
        </h1>

        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
              <PostCard post={post} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PostList