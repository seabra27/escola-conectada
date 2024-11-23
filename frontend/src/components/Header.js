import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';


export default function Header() {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Remove o email e a role
        navigate('/'); // Redireciona para a página de login
    };

    return (
        <header className="header">
            <h1>Escola Conectada</h1>
            <div className="header-right">
                <p>Bem-vindo(a), {email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}
