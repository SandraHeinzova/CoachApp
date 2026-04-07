import { Link } from 'react-router-dom';
import '../css/styles_login.css';


function Unauthorized() {
    return (
        <div className="login-page-container">
            <div className="login-card unauthorized-card">
                <div className="logo-container">
                    <i className="fa-solid fa-circle-exclamation error-icon"></i>
                    <h1>Přístup odepřen</h1>
                </div>

                <p className="unauthorized-text">
                    Pro zobrazení této stránky nemáte dostatečná oprávnění.
                    Prosím, přihlaste se svým účtem.
                </p>

                <Link to="/" className="btn-login btn-link">
                    Zpět na přihlášení
                </Link>
            </div>
        </div>
    );
}

export default Unauthorized;