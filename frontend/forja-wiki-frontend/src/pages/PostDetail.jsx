import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const API_URL = "http://127.0.0.1:8000/api"

function PostDetail() {

  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [newComment, setNewComment] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("POST:", data)
        setPost(data)
      })
  }, [id])

  // ➕ comentar
  const handleComment = async () => {
    if (!newComment.trim()) return

    const token = localStorage.getItem("token")

    await fetch(`${API_URL}/comentaris`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        contingut: newComment,
        post_id: id
      })
    })

    setNewComment("")
    location.reload()
  }

  // ➕ resposta
  const handleReply = async (parent_id, text) => {
    if (!text.trim()) return

    const token = localStorage.getItem("token")

    await fetch(`${API_URL}/comentaris`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        contingut: text,
        post_id: id,
        parent_id
      })
    })

    location.reload()
  }

  const Comment = ({ c }) => {
    const [reply, setReply] = useState("")
    const [show, setShow] = useState(false)

    return (
      <div className="mb-3 border p-3 rounded bg-light">

        {/* 👤 USER */}
        <div className="d-flex align-items-center mb-2">
          <img
            src="https://i.pravatar.cc/40"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px"
            }}
          />
          <div>
            <strong>{c.user?.name}</strong>
            <br />
            <small className="text-muted">
              {new Date(c.created_at).toLocaleString()}
            </small>
          </div>
        </div>

        <p>{c.contingut}</p>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setShow(!show)}
        >
          Respondre
        </button>

        {show && (
          <div className="mt-2">
            <input
              className="form-control mb-2"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleReply(c.id, reply)
              }}
            >
              Enviar
            </button>
          </div>
        )}

        {/* 🔁 REPLIES */}
        <div className="mt-3 ms-4">
          {c.replies?.map(r => (
            <div key={r.id} className="border p-2 mb-2 rounded">

              <strong>{r.user?.name}</strong>
              <small className="ms-2 text-muted">
                {new Date(r.created_at).toLocaleString()}
              </small>

              <p>{r.contingut}</p>

            </div>
          ))}
        </div>

      </div>
    )
  }

  if (!post) return <p>Carregant...</p>

  return (
    <div className="container mt-5">

      <h1>{post.titol}</h1>
      <p>
        {post.created_at
          ? new Date(post.created_at).toLocaleDateString()
          : "Sense data"} | {post.user?.name}
      </p>

      <div className="row">

        <div className="col-md-8">

          <p>{post.descripcio}</p>

          {/* ➕ COMENTAR */}
          <div className="mt-4">
            <h4>Afegir comentari</h4>

            <input
              className="form-control mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button className="btn btn-success" onClick={handleComment}>
              Publicar
            </button>
          </div>

          
          <h3 className="mt-5">Comentaris</h3>

          {post.comentaris?.length === 0 && <p>No hi ha comentaris</p>}

          {post.comentaris?.map(c => (
            <Comment key={c.id} c={c} />
          ))}

        </div>

        <div className="col-md-4">
          <div className="card">
            <img
              src={post.imatge || "https://picsum.photos/400"}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5>{post.titol}</h5>
              <p><strong>Tipus:</strong> {post.tipus?.nom}</p>
              <p><strong>Autor:</strong> {post.user?.name}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostDetail