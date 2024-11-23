import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('email'); // Verifica se o email está armazenado
    return isAuthenticated ? children : <Navigate to="/" />;
}
