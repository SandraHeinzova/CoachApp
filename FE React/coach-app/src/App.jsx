import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import NewMember from './pages/New_Member';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/team" element={
                <ProtectedRoute>
                    <Team />
                </ProtectedRoute>
            } />

            <Route path="/new_member" element={
                <ProtectedRoute>
                    <NewMember />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;