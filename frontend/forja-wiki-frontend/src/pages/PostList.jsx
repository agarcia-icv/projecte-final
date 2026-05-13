import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"
import { useLocation } from "react-router-dom"
import metalBg from "../assets/fons.avif"

function Home() {
  const [posts, setPosts] = useState([])
  const location = useLocation()

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts")
      setPosts(res.data)
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
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "30px"
      }}
    >
      <div className="container">

        <h1
          style={{
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontSize: "48px",
            color: "#e44d12",
            marginBottom: "30px",
            textShadow: "0 0 10px black"
          }}
        >
          ForjaWiki
        </h1>

        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 mb-4">
              <PostCard post={post} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home