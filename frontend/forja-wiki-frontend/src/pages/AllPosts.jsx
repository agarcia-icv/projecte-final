import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"

function AllPosts() {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const res = await api.get("/posts")

        setPosts(res.data.posts || res.data)

      } catch (error) {

        console.error("ERROR POSTS:", error)

      }
    }

    fetchPosts()

  }, [])

  return (
    <div
      style={{
        backgroundColor: "#2f2f2f",
        minHeight: "100vh",
        paddingBottom: "50px"
      }}
    >
      <div className="container pt-5">

        <h1
          className="text-center mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f5f5f5",
            fontSize: "3rem",
            letterSpacing: "2px"
          }}
        >
          Tots els Posts
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

export default AllPosts