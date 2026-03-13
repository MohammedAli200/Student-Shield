import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Protects routes by role. Redirects to appropriate dashboard if user doesn't have access.
 */
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    const path = `/${user.role.toLowerCase()}`;
    return <Navigate to={path} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
