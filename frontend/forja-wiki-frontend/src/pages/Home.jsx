import { useNavigate } from "react-router-dom"
import { useState } from "react"
import metalBg from "../assets/fons.avif"

function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const categories = [
    { id: 1,  imatge: "/Proteccio.png" },
    { id: 2,  imatge: "/Armes.png" },
    { id: 3,  imatge: "/EinesAgricoles.png" },
    { id: 4,  imatge: "/estrisvaris.png" },
    { id: 5,  imatge: "/materials.png" },
    { id: 6,  imatge: "/Tecniques.png" }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    const query = search.trim()
    if (!query) return
    navigate(`/posts?search=${encodeURIComponent(query)}`)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${metalBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingBottom: "60px"
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
                  className="form-control"
                  placeholder="Buscar posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: "rgba(20,20,20,0.6)",
                    color: "white",
                    border: "1px solid #ff6a00"
                  }}
                />

                <button
                  className="btn"
                  style={{
                    backgroundColor: "#ff6a00",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 0 10px #ff6a00"
                  }}
                >
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
                onClick={() => navigate(`/category/${cat.id}`)}
                style={{
                  cursor: "pointer",
                  height: "220px",
                  position: "relative",
                  background: "transparent",
                  border: "none",
                  borderRadius: "18px",
                  overflow: "hidden",

                  filter:
                    "drop-shadow(0 0 18px #54504a)"
                }}
              >

                <img
                  src={cat.imatge}
                  alt={cat.nom}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "transparent"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    fontFamily: "'Cinzel', serif",
                    textShadow: "0 0 10px black"
                  }}
                >
                  {cat.nom}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* QUI SOM */}
        <div
          className="mt-5 p-4"
          style={{
            backgroundColor: "rgba(15,15,15,0.55)",
            borderRadius: "15px",
            color: "#eee",
            border: "1px solid rgba(255,106,0,0.4)",
            boxShadow: "0 0 15px rgba(255,106,0,0.2)"
          }}
        >

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
  de la forja tradicional i l’art de treballar el metall al llarg de la història.
  El nostre objectiu és recopilar tècniques, eines i objectes que han marcat
  l’evolució de la metal·lúrgia des de l’antiguitat fins a l’era moderna.
</p>

<p>
  Aquí trobaràs armes, proteccions, eines agrícoles i estris d’ús quotidià,
  tots ells documentats amb descripcions detallades, imatges i context històric.
  Cada peça està organitzada per categories perquè puguis explorar fàcilment
  segons el teu interès.
</p>

<p>
  També podràs descobrir les tècniques de forja més importants, com el trempat,
  el martelleig o el tractament del metall en calent, que van permetre crear
  eines més resistents i eficients al llarg dels segles.
</p>

<p>
  Aquesta plataforma està pensada tant per curiosos com per estudiants,
  artesans o aficionats a la història. L’objectiu és mantenir viu aquest
  coneixement i fer-lo accessible a tothom.
</p>

        </div>

        {/* BOTÓ */}
        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/posts")}
            style={{
              backgroundColor: "#ff6a00",
              color: "white",
              border: "none",
              padding: "12px 30px",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "0 0 15px #ff2a00"
            }}
          >
            Veure tots els posts
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home