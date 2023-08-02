import { Navigate } from "react-router-dom";
import useAuthStore from '../stores/useAuthStore';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const authenticated = useAuthStore(state => state.authenticated);

  return authenticated ? <Component {...rest} /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;