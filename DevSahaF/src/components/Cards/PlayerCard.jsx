import React from 'react';
import './Card.css'; // Ortak kart stillerini import et

function PlayerCard({ player }) {
    return (
        <div className="card player-card">
            <div className="card-header">
                <div className="player-info">
                    <div className="avatar">
                        <img src={player.imgSrc} alt={player.name} />
                    </div>
                    <div>
                        <h3>{player.name}</h3>
                        <p>{player.position}</p>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <div className="player-stats">
                    <div className="rating">
                        <i className="fas fa-star"></i>
                        <span>{player.rating}</span>
                    </div>
                    <div className="badges">
                        {player.stats.map((stat, index) => (
                            <span key={index} className={`badge ${stat.type === 'main' ? 'badge-secondary' : 'badge-outline'}`}>
                                {stat.value} {stat.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;