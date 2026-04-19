import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

function ProtectedRoute({ children }) {
    const loggedUser = localStorage.getItem('user');
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verify = async () => {
            if (loggedUser) {
                try {
                    await api.get('/users/login');
                } catch (e) {
                }
            }
            setIsVerifying(false);
        };
        verify();
    }, [loggedUser]);

    if (!loggedUser) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (isVerifying) return null;

    return children;
}

export default ProtectedRoute;