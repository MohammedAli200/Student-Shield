import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Redirects root path (/) to the correct dashboard based on user role.
 */
const RoleBasedRedirect = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  const pathMap = {
    Student: '/student',
    Faculty: '/faculty',
    Counselor: '/counselor',
    Admin: '/admin',
  };

  const path = pathMap[user.role] || '/login';
  return <Navigate to={path} replace />;
};

export default RoleBasedRedirect;
