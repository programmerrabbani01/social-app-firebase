import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";

interface ProtectedRouteProps {
  user: User | null;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
