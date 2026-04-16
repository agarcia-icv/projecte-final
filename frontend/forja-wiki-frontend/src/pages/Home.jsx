import PostCard from "../components/PostCard.jsx"
import posts from "../services/mockData.js"

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Posts de la Wiki</h1>

      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home