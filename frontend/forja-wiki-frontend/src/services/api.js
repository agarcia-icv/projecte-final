

// MOCK DATA

const posts = [
  {
    id: 1,
    titol: "Martell de forja",
    descripcio: "Eina utilitzada per treballar el ferro...",
    dataPost: "2024-01-10",
    usuari: "Adria",
    epoca: "Edat Mitjana",
    imatge: "https://picsum.photos/600/400?1",
    tipus: "Martell"
  },
  {
    id: 2,
    titol: "Enclusa",
    descripcio: "Base on es colpeja el metall...",
    dataPost: "2024-01-12",
    usuari: "Daniel",
    epoca: "Edat Antiga",
    imatge: "https://picsum.photos/600/400?2",
    tipus: "Base"
  }
]

export async function getPosts() {
  return posts
}

export async function getPost(id) {
  return posts.find(p => p.id === parseInt(id))
}