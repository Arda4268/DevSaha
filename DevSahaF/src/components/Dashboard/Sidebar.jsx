// src/components/Dashboard/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Halisaha.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarRef = useRef(null);

    const handleMobileToggle = () => setIsOpen(prev => !prev);
    const handleDesktopToggle = () => setIsCollapsed(prev => !prev);

    // Logout handler
    const handleLogout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
        window.location.reload();
    };

    useEffect(() => {
        const onClickOutside = e => {
            if (
                window.innerWidth <= 768 &&
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                !e.target.closest('#sidebar-toggle-desktop')
            ) setIsOpen(false);
        };
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    }, [isOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 768 && isOpen) setIsOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [isOpen]);

    // Determine active class based on current path
    const isActive = path => location.pathname === path;

    return (
        <>
            <div
                ref={sidebarRef}
                id="sidebar"
                className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
            >
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="logo-circle">H</div>
                        <h1>Halısaha Panel</h1>
                    </div>
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
                        <li className={`sidebar-menu-item ${isActive('/dashboard/halisaha') ? 'active' : ''}`}>
                            <Link to="/dashboard/halisaha">
                                <span className="icon-home" />
                                <span>Ana Sayfa</span>
                            </Link>
                        </li>
                        <li className={`sidebar-menu-item ${isActive('/dashboard/profil') ? 'active' : ''}`}>
                            <Link to="/dashboard/profil">
                                <span className="icon-user" />
                                <span>Profil</span>
                            </Link>
                        </li>
                        <li className={`sidebar-menu-item ${isActive('/dashboard/randevular') ? 'active' : ''}`}>
                            <Link to="/dashboard/randevular">
                                <span className="icon-calendar" />
                                <span>Randevular</span>
                            </Link>
                        </li>
                        <li className={`sidebar-menu-item ${isActive('/dashboard/ligtablosu') ? 'active' : ''}`}>
                            <Link to="/dashboard/ligtablosu">
                                <span className="icon-trophy" />
                                <span>Lig Tablosu</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Çıkış Yap butonu (küçültüldü) */}
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
            </div>
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

export default Sidebar;
