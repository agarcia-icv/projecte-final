const posts = [
  {
    id: 1,
    titol: "Martell de forja",
    descripcio:
      "Aquest martell s'utilitzava a l'edat mitjana per treballar el ferro calent...",
    epoca: "Edat Mitjana",
    imatge: "https://picsum.photos/400/300?random=1",
    data: "12/04/2026",
    usuari: "Adria",
   comentaris: [
  {
    id: 1,
    usuari: "Daniel",
    text: "Molt interessant aquest martell!",
    parent_id: null,
  },
  {
    id: 2,
    usuari: "Adria",
    text: "Sí, és una eina molt important.",
    parent_id: 1,
  },
  {
    id: 3,
    usuari: "Daniel",
    text: "Es feien a mà?",
    parent_id: null,
  },
],
  },
  {
    id: 2,
    titol: "Enclusa",
    descripcio:
      "L'enclusa és una superfície metàl·lica on es treballa el ferro...",
    epoca: "Antiguitat",
    imatge: "https://picsum.photos/400/300?random=2",
    data: "10/04/2026",
    usuari: "Daniel",
    comentaris: [],
  },
  {
    id: 3,
    titol: "Tenalles",
    descripcio:
      "Les tenalles serveixen per subjectar peces calentes sense cremar-se...",
    epoca: "Edat Moderna",
    imatge: "https://picsum.photos/400/300?random=3",
    data: "08/04/2026",
    usuari: "Adria",
    comentaris: [],
  },

 
]



export default posts

