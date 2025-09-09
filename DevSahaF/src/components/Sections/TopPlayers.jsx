import React, { useState, useEffect } from 'react';
import PlayerCard from '../Cards/PlayerCard';
import './Sections.css'; // Ortak section stilleri

function TopPlayers() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/oyuncu/sirali')
            .then((res) => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                // API’den gelen dizinin ilk 4 oyuncusunu al
                setPlayers(data.slice(0, 4));
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch hatası:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section id="oyuncular" className="section">
                <div className="container">Yükleniyor...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="oyuncular" className="section">
                <div className="container">Hata: {error.message}</div>
            </section>
        );
    }

    return (
        <section id="oyuncular" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>İlk 4 Oyuncu</h2>
                    <p>Platformumuzda en yüksek performans gösteren oyuncular</p>
                </div>

                <div className="cards-grid">
                    {players.map((p) => (

                        <PlayerCard
                            key={p.id}
                            player={{
                                id: p.id,
                                // İsim ve soyisimden tam isim oluşturuyoruz
                                name: `${p.firstName} ${p.lastName}`,
                                position: p.pozisyon,
                                // Rating alanı API’da yok; isterseniz burada hesaplayabilirsiniz veya boş bırakın
                                rating: null,
                                // imgSrc API’da yok; varsayılan avatar atayabilirsiniz
                                imgSrc: `/img/pp-${p.id}.png`,
                                // Statistikleri dilediğiniz gibi düzenleyin
                                stats: [
                                    { value: p.gol, label: 'Gol', type: 'main' },
                                    { value: p.asist, label: 'Asist', type: 'outline' },

                                ],
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TopPlayers;
