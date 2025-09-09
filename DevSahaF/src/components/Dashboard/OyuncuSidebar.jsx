// src/components/Dashboard/OyuncuSidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Halisaha.css';

const OyuncuSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sidebarRef = useRef(null);

    // Açık/kapalı durumları
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Sayfa yeniden boyutlanınca sidebar'ı otomatik ayarla
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Mobil dış tıklamada kapat
    useEffect(() => {
        const onClickOutside = e => {
            if (
                window.innerWidth < 1024 &&
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                !e.target.closest('#sidebar-toggle-desktop')
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    }, [isOpen]);

    const handleMobileToggle = () => setIsOpen(o => !o);
    const handleDesktopToggle = () => setIsCollapsed(c => !c);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
        window.location.reload();
    };

    // Aktif link kontrolü
    const isActive = path => location.pathname === path;

    const links = [
        { to: '/dashboard/oyuncu', icon: 'fas fa-home', label: 'Ana Sayfa' },
        { to: '/dashboard/oyuncu/profil', icon: 'fas fa-user', label: 'Profil' },
        { to: '/dashboard/oyuncu/takim', icon: 'fas fa-users', label: 'Takımım' },
        { to: '/dashboard/oyuncu/randevular', icon: 'fas fa-calendar', label: 'Randevular' },
        { to: '/dashboard/oyuncu/transfer', icon: 'fas fa-exchange-alt', label: 'Transfer Durağı' },
        { to: '/dashboard/oyuncu/ligtablosu', icon: 'fas fa-table', label: 'Lig Tablosu' },
    ];

    return (
        <>
            {/* Sidebar kendisi */}
            <aside
                ref={sidebarRef}
                id="sidebar"
                className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
            >
                <div className="sidebar-header">
                    <h2>DevSaha</h2>
                    <button
                        id="sidebar-toggle-mobile"
                        className="sidebar-toggle-mobile"
                        onClick={handleMobileToggle}
                    >
                        <span className={isOpen ? 'icon-x' : 'icon-menu'} />
                    </button>
                </div>

                <div className="sidebar-content">
                    <ul className="sidebar-menu">
                        {links.map(link => (
                            <li
                                key={link.to}
                                className={`sidebar-menu-item ${isActive(link.to) ? 'active' : ''}`}
                            >
                                <Link to={link.to}>
                                    <span className={link.icon} />
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginTop: 'auto', padding: '12px 16px' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '8px 0',
                            backgroundColor: 'var(--red-light)',
                            color: 'var(--red-dark)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}
                    >
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Desktop collapse toggle */}
            <button
                id="sidebar-toggle-desktop"
                className="sidebar-toggle-desktop"
                onClick={handleDesktopToggle}
            >
                <span className="icon-menu" />
            </button>
        </>
    );
};

export default OyuncuSidebar;
