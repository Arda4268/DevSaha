import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Yıl değişirse güncellemek için (çok gerekli değil ama örnek)
    useEffect(() => {
        const interval = setInterval(() => {
            const year = new Date().getFullYear();
            if (year !== currentYear) {
                setCurrentYear(year);
            }
        }, 60000); // Her dakika kontrol et
        return () => clearInterval(interval);
    }, [currentYear]);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h3>DevSaha</h3> {/* Logo yerine metin */}
                        <p>Halı saha rezervasyon ve yönetim sistemi ile maçlarınızı kolayca organize edin.</p>
                    </div>

                    <div className="footer-col">
                        <h3>Hızlı Bağlantılar</h3>
                        <ul className="footer-links">
                            <li><a href="#anasayfa">Anasayfa</a></li>
                            <li><a href="#oyuncular">Oyuncular</a></li>
                            <li><a href="#takimlar">Takımlar</a></li>
                            <li><a href="#sahalar">Halı Sahalar</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Kurumsal</h3>
                        <ul className="footer-links">
                            <li><a href="#hakkimizda">Hakkımızda</a></li>
                            <li><a href="#iletisim">İletişim</a></li>
                            <li><a href="/gizlilik">Gizlilik Politikası</a></li> {/* React Router ile yönlendirme */}
                            <li><a href="/kullanim-kosullari">Kullanım Koşulları</a></li> {/* React Router ile yönlendirme */}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Bizi Takip Edin</h3>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a> {/* facebook-f daha iyi */}
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} DevSaha. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;