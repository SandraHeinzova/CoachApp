import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import New_Member from './pages/New_Member';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />}/>
            <Route path="/new_member" element={<New_Member />}/>
        </Routes>
    );
}

export default App;