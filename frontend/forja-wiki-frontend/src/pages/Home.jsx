import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Home() {

  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const categories = [
    { id: 1,  imatge: "/Proteccio.png" },
    { id: 2,  imatge: "/Armes.png" },
    { id: 3,  imatge: "/agricoles.png" },
    { id: 4,  imatge: "/materials.png" },
    { id: 5,  imatge: "/tecniques.png" },
    { id: 6,  imatge: "/estris.png" }
  ]

  const handleSearch = (e) => {
    e.preventDefault()

    const query = search.trim()
    if (!query) return

    navigate(`/posts?search=${encodeURIComponent(query)}`)
  }

  return (
    <div style={{ backgroundColor: "#2f2f2f", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="container pt-2">

        <div className="text-center mb-4">
          <img
            src="/logo_forjawiki.png"
            alt="ForjaWiki"
            style={{
              height: "250px",
              width: "auto",
              display: "block",
              margin: "0 auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px #ff6a00) drop-shadow(0 0 25px #ff2a00)",
            }}
          />
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8">

            <form onSubmit={handleSearch}>
              <div className="input-group">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar posts per nom (ex: espa...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: "#3a3a3a",
                    color: "white",
                    border: "2px solid #ff6a00"
                  }}
                />

                <button className="btn btn-warning" type="submit">
                  Buscar
                </button>

              </div>
            </form>

          </div>
        </div>

        <div className="row">
          {categories.map((cat) => (
            <div key={cat.id} className="col-md-4 mb-4">

              <div
                className="card shadow"
                onClick={() => navigate(`/category/${cat.id}`)}
                style={{
                  cursor: "pointer",
                  border: "2px solid #ff6a00",
                  overflow: "hidden",
                  height: "200px",
                  position: "relative"
                }}
              >
                <img
                  src={cat.imatge}
                  alt={cat.nom}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 5px black"
                  }}
                >
                  {cat.nom}
                </div>

              </div>

            </div>
          ))}
        </div>

        <div
          className="mt-5 p-4"
          style={{
            backgroundColor: "#3a3a3a",
            borderRadius: "10px",
            color: "#ddd"
          }}
        >
          <h2 className="text-center mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
            Qui som
          </h2>

          <p>
            ForjaWiki és una plataforma dedicada a preservar el coneixement de la forja tradicional.
          </p>
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-lg"
            style={{
              backgroundColor: "#ff6a00",
              color: "white",
              border: "none",
              padding: "12px 30px",
              fontWeight: "bold"
            }}
            onClick={() => navigate("/posts")}
          >
            Veure tots els posts
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home