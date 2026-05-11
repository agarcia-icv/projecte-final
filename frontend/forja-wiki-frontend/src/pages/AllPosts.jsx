import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"
import { useLocation } from "react-router-dom"

function AllPosts() {

  const [posts, setPosts] = useState([])
  const location = useLocation()

  const [sort, setSort] = useState("created_at")
  const [direction, setDirection] = useState("desc")

  useEffect(() => {

    const fetchPosts = async () => {
      try {

        const params = new URLSearchParams(location.search)
        const search = params.get("search") || ""

        console.log("🔎 SEARCH:", search)
        console.log("↕️ SORT:", sort, direction)

        const res = await api.get("/posts", {
          params: {
            search: search,
            sort: sort,
            direction: direction
          }
        })

        console.log("📦 BACKEND RESPONSE:", res.data)

        const data = res.data.posts ?? res.data ?? []

        setPosts(data)

      } catch (error) {

        console.error("❌ ERROR POSTS:", error)

        try {
          const fallback = await api.get("/posts")
          const data = fallback.data.posts ?? fallback.data ?? []
          setPosts(data)
        } catch (e) {
          console.error("❌ FALLBACK ERROR:", e)
        }

      }
    }

    fetchPosts()

  }, [location.search, sort, direction])

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

        {/* SORT CONTROLS */}
        <div className="row mb-4">

          <div className="col-md-6">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="created_at">Data</option>
              <option value="titol">Títol</option>
              <option value="valoracions_avg_puntuacio">Valoracions</option>
            </select>
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="desc">Descendent</option>
              <option value="asc">Ascendent</option>
            </select>
          </div>

        </div>

        {/* POSTS */}
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