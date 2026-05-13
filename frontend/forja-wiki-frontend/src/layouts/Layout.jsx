import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="app-bg">
      <Outlet />
    </div>
  )
}

export default Layout