import React, { useState } from 'react';
import './Modal.css';

// onClose, onBack, onSuccess prop'larını App.jsx'ten alacak
function AuthorityRegisterModal({ onClose, onBack, onSuccess }) {
    const [formData, setFormData] = useState({
        username: '', password: '', name: '', adres: '', htelefon: '', fiyat: ''
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
            role: "YETKİLİ",
            // Backend'in beklemediği boş alanları ekle
            firstName: " ", lastName: " ", yas: " ", sehir: " ",
            telefon: " ", pozisyon: " ", ayak: " "
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
        if (!/^\d{10,11}$/.test(formData.htelefon)) {
            setError('Geçerli bir iletişim numarası girin (10-11 haneli).');
            setLoading(false);
            return;
        }
        if (isNaN(formData.fiyat) || formData.fiyat <= 0) {
            setError('Geçerli bir saatlik ücret girin.');
            setLoading(false);
            return;
        }

        console.log("Yetkili Kayıt Verisi:", registrationData);

        try {
            const response = await fetch('http://localhost:8080/register', { // API Adresi
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (response.ok && result) { // Backend'den başarılı yanıt geldi mi?
                console.log('Yetkili kaydı başarılı:', result);
                alert('Yetkili kaydı başarıyla tamamlandı!');
                onSuccess(); // Başarılı olunca App.jsx'teki fonksiyonu çağır
            } else {
                setError(result?.message || `Kayıt başarısız. Hata: ${response.statusText || 'Bilinmeyen Hata'}`);
                console.error('Yetkili kaydı backend hatası:', result);
            }
        } catch (error) {
            console.error('Yetkili kaydı fetch hatası:', error);
            setError('Kayıt sırasında bir ağ hatası oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <button className="modal-close-btn" onClick={onClose} disabled={loading}>&times;</button>

                <div className="modal-header">
                    <h1>Halısaha Yetkilisi Kayıt</h1>
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
                                <span className="modal-input-icon">⚽</span>
                                <input type="text" id="name" placeholder="Halısaha Adı" required className="modal-input" value={formData.name} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">📍</span>
                                <input type="text" id="adres" placeholder="Adres" required className="modal-input" value={formData.adres} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">📱</span>
                                <input type="tel" id="htelefon" placeholder="İletişim Numarası (5xxxxxxxxx)" required className="modal-input" value={formData.htelefon} onChange={handleChange} disabled={loading} />
                            </div>
                            <div className="modal-input-group">
                                <span className="modal-input-icon">💰</span>
                                <input type="number" id="fiyat" placeholder="Saatlik Ücret (TL)" required className="modal-input" value={formData.fiyat} onChange={handleChange} disabled={loading} />
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

export default AuthorityRegisterModal;