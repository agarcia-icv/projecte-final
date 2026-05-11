import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  const categories = [
    {
      id: 1,
      nom: "Protecció",
      imatge: "https://picsum.photos/600/400?armor"
    },
    {
      id: 2,
      nom: "Armes",
      imatge: "https://picsum.photos/600/400?sword"
    },
    {
      id: 3,
      nom: "Eines Agrícoles",
      imatge: "https://picsum.photos/600/400?farm"
    },
    {
      id: 4,
      nom: "Estris varis",
      imatge: "https://picsum.photos/600/400?metal"
    },
    {
      id: 5,
      nom: "Materials",
      imatge: "https://picsum.photos/600/400?blacksmith"
    },
    {
      id: 6,
      nom: "Tècniques",
      imatge: "https://picsum.photos/600/400?tools"
    }
  ]

  return (
    <div
      style={{
        backgroundColor: "#2f2f2f",
        minHeight: "100vh",
        paddingBottom: "50px"
      }}
    >
      <div className="container pt-2">

        <div className="text-center mb-5">
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
                    textAlign: "center",
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
          <h2
            className="text-center mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Qui som
          </h2>

          <p>
            ForjaWiki és una plataforma dedicada a preservar i compartir el coneixement
            sobre la forja tradicional, eines històriques i tècniques artesanals.
          </p>

          <p>
            Aquí podràs descobrir armes, eines agrícoles, materials i processos que han
            format part de la història de la humanitat.
          </p>

          <p>
            Aquesta secció s’omplirà amb informació detallada pròximament.
          </p>
        </div>

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
    onClick={() => window.location.href = "/posts"}
  >
    Veure tots els posts
  </button>

</div>
    </div>
  )
}

export default Home