import React, { useState, useEffect } from 'react';
import TeamCard from '../Cards/TeamCard';
import './Sections.css';

function TopTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/takim/list')
            .then((res) => {
                if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                // "galibiyet" sayısına göre azalan sırala, sonra ilk 4'ü al
                const sorted = data.sort(
                    (a, b) => parseInt(b.galibiyet, 10) - parseInt(a.galibiyet, 10)
                );
                setTeams(sorted.slice(0, 4));
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
            <section id="takimlar" className="section">
                <div className="container">Yükleniyor...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="takimlar" className="section">
                <div className="container">Hata: {error.message}</div>
            </section>
        );
    }

    return (
        <section id="takimlar" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>İlk 4 Takım</h2>
                    <p>En çok galibiyet alan takımlar</p>
                </div>

                <div className="cards-grid">
                    {teams.map((t) => {
                        const wins = parseInt(t.galibiyet, 10);
                        const losses = parseInt(t.maglubiyet, 10);
                        const played = parseInt(t.oynananMaç, 10);
                        const draws = played - (wins + losses);

                        return (
                            <TeamCard
                                key={t.id}
                                team={{
                                    id: t.id,
                                    name: t.name,
                                    // API'de rating yok; isterseniz burada hesaplama ekleyebilirsiniz
                                    rating: null,
                                    // Logo yoksa /img/team-logo-<id>.png kullanılıyor
                                    logoSrc: `/img/team-logo-${t.id}.png`,
                                    stats: {
                                        wins,
                                        draws,
                                        losses,
                                    },
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default TopTeams;
