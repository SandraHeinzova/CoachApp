import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="main-footer">
            <p className="copyright">&copy; {new Date().getFullYear()} CoachApp </p>
            <p className="author">Design a kód: <span className="page-autor-name">Sandra Heinzová</span></p>
        </footer>
    );
}

export default Footer;