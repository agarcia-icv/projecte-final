import { useNavigate } from "react-router-dom"

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  const imageUrl = post.imatge?.startsWith("http")
    ? post.imatge
    : `http://127.0.0.1:8000/storage/${post.imatge}`

  const average =
    post.valoracions_avg_puntuacio ??
    post.valoracions_avg ??
    0

  const Stars = ({ value }) => (
    <div style={{ fontSize: "18px" }}>
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          style={{
            color: num <= Math.round(value) ? "#ffb300" : "#555"
          }}
        >
          ★
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="post-card-forja"
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={post.titol}
        className="post-card-img"
      />

      <div className="post-card-rating">
        <Stars value={average} />
      </div>

      <div className="post-card-title">
        <h5>{post.titol}</h5>
      </div>
    </div>
  )
}

export default PostCard