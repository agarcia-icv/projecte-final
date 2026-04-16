import { useParams } from "react-router-dom"
import posts from "../services/mockData.js"
import CommentSection from "../components/CommentSection.jsx"
function PostDetail() {
  const { id } = useParams()

  // IMPORTANT: convertim id a número
  const post = posts.find(p => p.id === parseInt(id))

  // Si no existeix
  if (!post) {
    return <h2 className="text-center mt-5">Post no trobat</h2>
  }

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