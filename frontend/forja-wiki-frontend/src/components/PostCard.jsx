import { useNavigate } from "react-router-dom"

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  return (
    <div
      className="card shadow-sm border-0 overflow-hidden"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div
        style={{
          position: "relative",
          height: "250px",
        }}
      >
        <img
          src={post.imatge}
          alt={post.titol}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay fosc */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "10px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
          }}
        >
          <h5 style={{ color: "white", margin: 0 }}>
            {post.titol}
          </h5>
        </div>
      </div>
    </div>
  )
}

export default PostCard