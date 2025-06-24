import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRout({ children }: Props) {
  const isLoggetIn = useAppSelector(selectIsLoggedIn);
  console.log(isLoggetIn);

  if (!isLoggetIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
