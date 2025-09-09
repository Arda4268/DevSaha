// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TopPlayers from './components/Sections/TopPlayers';
import TopTeams from './components/Sections/TopTeams';
import FavoriteFields from './components/Sections/FavoriteFields';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import Info from './components/Sections/Info';
import Footer from './components/Footer/Footer';

import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import PlayerRegisterModal from './components/Modals/PlayerRegisterModal';
import AuthorityRegisterModal from './components/Modals/AuthorityRegisterModal';

import HalisahaDashboard from './components/Dashboard/HalisahaDashboard';
import HalisahaRandevular from './components/Dashboard/HalisahaRandevular';
import HalisahaProfil from './components/Dashboard/HalisahaProfil';
import HalisahaLigtablosu from './components/Dashboard/HalisahaLigtablosu';

// —— New imports for Oyuncu dashboards —— 
import OyuncuDashboard from './components/Dashboard/OyuncuDashboard';
import OyuncuProfil from './components/Dashboard/OyuncuProfil';
import OyuncuTakim from './components/Dashboard/OyuncuTakim';
import OyuncuRandevular from './components/Dashboard/OyuncuRandevular';
import OyuncuLigtablosu from './components/Dashboard/OyuncuLigtablosu';
import OyuncuTransfer from './components/Dashboard/OyuncuTransfer';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPlayerRegisterModal, setShowPlayerRegisterModal] = useState(false);
  const [showAuthorityRegisterModal, setShowAuthorityRegisterModal] = useState(false);
  const navigate = useNavigate();

  // Oturum durumunu kontrol et
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowPlayerRegisterModal(false);
    setShowAuthorityRegisterModal(false);
    document.body.style.overflow = '';
  };

  // Modal açma fonksiyonları
  const handleOpenLogin = () => {
    closeAllModals();
    setShowLoginModal(true);
    document.body.style.overflow = 'hidden';
  };
  const handleOpenRegister = () => {
    closeAllModals();
    setShowRegisterModal(true);
    document.body.style.overflow = 'hidden';
  };
  const handleOpenPlayerRegister = () => {
    closeAllModals();
    setShowPlayerRegisterModal(true);
    document.body.style.overflow = 'hidden';
  };
  const handleOpenAuthorityRegister = () => {
    closeAllModals();
    setShowAuthorityRegisterModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Başarılı login sonrası: role'a göre yönlendir
  const handleLoginSuccess = () => {
    closeAllModals();
    setIsLoggedIn(true);

    const role = localStorage.getItem('role');
    if (role === 'OYUNCU') {
      navigate('/dashboard/oyuncu', { replace: true });
    } else if (role === 'YETKİLİ') {
      navigate('/dashboard/halisaha', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  // Kullanıcının rolünü al
  const getRole = () => localStorage.getItem('role');

  return (
    <>
      {/* Navbar sadece oturum açılmamışsa gösterilir */}
      {!isLoggedIn && (
        <Navbar
          onLoginClick={handleOpenLogin}
          onRegisterClick={handleOpenRegister}
        />
      )}

      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              {!isLoggedIn && (
                <main>
                  <Hero onRegisterClick={handleOpenRegister} />
                  <TopPlayers />
                  <TopTeams />
                  <FavoriteFields />
                  <About />
                  <Contact />
                  <Info />
                </main>
              )}
              <Footer />
            </>
          }
        />

        {/* Yetkili Dashboard Rotaları */}
        <Route
          path="/dashboard/halisaha"
          element={
            getRole() === 'YETKİLİ'
              ? <HalisahaDashboard />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/randevular"
          element={
            getRole() === 'YETKİLİ'
              ? <HalisahaRandevular />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/profil"
          element={
            getRole() === 'YETKİLİ'
              ? <HalisahaProfil />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/ligtablosu"
          element={
            getRole() === 'YETKİLİ'
              ? <HalisahaLigtablosu />
              : <Navigate to="/" replace />
          }
        />

        {/* Oyuncu Dashboard Rotaları */}
        <Route
          path="/dashboard/oyuncu"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuDashboard />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/oyuncu/profil"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuProfil />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/oyuncu/takim"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuTakim />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/oyuncu/randevular"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuRandevular />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/oyuncu/ligtablosu"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuLigtablosu />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboard/oyuncu/transfer"
          element={
            getRole() === 'OYUNCU'
              ? <OyuncuTransfer />
              : <Navigate to="/" replace />
          }
        />

        {/* Tüm diğer rotalar → Anasayfa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={closeAllModals}
          onSwitchToRegister={handleOpenRegister}
          onSuccess={handleLoginSuccess}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={closeAllModals}
          onPlayerRegisterClick={handleOpenPlayerRegister}
          onAuthorityRegisterClick={handleOpenAuthorityRegister}
          onSwitchToLogin={handleOpenLogin}
        />
      )}
      {showPlayerRegisterModal && (
        <PlayerRegisterModal
          onClose={closeAllModals}
          onBack={() => { closeAllModals(); handleOpenRegister(); }}
          onSuccess={() => { closeAllModals(); handleOpenLogin(); }}
        />
      )}
      {showAuthorityRegisterModal && (
        <AuthorityRegisterModal
          onClose={closeAllModals}
          onBack={() => { closeAllModals(); handleOpenRegister(); }}
          onSuccess={() => { closeAllModals(); handleOpenLogin(); }}
        />
      )}
    </>
  );
}

export default App;
