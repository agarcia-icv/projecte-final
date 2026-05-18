import { useEffect, useState } from "react"
import api from "../services/api"
import PostCard from "../components/PostCard"
import { useLocation } from "react-router-dom"
import metalBg from "../assets/fons.avif"

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

        const res = await api.get("/posts", {
          params: {
            search,
            sort,
            direction
          }
        })

        const data = res.data.posts ?? res.data ?? []
        setPosts(data)

      } catch (error) {
        console.error("ERROR POSTS:", error)
      }
    }

    fetchPosts()

  }, [location.search, sort, direction])

  return (
    <div
      style={{
        backgroundImage: `url(${metalBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
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
            textShadow: "0 0 10px #ff6a00",
            fontSize: "3rem",
          }}
        >
          Tots els Posts
        </h1>

        <p className="text-center text-light">
          Resultats: {posts.length}
        </p>

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