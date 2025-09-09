import React, { useState, useEffect } from 'react';
import './Hero.css';

// onRegisterClick prop'unu App.jsx'ten alacak
function Hero({ onRegisterClick }) {
    const images = [
        "/img/giris1.jpg",
        "/img/giris4.jpg",
        "/img/giris3.jpg",
        "/img/giris7.jpg",
        "/img/giris5.jpg",
        "/img/giris6.jpg"
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // 2 saniyede bir değişir

        return () => clearInterval(intervalId); // Component unmount olduğunda interval'i temizle
    }, [images.length]); // Sadece images.length değiştiğinde tekrar çalıştır

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        {/* Arama Kutusu */}
                        <div className="search-box">
                            <input type="text" placeholder="oyuncu, takım, gol, özet ara..." />
                            <span class="material-icons icon">search</span>
                        </div>

                        <p>
                            Halı saha rezervasyonlarınızı kolayca yönetin, takım arkadaşlarınızı bulun ve en iyi sahaları keşfedin.
                        </p>
                        <div className="hero-buttons">
                            {/* Hemen Başla butonuna tıklandığında App.jsx'teki fonksiyonu çağır */}
                            <button onClick={onRegisterClick} className="btn btn-primary">Hemen Başla</button>
                            <a href="#nedir" className="btn btn-outline">Daha Fazla Bilgi</a>
                        </div>
                    </div>

                    {/* Otomatik Değişen Görsel */}
                    <div className="hero-image">
                        <img
                            id="slideshow"
                            src={images[currentImageIndex]}
                            alt="Halı Saha Görseli"
                            key={currentImageIndex} /* Key değişikliği animasyonu tetikleyebilir */
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;