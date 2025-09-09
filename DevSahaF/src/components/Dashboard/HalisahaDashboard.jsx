import React from 'react';
import Sidebar from './Sidebar';
import NewsList from './NewsList';
import EventsList from './EventsList';
import './Halisaha.css';

const HalisahaDashboard = () => (
    <div className="app-container">
        <Sidebar />
        <div className="main-content">
            <div className="container">
                <div className="page-header">
                    <h1>Hoş Geldiniz</h1>
                    <p>
                        Halısaha Yetkili Kontrol Paneline hoş geldiniz. Aşağıdaki kartları
                        kullanarak hızlıca gezinebilirsiniz.
                    </p>
                </div>

                <div className="card-grid">
                    <a href="/dashboard/profil" className="card">
                        <div className="card-header">
                            <div className="card-icon bg-blue">
                                <span className="icon-user" />
                            </div>
                            <h3>Profil</h3>
                        </div>
                        <div className="card-content">
                            <p>Halısahanızın bilgilerini ve istatistiklerini görüntüleyin</p>
                        </div>
                    </a>

                    <a href="/dashboard/randevular" className="card">
                        <div className="card-header">
                            <div className="card-icon bg-green">
                                <span className="icon-calendar" />
                            </div>
                            <h3>Randevular</h3>
                        </div>
                        <div className="card-content">
                            <p>Aktif ve geçmiş randevuları yönetin</p>
                        </div>
                    </a>

                    <a href="/dashboard/ligtablosu" className="card">
                        <div className="card-header">
                            <div className="card-icon bg-yellow">
                                <span className="icon-trophy" />
                            </div>
                            <h3>Lig Tablosu</h3>
                        </div>
                        <div className="card-content">
                            <p>Takım ve halısaha sıralamalarını görüntüleyin</p>
                        </div>
                    </a>
                </div>

                <div className="card mt-large">
                    <div className="card-header">
                        <h3>Günlük Özet</h3>
                    </div>
                    <div className="card-content">
                        <div className="stats-grid">
                            <div className="stat-box">
                                <p className="stat-label">Bugünkü Randevular</p>
                                <p className="stat-value">8</p>
                            </div>
                            <div className="stat-box">
                                <p className="stat-label">Doluluk Oranı</p>
                                <p className="stat-value">%75</p>
                            </div>
                            <div className="stat-box">
                                <p className="stat-label">Aktif Takımlar</p>
                                <p className="stat-value">12</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-large">
                    <div className="card-header">
                        <h3>Halısaha Haberleri</h3>
                    </div>
                    <div className="card-content">
                        <NewsList />
                    </div>
                </div>

                <div className="card mt-large">
                    <div className="card-header">
                        <h3>Yaklaşan Etkinlikler</h3>
                    </div>
                    <div className="card-content">
                        <EventsList />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HalisahaDashboard;
