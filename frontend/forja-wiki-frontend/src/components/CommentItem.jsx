import { useState } from "react"

function CommentItem({ comment, allComments, onAddReply }) {
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  const replies = allComments.filter(
    c => c.parent_id === comment.id
  )

  const handleReply = () => {
    if (replyText.trim() === "") return

    onAddReply({
      id: Date.now(),
      usuari: "UsuariActual",
      text: replyText,
      parent_id: comment.id,
    })

    setReplyText("")
    setShowReply(false)
  }

  return (
    <div style={{ marginLeft: comment.parent_id ? "20px" : "0px" }}>

      <div className="card mb-2 p-2">
        <strong>{comment.usuari}</strong>
        <p className="mb-1">{comment.text}</p>

        <button
          className="btn btn-sm btn-link"
          onClick={() => setShowReply(!showReply)}
        >
          Respondre
        </button>

        {showReply && (
          <div className="mt-2">
            <textarea
              className="form-control mb-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="btn btn-sm btn-primary"
              onClick={handleReply}
            >
              Enviar resposta
            </button>
          </div>
        )}
      </div>

      {/* RESPOSTES (recursiu) */}
      {replies.map(r => (
        <CommentItem
          key={r.id}
          comment={r}
          allComments={allComments}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  )
}

export default CommentItem