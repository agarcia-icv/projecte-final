import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"
import { useLocation } from "react-router-dom"

function AllPosts() {

  const [posts, setPosts] = useState([])
  const location = useLocation()

  useEffect(() => {

    const fetchPosts = async () => {
      try {

        const params = new URLSearchParams(location.search)
        const search = params.get("search") || ""

        console.log("SEARCH PARAM:", search)

        const res = await api.get("/posts", {
          params: {
            search: search
          }
        })

        console.log("RESPONSE BACKEND:", res.data)

        const data = res.data.posts ?? res.data ?? []


        setPosts(data)

      } catch (error) {
        console.error("ERROR POSTS:", error)
      }
    }

    fetchPosts()

  }, [location.search])

  return (
    <div style={{ backgroundColor: "#2f2f2f", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="container pt-5">

        <h1
          className="text-center mb-5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f5f5f5",
            fontSize: "3rem"
          }}
        >
          Tots els Posts
        </h1>

        <p className="text-center text-light">
          Resultats: {posts.length}
        </p>

        <div className="row">

          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="col-md-6 mb-4">
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <p className="text-center text-light">
              No s’han trobat posts
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default AllPosts