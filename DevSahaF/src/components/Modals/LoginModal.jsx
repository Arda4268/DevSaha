// src/components/Modals/LoginModal.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

function LoginModal({ onClose, onSwitchToRegister, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Kullanıcı adı ve şifre boş bırakılamaz.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok && data.status === 200 && data.payload) {
                const { accessToken, refreshToken, rol } = data.payload;

                // Tokenları ve kullanıcı bilgisini sakla
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('username', username);
                localStorage.setItem('role', rol);

                if (onSuccess) onSuccess();
                onClose();

                // Yetkili ise Halısaha dashboardına, değilse oyuncu sayfasına
                if (rol === 'YETKİLİ') {
                    navigate('/dashboard/halisaha');
                } else {
                    navigate('/dashboard/oyuncu');
                }
            } else {
                setError(data.payload?.message || 'Kullanıcı adı veya şifre hatalı.');
            }
        } catch (err) {
            console.error('Giriş hatası:', err);
            setError('Giriş sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <button className="modal-close-btn" onClick={onClose}>
                    &times;
                </button>

                <div className="modal-header">
                    <h1>Giriş Yap</h1>
                </div>

                <div className="modal-tabs">
                    <div className="modal-tab active">Giriş Yap</div>
                    <div className="modal-tab" onClick={onSwitchToRegister}>
                        Kayıt Ol
                    </div>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleLogin}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="modal-input-group">
                            <span className="modal-input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="Kullanıcı Adı"
                                className="modal-input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="modal-input-group">
                            <span className="modal-input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Şifre"
                                className="modal-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="modal-button">
                            Giriş Yap
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
