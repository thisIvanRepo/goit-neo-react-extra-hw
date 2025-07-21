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

  const handleLogout = () => {
    dispatch(authActions.fetchLogout());
  };

  return (
    <header>
      <nav>
        <ul>
          {!isLoggetIn && (
            <li>
              <NavLink to="/signup">Register</NavLink>
            </li>
          )}
          {!isLoggetIn && (
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoggetIn && (
            <li>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>
          )}
        </ul>
      </nav>
      {isLoggetIn && (
        <div>
          <p>{user?.email}</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </header>
  );
}
