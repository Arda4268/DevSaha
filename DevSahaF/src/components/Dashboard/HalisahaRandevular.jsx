import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Halisaha.css';

const HalisahaRandevular = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('accessToken');

    // Sekme durumu
    const [activeTab, setActiveTab] = useState('aktif');

    // Saat dilimleri
    const times = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00',
        '21:00', '22:00'
    ];

    // Durum state’leri
    const [slotStatus, setSlotStatus] = useState(
        times.reduce((acc, t) => ({ ...acc, [t]: false }), {})
    );
    const [activeRandevular, setActiveRandevular] = useState([]);
    const [pastRandevular, setPastRandevular] = useState([]);

    // Modal state
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(null);
    const [modalData, setModalData] = useState({ tak1: '', tak2: '', date: '' });
    const [selectedTeam, setSelectedTeam] = useState('tak1');
    const [modalPlayers, setModalPlayers] = useState({ tak1: [], tak2: [] });
    const [team1Score, setTeam1Score] = useState('');
    const [team2Score, setTeam2Score] = useState('');

    const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    // Modal açma
    const openStatsModal = idx => {
        const r = pastRandevular[idx];
        setModalIndex(idx);
        setModalData({ tak1: r.team1, tak2: r.team2, date: r.date });
        setModalPlayers({ tak1: [], tak2: [] });
        setSelectedTeam('tak1');
        setTeam1Score('');
        setTeam2Score('');
        setShowStatsModal(true);
    };
    const closeStatsModal = () => setShowStatsModal(false);

    // Oyuncu ekleme ve güncelleme
    const addPlayer = () => {
        const arr = modalPlayers[selectedTeam];
        if (arr.length < 7) {
            setModalPlayers({
                ...modalPlayers,
                [selectedTeam]: [...arr, { username: '', gol: 0, asist: 0 }],
            });
        }
    };
    const handlePlayerChange = (i, field, val) => {
        const arr = [...modalPlayers[selectedTeam]];
        arr[i][field] = val;
        setModalPlayers({ ...modalPlayers, [selectedTeam]: arr });
    };
    const handleTeamSelect = teamKey => setSelectedTeam(teamKey);

    // İstatistik kaydetme ve maç skoru güncelleme
    const saveStats = async () => {
        // takım skorları girildi mi?
        if (team1Score === '' || team2Score === '') {
            alert('Lütfen her iki takımın skorunu da girin.');
            return;
        }

        // doğrulama
        const sum1 = modalPlayers.tak1.reduce((a, p) => a + p.gol, 0);
        const sum2 = modalPlayers.tak2.reduce((a, p) => a + p.gol, 0);
        if (sum1 !== +team1Score || sum2 !== +team2Score) {
            alert('Her takım için oyuncu gol toplamı, girilen takım skoruna eşit olmalı.');
            return;
        }
        const assist1 = modalPlayers.tak1.reduce((a, p) => a + p.asist, 0);
        const assist2 = modalPlayers.tak2.reduce((a, p) => a + p.asist, 0);
        if (assist1 > sum1 || assist2 > sum2) {
            alert('Her takım için asist sayısı, gol sayısından fazla olamaz.');
            return;
        }

        const randevu = pastRandevular[modalIndex];
        const matchId = randevu.macId;

        try {
            // her oyuncu için POST isteği
            const allPlayers = [...modalPlayers.tak1, ...modalPlayers.tak2];
            for (let p of allPlayers) {
                await fetch(
                    `http://localhost:8080/oyuncu/${encodeURIComponent(p.username)}/gol-asist`,
                    {
                        method: 'POST',
                        headers: authHeaders,
                        body: JSON.stringify({
                            username: p.username,
                            gol: p.gol,
                            asist: p.asist,
                        }),
                    }
                );
            }

            // maç skoru güncelle (PUT)
            await fetch('http://localhost:8080/mac/update', {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify({
                    matchId,
                    takim1Skor: +team1Score,
                    takim2Skor: +team2Score
                }),
            });

            // randevu durumunu ve skorları state'te güncelle
            setPastRandevular(prev =>
                prev.map((r, i) =>
                    i === modalIndex
                        ? {
                            ...r,
                            status: 'istatistikGirildi',
                            team1Score: +team1Score,
                            team2Score: +team2Score,
                        }
                        : r
                )
            );

            alert('İstatistik girildi');
            closeStatsModal();
        } catch (err) {
            console.error('Kaydetme hatası:', err);
            alert('Kaydederken bir hata oluştu.');
        }
    };

    // API’den veri çekme
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);

        const fetchByDurum = async durum => {
            const resp = await fetch('http://localhost:8080/randevu/list/durum', {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify({ durum }),
            });
            const data = await resp.json();
            return data.filter(item => item.halisahaUsername === username);
        };

        // aktif randevular ve doluluk
        fetchByDurum('PLANLANDI').then(list => {
            list.forEach(async item => {
                if (item.tarih.slice(0, 10) === today) {
                    const detail = await (
                        await fetch(`http://localhost:8080/randevu/list/${item.id}`, {
                            headers: authHeaders,
                        })
                    ).json();
                    const hr = new Date(detail.tarih).getHours().toString().padStart(2, '0') + ':00';
                    if (times.includes(hr)) {
                        setSlotStatus(prev => ({ ...prev, [hr]: true }));
                    }
                }
            });
            setActiveRandevular(
                list.map(r => {
                    const dt = new Date(r.tarih);
                    const h = dt.getHours().toString().padStart(2, '0');
                    return {
                        id: r.id,
                        macId: r.macId,
                        team1: r.takim1,
                        team2: r.takim2,
                        date: dt.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }),
                        time: `${h}:00 - ${String(+h + 1).padStart(2, '0')}:00`,
                        field: 'Saha 1',
                        status: 'onaylandi',
                    };
                })
            );
        });

        // geçmiş randevular
        fetchByDurum('TAMAMLANDI').then(list =>
            setPastRandevular(
                list.map(r => {
                    const dt = new Date(r.tarih);
                    const h = dt.getHours().toString().padStart(2, '0');
                    return {
                        id: r.id,
                        macId: r.macId,
                        team1: r.takim1,
                        team2: r.takim2,
                        date: dt.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }),
                        time: `${h}:00 - ${String(+h + 1).padStart(2, '0')}:00`,
                        field: 'Saha 1',
                        status: 'tamamlandi',
                    };
                })
            )
        );
    }, [username, token]);

    return (
        <>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    {/* BUGÜNKÜ DOLULUK ORANI */}
                    <div className="card">
                        <div className="card-header"><h3>Bugünkü Doluluk Oranı</h3></div>
                        <div className="card-content">
                            <div className="saatlik-doluluk">
                                {times.map(t => (
                                    <div key={t} className="saat-slot">
                                        <div className="saat-label">{t}</div>
                                        <div className={`saat-doluluk ${slotStatus[t] ? 'tam-dolu' : 'bos'}`}>
                                            {slotStatus[t] ? '1/1' : '0/1'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RANDEVU LİSTESİ */}
                    <div className="card mt-medium">
                        <div className="card-header"><h3>Randevu Listesi</h3></div>
                        <div className="card-content">
                            <div className="tabs">
                                <div className="tab-list">
                                    <button
                                        onClick={() => setActiveTab('aktif')}
                                        className={activeTab === 'aktif' ? 'tab-button active' : 'tab-button'}
                                    >
                                        Aktif Randevular

                                    </button>
                                    <button
                                        onClick={() => setActiveTab('gecmis')}
                                        className={activeTab === 'gecmis' ? 'tab-button active' : 'tab-button'}
                                    >
                                        Geçmiş Randevular
                                    </button>
                                </div>

                                {activeTab === 'aktif' && (
                                    <div className="tab-content active">
                                        {activeRandevular.map((r, i) => (
                                            <div key={i} className="randevu-item">
                                                <div className="randevu-info">
                                                    <h3 className="randevu-takim">{r.team1} vs {r.team2}</h3>
                                                    <div className="randevu-detaylar">
                                                        <div className="randevu-detay"><span className="icon-calendar" /> {r.date}</div>
                                                        <div className="randevu-detay"><span className="icon-clock" /> {r.time}</div>
                                                        <div className="randevu-detay"><span className="icon-map-pin" /> {r.field}</div>
                                                    </div>
                                                </div>
                                                <div className={`randevu-durum ${r.status}`}>Onaylandı</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'gecmis' && (
                                    <div className="tab-content active">
                                        {pastRandevular.map((r, i) => (
                                            <div key={i} className="randevu-item">
                                                <div className="randevu-info">
                                                    <h3 className="randevu-takim">
                                                        {r.team1}{r.team1Score != null && ` (${r.team1Score})`} vs {r.team2}{r.team2Score != null && ` (${r.team2Score})`}
                                                    </h3>
                                                    <div className="randevu-detaylar">
                                                        <div className="randevu-detay"><span className="icon-calendar" /> {r.date}</div>
                                                        <div className="randevu-detay"><span className="icon-clock" /> {r.time}</div>
                                                        <div className="randevu-detay"><span className="icon-map-pin" /> {r.field}</div>
                                                    </div>
                                                </div>
                                                <div className={`randevu-durum ${r.status}`}>
                                                    {r.status === 'tamamlandi' ? 'Tamamlandı' : 'İstatistik Girildi'}
                                                </div>
                                                {r.status === 'tamamlandi' && (
                                                    <button
                                                        className="istatistik-ekle-btn btn-outline"
                                                        onClick={() => openStatsModal(i)}
                                                    >
                                                        <span className="icon-stats" /> İstatistik Ekle
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* İSTATİSTİK MODAL */}
            {showStatsModal && (
                <div className="modal-overlay" onClick={closeStatsModal}>
                    <div className="modal-content stats-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Maç İstatistikleri</h3>
                            <button className="modal-close" onClick={closeStatsModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Maç:</strong> {modalData.tak1} vs {modalData.tak2}</p>
                            <p><strong>Tarih:</strong> {modalData.date}</p>
                            <div className="score-inputs">
                                <div className="score-field">
                                    <label>{modalData.tak1} Skoru:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={team1Score}
                                        onChange={e => setTeam1Score(e.target.value)}
                                    />
                                </div>
                                <div className="score-field">
                                    <label>{modalData.tak2} Skoru:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={team2Score}
                                        onChange={e => setTeam2Score(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="team-select">
                                <button
                                    className={selectedTeam === 'tak1' ? 'btn-secondary' : 'btn-outline'}
                                    onClick={() => handleTeamSelect('tak1')}
                                >
                                    {modalData.tak1}
                                </button>
                                <button
                                    className={selectedTeam === 'tak2' ? 'btn-secondary' : 'btn-outline'}
                                    onClick={() => handleTeamSelect('tak2')}
                                >
                                    {modalData.tak2}
                                </button>
                            </div>
                            <div className="oyuncu-list">
                                {modalPlayers[selectedTeam].map((p, idx) => (
                                    <div key={idx} className="oyuncu-form-row">
                                        <input
                                            type="text"
                                            className="player-input"
                                            placeholder="Kullanıcı Adı"
                                            value={p.username}
                                            onChange={e => handlePlayerChange(idx, 'username', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="player-input"
                                            placeholder="Gol"
                                            min="0"
                                            value={p.gol}
                                            onChange={e => handlePlayerChange(idx, 'gol', +e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="player-input"
                                            placeholder="Asist"
                                            min="0"
                                            value={p.asist}
                                            onChange={e => handlePlayerChange(idx, 'asist', +e.target.value)}
                                        />
                                    </div>
                                ))}
                                <button
                                    className="add-player-btn btn-primary"
                                    onClick={addPlayer}
                                    disabled={modalPlayers[selectedTeam].length >= 7}
                                >
                                    + Oyuncu Ekle ({modalPlayers[selectedTeam].length}/7)
                                </button>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={saveStats}>Kaydet</button>
                            <button className="btn-secondary" onClick={closeStatsModal}>İptal</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HalisahaRandevular;
