import React, { useState, useEffect, useMemo } from 'react';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuLigtablosu.module.css';

const OyuncuLigtablosu = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [fields, setFields] = useState([]);
    const [activeTab, setActiveTab] = useState('players');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        // Oyuncu verisi
        fetch('http://localhost:8080/oyuncu/sirali')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => (b.gol + b.asist) - (a.gol + a.asist));
                setPlayers(sorted);
            })
            .catch(console.error);

        // Takım verisi
        fetch('http://localhost:8080/takim/list')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => b.galibiyet - a.galibiyet);
                setTeams(sorted);
            })
            .catch(console.error);

        // Halısaha verisi + rastgele puan
        fetch('http://localhost:8080/halisaha/list')
            .then(res => res.json())
            .then(data => {
                const withRatings = data.map(h => ({
                    ...h,
                    rating: Math.floor(Math.random() * 5) + 1
                }));
                setFields(withRatings);
            })
            .catch(console.error);
    }, []);

    // Düzeltilmiş: Halı sahalardaki şehir listesini çıkartıyoruz
    const cities = useMemo(
        () => Array.from(new Set(fields.map(h => h.adres.split(',')[0]))),
        [fields]
    );

    // Seçilen şehre göre top5
    const filteredFields = useMemo(
        () =>
            fields
                .filter(h => !selectedCity || h.adres.split(',')[0] === selectedCity)
                .slice(0, 5),
        [fields, selectedCity]
    );

    const renderPlayers = () => (
        <div className={styles.cardsContainer}>
            {players.slice(0, 20).map((p, idx) => (
                <div key={p.id} className={styles.card}>
                    <img
                        src={`/img/pp-${p.id}.png`}
                        alt={`${p.firstName} ${p.lastName}`}
                        className={styles.avatar}
                    />
                    <div className={styles.cardInfo}>
                        <div className={styles.cardHeaderRow}>
                            <h3 className={styles.cardTitle}>
                                {p.firstName} {p.lastName}
                            </h3>
                            <div className={styles.rankBadge}>
                                <i className="fas fa-trophy" aria-hidden="true"></i>
                                <span>{idx + 1}</span>
                            </div>
                        </div>
                        <p className={styles.meta}>
                            {p.pozisyon} • {p.yas} yaş • {p.sehir}
                        </p>
                        <div className={styles.cardBody}>
                            <span className={styles.statGreen}>Maç: {parseInt(p.galibiyet) + parseInt(p.maglubiyet)}</span>
                            <span className={styles.statGreen}>Gol: {p.gol}</span>
                            <span className={styles.statGreen}>Asist: {p.asist}</span>
                            <span className={styles.statGreen}>G: {p.galibiyet}</span>
                            <span className={styles.statGreen}>M: {p.maglubiyet}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTeams = () => (
        <div className={styles.cardsContainer}>
            {teams.slice(0, 10).map((t, idx) => (
                <div key={t.id} className={styles.card}>
                    <img
                        src={`/img/team-logo-${t.id}.png`}
                        alt={t.name}
                        className={styles.avatar}
                    />
                    <div className={styles.cardInfo}>
                        <div className={styles.cardHeaderRow}>
                            <h3 className={styles.cardTitle}>{t.name}</h3>
                            <div className={styles.rankBadge}>
                                <i className="fas fa-trophy" aria-hidden="true"></i>
                                <span>{idx + 1}</span>
                            </div>
                        </div>
                        <p className={styles.meta}>{t.sehir}</p>
                        <div className={styles.cardBody}>
                            <span className={styles.statGreen}>Maç: {t.oynananMaç}</span>
                            <span className={styles.statGreen}>G: {t.galibiyet}</span>
                            <span className={styles.statGreen}>B: {t.beraberlik ?? 0}</span>
                            <span className={styles.statGreen}>M: {t.maglubiyet}</span>
                            <span className={styles.statGreen}>A: {t.atilanGol}</span>
                            <span className={styles.statGreen}>Y: {t.yenilenGol}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderFields = () => (
        <>
            {/* Şehir filtresi */}
            <div className={styles.filterGroup}>
                <label>Şehir:</label>
                <select
                    className={styles.citySelect}
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                >
                    <option value="">Tüm Şehirler</option>
                    {cities.map(city => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.cardsContainer}>
                {filteredFields.map((h, idx) => (
                    <div key={h.id} className={styles.card}>
                        <img
                            src={`/img/halısaha-${h.id}.png`}
                            alt={h.name}
                            className={styles.avatar}
                        />
                        <div className={styles.cardInfo}>
                            <div className={styles.cardHeaderRow}>
                                <h3 className={styles.cardTitle}>{h.name}</h3>
                                <div className={styles.rankBadge}>
                                    <i className="fas fa-trophy" aria-hidden="true"></i>
                                    <span>{idx + 1}</span>
                                </div>
                            </div>
                            <p className={styles.meta}>{h.adres}</p>
                            <div className={styles.cardBody}>
                                <span className={styles.statGreen}>☎ {h.htelefon}</span>
                                <span className={styles.statGreen}>₺{h.fiyat}/saat</span>
                                <span className={styles.statGreen}>
                                    Puan: {'★'.repeat(h.rating) + '☆'.repeat(5 - h.rating)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <>
            <OyuncuSidebar />

            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Lig Tablosu</h1>
                    <div className={styles.tabContainer}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'players' ? styles.active : ''}`}
                            onClick={() => setActiveTab('players')}
                        >
                            Top 20 Oyuncu
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'teams' ? styles.active : ''}`}
                            onClick={() => setActiveTab('teams')}
                        >
                            Top 10 Takım
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'fields' ? styles.active : ''}`}
                            onClick={() => setActiveTab('fields')}
                        >
                            Top 5 Halısaha
                        </button>
                    </div>

                    {activeTab === 'players' && renderPlayers()}
                    {activeTab === 'teams' && renderTeams()}
                    {activeTab === 'fields' && renderFields()}
                </div>
            </main>
        </>
    );
};

export default OyuncuLigtablosu;
