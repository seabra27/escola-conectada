import React from 'react';
import '../styles/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function MainLayout({ title, children }) {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="main-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Escola Conectada</h2>
                <a href="/calendar">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Calendário
                </a>
                <a href="/subjects">
                    <FontAwesomeIcon icon={faBook} /> Disciplinas
                </a>
                <a href="/" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </a>
            </div>

            {/* Conteúdo */}
            <div className="content">
                {/* Cabeçalho */}
                <div className="header">
                    <h1>{title}</h1>
                    <div className="header-right">
                        <button onClick={handleLogout}>Sair</button>
                    </div>
                </div>

                {/* Conteúdo Dinâmico */}
                {children}
            </div>
        </div>
    );
}
