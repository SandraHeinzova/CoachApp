import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles_dashboard.css';

function Dashboard() {
    document.title = "CoachApp Dashboard"

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="dashboard-body">
            <input type="checkbox" id="menu-toggle"/>
            <header className="top-header">
                <div className="header-left">
                    <label htmlFor="menu-toggle" className="hamburger-icon">
                        <i className="fa-solid fa-bars"></i>
                    </label>
                    <div className="brand">
                        <img src="images/logo.png" alt="Logo" className="nav-logo"/>
                        <h1>CoachApp</h1>
                    </div>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <span>Jan Heinz</span>
                        <i className="fa-solid fa-circle-user"></i>
                        <a onClick={handleLogout} className="logout-btn" title="Odhlásit se">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </div>
                </div>
            </header>
            <nav className="slide-menu">
                <ul className="menu-list">
                    <li><Link to="/dashboard" className="active"><i
                        className="fa-solid fa-table-columns"></i> Nástěnka</Link></li>
                    <li><Link to="/team"><i className="fa-solid fa-users"></i> Můj Tým</Link></li>
                    <li><Link to="/"><i className="fa-solid fa-stopwatch"></i> Tréninky</Link></li>
                    <li><Link to="/"><i className="fa-solid fa-futbol"></i> Zápasy</Link></li>
                    <li><Link to="/new_member"><i className="fa-solid fa-user-plus"></i> Nový člen</Link></li>
                    <li><Link to="/"><i className="fa-solid fa-chart-pie"></i> Statistiky</Link></li>
                    <li className="separator"></li>
                    <li><a onClick={handleLogout} className="logout"><i
                        className="fa-solid fa-right-from-bracket"></i> Odhlásit se</a></li>
                </ul>
            </nav>
            <label htmlFor="menu-toggle" className="menu-overlay"></label>
            <main className="dashboard-content">
                <div className="welcome-row">
                    <h2>Nástěnka</h2>
                    <p className="current-date">
                        Dnešní datum: {new Date().toLocaleDateString('cs-CZ')}
                    </p>
                </div>
                <div className="dashboard-grid">
                    <Link to="/team" className="card team-card">
                        <div className="icon-circle">
                            <i className="fa-solid fa-users"></i>
                        </div>
                        <h3>Můj Tým</h3>
                    </Link>
                    <Link to="/" className="card team-card">
                        <div className="icon-circle">
                            <i className="fa-solid fa-stopwatch"></i>
                        </div>
                        <h3>Tréninky</h3>
                    </Link>
                    <div className="card injury-card">
                        <div className="default-view">
                            <div className="card-header-small">
                                <i className="fa-solid fa-user-injured"></i>
                                <h3>Zranění</h3>
                            </div>
                            <div className="big-count">10</div>
                            <p className="status-text">Hráči mimo hru</p>
                        </div>
                        <div className="hover-view">
                            <h4>Seznam marodů</h4>
                            <ul className="injury-list">
                                <li><strong>P. Černý</strong> <span className="reason">Kotník</span></li>
                                <li><strong>T. Kovář</strong> <span className="reason">Sval</span></li>
                                <li><strong>J. Novák</strong> <span className="reason">Koleno</span></li>
                                <li><strong>M. Svoboda</strong> <span className="reason">Chřipka</span></li>
                                <li><strong>D. Kučera</strong> <span className="reason">Tříslo</span></li>
                                <li><strong>L. Mareš</strong> <span className="reason">Záda</span></li>
                                <li><strong>F. Veselý</strong> <span className="reason">Kotník</span></li>
                                <li><strong>P. Horák</strong> <span className="reason">Otřes mozku</span></li>
                                <li><strong>J. Malý</strong> <span className="reason">Hamstring</span></li>
                                <li><strong>K. Říha</strong> <span className="reason">Viróza</span></li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/" className="card team-card">
                        <div className="icon-circle">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3>Statistiky</h3>
                    </Link>
                    <Link to="/" className="card team-card">
                        <div className="icon-circle">
                            <i className="fa-solid fa-futbol"></i>
                        </div>
                        <h3>Zápasy</h3>
                    </Link>
                    <Link to="/new_member" className="card team-card">
                        <div className="icon-circle">
                            <i className="fa-solid fa-user-plus"></i>
                        </div>
                        <h3>Nový člen</h3>
                    </Link>
                </div>
            </main>
            <footer className="main-footer">
                <p className="copyright">&copy; 2025 CoachApp </p>
                <p className="author">Design a kód: <span className="page-autor-name">Sandra Heinzová</span></p>
            </footer>
        </div>
    );
}

export default Dashboard;