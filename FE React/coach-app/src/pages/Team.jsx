import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/styles_team.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Team() {

    const [players, setPlayers] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        document.title = "CoachApp Team";

        const fetchLoadData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();

                    const playersOnly = data.filter(user => user.roleName === 'Hráč');
                    const staffOnly = data.filter(user => user.roleName !== 'Hráč' && user.roleName !== 'Admin' );

                    setPlayers(playersOnly);
                    setStaff(staffOnly);
                }
            } catch (error) {
                console.error("Nepodařilo se načíst členy týmu:", error);
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

                {/* --- SEKCE HRÁČI --- */}
                <h3 className="list-category">Hráči</h3>
                <div className="team-list">
                    {players.length === 0 ? (
                        <div className="empty-team-state">
                            <div className="empty-icon">
                                {/* Ikona, kterou jsi chtěla */}
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
                                    <div className="member-number">
                                        {player.firstName[0]}{player.lastName[0]}
                                    </div>
                                    <div className="member-info">
                                        <span className="name">{player.firstName} {player.lastName}</span>
                                        <span className="position">{player.roleName}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-down arrow"></i>
                                </summary>
                                <div className="member-detail">
                                    <div className="profile-section">
                                        <div className="profile-col-left">
                                            <div className="player-photo-large"><i className="fa-solid fa-user"></i></div>
                                            <span className="facr-id">FAČR ID: 10051212</span>
                                        </div>
                                        <div className="profile-col-center">
                                            <div className="info-grid">
                                                <div className="info-item"><span className="label">Pozice</span><span className="value">{player.roleName}</span></div>
                                                <div className="info-item"><span className="label">Výška</span><span className="value">165 cm</span></div>
                                                <div className="info-item"><span className="label">Věk</span><span className="value">15 let</span></div>
                                                <div className="info-item"><span className="label">Váha</span><span className="value">60 kg</span></div>
                                                <div className="info-item"><span className="label">Město</span><span className="value">Pardubice</span></div>
                                                <div className="info-item"><span className="label">Noha</span><span className="value">Pravá</span></div>
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
                                        <div className="stat-big-box"><span className="stat-title">ÚČAST TJ</span><span className="stat-num">76%</span></div>
                                        <div className="stat-big-box"><span className="stat-title">MINUTÁŽ</span><span className="stat-num">25%</span></div>
                                        <div className="stat-big-box"><span className="stat-title">HODNOCENÍ</span><span className="stat-num highlight">8,0</span></div>
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
                                    <div className="member-number staff-icon">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <div className="member-info">
                                        <span className="name">{member.firstName} {member.lastName}</span>
                                        <span className="position">{member.roleName}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-down arrow"></i>
                                </summary>
                                <div className="member-detail">
                                    <div className="contact-text">
                                        <span className="label">Email</span>
                                        <a href={`mailto:${member.email}`} className="value-link">{member.email}</a>
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