import React from 'react';
import './Card.css';

function FieldCard({ field }) {
    return (
        <div className="card field-card">
            <div className="field-image">
                <img src={field.imgSrc} alt={field.name} />
                <span className="field-rating">
                    <i className="fas fa-star"></i> {field.rating}
                </span>
            </div>
            <div className="card-header">
                <h3>{field.name}</h3>
                <p><i className="fas fa-map-marker-alt"></i> {field.location}</p>
            </div>
            <div className="card-content field-features"> {/* Özellikleri content içine aldık */}
                {field.features.map((feature, index) => (
                    <span key={index} className="badge badge-secondary">
                        {feature}
                    </span>
                ))}
            </div>
            <div className="card-footer">
                <div className="field-price">{field.price}₺/saat</div>
                {/* <button className="btn btn-primary btn-sm">Rezervasyon</button> */}
            </div>
        </div>
    );
}

export default FieldCard;