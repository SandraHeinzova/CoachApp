import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { showAlert } from '../components/AlertService';
import api from '../api/axiosInstance.js';
import '../css/styles_login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sessionMessage, setSessionMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const routerMessage = location.state?.message;

    useEffect(() => {
        if (localStorage.getItem('logoutReason') === 'session_expired') {
            setSessionMessage('Došlo k automatickému odhlášení po delší nečinnosti. Prosím, přihlašte se znovu.');
            localStorage.removeItem('logoutReason');
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {}, {
                headers: {
                    'Authorization': 'Basic ' + btoa(email + ':' + password),
                },
            });

            const userData = response.data;

            localStorage.setItem('user', JSON.stringify(userData));

            showAlert.success(`Vítej zpět, ${userData.firstName}!`);
            navigate('/dashboard');

        } catch (error) {
            console.error("Chyba při přihlašování:", error);

            if (error.response && error.response.status === 401) {
                showAlert.error("Chyba přihlášení", "Špatný email nebo heslo! Zkus to znovu.");
            } else { // OPRAVENÁ CHYBĚJÍCÍ ZÁVORKA ZDE
                showAlert.error("Chyba přihlášení", "Backend neběží nebo je chyba v síti.");
            }
        }
    };

    document.title = "CoachApp Login";

    const displayMessage = sessionMessage || routerMessage;

    return (
        <div className="login-page-container">
            <main className="login-card">
                <div className="logo-container">
                    <img src="/images/logo.png" alt="Logo" className="club-logo"/>
                    <h1>CoachApp</h1>
                    <p>Vítejte v trenérské zóně</p>
                </div>

                {displayMessage && (
                    <div className="auth-message-alert">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{displayMessage}</span>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <div className="icon-input">
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="icon-input">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Heslo"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-login">Přihlásit se</button>
                </form>
            </main>
            <footer className="main-footer-login">
                <p className="copyright">&copy; {new Date().getFullYear()} CoachApp </p>
                <p className="author">Design a kód: <span className="login-autor-name">Sandra Heinzová</span></p>
            </footer>
        </div>
    );
}

export default Login;