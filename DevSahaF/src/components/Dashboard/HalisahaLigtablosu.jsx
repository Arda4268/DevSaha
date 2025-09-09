import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Halisaha.css';

const HalisahaLigtablosu = () => {
    const [activeTab, setActiveTab] = useState('takimlar');
    const [teams, setTeams] = useState([]);
    const [fields, setFields] = useState([]);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingFields, setLoadingFields] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch team list
        fetch('http://localhost:8080/takim/list')
            .then(res => {
                if (!res.ok) throw new Error(`Takım listesi yüklenirken hata: ${res.status}`);
                return res.json();
            })
            .then(data => {
                // Sort by galibiyet descending and take first 8
                const sorted = data.sort((a, b) => Number(b.galibiyet) - Number(a.galibiyet));
                setTeams(sorted.slice(0, 8));
                setLoadingTeams(false);
            })
            .catch(err => {
                console.error(err);
                setError('Takım listesi yüklenemedi.');
                setLoadingTeams(false);
            });

        // Fetch halısaha list
        fetch('http://localhost:8080/halisaha/list')
            .then(res => {
                if (!res.ok) throw new Error(`Halısaha listesi yüklenirken hata: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setFields(data);
                setLoadingFields(false);
            })
            .catch(err => {
                console.error(err);
                setError('Halısaha listesi yüklenemedi.');
                setLoadingFields(false);
            });
    }, []);

    if (error) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    if (loadingTeams || loadingFields) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <p>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div className="container full-width">
                    <div className="page-header">
                        <h1>Lig Tablosu</h1>
                    </div>

                    <div className="card mb-medium">
                        <div className="card-header">
                            <h3 className="with-icon">
                                <span className="icon-trophy" />
                                <span>Halısaha Ligi 2025</span>
                            </h3>
                        </div>
                        <div className="card-content">
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <p className="stat-label">Toplam Takım</p>
                                    <p className="stat-value">{teams.length}</p>
                                </div>
                                <div className="stat-box">
                                    <p className="stat-label">Oynanan Maç</p>
                                    <p className="stat-value">{teams.reduce((sum, t) => sum + Number(t.oynananMaç), 0)}</p>
                                </div>
                                <div className="stat-box">
                                    <p className="stat-label">Kalan Maç</p>
                                    <p className="stat-value">28</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Sıralamalar</h3>
                        </div>
                        <div className="card-content">
                            <div className="tabs">
                                <div className="tab-list">
                                    <button
                                        className={activeTab === 'takimlar' ? 'tab-button active' : 'tab-button'}
                                        onClick={() => setActiveTab('takimlar')}
                                    >
                                        Takım Sıralaması
                                    </button>
                                    <button
                                        className={activeTab === 'halısahalar' ? 'tab-button active' : 'tab-button'}
                                        onClick={() => setActiveTab('halısahalar')}
                                    >
                                        Halısaha Sıralaması
                                    </button>
                                </div>

                                {activeTab === 'takimlar' && (
                                    <div className="tab-content active" id="takimlar">
                                        <div className="table-container">
                                            <table className="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>Sıra</th>
                                                        <th>Takım</th>
                                                        <th>O</th>
                                                        <th>G</th>
                                                        <th>B</th>
                                                        <th>M</th>
                                                        <th>A</th>
                                                        <th>Y</th>
                                                        <th>Av</th>
                                                        <th>P</th>
                                                        <th>Form</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {teams.map((t, i) => {
                                                        const formBadges = Array(5).fill('G'); // placeholder form
                                                        const av = Number(t.atilanGol) - Number(t.yenilenGol);
                                                        const p = Number(t.galibiyet) * 3 + (Number(t.oynananMaç) - Number(t.galibiyet) - Number(t.maglubiyet));
                                                        return (
                                                            <tr key={t.id}>
                                                                <td><span className="sira-badge">{i + 1}</span></td>
                                                                <td className="takim-isim">{t.name}</td>
                                                                <td>{t.oynananMaç}</td>
                                                                <td>{t.galibiyet}</td>
                                                                <td>0</td>
                                                                <td>{t.maglubiyet}</td>
                                                                <td>{t.atilanGol}</td>
                                                                <td>{t.yenilenGol}</td>
                                                                <td>{av}</td>
                                                                <td className="puan">{p}</td>
                                                                <td>
                                                                    <div className="form-badges">
                                                                        {formBadges.map((f, j) => (
                                                                            <span key={j} className={`form-badge galibiyet`}>{f}</span>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'halısahalar' && (
                                    <div className="tab-content active" id="halısahalar">
                                        <div className="table-container">
                                            <table className="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>Sıra</th>
                                                        <th>Halısaha</th>
                                                        <th>Puan</th>
                                                        <th>Yorum</th>
                                                        <th>Maç Sayısı</th>
                                                        <th>Doluluk</th>
                                                        <th>Fiyat</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fields.map((h, i) => (
                                                        <tr key={h.id}>
                                                            <td><span className="sira-badge">{i + 1}</span></td>
                                                            <td className="halısaha-isim">{h.name}</td>
                                                            <td className="puan">4.{10 - i}</td>
                                                            <td>{50 + i * 10}</td>
                                                            <td>100</td>
                                                            <td><span className="doluluk-badge orta">%80</span></td>
                                                            <td>{h.fiyat} ₺</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HalisahaLigtablosu;
