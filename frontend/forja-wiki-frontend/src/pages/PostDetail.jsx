import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPost } from "../services/api.js"

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    async function loadPost() {
      const data = await getPost(id)
      console.log("POST:", data) // 👈 DEBUG
      setPost(data)
    }

    loadPost()
  }, [id])

  if (!post) return <p>Carregant...</p>

  return (
    <div className="container mt-5 pt-4">
      <div className="row">

        {/* ESQUERRA */}
        <div className="col-md-8">

          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <h1 className="mb-0">{post.titol}</h1>
            <span className="text-muted">{post.data}</span>
            <span className="text-muted">per {post.usuari}</span>
          </div>

          <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
            {post.descripcio}
          </p>
        <CommentSection comentaris={post.comentaris} />
        </div>

        {/* DRETA */}
        <div className="col-md-4 mt-5">

          <div
            className="card shadow-sm overflow-hidden"
            style={{ height: "380px" }}
          >
            <div style={{ height: "260px" }}>
              <img
                src={post.imatge}
                alt={post.titol}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="card-body">
              <h5>{post.titol}</h5>
              <p className="text-muted mb-0">
                Època: {post.epoca}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default PostDetail