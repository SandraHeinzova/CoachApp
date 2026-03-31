import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styles_login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // 1. Pošleme dotaz na tvůj nový endpoint v Javě
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username, // Reactový 'username' pošleme jako 'email' do Javy
                    password: password
                }),
            });

            if (response.ok) {
                const userData = await response.json();

                // 2. Uložíme si info o přihlášeném uživateli do prohlížeče
                // Tím budeme vědět, že je Sandra přihlášená i na jiných stránkách
                localStorage.setItem('user', JSON.stringify(userData));

                alert(`Vítej zpět, ${userData.firstName}!`);
                navigate('/dashboard');
            } else {
                alert("Špatný email nebo heslo! Zkus to znovu.");
            }
        } catch (error) {
            console.error("Chyba při přihlašování:", error);
            alert("Backend neběží nebo je chyba v síti.");
        }
    };

    const loggedUser = JSON.parse(localStorage.getItem('user'));

    document.title = "CoachApp Login";

    return (
        <div className="login-page-container">
            <main className="login-card">
                <div className="logo-container">
                    <img src="/images/logo.png" alt="Logo" className="club-logo"/>
                    <h1>CoachApp</h1>
                    <p>Vítejte v trenérské zóně</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <div className="icon-input">
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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