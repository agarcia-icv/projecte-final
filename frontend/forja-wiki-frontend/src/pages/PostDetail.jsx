import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [average, setAverage] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [userRating, setUserRating] = useState(0)

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const isLogged = !!currentUser

  const canEdit =
    currentUser?.rol === "admin" || currentUser?.rol === "editor"

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const postRes = await api.get(`/posts/${id}`)
      const postData = postRes.data.data ?? postRes.data

      setPost(postData)

      const myRating = postData.valoracions?.find(
        v => v.user_id === currentUser?.id
      )
      if (myRating) setUserRating(myRating.puntuacio)

      const adaptedComments = (postData.comentaris || []).map(c => ({
        id: c.id,
        parent_id: c.parent_id,
        text: c.contingut,
        usuari: c.user?.name || "Usuari",
        created_at: c.created_at
      }))

      setComments(adaptedComments)

      const avgRes = await api.get(`/posts/${id}/valoracio-mitjana`)
      setAverage(avgRes.data.valoracio_mitjana)

    } catch (error) {
      console.error("ERROR LOAD POST:", error)
    }
  }

  const handleRate = async (value) => {
    if (!isLogged) return

    try {
      await api.post(`/posts/${id}/valoracio`, {
        puntuacio: value
      })

      setUserRating(value)

      const avgRes = await api.get(`/posts/${id}/valoracio-mitjana`)
      setAverage(avgRes.data.valoracio_mitjana)

    } catch (error) {
      console.error(error)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !isLogged) return

    try {
      await api.post(`/posts/${id}/comentaris`, {
        contingut: newComment
      })

      setNewComment("")
      fetchData()

    } catch (error) {
      console.error(error)
    }
  }

  const handleReply = async (parentId, text) => {
    if (!text.trim() || !isLogged) return

    try {
      await api.post(`/posts/${id}/comentaris`, {
        contingut: text,
        parent_id: parentId
      })

      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Segur que vols eliminar aquest post?")
    if (!confirmDelete) return

    try {
      await api.delete(`/posts/${id}`)
      navigate("/")
    } catch (error) {
      console.error("ERROR DELETE POST:", error)
    }
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("ca-ES") : ""

  const Stars = ({ current, onClick }) => (
    <div style={{ fontSize: "25px", cursor: isLogged ? "pointer" : "default" }}>
      {[1, 2, 3, 4, 5].map(num => (
        <span
          key={num}
          onClick={() => isLogged && onClick(num)}
          style={{ color: num <= current ? "gold" : "#080202" }}
        >
          ★
        </span>
      ))}
    </div>
  )

  const Comment = ({ comment }) => {
    const [showReply, setShowReply] = useState(false)
    const [replyText, setReplyText] = useState("")

    const replies = comments.filter(c => c.parent_id === comment.id)

    return (
      <div
        className={`comment-box ${comment.parent_id ? "comment-reply" : ""}`}
      >
        <strong>{comment.usuari}</strong>

        <small className="ms-2 text-white">
          {formatDate(comment.created_at)}
        </small>

        <p className="mt-2">{comment.text}</p>

        {isLogged && (
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setShowReply(!showReply)}
          >
            Respondre
          </button>
        )}

        {showReply && (
          <div className="mt-2">
            <input
              className="home-search-input mb-2 w-100"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Resposta..."
            />

            <button
              className="home-search-btn"
              onClick={() => {
                handleReply(comment.id, replyText)
                setReplyText("")
                setShowReply(false)
              }}
            >
              Enviar
            </button>
          </div>
        )}

        {replies.map(r => (
          <Comment key={r.id} comment={r} />
        ))}
      </div>
    )
  }

  if (!post) return <p className="container mt-5">Carregant...</p>

  const imageUrl = post.imatge
    ? `http://localhost:8080/storage/${post.imatge}`
    : ""

  return (
    <div className="container mt-5 postdetail-bg">

      <div className="postdetail-header">

        <h1 className="postdetail-title">{post.titol}</h1>

        <p className="postdetail-meta">
          {formatDate(post.created_at)} | {post.user?.name}
        </p>

        {canEdit && (
          <div className="postdetail-actions">

            <Link
              to={`/post/${post.id}/edit`}
              className="forge-btn-warning btn"
            >
              Editar Post
            </Link>

            <button
              className="forge-btn-logout btn"
              onClick={handleDelete}
            >
              Eliminar Post
            </button>

          </div>
        )}

      </div>

      <div className="row postdetail-mobile-order">

        <div className="col-md-8 postdetail-content">

          <p className="postdetail-text">{post.descripcio}</p>

          <div className="mt-4">

            <h4 className="postdetail-rating-title">Valoració</h4>

            {isLogged ? (
              <Stars current={userRating} onClick={handleRate} />
            ) : (
              <Stars current={average} onClick={() => { }} />
            )}

            <p className="mt-2">
              Mitjana: <strong>{average}</strong>
            </p>

          </div>

          {isLogged ? (
            <div className="mt-4">

              <h4>Afegir comentari</h4>

              <input
                className="home-search-input mb-2 w-100"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escriu el teu comentari..."
              />

              <button
                className="home-search-btn"
                onClick={handleAddComment}
              >
                Publicar
              </button>

            </div>
          ) : (
            <p className="mt-4 text-light">
              Inicia sessió per comentar
            </p>
          )}

          <h3 className="postdetail-comments-title">Comentaris</h3>

          {comments
            .filter(c => !c.parent_id)
            .map(c => (
              <Comment key={c.id} comment={c} />
            ))}

        </div>

        <div className="col-md-4">

          <div className="postdetail-card">

            <img
              src={imageUrl}
              alt={post.titol}
              className="postdetail-img"
            />

            <div className="card-body text-white p-3">

              <h5>{post.titol}</h5>

              <p><strong>Autor:</strong> {post.user?.name}</p>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default PostDetail