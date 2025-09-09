import React, { useState } from 'react';
import './Modal.css';

// onClose, onBack, onSuccess prop'larını App.jsx'ten alacak
function PlayerRegisterModal({ onClose, onBack, onSuccess }) {
    const [formData, setFormData] = useState({
        username: '', password: '', firstName: '', lastName: '',
        yas: '', sehir: '', telefon: '', pozisyon: '', ayak: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const registrationData = {
            ...formData,
            role: "OYUNCU",
            // Backend'in beklemediği boş alanları ekle
            name: " ", adres: " ", htelefon: " ", fiyat: " "
        };

        // Basit Frontend Doğrulaması
        for (const key in formData) {
            if (!formData[key]) {
                setError(`Lütfen '${key}' alanını doldurun.`);
                setLoading(false);
                return;
            }
        }
        // Telefon numarası formatı kontrolü (basit örnek)
        if (!/^\d{10,11}$/.test(formData.telefon)) {
            setError('Geçerli bir telefon numarası girin (10-11 haneli).');
            setLoading(false);
            return;
        }
        if (isNaN(formData.yas) || formData.yas <= 0) {
            setError('Geçerli bir yaş girin.');
            setLoading(false);
            return;
        }


        console.log("Oyuncu Kayıt Verisi:", registrationData);

        try {
            const response = await fetch('http://localhost:8080/register', { // API Adresi
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (response.ok && result) { // Backend'den başarılı yanıt geldi mi? (Yanıt yapısına göre değişebilir)
                console.log('Oyuncu kaydı başarılı:', result);
                alert('Oyuncu kaydı başarıyla tamamlandı!');
                onSuccess(); // Başarılı olunca App.jsx'teki fonksiyonu çağır (örn: login modalını aç)
            } else {
                // Backend'den gelen hata mesajını kullanmaya çalış
                setError(result?.message || `Kayıt başarısız. Hata: ${response.statusText || 'Bilinmeyen Hata'}`);
                console.error('Oyuncu kaydı backend hatası:', result);
            }
        } catch (error) {
            console.error('Oyuncu kaydı fetch hatası:', error);
            setError('Kayıt sırasında bir ağ hatası oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}> {/* Daha geniş modal */}
                {/* Kapatma butonu loading durumunda da çalışsın */}
                <button className="modal-close-btn" onClick={onClose} disabled={loading}>&times;</button>

                <div className="modal-header">
                    <h1>Oyuncu Kayıt</h1>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="modal-grid">
                            <div className="modal-input-group">
                                <span className="modal-input-icon">👤</span>
                                <input type="text" id="username" placeholder="Kullanıcı Adı" required className="modal-input" value={formData.username} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">🔒</span>
                                <input type="password" id="password" placeholder="Şifre" required className="modal-input" value={formData.password} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">📝</span>
                                <input type="text" id="firstName" placeholder="Ad" required className="modal-input" value={formData.firstName} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">📝</span>
                                <input type="text" id="lastName" placeholder="Soyad" required className="modal-input" value={formData.lastName} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">🎂</span>
                                <input type="number" id="yas" placeholder="Yaş" required className="modal-input" value={formData.yas} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">🏙️</span>
                                <input type="text" id="sehir" placeholder="Şehir" required className="modal-input" value={formData.sehir} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">📱</span>
                                <input type="tel" id="telefon" placeholder="Telefon (5xxxxxxxxx)" required className="modal-input" value={formData.telefon} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">🏃</span>
                                <input type="text" id="pozisyon" placeholder="Pozisyon" required className="modal-input" value={formData.pozisyon} onChange={handleChange} disabled={loading} />
                            </div>
                            {/* Ayak için tam genişlik */}
                            <div className="modal-input-group" style={{ gridColumn: '1 / -1' }}> {/* Gridde tam satırı kapla */}
                                <span className="modal-input-icon">👣</span>
                                <input type="text" id="ayak" placeholder="Ayak (Sağ, Sol, İkisi)" required className="modal-input" value={formData.ayak} onChange={handleChange} disabled={loading} />
                            </div>
                        </div>

                        <button type="submit" className="modal-button" disabled={loading}>
                            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                        </button>
                    </form>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (!loading) onBack(); }} className={`modal-link ${loading ? 'disabled-link' : ''}`}>Geri Dön</a>
                </div>
            </div>
        </div>
    );
}
// Stil dosyanıza ekleyin:
// .disabled-link { pointer-events: none; opacity: 0.6; }

export default PlayerRegisterModal;