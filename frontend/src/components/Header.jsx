import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            await api.post('/users/logout');
        } catch (err) {
            console.error("Server logout failed, but clearing local data anyway.");
        }
        localStorage.removeItem('user');
        navigate('/');
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