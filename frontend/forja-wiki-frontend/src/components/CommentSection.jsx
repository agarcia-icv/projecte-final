import { useState } from "react"
import CommentItem from "./CommentItem.jsx"

function CommentSection({ comentaris }) {
  const [comments, setComments] = useState(comentaris)
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim() === "") return

    const newObj = {
      id: Date.now(),
      usuari: "UsuariActual",
      text: newComment,
      parent_id: null,
    }

    setComments([...comments, newObj])
    setNewComment("")
  }

  const handleAddReply = (reply) => {
    setComments([...comments, reply])
  }

  const rootComments = comments.filter(c => c.parent_id === null)

  return (
    <div className="mt-5">

      <h3>Comentaris</h3>

      {/* NOU COMENTARI */}
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

      {/* LLISTA */}
      {rootComments.map(c => (
        <CommentItem
          key={c.id}
          comment={c}
          allComments={comments}
          onAddReply={handleAddReply}
        />
      ))}

    </div>
  )
}

export default CommentSection