import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts")
        setPosts(res.data.data)
      } catch (error) {
        console.error("ERROR GET POSTS:", error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div
      style={{
        backgroundColor: "#bac4be", 
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
    letterSpacing: "2px",
    color: "#e44d12",
    marginBottom: "30px"
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