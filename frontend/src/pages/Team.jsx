import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axiosInstance.js'
import '../css/styles_team.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Team() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        document.title = "CoachApp Team";

        const fetchLoadData = async () => {
            try {
                const response = await api.get('/users');
                const data = response.data;

                const playersOnly = data.filter(user => user.roleName === 'Hráč');
                const staffOnly = data.filter(user => user.roleName !== 'Hráč' && user.roleName !== 'Admin' );

                setPlayers(playersOnly);
                setStaff(staffOnly);

            } catch (error) {
                console.error("Nepodařilo se navázat spojení se serverem:", error);
                setErrorMessage("Server je momentálně nedostupný. Zkuste to prosím později.");
                }
        };
        fetchLoadData();
    }, []);

    return (
        <div className="dashboard-body">
            <input type="checkbox" id="menu-toggle"/>
            <Header />
            <Sidebar/>
            <label htmlFor="menu-toggle" className="menu-overlay"></label>

            <main className="dashboard-content">
                <div className="welcome-banner">
                    <h2>Můj Tým</h2>
                </div>

                {errorMessage && (
                    <div className="auth-message-alert" style={{backgroundColor: '#dc3545', color: 'white', marginBottom: '20px'}}>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span style={{marginLeft: '10px'}}>{errorMessage}</span>
                    </div>
                )}

                {/* --- SEKCE HRÁČI --- */}
                <h3 className="list-category">Hráči</h3>
                <div className="team-list">
                    {players.length === 0 ? (
                        <div className="empty-team-state">
                            <div className="empty-icon">
                                <i className="fa-solid fa-users-viewfinder"></i>
                            </div>
                            <h4>V šatně zatím nikdo není</h4>
                            <p>Vypadá to, že tvůj tým je zatím prázdný. Klikni na tlačítko níže a začni budovat svou soupisku!</p>
                            <Link to="/new_member" className="btn-add-member">
                                <i className="fa-solid fa-plus"></i> PŘIDAT PRVNÍHO ČLENA
                            </Link>
                        </div>
                    ) : (
                        players.map((player) => (
                            <details className="member-item" name="team-accordion" key={player.id}>
                                <summary className="member-header">
                                    <div className="member-number">{
                                        player.firstName[0]}{player.lastName[0]}</div>
                                    <div className="member-info">
                                        <span className="name">{player.firstName} {player.lastName}</span>
                                        <span className="position toggle-position">{player.positionName}</span>
                                        <span className="position toggle-facr">FAČR ID: {player.facrId}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-down arrow"></i>
                                </summary>
                                <div className="member-detail">
                                    <div className="profile-section">
                                        <div className="profile-col-left">
                                            <div className="injury-box">
                                                <div className="injury-header">
                                                    <i className="fa-solid fa-user-doctor"></i> ZDRAVOTNÍ STAV
                                                </div>
                                                <div className="injury-status ok">Připraven</div>
                                                <button className="btn-history-injury">Zobrazit historii zranění</button>
                                            </div>
                                        </div>
                                        <div className="profile-col-center">
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <span className="label">Pozice</span>
                                                    <span className="value">{player.positionName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Výška</span>
                                                    <span className="value">{player.height} cm</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Věk</span>
                                                    <span className="value">15 let</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Váha</span>
                                                    <span className="value">{player.weight} kg</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Město</span>
                                                    <span className="value">{player.cityName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Noha</span>
                                                    <span className="value">{player.foot}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-col-right">
                                            <button className="btn-profile"><i className="fa-solid fa-file-lines"></i> Charakteristika</button>
                                            <button className="btn-profile"><i className="fa-solid fa-people-roof"></i> Zák. zástupce</button>
                                            <button className="btn-profile"><i className="fa-solid fa-file-signature"></i> Kontakty</button>
                                        </div>
                                    </div>
                                    <hr className="detail-divider" />
                                    <div className="main-stats-row">
                                        <div className="stat-big-box">
                                            <span className="stat-title">ÚČAST TJ</span>
                                            <span className="stat-num">76%</span>
                                            <span className="stat-detail">32/38 tr.</span>
                                        </div>
                                        <div className="stat-big-box">
                                            <span className="stat-title">MINUTÁŽ</span>
                                            <span className="stat-num">25%</span>
                                            <span className="stat-detail">80/360 min</span>
                                        </div>
                                        <div className="stat-big-box">
                                            <span className="stat-title">HODNOCENÍ</span>
                                            <span className="stat-num highlight">8,0</span>
                                        </div>
                                    </div>
                                    <div className="season-injury-container">
                                        <div className="seasons-wrapper">
                                            <h4 className="history-title">Historie sezón</h4>
                                            <details className="season-dropdown" open>
                                                <summary>
                                                    <span className="season-label">2024/2025</span>
                                                    <span className="season-preview">2 G | 1 A</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </summary>
                                                <div className="season-content">
                                                    <div className="season-stat-item">
                                                        <i className="fa-regular fa-clock"></i>
                                                        <span><strong>450</strong> min</span>
                                                    </div>
                                                    <div className="season-stat-item">
                                                        <i className="fa-regular fa-futbol"></i>
                                                        <span><strong>2</strong> Góly</span>
                                                    </div>
                                                    <div className="season-stat-item">
                                                        <i className="fa-solid fa-shoe-prints"></i>
                                                        <span><strong>1</strong> Asist.</span>
                                                    </div>
                                                </div>
                                            </details>
                                            <details className="season-dropdown">
                                                <summary>
                                                    <span className="season-label text-muted">2023/2024</span>
                                                    <span className="season-preview">15 G | 8 A</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </summary>
                                                <div className="season-content">
                                                    <div className="season-stat-item"><i className="fa-regular fa-clock"></i><span><strong>350</strong> min</span></div>
                                                    <div className="season-stat-item"><i className="fa-regular fa-futbol"></i><span><strong>15</strong> G</span></div>
                                                    <div className="season-stat-item"><i className="fa-solid fa-shoe-prints"></i><span><strong>8</strong> A</span></div>
                                                </div>
                                            </details>
                                            <details className="season-dropdown">
                                                <summary>
                                                    <span className="season-label text-muted">2022/2023</span>
                                                    <span className="season-preview">10 G | 5 A</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </summary>
                                                <div className="season-content">
                                                    <div className="season-stat-item"><i className="fa-regular fa-clock"></i><span><strong>854</strong> min</span></div>
                                                    <div className="season-stat-item"><i className="fa-regular fa-futbol"></i><span><strong>10</strong> G</span></div>
                                                    <div className="season-stat-item"><i className="fa-solid fa-shoe-prints"></i><span><strong>5</strong> A</span></div>
                                                </div>
                                            </details>
                                            <details className="season-dropdown">
                                                <summary>
                                                    <span className="season-label text-muted">2021/2022</span>
                                                    <span className="season-preview">5 G | 2 A</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </summary>
                                                <div className="season-content">
                                                    <div className="season-stat-item"><i className="fa-regular fa-clock"></i><span><strong>233</strong> min</span></div>
                                                    <div className="season-stat-item"><i className="fa-regular fa-futbol"></i><span><strong>5</strong> G</span></div>
                                                    <div className="season-stat-item"><i className="fa-solid fa-shoe-prints"></i><span><strong>2</strong> A</span></div>
                                                </div>
                                            </details>
                                            <details className="season-dropdown">
                                                <summary>
                                                    <span className="season-label text-muted">2020/2021</span>
                                                    <span className="season-preview">1 G | 0 A</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </summary>
                                                <div className="season-content">
                                                    <div className="season-stat-item"><i className="fa-regular fa-clock"></i><span><strong>200</strong> min</span></div>
                                                    <div className="season-stat-item"><i className="fa-regular fa-futbol"></i><span><strong>1</strong> G</span></div>
                                                    <div className="season-stat-item"><i className="fa-solid fa-shoe-prints"></i><span><strong>0</strong> A</span></div>
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                    <hr className="detail-divider" />
                                    <div className="detail-footer-actions">
                                        <button className="btn-graph"><i className="fa-solid fa-chart-area"></i> Graf hodnocení</button>
                                        <div className="footer-right-group">
                                            <button className="btn-edit-profile"><i className="fa-solid fa-pen"></i> Upravit profil</button>
                                            <button className="btn-deactivate"><i className="fa-solid fa-user-xmark"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        ))
                    )}
                </div>

                {/* --- SEKCE REALIZAČNÍ TÝM --- */}
                <h3 className="list-category mt-50">Realizační tým</h3>
                <div className="team-list">
                    {staff.length === 0 ? (
                        <div className="empty-team-state">
                            <p>Realizační tým se právě sestavuje.</p>
                        </div>
                    ) : (
                        staff.map((member) => (
                            <details className="member-item" name="staff-accordion" key={member.id}>
                                <summary className="member-header staff-header">
                                    <div className="member-number staff-icon"><i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <div className="member-info">
                                        <span className="name">{member.firstName} {member.lastName}</span>
                                        <span className="position">{member.roleName}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-down arrow"></i>
                                </summary>
                                <div className="member-detail">
                                    <div className="detail-grid">
                                        <div className="detail-left">
                                            <div className="coach-license">
                                                <span className="license-label">Licence</span>
                                                <span className="license-badge">UEFA B</span>
                                            </div>
                                        </div>
                                        <div className="detail-right">
                                            <ul className="contact-list">
                                                <li>
                                                    <div className="icon-box"><i className="fa-solid fa-envelope"></i>
                                                    </div>
                                                    <div className="contact-text">
                                                        <span className="label">Email</span>
                                                        <a href={`mailto:${member.email}`} className="value-link">{member.email}</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon-box"><i className="fa-solid fa-phone"></i>
                                                    </div>
                                                    <div className="contact-text">
                                                        <a href={`tel:${member.phoneNumber}`} className="value-link">{member.phoneNumber}</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        ))
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Team;