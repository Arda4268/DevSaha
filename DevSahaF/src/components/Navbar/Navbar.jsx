// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLoginClick, onRegisterClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Mobil menüyü aç/kapat
    const toggleMobileMenu = () => setIsMobileMenuOpen(open => !open);
    const handleLinkClick = () => setIsMobileMenuOpen(false);

    // Çıkış işlemi
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/');
    };

    // Giriş durumunu kontrol et
    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(!!localStorage.getItem('accessToken'));
        };
        checkLogin();
        window.addEventListener('storage', checkLogin);
        return () => window.removeEventListener('storage', checkLogin);
    }, []);

    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar-logo">
                    <a href="/">
                        <img src="/img/futbol logo.svg" alt="Logo" className="logo-img" />
                        <span className="logo-text">DevSaha</span>
                    </a>
                </div>

                {/* Kullanıcı GİRİŞ YAPMAMIŞSA: normal menü + butonlar */}
                {!isLoggedIn && (
                    <>
                        <nav className="navbar-menu">
                            <a href="#anasayfa" className="navbar-link" onClick={handleLinkClick}>Anasayfa</a>
                            <a href="#oyuncular" className="navbar-link" onClick={handleLinkClick}>Oyuncular</a>
                            <a href="#takimlar" className="navbar-link" onClick={handleLinkClick}>Takımlar</a>
                            <a href="#sahalar" className="navbar-link" onClick={handleLinkClick}>Halı Sahalar</a>
                            <a href="#hakkimizda" className="navbar-link" onClick={handleLinkClick}>Hakkımızda</a>
                            <a href="#iletisim" className="navbar-link" onClick={handleLinkClick}>İletişim</a>
                            <a href="#nedir" className="navbar-link" onClick={handleLinkClick}>Nedir?</a>
                        </nav>
                        <div className="navbar-auth">
                            <button onClick={onLoginClick} className="btn btn-outline">
                                Giriş Yap
                            </button>
                            <button onClick={onRegisterClick} className="btn btn-primary">
                                Kaydol
                            </button>
                        </div>
                        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"} />
                        </button>
                    </>
                )}

                {/* Kullanıcı GİRİŞ YAPMIŞSA: sadece Kırmızı Çıkış Yap butonu */}
                {isLoggedIn && (
                    <div className="navbar-auth" style={{ marginLeft: 'auto' }}>
                        <button onClick={handleLogout} className="btn btn-danger">
                            Çıkış Yap
                        </button>
                    </div>
                )}
            </div>

            {/* Mobil Menü (sadece giriş yapılmamışken) */}
            {!isLoggedIn && (
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <a href="#anasayfa" className="mobile-link" onClick={handleLinkClick}>Anasayfa</a>
                    <a href="#oyuncular" className="mobile-link" onClick={handleLinkClick}>Oyuncular</a>
                    <a href="#takimlar" className="mobile-link" onClick={handleLinkClick}>Takımlar</a>
                    <a href="#sahalar" className="mobile-link" onClick={handleLinkClick}>Halı Sahalar</a>
                    <a href="#hakkimizda" className="mobile-link" onClick={handleLinkClick}>Hakkımızda</a>
                    <a href="#iletisim" className="mobile-link" onClick={handleLinkClick}>İletişim</a>
                    <a href="#nedir" className="mobile-link" onClick={handleLinkClick}>Nedir?</a>
                    <div className="mobile-auth">
                        <button
                            onClick={() => { onLoginClick(); handleLinkClick(); }}
                            className="btn btn-outline btn-block"
                        >
                            Giriş Yap
                        </button>
                        <button
                            onClick={() => { onRegisterClick(); handleLinkClick(); }}
                            className="btn btn-primary btn-block"
                        >
                            Kaydol
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
