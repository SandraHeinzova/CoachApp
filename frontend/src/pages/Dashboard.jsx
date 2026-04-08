import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import api from '../api/axiosInstance';

import '../css/styles_dashboard.css';

function Dashboard() {

    const [injuryList, setInjuryList] = useState([
        { name: "P. Černý", reason: "Kotník" },
        { name: "T. Kovář", reason: "Sval" },
        { name: "J. Novák", reason: "Koleno" }
    ]);
    const injuryCount = injuryList.length;

    useEffect(() => {
        document.title = "CoachApp Dashboard";

        const fetchDashboardData = async () => {
            try {

                const response = await api.get('/users/injuries');
                setInjuryList(response.data.players);
            } catch (error) {

                console.error("Dashboard nemohl načíst čerstvá data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-body">
            <input type="checkbox" id="menu-toggle"/>
            <Header />
            <Sidebar/>
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
                        <div className="icon-circle"><i className="fa-solid fa-users"></i></div>
                        <h3>Můj Tým</h3>
                    </Link>
                    <Link to="/trainings" className="card team-card">
                        <div className="icon-circle"><i className="fa-solid fa-stopwatch"></i></div>
                        <h3>Tréninky</h3>
                    </Link>

                    {/* KARTA ZRANĚNÍ - TEĎ UŽ DYNAMICKÁ */}
                    <div className="card injury-card">
                        <div className="default-view">
                            <div className="card-header-small">
                                <i className="fa-solid fa-user-injured"></i>
                                <h3>Zranění</h3>
                            </div>
                            <div className="big-count">{injuryCount}</div>
                            <p className="status-text">Hráči mimo hru</p>
                        </div>
                        <div className="hover-view">
                            <h4>Seznam marodů</h4>
                            <ul className="injury-list">
                                {injuryList.map((player, index) => (
                                    <li key={index}>
                                        <strong>{player.name}</strong> <span className="reason">{player.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Link to="/stats" className="card team-card">
                        <div className="icon-circle"><i className="fa-solid fa-chart-line"></i></div>
                        <h3>Statistiky</h3>
                    </Link>
                    <Link to="/matches" className="card team-card">
                        <div className="icon-circle"><i className="fa-solid fa-futbol"></i></div>
                        <h3>Zápasy</h3>
                    </Link>
                    <Link to="/new_member" className="card team-card">
                        <div className="icon-circle"><i className="fa-solid fa-user-plus"></i></div>
                        <h3>Nový člen</h3>
                    </Link>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Dashboard;