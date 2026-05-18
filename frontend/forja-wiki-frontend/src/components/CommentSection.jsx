import { useState, useEffect } from "react"
import CommentItem from "./CommentItem.jsx"

function CommentSection({ comentaris }) {

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const adapted = (comentaris || []).map(c => ({
      id: c.id,
      parent_id: c.parent_id,
      text: c.contingut,
      usuari: c.user?.name || "Usuari"
    }))

    setComments(adapted)
  }, [comentaris])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newObj = {
      id: Date.now(),
      parent_id: null,
      text: newComment,
      usuari: "UsuariActual",
    }

    setComments([...comments, newObj])
    setNewComment("")
  }

  const handleAddReply = (reply) => {
    setComments([...comments, reply])
  }

  const rootComments = comments.filter(c => !c.parent_id)

  return (
    <div className="mt-5">

      <h3>Comentaris</h3>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Escriu un comentari..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          className="btn btn-primary mt-2"
          onClick={handleAddComment}
        >
          Afegir comentari
        </button>
      </div>

      {rootComments.map(c => (
        <CommentItem
          key={c.id}
          comment={c}
          allComments={comments}
          onAddReply={handleAddReply}
        />
      ))}
<div
  style={{
    minHeight: "100vh",
    background: "transparent"
  }}
></div>
    </div>
  )
}

export default CommentSection