import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"

function PostDetail() {
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [average, setAverage] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [userRating, setUserRating] = useState(0)

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const isLogged = !!currentUser

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await api.get(`/posts/${id}`)

        const postData = postRes.data.data ?? postRes.data

        setPost(postData)

        const myRating = postData.valoracions?.find(
          v => v.user_id === currentUser?.id
        )

        if (myRating) {
          setUserRating(myRating.puntuacio)
        }

        const adaptedComments = (postData.comentaris || []).map(c => ({
          id: c.id,
          parent_id: c.parent_id,
          text: c.contingut,
          usuari: c.user?.name || "Usuari"
        }))

        setComments(adaptedComments)

        const avgRes = await api.get(`/posts/${id}/valoracio-mitjana`)
        setAverage(avgRes.data.valoracio_mitjana)

      } catch (error) {
        console.error("ERROR LOAD POST:", error)
      }
    }

    fetchData()
  }, [id])

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
      const res = await api.post(`/posts/${id}/comentaris`, {
        contingut: newComment
      })

      const newCommentObj = {
        id: res.data.id,
        parent_id: null,
        text: res.data.contingut,
        usuari: res.data.user?.name || currentUser?.name || "Usuari"
      }

      setComments([...comments, newCommentObj])
      setNewComment("")

    } catch (error) {
      console.error(error)
    }
  }

  const handleReply = async (parentId, text) => {
    if (!text.trim() || !isLogged) return

    try {
      const res = await api.post(`/posts/${id}/comentaris`, {
        contingut: text,
        parent_id: parentId
      })

      const newReply = {
        id: res.data.id,
        parent_id: res.data.parent_id,
        text: res.data.contingut,
        usuari: res.data.user?.name || currentUser?.name || "Usuari"
      }

      setComments([...comments, newReply])

    } catch (error) {
      console.error(error)
    }
  }

  const Stars = ({ current, onClick }) => (
    <div style={{ fontSize: "25px", cursor: isLogged ? "pointer" : "default" }}>
      {[1, 2, 3, 4, 5].map(num => (
        <span
          key={num}
          onClick={() => isLogged && onClick(num)}
          style={{ color: num <= current ? "gold" : "gray" }}
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
        style={{ marginLeft: comment.parent_id ? "30px" : "0" }}
        className="mb-3 border p-2 rounded bg-light"
      >
        <strong>{comment.usuari}</strong>

        <p>{comment.text}</p>

        {isLogged && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowReply(!showReply)}
          >
            Respondre
          </button>
        )}

        {showReply && isLogged && (
          <div className="mt-2">
            <input
              className="form-control mb-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Resposta..."
            />

            <button
              className="btn btn-sm btn-primary"
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
    <div className="container mt-5">

      <div className="mb-4">
        <h1>{post.titol}</h1>
        <p>{post.created_at} | {post.user?.name}</p>
      </div>

      <div className="row">

        <div className="col-md-8">

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
                placeholder="Escriu un comentari..."
              />

              <button className="btn btn-success" onClick={handleAddComment}>
                Publicar
              </button>
            </div>
          ) : (
            <p className="mt-4 text-muted">
              Inicia sessió per escriure comentaris
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

          <div className="card">

            <img
              src={imageUrl}
              alt={post.titol}
              style={{
                height: "280px",
                objectFit: "cover"
              }}
            />

            <div className="card-body">
              <h5>{post.titol}</h5>
              <p><strong>Època:</strong> {post.epoca}</p>
              <p><strong>Autor:</strong> {post.user?.name}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default PostDetail