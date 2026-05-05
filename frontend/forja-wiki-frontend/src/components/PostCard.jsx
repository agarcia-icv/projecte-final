import { useNavigate } from "react-router-dom"

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  const imageUrl = post.imatge?.startsWith("http")
    ? post.imatge
    : `http://127.0.0.1:8000/storage/${post.imatge}`

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
          bottom: 0,
          width: "100%",
          background: "rgba(0,0,0,0.65)",
          padding: "12px"
        }}
      >
        <h5 className="mb-0 text-white">
          {post.titol}
        </h5>
      </div>
    </div>
  )
}

export default PostCard