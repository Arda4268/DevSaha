import React from 'react';
import './Card.css';

function GalleryCard({ image }) {
    return (
        <div className="gallery-card">
            <img src={image.src} alt={image.alt} />
        </div>
    );
}

export default GalleryCard;