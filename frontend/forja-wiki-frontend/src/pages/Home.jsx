import { Link } from "react-router-dom"

function Home() {

  const posts = [
    {
      id: 1,
      titol: "Martell de forja",
      descripcio: "Eina utilitzada per treballar el ferro...",
      dataPost: "2024-01-10",
      usuari: "Adria",
      epoca: "Edat Mitjana",
      imatge: "https://picsum.photos/600/400?1"
    },
    {
      id: 2,
      titol: "Enclusa",
      descripcio: "Base on es colpeja el metall...",
      dataPost: "2024-01-12",
      usuari: "Daniel",
      epoca: "Edat Antiga",
      imatge: "https://picsum.photos/600/400?2"
    },
    {
       id: 3,
      titol: "Espasa",
      descripcio: "Base on es colpeja el metall...",
      dataPost: "2024-01-12",
      usuari: "Daniel",
      epoca: "Edat Antiga",
      imatge: "https://picsum.photos/600/400?2"
    }
  ]

  return (
    <div className="container mt-5">
      <h1>ForjaWiki</h1>

      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-md-6 mb-4">
            
            <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              
              <div className="card text-white" style={{ height: "250px", overflow: "hidden" }}>
                
                <img
                  src={post.imatge}
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

            </Link>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Home