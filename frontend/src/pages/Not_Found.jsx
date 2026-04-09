import { Link } from 'react-router-dom';
import '../css/styles_error.css';

function NotFound() {
    document.title = "Ofsajd - stránka nenalezena";
    return (
        <div className="error-page-full">
            <main className="error-card">
                <h1 className="error-code">404</h1>
                <div className="error-illustration">
                    <i className="fa-solid fa-flag-checkered"></i>
                </div>
                <h2>Jste v ofsajdu!</h2>
                <p>Tato stránka na našem hřišti neexistuje. Možná byla odpískána, nebo jste špatně přihráli adresu.</p>
                <Link to="/dashboard" className="btn-error-home">
                    <i className="fa-solid fa-rotate-left"></i> ZPĚT DO HRY
                </Link>
            </main>
        </div>
    );
}
export default NotFound;