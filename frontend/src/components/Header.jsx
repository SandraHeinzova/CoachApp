import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { showAlert } from '../components/AlertService';

function Header() {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        const result = await showAlert.confirm(
            "Odhlášení",
            "Opravdu se chcete odhlásit?"
        );

        if (result.isConfirmed) {
            try {
                await api.post('/users/logout');
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
                    <span>{loggedUser ? `${loggedUser.firstName} ${loggedUser.lastName}` : 'Host'}</span>
                    <i className="fa-solid fa-circle-user"></i>
                    <a onClick={handleLogout} className="logout-btn" title="Odhlásit se">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;