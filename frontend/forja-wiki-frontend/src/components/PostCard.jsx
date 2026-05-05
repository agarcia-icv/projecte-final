import { useNavigate } from "react-router-dom"

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }
  const imageUrl = `http://127.0.0.1:8000/storage/${post.imatge}`

  return (
    <div
      className="card text-white shadow-sm border-0"
      style={{
        height: "250px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative"
      }}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={post.titol}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(0,0,0,0.6)",
          padding: "10px"
        }}
      >
        <h5>{post.titol}</h5>
      </div>
    </div>
  )
}

export default PostCard