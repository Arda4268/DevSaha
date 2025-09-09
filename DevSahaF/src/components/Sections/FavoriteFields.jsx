import React, { useState, useEffect } from 'react';
import FieldCard from '../Cards/FieldCard';
import './Sections.css';

function FavoriteFields() {
    const [fieldsByCity, setFieldsByCity] = useState({});
    const [cities, setCities] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/halisaha/list')
            .then(res => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then(data => {
                // 1) Şehir bazında grupla
                const grouped = data.reduce((acc, item) => {
                    const city = item.adres.split(',')[0].trim();
                    if (!acc[city]) acc[city] = [];
                    // Sadece ilk 4'ü al
                    if (acc[city].length < 4) acc[city].push(item);
                    return acc;
                }, {});

                // 2) API objesini FieldCard prop’larına maple
                const mapped = {};
                Object.entries(grouped).forEach(([city, list]) => {
                    mapped[city] = list.map(item => ({
                        id: item.id,
                        name: item.name,
                        location: item.adres,
                        // Rating olarak saha adı kullandım, istersen değiştir
                        rating: 4.9 || '—',
                        // Resim yolunu sabit/alternatif olarak ayarlayabilirsiniz
                        imgSrc: `/img/halısaha-${item.id}.png`,
                        // Özellikler API’de gelmiyorsa boş array
                        features: ["Kafeterya"],
                        price: Number(item.fiyat)
                    }));
                });

                const cityNames = Object.keys(mapped);
                setFieldsByCity(mapped);
                setCities(cityNames);
                setActiveTab(cityNames[0] || '');
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <p>Yükleniyor...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section">
                <div className="container">
                    <p style={{ color: 'red' }}>Bir hata oluştu: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="sahalar" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Favori Halı Sahalar</h2>
                    <p>İllere göre en çok tercih edilen halı sahalar</p>
                </div>

                <div className="tabs">
                    <div className="tabs-list">
                        {cities.map(city => (
                            <button
                                key={city}
                                className={`tab-btn ${activeTab === city ? 'active' : ''}`}
                                onClick={() => setActiveTab(city)}
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    {cities.map(city => (
                        <div
                            key={city}
                            className={`tab-content ${activeTab === city ? 'active' : ''}`}
                        >
                            {fieldsByCity[city].length > 0 ? (
                                <div className="cards-grid">
                                    {fieldsByCity[city].map(field => (
                                        <FieldCard key={field.id} field={field} />
                                    ))}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
                                    {city} için gösterilecek saha bulunamadı.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FavoriteFields;
