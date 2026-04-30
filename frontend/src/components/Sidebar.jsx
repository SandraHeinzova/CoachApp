import { Link, useNavigate, useLocation } from 'react-router-dom';
import {showAlert} from "./AlertService.jsx";
import api from "../api/axiosInstance.js";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        const result = await showAlert.confirm(
            "Odhlášení",
            "Opravdu se chcete odhlásit?"
        );

        if (result.isConfirmed) {
            try {
                await api.post('/auth/logout');
                showAlert.success("Odhlášeno", "Byli jste úspěšně odhlášeni.")
            } catch (err) {
                console.error("Server logout failed:", err);
                showAlert.success("Odhlášeno", "Lokální relace byla ukončena.")
            } finally {
                localStorage.removeItem('user');
                navigate('/');
            }
        }
    };

    return (
        <nav className="slide-menu">
            <ul className="menu-list">
                <li>
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <i className="fa-solid fa-table-columns"></i> Nástěnka
                    </Link>
                </li>

                <li>
                    <Link to="/team" className={location.pathname === '/team' ? 'active' : ''}>
                        <i className="fa-solid fa-users"></i> Můj Tým
                    </Link>
                </li>

                <li>
                    <Link to="/trainings" className={location.pathname === '/trainings' ? 'active' : ''}>
                        <i className="fa-solid fa-stopwatch"></i> Tréninky
                    </Link>
                </li>

                <li>
                    <Link to="/matches" className={location.pathname === '/matches' ? 'active' : ''}>
                        <i className="fa-solid fa-futbol"></i> Zápasy
                    </Link>
                </li>

                <li>
                    <Link to="/new_member" className={location.pathname === '/new_member' ? 'active' : ''}>
                        <i className="fa-solid fa-user-plus"></i> Nový člen
                    </Link>
                </li>

                <li>
                    <Link to="/stats" className={location.pathname === '/stats' ? 'active' : ''}>
                        <i className="fa-solid fa-chart-pie"></i> Statistiky
                    </Link>
                </li>

                <li className="separator"></li>
                <li>
                    <a onClick={handleLogout} className="logout" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-right-from-bracket"></i> Odhlásit se
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;