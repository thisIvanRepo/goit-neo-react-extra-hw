import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { authActions } from "@/redux/auth/operations";

export default function Header() {
  const user = useAppSelector(selectUser);
  const isLoggetIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggetIn && !user) {
      dispatch(authActions.fetchCurrentUser());
    }
  }, [user, isLoggetIn, dispatch]);

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
