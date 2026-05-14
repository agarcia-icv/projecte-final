import { useNavigate } from "react-router-dom"
import { useState } from "react"
import metalBg from "../assets/fons.avif"

function Home() {

  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const categories = [
    { id: 1, imatge: "/Proteccio.png" },
    { id: 2, imatge: "/Armes.png" },
    { id: 3, imatge: "/EinesAgricoles.png" },
    { id: 4, imatge: "/estrisvaris.png" },
    { id: 5, imatge: "/materials.png" },
    { id: 6, imatge: "/Tecniques.png" }
  ]

  const handleSearch = (e) => {
    e.preventDefault()

    const query = search.trim()
    if (!query) return

    navigate(`/posts?search=${encodeURIComponent(query)}`)
  }

  return (
    <div
      className="home-bg"
      style={{
        backgroundImage: `url(${metalBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="container pt-3">

        <div className="text-center mb-4">
          <img
            src="/logo_forjawiki.png"
            alt="ForjaWiki"
            style={{
              height: "250px",
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 10px #ff6a00) drop-shadow(0 0 25px #ff2a00)"
            }}
          />
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8">

            <form onSubmit={handleSearch}>
              <div className="input-group">

                <input
                  type="text"
                  className="home-search-input form-control"
                  placeholder="Buscar posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button className="home-search-btn btn" type="submit">
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
                className="home-category-card"
                onClick={() => navigate(`/category/${cat.id}`)}
              >

                <img
                  src={cat.imatge}
                  alt={cat.nom}
                  className="home-category-img"
                />

              </div>

            </div>
          ))}

        </div>

        <div className="home-info-box mt-5">

          <h2
            className="text-center mb-3"
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: "0 0 10px #ff6a00"
            }}
          >
            Qui som
          </h2>

          <p>
            ForjaWiki és una plataforma dedicada a preservar i difondre el coneixement
            de la forja tradicional i l’art del metall.
          </p>

          <p>
            Aquí trobaràs armes, proteccions, eines agrícoles i tècniques històriques
            de treball del metall.
          </p>

          <p>
            L’objectiu és mantenir viu aquest coneixement i fer-lo accessible a tothom.
          </p>

        </div>

        <div className="text-center mt-5">
          <button
            className="home-main-btn"
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