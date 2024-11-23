import React from 'react';
import '../styles/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
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
    );
}
