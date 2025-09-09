import React from 'react';
import './Card.css';

function InfoCard({ title, features, profileData }) {
    // Eğer profileData varsa, profil kartını render et
    if (profileData) {
        return (
            <div className="card info-card profile-card">
                <div className="image-wrapper">
                    <img src={profileData.imgSrc} alt={profileData.name} />
                </div>
                <div className="info">
                    <h3>{profileData.name}</h3>
                    <h4>İletişim</h4>
                    {profileData.linkedin && <p>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">{profileData.linkedin.replace('https://www.', '')}</a></p>}
                    {profileData.gmail && <p>Gmail: <a href={`mailto:${profileData.gmail}`}>{profileData.gmail}</a></p>}
                </div>
            </div>
        );
    }

    // Yoksa, standart info kartını render et
    return (
        <div className="card info-card">
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-content">
                <ul className="feature-list">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InfoCard;