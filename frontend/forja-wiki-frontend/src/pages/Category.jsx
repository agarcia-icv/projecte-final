import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostsByCategory } from "../services/api"
import PostCard from "../components/PostCard"

function Category() {
  const { id } = useParams()

  const [posts, setPosts] = useState([])
  const [categoria, setCategoria] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByCategory(id)

        setPosts(data.posts || [])
        setCategoria(data.categoria || "Categoria")

      } catch (error) {
        console.error("ERROR CATEGORY:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [id])

  if (loading) {
    return (
      <div className="container mt-5 text-white">
        <p>Carregant...</p>
      </div>
    )
  }

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
          {categoria}
        </h1>

        <div className="row">

          {posts.length === 0 ? (
            <p className="text-white text-center">
              No hi ha posts en aquesta categoria
            </p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="col-md-6 mb-4">
                <PostCard post={post} />
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  )
}

export default Category