import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostsByCategory } from "../services/api"
import PostCard from "../components/PostCard"
import metalBg from "../assets/fons.avif"

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
      <div
        style={{
          backgroundImage: `url(${metalBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
        className="text-white d-flex justify-content-center align-items-center"
      >
        Carregant...
      </div>
    )
  }

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
            fontSize: "3rem",
            letterSpacing: "2px",
            textShadow: "0 0 10px #ff6a00"
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