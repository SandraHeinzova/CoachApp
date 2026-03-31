import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="slide-menu">
            <ul className="menu-list">
                <li><Link to="/dashboard"><i className="fa-solid fa-table-columns"></i> Nástěnka</Link></li>
                <li><Link to="/team"><i className="fa-solid fa-users"></i> Můj Tým</Link></li>
                <li><Link to="/"><i className="fa-solid fa-stopwatch"></i> Tréninky</Link></li>
                <li><Link to="/"><i className="fa-solid fa-futbol"></i> Zápasy</Link></li>
                <li><Link to="/new_member" className="active"><i className="fa-solid fa-user-plus"></i> Nový člen</Link></li>
                <li><Link to="/"><i className="fa-solid fa-chart-pie"></i> Statistiky</Link></li>
                <li className="separator"></li>
                <li><a onClick={handleLogout} className="logout" style={{ cursor: 'pointer' }}><i className="fa-solid fa-right-from-bracket"></i> Odhlásit se</a></li>
            </ul>
        </nav>
    );
}

export default Sidebar;