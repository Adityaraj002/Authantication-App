import { NavLink } from "react-router-dom"
export const Logo = () => {
  return (
    <div className="logo flex items-center flex-1">
      <NavLink to="/" className="text-xl font-bold text-green-800">
      Logo
      </NavLink>
    </div>
  )
}
