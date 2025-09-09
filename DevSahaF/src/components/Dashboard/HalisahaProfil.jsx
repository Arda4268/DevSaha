import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Halisaha.css';

const HalisahaProfil = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('accessToken');
        if (!username || !token) {
            setError('Kullanıcı bilgileri bulunamadı.');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/halisaha/by-username/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Profil yükleme hatası:', err);
                setError('Profil bilgileri yüklenirken hata oluştu.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <p>Yükleniyor...</p>
                </div>
            </div>
        );
    }

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

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div className="container">
                    <div className="page-header">
                        <h1>Profil</h1>
                    </div>

                    <div className="profile-grid">
                        <div className="card">
                            <div className="card-header">
                                <h3>Halısaha Bilgileri</h3>
                            </div>
                            <div className="card-content profile-info">
                                <div className="profile-image">
                                    {/* Halısaha ID'ye göre public/img klasöründen resim yükleniyor */}
                                    <img
                                        src={`/img/halısaha-${profile.id}.png`}
                                        alt={`${profile.name} Görünümü`}
                                    />
                                </div>
                                <h2 className="profile-name">{profile.name}</h2>
                                <p className="profile-date">Kuruluş: {profile.id}</p>

                                <div className="profile-details">
                                    <div className="profile-detail">
                                        <p className="detail-label">Adres</p>
                                        <p className="detail-value">{profile.adres}</p>
                                    </div>
                                    <div className="profile-detail">
                                        <p className="detail-label">İletişim</p>
                                        <p className="detail-value">{profile.htelefon}</p>
                                    </div>
                                    <div className="profile-detail">
                                        <p className="detail-label">Fiyat</p>
                                        <p className="detail-value">{profile.fiyat} ₺</p>
                                    </div>
                                    <div className="profile-detail">
                                        <p className="detail-label">Saha Durumu</p>
                                        <p className="detail-value">{profile.saha.durum}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>İstatistikler</h3>
                            </div>
                            <div className="card-content">
                                <div className="progress-container">
                                    {[
                                        { label: 'Aylık Kullanım Oranı', value: 78 },
                                        { label: 'Müşteri Memnuniyeti', value: 92 },
                                        { label: 'Doluluk Oranı', value: 85 },
                                        { label: 'Tekrar Eden Müşteriler', value: 64 }
                                    ].map((stat, i) => (
                                        <div key={i} className="progress-item">
                                            <div className="progress-header">
                                                <span className="progress-label">{stat.label}</span>
                                                <span className="progress-value">%{stat.value}</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${stat.value}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="stats-grid mt-large">
                                    <div className="card inner-card">
                                        <div className="card-header">
                                            <h4>Aylık Gelir</h4>
                                        </div>
                                        <div className="card-content">
                                            <p className="stat-value">₺42,500</p>
                                            <p className="stat-change">Geçen aya göre %12 artış</p>
                                        </div>
                                    </div>

                                    <div className="card inner-card">
                                        <div className="card-header">
                                            <h4>Toplam Saha Sayısı</h4>
                                        </div>
                                        <div className="card-content">
                                            <p className="stat-value">1</p>
                                            <p className="stat-change">1 kapalı</p>
                                        </div>
                                    </div>

                                    <div className="card inner-card">
                                        <div className="card-header">
                                            <h4>Toplam Randevu</h4>
                                        </div>
                                        <div className="card-content">
                                            <p className="stat-value">248</p>
                                            <p className="stat-change">Bu ay içerisinde</p>
                                        </div>
                                    </div>

                                    <div className="card inner-card">
                                        <div className="card-header">
                                            <h4>Kayıtlı Takım</h4>
                                        </div>
                                        <div className="card-content">
                                            <p className="stat-value">32</p>
                                            <p className="stat-change">12 aktif takım</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HalisahaProfil;
