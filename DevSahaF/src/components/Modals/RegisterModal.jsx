import React from 'react';
import './Modal.css';

// onClose, onPlayerRegisterClick, onAuthorityRegisterClick, onSwitchToLogin prop'larını App.jsx'ten alacak
function RegisterModal({ onClose, onPlayerRegisterClick, onAuthorityRegisterClick, onSwitchToLogin }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}> {/* Register için daha dar */}
                <button className="modal-close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h1>Kayıt Ol</h1>
                </div>

                <div className="modal-tabs">
                    <div className="modal-tab" onClick={onSwitchToLogin}>Giriş Yap</div>
                    <div className="modal-tab active">Kayıt Ol</div>
                </div>

                <div className="modal-body">
                    <div className="register-options">Kayıt türünü seçin:</div>

                    <button className="modal-button" onClick={onPlayerRegisterClick}>
                        <span>🏃</span> Oyuncu Olarak Kayıt Ol
                    </button>

                    <button className="modal-button" onClick={onAuthorityRegisterClick}>
                        <span>⚽</span> Yetkili Olarak Kayıt Ol
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;