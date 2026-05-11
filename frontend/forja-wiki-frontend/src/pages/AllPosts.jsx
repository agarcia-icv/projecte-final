import { useEffect, useState } from "react"
import { getSortedPosts } from "../services/api"
import PostCard from "../components/PostCard"

function AllPosts() {

  const [posts, setPosts] = useState([])

  const [sort, setSort] = useState("created_at")
  const [direction, setDirection] = useState("desc")

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const data = await getSortedPosts(sort, direction)

        setPosts(data)

      } catch (error) {

        console.error(error)

      }
    }

    fetchPosts()

  }, [sort, direction])

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
            color: "#f5f5f5"
          }}
        >
          Tots els Posts
        </h1>

        <div className="row mb-4">

          <div className="col-md-6">

            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="created_at">Data</option>
              <option value="titol">Títol</option>
              <option value="valoracions_avg_puntuacio">
                Valoracions
              </option>
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