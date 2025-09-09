import React, { useState } from 'react';
// Düzeltilmiş import yolu: './Sections.css' yerine '../Sections.css'
import './Sections.css'; // Ortak section stilleri
// İsteğe bağlı: Sadece Contact'a özel stiller için ayrı dosya

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada form gönderme işlemleri yapılacak (örn: API'ye gönderme)
        console.log('Form Data:', formData);
        alert('Mesajınız gönderildi! (Demo)');
        // Formu temizle
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section id="iletisim" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>İletişim</h2>
                    <p>Sorularınız ve önerileriniz için bizimle iletişime geçin</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-form-container">
                        <div className="card">
                            <div className="card-header">
                                <h3>Bize Ulaşın</h3>
                                <p>Formu doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağız.</p>
                            </div>
                            <div className="card-content">
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Adınız Soyadınız</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Adınız Soyadınız"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">E-posta Adresiniz</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="ornek@mail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Konu</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="Mesajınızın konusu"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Mesajınız</label>
                                        <textarea
                                            id="message"
                                            placeholder="Mesajınızı buraya yazın..."
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Gönder</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info-container">
                        <div className="card">
                            <div className="card-header">
                                <h3>İletişim Bilgileri</h3>
                                <p>Bize aşağıdaki kanallardan da ulaşabilirsiniz</p>
                            </div>
                            <div className="card-content">
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <div>
                                            <h4>E-posta</h4>
                                            <p>DevSahaDestek@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-phone"></i>
                                        <div>
                                            <h4>Telefon</h4>
                                            <p>+90 544 513 07 67</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <div>
                                            <h4>Adres</h4>
                                            <p>Niğde Ömer Halisdemir Üniversitesi, Mühendislik Fakültesi <br />Merkez / Niğde</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-clock"></i>
                                        <div>
                                            <h4>Çalışma Saatleri</h4>
                                            <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 13:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;