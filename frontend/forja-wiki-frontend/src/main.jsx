import React from "react"
import ReactDOM from "react-dom/client"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
)