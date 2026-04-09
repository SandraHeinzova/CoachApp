import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showAlert } from '../components/AlertService';
import api from '../api/axiosInstance.js'
import '../css/styles_new_member.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function NewMember() {
    const [roles, setRoles] = useState([]);
    const [positions, setPositions] = useState([]);
    const [cities, setCities] = useState([]);

    const [isAddingNewCity, setIsAddingNewCity] = useState(false);
    const [newCityName, setNewCityName] = useState('');

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
        foot: '',
        positionId: ''
    });

    const navigate = useNavigate();
    const [selectedRoleName, setSelectedRoleName] = useState("");

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [resRoles, resPos, resCities] = await Promise.all([
                    api.get('/dictionaries/roles'),
                    api.get('/dictionaries/positions'),
                    api.get('/dictionaries/cities')
                ]);

                setRoles(resRoles.data);
                setPositions(resPos.data);
                setCities(resCities.data);

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

        const payload = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            cityName: isAddingNewCity ? newCityName.trim() : null,
            cityId: isAddingNewCity ? null : (formData.cityId ? parseInt(formData.cityId) : null)
        };

        try {
            const response = await api.post('/users/register', payload);

            showAlert.success("Úspěch", response.data || "Člen byl úspěšně přidán");
            navigate('/team');

        } catch (error) {
            console.error("Chyba komunikace:", error);
            if (error.response) {
                showAlert.error("Chyba", error.response.data ||  "Při ukládání došlo k chybě.");
            } else {
                showAlert.error("Chyba spojení", "Backend neodpovidá " + error.message);
            }
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
                                        <option value="Right">Pravá</option>
                                        <option value="Left">Levá</option>
                                        <option value="Both">Obě</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer-split">
                            <div className="form-group city-input">
                                <label>Město</label>
                                <input
                                    type="text"
                                    list="city-options"
                                    value={isAddingNewCity ? newCityName : (cities.find(c => c.id == formData.cityId)?.name || '')}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const existingCity = cities.find(c => c.name === val);

                                        if (existingCity) {
                                            setIsAddingNewCity(false);
                                            setFormData(prev => ({ ...prev, cityId: existingCity.id }));
                                        } else {
                                            setIsAddingNewCity(true);
                                            setNewCityName(val);
                                            setFormData(prev => ({ ...prev, cityId: null }));
                                        }
                                    }}
                                    placeholder="Začněte psát město..."
                                    required
                                />
                                <datalist id="city-options">
                                    {cities.map(c => (
                                        <option key={c.id} value={c.name} />
                                    ))}
                                </datalist>
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