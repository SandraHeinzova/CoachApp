import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import NewMember from './pages/New_Member';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/Not_Found.jsx';
import UnderConstruction from './pages/Under_Construction.jsx';

function App() {
    return (
        <Routes>
            {/* --- VEŘEJNÉ CESTY --- */}
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* --- CHRÁNĚNÉ CESTY (Vyžadují přihlášení) --- */}
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

            {/* NOVÉ SEKCE: Zatím ve výstavbě, ale už v menu */}
            <Route path="/matches" element={
                <ProtectedRoute>
                    <UnderConstruction title="Rozpis zápasů" />
                </ProtectedRoute>
            } />

            <Route path="/trainings" element={
                <ProtectedRoute>
                    <UnderConstruction title="Plán tréninků" />
                </ProtectedRoute>
            } />

            <Route path="/stats" element={
                <ProtectedRoute>
                    <UnderConstruction title="Statistiky hráčů" />
                </ProtectedRoute>
            } />

            {/* --- 404 NOT FOUND --- */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;