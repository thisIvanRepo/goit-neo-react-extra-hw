import { NavLink } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/auth/selectors";

export default function Header() {
  const user = useAppSelector(selectUser);

  return (
    <header>
      <nav>
        <ul>
          <p>{user?.email}</p>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
