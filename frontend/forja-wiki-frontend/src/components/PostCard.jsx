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
            color: num <= Math.round(value) ? "gold" : "#555"
          }}
        >
          ★
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="card shadow-sm"
      style={{
        height: "340px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        border: "5px solid #eb6003"
      }}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={post.titol}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "10px",
          background: "rgba(0,0,0,0.6)",
          padding: "4px 8px",
          borderRadius: "6px"
        }}
      >
        <Stars value={average} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(0,0,0,0.65)",
          padding: "12px"
        }}
      >
        <h5 className="mb-0 text-white">{post.titol}</h5>
      </div>
    </div>
  )
}

export default PostCard