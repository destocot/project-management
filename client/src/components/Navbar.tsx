import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../store";

export default function Navbar() {
  const authenticated = useSelector((state: RootState) => state.auth.userId);
  console.log(authenticated);
  return (
    <nav>
      {!authenticated && <NavLink to="/">Signin</NavLink>}
      {!authenticated && <NavLink to="/signup">Signup</NavLink>}
      {authenticated && <button>Signout</button>}
      {authenticated && <NavLink to="/projects">Projects</NavLink>}
    </nav>
  );
}
