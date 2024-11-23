import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Subjects from './pages/Subjects';
import MainLayout from './components/MainLayout';

function App() {
    return (
        <Router>
            <Routes>
                {/* Página de Login */}
                <Route path="/" element={<Login />} />

                {/* Rotas protegidas com MainLayout */}
                <Route path="/calendar" element={<MainLayout title="Calendário"><Calendar /></MainLayout>} />
                <Route path="/subjects" element={<MainLayout title="Disciplinas"><Subjects /></MainLayout>} />

                {/* Rota padrão para erros 404 */}
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
