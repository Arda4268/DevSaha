// src/components/Dashboard/OyuncuDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuBase.module.css';

const API_BASE = 'http://localhost:8080';

const OyuncuDashboard = () => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('accessToken');
        if (!username || !token) {
            setLoading(false);
            return;
        }
        fetch(`${API_BASE}/oyuncu/by-username/${encodeURIComponent(username)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => setPlayer(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const quickLinks = [
        { to: '/dashboard/oyuncu/profil', icon: 'fa-user', title: 'Profil', desc: 'Profil bilgilerinizi güncelleyin', bg: 'bgBlue' },
        { to: '/dashboard/oyuncu/takim', icon: 'fa-users', title: 'Takımım', desc: 'Takım arkadaşlarınızı görüntüleyin', bg: 'bgGreen' },
        { to: '/dashboard/oyuncu/randevular', icon: 'fa-calendar-alt', title: 'Randevular', desc: 'Saha rezervasyonu yapın', bg: 'bgYellow' },
        { to: '/dashboard/oyuncu/transfer', icon: 'fa-exchange-alt', title: 'Transfer', desc: 'Oyuncu arayın veya takıma katılın', bg: 'bgPurple' },
        { to: '/dashboard/oyuncu/ligtablosu', icon: 'fa-table', title: 'Lig Tablosu', desc: 'Güncel lig durumunu görüntüleyin', bg: 'bgRed' }
    ];

    const news = [
        { title: 'Yeni Sezon Başlıyor', date: '10 Mayıs 2025', content: 'Yeni sezon kayıtları başlamıştır. Takımınızı oluşturup liglere katılabilirsiniz.' },
        { title: 'Bakım Çalışması', date: '8 Mayıs 2025', content: '15 Mayıs tarihinde saha bakım çalışması nedeniyle rezervasyonlar kapalı olacaktır.' },
        { title: 'Yeni Saha Açılışı', date: '5 Mayıs 2025', content: 'Yeni sahamız DevSaha 2, önümüzdeki hafta hizmetinize açılacaktır.' }
    ];

    return (
        <>
            <OyuncuSidebar />
            <main className={styles.mainContent}>
                <div className={styles.container}>

                    {/* Hoş Geldiniz Bölümü */}
                    <section className={styles.section}>
                        <h1 className={styles.pageTitle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {player ? `Hoş Geldiniz, ${player.firstName} ${player.lastName}` : 'Hoş Geldiniz'}
                            {!loading && player && (
                                <Link to="/oyuncu/profil" title="Profilim">
                                    <img
                                        src={`/img/pp-${player.id}.png`}
                                        alt="Profil"
                                        style={{ width: '120px', height: '120px', marginLeft: '15px', borderRadius: '50%', cursor: 'pointer' }}
                                    />
                                </Link>
                            )}
                        </h1>
                        <div className={styles.quickAccessGrid}>
                            {quickLinks.map((link, idx) => (
                                <Link key={idx} to={link.to} className={`${styles.quickAccessCard} ${styles[link.bg]}`}>
                                    <i className={`fas ${link.icon} fa-2x`} />
                                    <h3>{link.title}</h3>
                                    <p>{link.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Son Haberler Bölümü */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Son Haberler</h2>
                            <Link to="/oyuncu/haberler" className={styles.btnOutline}>Tüm Haberler</Link>
                        </div>
                        <div className={styles.newsContainer}>
                            {news.map((item, idx) => (
                                <div key={idx} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <span className={styles.cardDate}>{item.date}</span>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* DevSaha Hakkında */}
                    <section className={styles.section}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>DevSaha Hakkında</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.mb4}>
                                    DevSaha, halı saha rezervasyonu ve yönetimini kolaylaştıran bir platformdur. Takım oluşturabilir, maç ayarlayabilir ve liglere katılabilirsiniz.
                                </p>
                                <p>
                                    Sistemimiz üzerinden saha rezervasyonu yapabilir, takım arkadaşlarınızı yönetebilir ve transfer piyasasından yeni oyuncular bulabilirsiniz.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
};

export default OyuncuDashboard;
