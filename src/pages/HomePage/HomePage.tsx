import { selectIsLoggedIn, selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";

export default function HomePage() {
  const user = useAppSelector(selectUser);
  const isLoggetIn = useAppSelector(selectIsLoggedIn);
  return (
    <div>
      {user && isLoggetIn ? (
        <div>
          <p>{`Welcome ${user.name}`}</p>
        </div>
      ) : (
        <div>
          <p>Home pages</p>
        </div>
      )}
    </div>
  );
}
