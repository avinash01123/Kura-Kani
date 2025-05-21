import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRedirectRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/" />;
};

export default AuthRedirectRoute;
