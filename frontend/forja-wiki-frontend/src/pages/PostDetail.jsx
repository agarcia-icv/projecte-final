import { useParams } from "react-router-dom"
import { useState } from "react"

function PostDetail() {

  const { id } = useParams()

  const post = {
    id: id,
    titol: "Martell de forja",
    descripcio: "Descripció completa molt més llarga de l'eina.",
    dataPost: "2024-01-10",
    usuari: "Adria",
    epoca: "Edat Mitjana",
    imatge: "https://picsum.photos/600/400?1"
  }


  const currentUser = {
    id: 1,
    name: "Daniel"
  }

  const [ratings, setRatings] = useState([
    { id: 1, usuari_id: 2, puntuacio: 5 },
    { id: 2, usuari_id: 3, puntuacio: 4 }
  ])

  const existingRating = ratings.find(r => r.usuari_id === currentUser.id)

  const [userRating, setUserRating] = useState(existingRating ? existingRating.puntuacio : 0)

  const average =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.puntuacio, 0) / ratings.length).toFixed(1)
      : 0

  const handleRate = (value) => {

    setUserRating(value)

    if (existingRating) {
      const updatedRatings = ratings.map(r =>
        r.usuari_id === currentUser.id
          ? { ...r, puntuacio: value }
          : r
      )

      setRatings(updatedRatings)

    } else {
      const newRating = {
        id: Date.now(),
        usuari_id: currentUser.id,
        puntuacio: value
      }

      setRatings([...ratings, newRating])
    }
  }

  const Stars = ({ current, onClick }) => {
    return (
      <div style={{ fontSize: "25px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            onClick={() => onClick(num)}
            style={{
              color: num <= current ? "gold" : "gray"
            }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  const [comments, setComments] = useState([
    {
      id: 1,
      usuari: "Adria",
      contingut: "Molt interessant!",
      parent_id: null,
      data: new Date().toLocaleString()
    },
    {
      id: 2,
      usuari: "Daniel",
      contingut: "Totalment d'acord",
      parent_id: 1,
      data: new Date().toLocaleString()
    }
  ])

  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newEntry = {
      id: Date.now(),
      usuari: currentUser.name,
      contingut: newComment,
      parent_id: null,
      data: new Date().toLocaleString()
    }

    setComments([...comments, newEntry])
    setNewComment("")
  }

  const handleReply = (parentId, text) => {
    if (!text.trim()) return

    const newReply = {
      id: Date.now(),
      usuari: currentUser.name,
      contingut: text,
      parent_id: parentId,
      data: new Date().toLocaleString()
    }

    setComments([...comments, newReply])
  }

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
        <small className="text-muted ms-2">({comment.data})</small>

        <p>{comment.contingut}</p>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setShowReply(!showReply)}
        >
          Respondre
        </button>

        {showReply && (
          <div className="mt-2">
            <input
              className="form-control mb-2"
              placeholder="Escriu resposta..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
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

  return (
    <div className="container mt-5">

      <div className="mb-4">
        <h1>{post.titol}</h1>
        <p>{post.dataPost} | {post.usuari}</p>
      </div>

      <div className="row">

        <div className="col-md-8">

          <p>{post.descripcio}</p>

          {/*VALORACIONS */}
          <div className="mt-4">
            <h4>Valoració</h4>

            <Stars current={userRating} onClick={handleRate} />

            <p className="mt-2">
              Mitjana: <strong>{average}</strong> ({ratings.length} vots)
            </p>

            {existingRating && (
              <small className="text-muted">
                Has valorat aquest post (pots modificar-ho)
              </small>
            )}
          </div>

          {/* FORMULARI */}
          <div className="mt-4">
            <h4>Afegir comentari</h4>

            <input
              className="form-control mb-2"
              placeholder="Escriu un comentari..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button className="btn btn-success" onClick={handleAddComment}>
              Publicar
            </button>
          </div>

          {/* COMENTARIS */}
          <h3 className="mt-5">Comentaris</h3>

          {comments
            .filter(c => c.parent_id === null)
            .map(c => (
              <Comment key={c.id} comment={c} />
            ))}

        </div>

        <div className="col-md-4">
          <div className="card">
            <img
              src={post.imatge}
              alt={post.titol}
              style={{
                height: "280px",
                objectFit: "cover"
              }}
            />
            <div className="card-body">
              <h5>{post.titol}</h5>
              <p><strong>Època:</strong> {post.epoca}</p>
              <p><strong>Autor:</strong> {post.usuari}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostDetail