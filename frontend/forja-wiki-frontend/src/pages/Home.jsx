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
    <div className="container mt-5">
      <h1>ForjaWiki</h1>

      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home