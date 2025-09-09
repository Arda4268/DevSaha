// src/components/Dashboard/OyuncuTakim.jsx
import React, { useState, useEffect } from 'react';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuTakim.module.css';

const API_BASE = 'http://localhost:8080';
const iconMap = {
    'Maç': 'fa-calendar-alt',
    'Atılan Gol': 'fa-futbol',
    'Yenilen Gol': 'fa-frown',
    'Galibiyet': 'fa-trophy',
    'Mağlubiyet': 'fa-times-circle'
};

export default function OyuncuTakim() {
    // Temel state’ler
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Maç ve logo state’leri
    const [allMatches, setAllMatches] = useState([]);
    const [teamLogos, setTeamLogos] = useState({});
    const [showAllMatches, setShowAllMatches] = useState(false);

    // Takımı olmayan için form state’leri
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamCity, setNewTeamCity] = useState('');
    const [newUsernames, setNewUsernames] = useState(['']); // bir kullanıcı adı alanı

    // Kullanıcıyı ve takımını çek
    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('accessToken');
        if (!username || !token) {
            setError('Oturum bilgisi bulunamadı');
            setLoading(false);
            return;
        }

        fetch(`${API_BASE}/oyuncu/by-username/${encodeURIComponent(username)}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(player => {
                const tn = player.takim?.name;
                if (!tn) {
                    // Takımı yok → form göster
                    setShowCreateForm(true);
                    setLoading(false);
                    return null;
                }
                // Takımı varsa, verilerini çek
                return fetch(`${API_BASE}/takim/by-name/${encodeURIComponent(tn)}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            })
            .then(res => {
                if (!res) return null;
                return res.ok ? res.json() : Promise.reject(res.status);
            })
            .then(teamData => {
                if (!teamData) return;
                setTeam(teamData);
                teamData.achievements = teamData.achievements || [
                    { type: 'gold', icon: 'trophy', title: 'Gol Kralı', subtitle: '2024 Kış Ligi' },
                    { type: 'silver', icon: 'medal', title: 'En İyi Oyuncu', subtitle: 'Mart 2024 Turnuvası' },
                    { type: 'bronze', icon: 'award', title: 'Hat-Trick', subtitle: 'vs Kartallar SK, 15 Nisan 2024' }
                ];
                return Promise.all(
                    teamData.oyuncuUsernames.map(u =>
                        fetch(`${API_BASE}/oyuncu/by-username/${encodeURIComponent(u)}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        }).then(r => r.ok ? r.json() : null)
                    )
                );
            })
            .then(all => {
                if (all) setMembers(all.filter(Boolean));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                if (!showCreateForm) setError('Veri alınırken hata oluştu');
                setLoading(false);
            });
    }, []);

    // Maç listesini ve logoları çek
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!team || !team.name) return;

        fetch(`${API_BASE}/mac/list`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => {
                const teamMatches = data
                    .filter(m => m.takim1 === team.name || m.takim2 === team.name)
                    .sort((a, b) => b.randevuId - a.randevuId);
                setAllMatches(teamMatches);

                const uniqueTeams = Array.from(
                    new Set(teamMatches.flatMap(m => [m.takim1, m.takim2]))
                );
                return Promise.all(
                    uniqueTeams.map(name =>
                        fetch(`${API_BASE}/takim/by-name/${encodeURIComponent(name)}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                            .then(r => r.ok ? r.json() : {})
                            .then(obj => [name, obj.id])
                    )
                );
            })
            .then(arr => {
                if (arr) setTeamLogos(Object.fromEntries(arr));
            })
            .catch(err => console.error('Takım maçları alınamadı:', err));
    }, [team]);

    // Dinamik username alanları ekleme/güncelleme
    const addUsernameField = () => setNewUsernames([...newUsernames, '']);
    const updateUsername = (idx, val) => {
        const copy = [...newUsernames];
        copy[idx] = val;
        setNewUsernames(copy);
    };

    // Takım oluşturma handler
    const handleCreateTeam = e => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        fetch(`${API_BASE}/takim/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newTeamName,
                sehir: newTeamCity,
                oyuncuUsernames: newUsernames.filter(u => u.trim())
            })
        })
            .then(res => {
                if (!res.ok) return Promise.reject(res.status);
                window.location.reload(); // oluşturunca yenile
            })
            .catch(err => {
                console.error('Takım oluşturulamadı:', err);
                setError('Takım oluşturma başarısız oldu');
            });
    };

    // Takımı olmayan kullanıcıya form göster
    if (showCreateForm) {
        return (
            <>
                <OyuncuSidebar />
                <main className={styles.mainContent}>
                    <div className={styles.container}>
                        <h1 className={styles.pageTitle}>Yeni Takım Oluştur</h1>
                        {error && <p className={styles.errorText}>{error}</p>}
                        <form onSubmit={handleCreateTeam} className={styles.createForm}>
                            <label>
                                Takım Adı:
                                <input
                                    type="text"
                                    value={newTeamName}
                                    onChange={e => setNewTeamName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Şehir:
                                <input
                                    type="text"
                                    value={newTeamCity}
                                    onChange={e => setNewTeamCity(e.target.value)}
                                    required
                                />
                            </label>
                            <div className={styles.usernamesSection}>
                                <span>Kullanıcı Adları:</span>
                                {newUsernames.map((u, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        placeholder="örn: aliYilmaz"
                                        value={u}
                                        onChange={e => updateUsername(i, e.target.value)}
                                    />
                                ))}
                                <button
                                    type="button"
                                    className={styles.btnPlus}
                                    onClick={addUsernameField}
                                >
                                    +
                                </button>
                            </div>
                            <button type="submit" className={styles.btnPrimary}>
                                Kaydet
                            </button>
                        </form>
                    </div>
                </main>
            </>
        );
    }

    if (loading) return <main className={styles.mainContent}>Yükleniyor...</main>;
    if (error) return <main className={styles.mainContent}>{error}</main>;

    // Mevcut istatistik hesaplamaları
    const matches = parseInt(team.oynananMaç, 10) || 0;
    const forGoals = parseInt(team.atilanGol, 10) || 0;
    const againstGoals = parseInt(team.yenilenGol, 10) || 0;
    const wins = parseInt(team.galibiyet, 10) || 0;

    const generalStats = [
        { label: 'Galibiyet Oranı', value: matches ? `${((wins / matches) * 100).toFixed(0)}%` : '0%' },
        { label: 'Maç Başına Atılan Gol', value: matches ? (forGoals / matches).toFixed(1) : '0.0' },
        { label: 'Maç Başına Yenilen Gol', value: matches ? (againstGoals / matches).toFixed(1) : '0.0' }
    ];

    const teamStats = [
        { label: 'Maç', value: matches },
        { label: 'Atılan Gol', value: forGoals },
        { label: 'Yenilen Gol', value: againstGoals },
        { label: 'Galibiyet', value: wins },
        { label: 'Mağlubiyet', value: parseInt(team.maglubiyet, 10) || 0 }
    ];

    const showMatches = showAllMatches ? allMatches : allMatches.slice(0, 3);

    // Ana render
    return (
        <>
            <OyuncuSidebar />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>TAKIMIM</h1>

                    {/* Header */}
                    <div className={styles.teamHeader}>
                        <div className={styles.logoContainer}>
                            <img
                                src={`/img/team-logo-${team.id}.png`}
                                alt={team.name}
                                className={styles.teamLogo}
                            />
                        </div>
                        <div className={styles.headerDetails}>
                            <h1 className={styles.teamName}>{team.name}</h1>
                            <p className={styles.teamCity}>{team.sehir}</p>
                            <div className={styles.teamCaptain}>
                                <span className={styles.captainBadge}>C</span> Emir Oruç
                            </div>
                        </div>
                    </div>

                    {/* Genel İstatistikler */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Genel İstatistikler</h2>
                        <div className={styles.statsGrid}>
                            {generalStats.map((gs, i) => (
                                <div key={i} className={styles.statCard}>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>{gs.label}</span>
                                        <span className={styles.statValue}>{gs.value}</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: gs.value.toString().endsWith('%')
                                                    ? gs.value
                                                    : `${(parseFloat(gs.value) / 10) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Oyun İstatistikleri */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Oyun İstatistikleri</h2>
                        <div className={styles.statsGrid}>
                            {teamStats.map((ts, i) => (
                                <div key={i} className={styles.statCard}>
                                    <div className={styles.statInfo}>
                                        <i className={`fas ${iconMap[ts.label]}`} />
                                        <span className={styles.statLabel}>{ts.label}</span>
                                        <span className={styles.statValue}>{ts.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Takım Üyeleri */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Takım Üyeleri</h2>
                        <div className={styles.membersGrid}>
                            {members.map((m, i) => (
                                <div key={i} className={styles.memberCard}>
                                    <img
                                        src={`/img/pp-${m.id}.png`}
                                        alt={`${m.firstName} ${m.lastName}`}
                                        className={styles.memberAvatar}
                                    />
                                    <div className={styles.memberInfo}>
                                        <h3 className={styles.memberName}>
                                            {m.firstName} {m.lastName}
                                        </h3>
                                        <p>Pozisyon: {m.pozisyon}</p>
                                        <p>Gol: {m.gol}  Asist: {m.asist}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Geçmiş Maçlar */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Geçmiş Maçlar</h2>
                        <button
                            className={styles.btnOutline}
                            onClick={() => setShowAllMatches(prev => !prev)}
                            style={{ marginBottom: 12 }}
                        >
                            {showAllMatches ? 'Özet' : 'Tüm Maçlar'}
                        </button>
                        <div className={styles.matchHistory}>
                            {showMatches.length === 0 && (
                                <div className={styles.matchCard}>
                                    Bu takımla henüz maç oynanmadı.
                                </div>
                            )}
                            {showMatches.map((m, idx) => {
                                const isHome = m.takim1 === team.name;
                                const skorTakim = isHome ? m.takim1Skor : m.takim2Skor;
                                const skorRakip = isHome ? m.takim2Skor : m.takim1Skor;

                                let result = 'Beraberlik',
                                    resultClass = styles.matchDraw;
                                if (skorTakim > skorRakip) {
                                    result = 'Galibiyet';
                                    resultClass = styles.matchWin;
                                } else if (skorTakim < skorRakip) {
                                    result = 'Mağlubiyet';
                                    resultClass = styles.matchLoss;
                                }

                                const logo1 = teamLogos[m.takim1];
                                const logo2 = teamLogos[m.takim2];
                                const dt = new Date(m.tarih || m.date || Date.now());
                                const gun = isNaN(dt.getDate()) ? '' : dt.getDate();
                                const ay = isNaN(dt.getDate())
                                    ? ''
                                    : dt.toLocaleString('tr-TR', { month: 'short' });

                                return (
                                    <div
                                        key={m.matchId || idx}
                                        className={`${styles.matchCard} ${resultClass}`}
                                    >
                                        <div className={styles.matchDate}>
                                            <span>{gun}</span> {ay}
                                        </div>
                                        <div className={styles.matchTeams}>
                                            <img
                                                src={logo1 ? `/img/team-logo-${logo1}.png` : ''}
                                                alt={m.takim1}
                                                className={styles.teamLogoSmall}
                                            />
                                            <strong>{m.takim1}</strong>
                                            <span style={{ margin: '0 7px' }}>{m.takim1Skor}</span>
                                            <span>-</span>
                                            <span style={{ margin: '0 7px' }}>{m.takim2Skor}</span>
                                            <strong>{m.takim2}</strong>
                                            <img
                                                src={logo2 ? `/img/team-logo-${logo2}.png` : ''}
                                                alt={m.takim2}
                                                className={styles.teamLogoSmall}
                                            />
                                        </div>
                                        <div className={styles.matchResult}>{result}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Başarılar */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Başarılar</h2>
                        <div className={styles.achievementsGrid}>
                            {team.achievements.map((a, i) => (
                                <div key={i} className={styles.achievementCard}>
                                    <div
                                        className={`${styles.achievementIcon} ${styles[a.type]}`}
                                    >
                                        <i className={`fas fa-${a.icon}`}></i>
                                    </div>
                                    <div className={styles.achievementInfo}>
                                        <h3>{a.title}</h3>
                                        <p>{a.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
