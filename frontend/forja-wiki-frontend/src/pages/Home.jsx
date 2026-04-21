import { useEffect, useState } from "react"
import PostCard from "../components/PostCard.jsx"
import { getPosts } from "../services/api.js"
function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts()
      console.log("POSTS:", data) 
      setPosts(data)
    }

    loadPosts()
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Posts de la Wiki</h1>

      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home