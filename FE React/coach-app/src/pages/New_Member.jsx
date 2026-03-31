import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles_new_member.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';


function NewMember() {

    const [roles, setRoles] = useState([]);
    const [positions, setPositions] = useState([]);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        cityId: '',
        roleId: '',
        facrId: '',
        height: '',
        weight: '',
        foot: '', // Už není natvrdo RIGHT
        positionId: ''
    });

    const [selectedRoleName, setSelectedRoleName] = useState("");

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [resRoles, resPos, resCities] = await Promise.all([
                    fetch('http://localhost:8080/api/users/roles'),
                    fetch('http://localhost:8080/api/users/positions'),
                    fetch('http://localhost:8080/api/users/cities')
                ]);

                if (resRoles.ok && resPos.ok && resCities.ok) {
                    setRoles(await resRoles.json());
                    setPositions(await resPos.json());
                    setCities(await resCities.json());
                }
            } catch (error) {
                console.error("Nepodařilo se načíst číselníky:", error);
            }
        };
        fetchMetadata();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "roleId") {
            const roleObj = roles.find(r => r.id === parseInt(value));
            setSelectedRoleName(roleObj ? roleObj.name : "");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const message = await response.text();
                alert(message);
                navigate('/team');
            } else {
                alert("Chyba při ukládání (Status: " + response.status + ")");
            }
        } catch (error) {
            console.error("Chyba komunikace:", error);
            alert("Backend neodpovídá.");
        }
    };

    document.title = "CoachApp - Nový člen";

    return (
        <div className="dashboard-body">
            <input type="checkbox" id="menu-toggle"/>
            <Header />
            <Sidebar/>
            <label htmlFor="menu-toggle" className="menu-overlay"></label>

            <main className="dashboard-content">
                <div className="welcome-banner">
                    <h2>Nový člen týmu</h2>
                </div>

                <div className="card new-member-card">
                    <form onSubmit={handleSubmit}>
                        <h3 className="section-title">Základní údaje</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Funkce v týmu</label>
                                <select name="roleId" value={formData.roleId} onChange={handleChange} required>
                                    <option value="" disabled>Vyberte funkci...</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Jméno</label>
                                <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Jan" required/>
                            </div>

                            <div className="form-group">
                                <label>Příjmení</label>
                                <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Novák" required/>
                            </div>

                            <div className="form-group">
                                <label>Datum narození</label>
                                <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required/>
                            </div>

                            <div className="form-group">
                                <label>Mobil</label>
                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+420 777 123 456"/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jan.novak@email.cz" required/>
                            </div>
                        </div>

                        {/* Parametry se zobrazí pouze pokud je vybraná role "Hráč" */}
                        <div className={`player-params-section ${selectedRoleName === 'Hráč' ? 'visible' : ''}`}>
                            <hr className="form-divider"/>
                            <h3 className="section-title">Parametry hráče</h3>
                            <div className="form-grid-small">
                                <div className="form-group">
                                    <label>FAČR ID</label>
                                    <input name="facrId" type="text" value={formData.facrId} onChange={handleChange} placeholder="12345678"/>
                                </div>
                                <div className="form-group">
                                    <label>Výška (cm)</label>
                                    <input name="height" type="number" value={formData.height} onChange={handleChange} placeholder="185"/>
                                </div>
                                <div className="form-group">
                                    <label>Váha (kg)</label>
                                    <input name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="80"/>
                                </div>
                                <div className="form-group">
                                    <label>Pozice</label>
                                    <select name="positionId" value={formData.positionId} onChange={handleChange}>
                                        <option value="" disabled>Vyberte pozici...</option>
                                        {positions.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Silnější noha</label>
                                    <select name="foot" value={formData.foot} onChange={handleChange}>
                                        <option value="" disabled>Vyberte nohu...</option>
                                        <option value="RIGHT">Pravá</option>
                                        <option value="LEFT">Levá</option>
                                        <option value="BOTH">Obě</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer-split">
                            <div className="form-group city-input">
                                <label>Město</label>
                                <select name="cityId" value={formData.cityId} onChange={handleChange} required>
                                    <option value="" disabled>Vyberte město...</option>
                                    {cities.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn-submit">
                                <i className="fa-solid fa-plus"></i> PŘIDAT ČLENA
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default NewMember;