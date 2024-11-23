import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Enviando email:", email);
        console.log("Enviando senha:", password);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            console.log("Resposta do backend:", response.data);
    
            // Verifique se os dados retornados contêm `role` e `email`
            if (response.data && response.data.role && response.data.email) {
                const { role, email } = response.data;
                localStorage.setItem('role', role);
                localStorage.setItem('email', email);
                navigate(role === 'teacher' ? '/subjects' : '/calendar');
            } else {
                throw new Error("Resposta do backend inválida");
            }
        } catch (error) {
            console.error("Erro no login:", error.response?.data || error.message);
            setError('Credenciais inválidas');
        }
    };
    

    return (
        <div className="login">
            {/* Logo com o ícone de conexão */}
            <div className="login-logo">
                <FontAwesomeIcon icon={faNetworkWired} size="4x" style={{ color: '#005f7f' }} />
            </div>
            <form onSubmit={handleLogin}>
                <h2>Escola Conectada</h2>

                {/* Campo de E-mail */}
                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        type="email"
                        placeholder="Usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Campo de Senha */}
                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Botão de Login */}
                <button type="submit">Acessar</button>

                {/* Mensagem de Erro */}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
