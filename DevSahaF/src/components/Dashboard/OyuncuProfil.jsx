// src/components/Dashboard/OyuncuProfil.jsx
import React, { useState, useEffect } from 'react';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuBase.module.css';
import './OyuncuProfil.css';

const API_BASE = 'http://localhost:8080';

const iconMap = {
    Maç: 'fa-calendar-alt',
    Gol: 'fa-futbol',
    Asist: 'fa-hands-helping',
    Galibiyet: 'fa-trophy',
    Mağlubiyet: 'fa-frown',
    Beraberlik: 'fa-handshake',
};

const OyuncuProfil = () => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState('season');

    const [matches, setMatches] = useState([]);
    const [showAllMatches, setShowAllMatches] = useState(false);
    const [teamLogos, setTeamLogos] = useState({});

    // Oyuncu verisini çek
    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('accessToken');
        if (!username || !token) {
            setError('Kullanıcı girişi bulunamadı.');
            setLoading(false);
            return;
        }
        fetch(`${API_BASE}/oyuncu/by-username/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setPlayer(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Veri alınırken hata oluştu.');
                setLoading(false);
            });
    }, []);

    // Maç listesini ve takım ID'lerini çek
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        fetch(`${API_BASE}/mac/list`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setMatches(data);

                // Benzersiz takım isimlerini al
                const uniqueTeams = Array.from(
                    new Set(data.flatMap(m => [m.takim1, m.takim2]))
                );

                // Her bir isim için ID isteği at
                Promise.all(
                    uniqueTeams.map(name =>
                        fetch(`${API_BASE}/takim/by-name/${encodeURIComponent(name)}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                            .then(res => res.json())
                            .then(team => [name, team.id])
                    )
                )
                    .then(entries => {
                        setTeamLogos(Object.fromEntries(entries));
                    })
                    .catch(err => console.error('Takım ID alınamadı:', err));
            })
            .catch(err => console.error('Maç listesi alınamadı:', err));
    }, []);

    if (loading) return <main className={styles.mainContent}>Yükleniyor...</main>;
    if (error) return <main className={styles.mainContent}>{error}</main>;
    if (!player) return null;

    // Performans istatistikleri
    const wins = parseInt(player.galibiyet, 10) || 0;
    const losses = parseInt(player.maglubiyet, 10) || 0;
    const goals = parseInt(player.gol, 10) || 0;
    const assists = parseInt(player.asist, 10) || 0;
    const matchesPlayed = wins + losses;

    const goalsPerMatch = matchesPlayed ? (goals / matchesPlayed).toFixed(1) : '0.0';
    const assistsPerMatch = matchesPlayed ? (assists / matchesPlayed).toFixed(1) : '0.0';

    const generalStats = [
        { label: 'Maç Kazanma Oranı', value: `${matchesPlayed ? ((wins / matchesPlayed) * 100).toFixed(0) : 0}%` },
        { label: 'Maç Başına Gol', value: goalsPerMatch },
        { label: 'Maç Başına Asist', value: assistsPerMatch },
    ];

    const gameStats = [
        { label: 'Maç', value: matchesPlayed },
        { label: 'Gol', value: goals },
        { label: 'Asist', value: assists },
        { label: 'Galibiyet', value: wins },
        { label: 'Mağlubiyet', value: losses },
    ];

    const skillLevels = [
        { label: 'Şut', value: '85%' },
        { label: 'Pas', value: '70%' },
        { label: 'Dribling', value: '92%' },
        { label: 'Fiziksel', value: '65%' },
    ];

    // Geçmiş maçları filtrele, sırala ve dilimle
    const teamName = player.takim.name;
    const filteredMatches = matches.filter(
        m => m.takim1 === teamName || m.takim2 === teamName
    );
    const sortedMatches = filteredMatches.sort((a, b) => b.randevuId - a.randevuId);
    const recentMatches = sortedMatches.slice(0, 3);
    const displayMatches = showAllMatches ? sortedMatches : recentMatches;

    return (
        <>
            <OyuncuSidebar />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    {/* Başlık */}
                    <h1 className={styles.pageTitle}>Profil</h1>

                    {/* Profil Header */}
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img
                                src={`/img/pp-${player.id}.png`}
                                alt="Profil Fotoğrafı"
                                className="avatar"
                            />
                        </div>
                        <div className="profile-details">
                            <h2>{`${player.firstName} ${player.lastName}`}</h2>
                            <ul className="meta-list">
                                <li><strong>Mevki:</strong> {player.pozisyon}</li>
                                <li><strong>Yaş:</strong> {player.yas}</li>
                                <li><strong>Şehir:</strong> {player.sehir}</li>
                                <li><strong>Takım:</strong> {teamName}</li>
                            </ul>
                        </div>
                    </div>

                    {/* İstatistikler */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>İstatistikler</h2>
                            <div className="stats-filter">
                                <select
                                    className="season-select"
                                    value={period}
                                    onChange={e => setPeriod(e.target.value)}
                                >
                                    <option value="season">Bu Sezon</option>
                                    <option value="year">Son 1 Yıl</option>
                                    <option value="all">Tüm Zamanlar</option>
                                </select>
                            </div>
                        </div>
                        <div className="stats-grid">
                            {/* Genel Performans */}
                            <div className="stats-card">
                                <div className="stats-card-header"><h3>Genel Performans</h3></div>
                                <div className="stats-card-content">
                                    {generalStats.map((item, i) => (
                                        <div key={i} className="stat-item">
                                            <div className="stat-info">
                                                <span className="stat-label">{item.label}</span>
                                                <span className="stat-value">{item.value}</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: item.value.toString().endsWith('%')
                                                            ? item.value
                                                            : `${parseFloat(item.value) * 10}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Oyun İstatistikleri */}
                            <div className="stats-card">
                                <div className="stats-card-header"><h3>Oyun İstatistikleri</h3></div>
                                <div className="stats-card-content">
                                    <div className="stats-numbers decorated">
                                        {gameStats.map((n, j) => (
                                            <div key={j} className="stats-number-item">
                                                <div className="icon">
                                                    <i className={`fas ${iconMap[n.label]}`}></i>
                                                </div>
                                                <div>
                                                    <span className="stats-number">{n.value}</span>
                                                    <span className="stats-label">{n.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Beceri Seviyeleri */}
                            <div className="stats-card">
                                <div className="stats-card-header"><h3>Beceri Seviyeleri</h3></div>
                                <div className="stats-card-content">
                                    {skillLevels.map((item, k) => (
                                        <div key={k} className="stat-item">
                                            <div className="stat-info">
                                                <span className="stat-label">{item.label}</span>
                                                <span className="stat-value">{item.value}</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: item.value }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Geçmiş Maçlar */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Geçmiş Maçlar</h2>
                            {showAllMatches ? (
                                <button
                                    className={styles.btnOutline}
                                    onClick={() => setShowAllMatches(false)}
                                >
                                    Özet
                                </button>
                            ) : (
                                <button
                                    className={styles.btnOutline}
                                    onClick={() => setShowAllMatches(true)}
                                >
                                    Tüm Maçlar
                                </button>
                            )}
                        </div>
                        <div className="match-history">
                            {displayMatches.map(m => {
                                const isHome = m.takim1 === teamName;
                                const playerScore = isHome ? m.takim1Skor : m.takim2Skor;
                                const opponentScore = isHome ? m.takim2Skor : m.takim1Skor;

                                let resultClass, resultLabel;
                                if (playerScore > opponentScore) {
                                    resultClass = 'win';
                                    resultLabel = 'Galibiyet';
                                } else if (playerScore < opponentScore) {
                                    resultClass = 'loss';
                                    resultLabel = 'Mağlubiyet';
                                } else {
                                    resultClass = 'draw';
                                    resultLabel = 'Beraberlik';
                                }

                                return (
                                    <div key={m.matchId} className={`match-card ${resultClass}`}>
                                        <div className="match-date">
                                            <span className="day"></span>
                                            <span className="month"></span>
                                        </div>
                                        <div className="match-teams">
                                            <div className="team">
                                                {teamLogos[m.takim1] && (
                                                    <img
                                                        className={`team-logo team-logo-${teamLogos[m.takim1]}`}
                                                        src={`/img/team-logo-${teamLogos[m.takim1]}.png`}
                                                        alt={`${m.takim1} logo`}
                                                    />
                                                )}
                                                <span className="team-name">{m.takim1}</span>
                                                <span className="score">{m.takim1Skor}</span>
                                            </div>
                                            <span className="vs">-</span>
                                            <div className="team">
                                                {teamLogos[m.takim2] && (
                                                    <img
                                                        className={`team-logo team-logo-${teamLogos[m.takim2]}`}
                                                        src={`/img/team-logo-${teamLogos[m.takim2]}.png`}
                                                        alt={`${m.takim2} logo`}
                                                    />
                                                )}
                                                <span className="team-name">{m.takim2}</span>
                                                <span className="score">{m.takim2Skor}</span>
                                            </div>
                                        </div>
                                        <div className={`match-result ${resultClass}`}>
                                            <span>{resultLabel}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Başarılar */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Başarılar</h2>
                        </div>
                        <div className="achievements-grid">
                            <div className="achievement-card">
                                <div className="achievement-icon gold"><i className="fas fa-trophy"></i></div>
                                <div className="achievement-info"><h3>Gol Kralı</h3><p>2024 Kış Ligi</p></div>
                            </div>
                            <div className="achievement-card">
                                <div className="achievement-icon silver"><i className="fas fa-medal"></i></div>
                                <div className="achievement-info"><h3>En İyi Oyuncu</h3><p>Mart 2024 Turnuvası</p></div>
                            </div>
                            <div className="achievement-card">
                                <div className="achievement-icon bronze"><i className="fas fa-award"></i></div>
                                <div className="achievement-info"><h3>Hat-Trick</h3><p>vs Kartallar SK, 15 Nisan 2024</p></div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
};

export default OyuncuProfil;
