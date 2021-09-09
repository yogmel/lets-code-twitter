import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <NavLink to="/geral" activeClassName="active">
          Geral
        </NavLink>
      </li>
      <li>
        <NavLink to="/meu-perfil" activeClassName="active">
          Meu Perfil
        </NavLink>
      </li>
      <li>
        <NavLink to="/meus-favoritos" activeClassName="active">
          Favoritos
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
