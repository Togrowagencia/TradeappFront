import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

/*Rutas*/
import Login from './pages/login.jsx'
import Envio from './pages/envio.jsx'
import Reset from './pages/restablecer.jsx'
import Dashboard from './pages/dashboard.jsx';
import Historial from './pages/Historial.jsx';
import Users from './pages/Users.jsx';
import CreateSignals from './pages/CreateSignals.jsx';
import Register from './pages/Register.jsx';
import EditUser from './pages/EditUser.jsx';
import Pay from './pages/Pay.jsx';
/*End::Rutas*/

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Reset /> : <Login />} />
        <Route path="/envio-restablecimiento" element={<Envio />} />
        <Route path="/restablecimiento" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/pay" element={<Pay />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-signals" element={<CreateSignals />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App
