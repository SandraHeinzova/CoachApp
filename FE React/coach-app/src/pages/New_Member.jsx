import { useState } from 'react'; // TOTO JE KLÍČOVÉ
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles_new_member.css';

function NewMember() {
    const navigate = useNavigate();
    // Vytvoříme stav pro vybranou roli
    const [role, setRole] = useState("");

    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/');
    };

    document.title = "CoachApp New Member";

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
                        <a onClick={handleLogout} className="logout-btn" title="Odhlásit se" style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </div>
                </div>
            </header>

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
            <label htmlFor="menu-toggle" className="menu-overlay"></label>

            <main className="dashboard-content">
                <div className="welcome-banner">
                    <h2>Nový člen týmu</h2>
                </div>

                <div className="card new-member-card">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <h3 className="section-title">Základní údaje</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Funkce v týmu</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Vyberte funkci...</option>
                                    <option value="Hráč">Hráč</option>
                                    <option value="Trenér">Trenér</option>
                                    <option value="Asistent trenéra">Asistent trenéra</option>
                                    <option value="Lékař">Lékař</option>
                                    <option value="Masér">Masér</option>
                                    <option value="Fyzioterapeut">Fyzioterapeut</option>
                                    <option value="Kondiční trenér">Kondiční trenér</option>
                                    <option value="Kustod">Kustod</option>
                                    <option value="Videotrenér">Videotrenér</option>
                                    <option value="Psycholog">Psycholog</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Jméno</label>
                                <input type="text" placeholder="Jan" required/>
                            </div>

                            <div className="form-group">
                                <label>Příjmení</label>
                                <input type="text" placeholder="Novák" required/>
                            </div>

                            <div className="form-group">
                                <label>Datum narození</label>
                                <input type="date" required/>
                            </div>

                            <div className="form-group">
                                <label>Mobil</label>
                                <input type="tel" placeholder="+420 777 123 456"/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="jan.novak@email.cz"/>
                            </div>
                        </div>
                        <div className={`player-params-section ${role === 'Hráč' ? 'visible' : ''}`}>
                                <hr className="form-divider"/>
                                <h3 className="section-title">Parametry hráče</h3>
                                <div className="form-grid-small">
                                    <div className="form-group">
                                        <label>FAČR ID</label>
                                        <input type="text" placeholder="12345678"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Výška (cm)</label>
                                        <input type="number" placeholder="185" min="0"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Váha (kg)</label>
                                        <input type="number" placeholder="80" min="0"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Noha</label>
                                        <select>
                                            <option value="Pravá">Pravá</option>
                                            <option value="Levá">Levá</option>
                                            <option value="Obě">Obě</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        <div className="form-footer-split">
                            <div className="form-group city-input">
                                <label>Město</label>
                                <input type="text" placeholder="Pardubice"/>
                            </div>
                            <button type="submit" className="btn-submit">
                                <i className="fa-solid fa-plus"></i> PŘIDAT ČLENA
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="main-footer-new-member">
                <p className="copyright">&copy; {new Date().getFullYear()} CoachApp </p>
                <p className="author">Design a kód: <span className="page-autor-name">Sandra Heinzová</span></p>
            </footer>
        </div>
    );
}

export default NewMember;