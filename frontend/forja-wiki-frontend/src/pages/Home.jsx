import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../services/api"

function Home() {
  const [posts, setPosts] = useState([]) // ← IMPORTANT
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts()
        console.log("POSTS:", data)
        setPosts(data)
      } catch (error) {
        console.error("ERROR carregant posts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return <h2 className="text-center mt-5">Carregant...</h2>
  }

  return (
    <div className="container mt-5">
      <h1>ForjaWiki</h1>

      <div className="row">
        {posts.length === 0 ? (
          <p>No hi ha posts encara</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="col-md-6 mb-4">

              <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                
                <div className="card text-white" style={{ height: "250px", overflow: "hidden" }}>
                  
                  <img
                    src={post.imatge || "https://picsum.photos/600/400"}
                    alt={post.titol}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      background: "rgba(0,0,0,0.6)",
                      padding: "10px"
                    }}
                  >
                    <h5>{post.titol}</h5>
                  </div>

                </div>

              </Link>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home