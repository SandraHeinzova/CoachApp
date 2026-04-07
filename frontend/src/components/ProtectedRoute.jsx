import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const loggedUser = localStorage.getItem('user');

    if (!loggedUser) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;