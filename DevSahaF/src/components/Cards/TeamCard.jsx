import React from 'react';
import './Card.css';

function TeamCard({ team }) {
    return (
        <div className="card team-card">
            <div className="card-header">
                <div className="team-info">
                    <div className="team-logo">
                        <img src={team.logoSrc} alt={team.name} />
                    </div>
                    <div>
                        <h3>{team.name}</h3>
                        <div className="team-rating">
                            <i className="fas fa-trophy"></i>
                            <span>{team.rating} Puan</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <div className="team-stats">
                    <div className="stat-item">
                        <span className="badge badge-success">{team.stats.wins}</span>
                        <span className="stat-label">Galibiyet</span>
                    </div>
                    <div className="stat-item">
                        <span className="badge badge-neutral">{team.stats.draws}</span> {/* Stil dosyasında .badge-neutral tanımlanmalı */}
                        <span className="stat-label">Beraberlik</span>
                    </div>
                    <div className="stat-item">
                        <span className="badge badge-danger">{team.stats.losses}</span>
                        <span className="stat-label">Mağlubiyet</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamCard;