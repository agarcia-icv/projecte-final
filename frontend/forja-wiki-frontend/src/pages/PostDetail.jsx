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
    const confirmDelete = window.confirm(
      "Segur que vols eliminar aquest post?"
    )

    if (!confirmDelete) return

    try {

      const res = await api.delete(`/posts/${id}`)

      console.log(res.data)

      navigate("/")

    } catch (error) {

      console.log(error.response)

      console.error("ERROR DELETE POST:", error)
    }
  }

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("ca-ES")
  }

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
        style={{
          marginLeft: comment.parent_id ? "30px" : "0",
          border: "1px solid #ff7b00",
          borderRadius: "8px",
          background: "#2f2f2f",
          color: "#eee"
        }}
        className="mb-3 p-3"
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
              className="form-control mb-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Resposta..."
            />

            <button
              className="btn btn-sm btn-warning"
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
    ? `http://127.0.0.1:8000/storage/${post.imatge}`
    : ""

  return (
    <div
      className="container mt-5 p-4"
      style={{
        backgroundColor: "#3a3a3a",
        minHeight: "100vh",
        borderRadius: "10px"
      }}
    >

      <div className="mb-4 text-center text-white">

        <h1 style={{ fontFamily: "serif" }}>{post.titol}</h1>

        <p className="text-light">
          {formatDate(post.created_at ?? post.created_at)} | {post.user?.name}
        </p>

        {canEdit && (
          <div className="mt-3 d-flex justify-content-center gap-2">

                  <Link
                    to={`/post/${post.id}/edit`}
                    className="btn btn-warning ms-2"
                  >
                    Editar Post
                  </Link>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Eliminar Post
            </button>

          </div>
        )}

      </div>

      <div className="row">

        <div className="col-md-8 text-white">
          <p>{post.descripcio}</p>

          <div className="mt-4">
            <h4>Valoració</h4>

            {isLogged ? (
              <Stars current={userRating} onClick={handleRate} />
            ) : (
              <Stars current={average} onClick={() => {}} />
            )}

            <p className="mt-2">
              Mitjana: <strong>{average}</strong>
            </p>
          </div>

          {isLogged ? (
            <div className="mt-4">
              <h4>Afegir comentari</h4>

              <input
                className="form-control mb-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              <button className="btn btn-warning" onClick={handleAddComment}>
                Publicar
              </button>
            </div>
          ) : (
            <p className="mt-4 text-light">
              Inicia sessió per comentar
            </p>
          )}

          <h3 className="mt-5">Comentaris</h3>

          {comments
            .filter(c => !c.parent_id)
            .map(c => (
              <Comment key={c.id} comment={c} />
            ))}
        </div>

        <div className="col-md-4">
          <div
            className="card text-white"
            style={{
              border: "2px solid #ff7b00",
              background: "#2f2f2f"
            }}
          >
            <img
              src={imageUrl}
              alt={post.titol}
              style={{
                height: "300px",
                width: "100%",
                objectFit: "contain",
                background: "#ffffff"
              }}
            />

            <div className="card-body">
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