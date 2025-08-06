import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { authActions } from "@/redux/auth/operations";
import { Button } from "../ui/button";

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
    <header className="flex items-center justify-between flex-row-reverse mb-10 border rounded-b-3xl w-full pl-[35px]">
      <nav className="flex w-fit justify-end items-center h-20">
        <ul className="flex gap-x-5 mr-10">
          {!isLoggetIn && (
            <li>
              <NavLink
                className="hover:underline hover:decoration-slate-500"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className="hover:underline hover:decoration-slate-500"
              to="/"
            >
              Home
            </NavLink>
          </li>
          {isLoggetIn && (
            <li>
              <NavLink
                className="hover:underline hover:decoration-slate-500"
                to="/contacts"
              >
                Contacts
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {isLoggetIn && (
        <div className="w-fit">
          <p>{user?.email}</p>
          <Button variant="link" onClick={handleLogout}>
            logout
          </Button>
        </div>
      )}
    </header>
  );
}
