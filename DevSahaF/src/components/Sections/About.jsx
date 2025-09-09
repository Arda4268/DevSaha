import React from 'react';
import InfoCard from '../Cards/InfoCard';
import './Sections.css';

// Ekip üyeleri verisi
const teamMembers = [
    { id: 1, name: "Arda Eşmekaya", imgSrc: "/img/arda-pp.jpeg", linkedin: "https://www.linkedin.com/in/arda-esmekaya-b3237829a/", gmail: "esmekayaarda30@gmail.com" },
    { id: 2, name: "Çağla Şeker", imgSrc: "/img/çağla-pp.png", linkedin: "https://www.linkedin.com/in/caglaseker1503", gmail: "sekercagla45@gmail.com" }, // Logo yolu düzeltildi
    { id: 3, name: "Hüseyin Ali Üstündağ", imgSrc: "/img/hüseyin-pp.png", linkedin: "https://www.linkedin.com/in/hüseyin-ali-üstündağ-3230752a8/", gmail: "ustundaghuse0764@gmail.com" }, // Logo yolu düzeltildi
];


function About() {
    return (
        <section id="hakkimizda" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Hakkımızda</h2>
                    <p>DevSaha olarak misyonumuz ve vizyonumuz</p>
                </div>

                <div className="about-grid">
                    <div className="about-content">
                        <div className="about-text">
                            <h3>Biz Kimiz?</h3>
                            <p>
                                DevSaha, 2025 yılında futbol tutkusunu dijital dünyaya taşıma hayaliyle yola çıkan Niğde Ömer Halisdemir
                                Üniversitesi 2.Sınıf Bilgisayar Mühendisliği öğrencileri tarafından oluşturulmuş web sitesidir. Futbolun
                                birleştirici gücüne inanan ekibimiz, halı saha rezervasyonlarını eski usul zahmetli yöntemlerden kurtararak,
                                kullanıcı dostu ve yenilikçi bir platformla buluşturdu.
                            </p>
                            <p>
                                Amacımız çok net: Futbol oynamak isteyen herkesin, zaman ve mekan fark etmeksizin birkaç tıkla halı saha
                                bulabilmesini, rezervasyon yapabilmesini ve oyun deneyimini sorunsuz bir şekilde yaşayabilmesini sağlamak.
                            </p>
                            <p>
                                Sadece oyuncular için değil, halı saha işletmecileri için de değer yaratan bir sistem sunuyoruz. Gelişmiş
                                yönetim panelimiz sayesinde saha sahipleri rezervasyonlarını daha kolay yönetiyor, doluluk oranlarını
                                artırıyor ve müşteri memnuniyetini üst seviyeye taşıyor. Platformumuz, halı saha işletmecileri için de özel çözümler sunarak, işletmelerin doluluk oranlarını
                                artırmalarına ve müşteri memnuniyetini yükseltmelerine yardımcı olmaktadır.
                            </p>
                        </div>

                        <div className="about-text">
                            <h3>Misyonumuz</h3>
                            <p>
                                Futbol severlerin hayatını kolaylaştıran, teknolojiyi spora entegre eden yenilikçi çözümler üretmek.
                                Top oynama hevesini erteleyen engelleri ortadan kaldırarak, herkesin sadece oyunun keyfine odaklanmasını
                                sağlamak. Kısacası: “Haydi sahaya!” demek hiç bu kadar kolay olmamıştı.
                            </p>

                            <h3>Vizyonumuz</h3>
                            <p>
                                Hayalimiz; Türkiye’de ve dünyanın dört bir yanında, herkesin cep telefonundan veya bilgisayarından saniyeler
                                içinde halı saha rezervasyonu yapabildiği, takım arkadaşı bulabildiği, turnuvalara katılabildiği ve futbolun
                                eğlencesini doyasıya yaşayabildiği bir dijital ekosistem kurmak.
                            </p>
                            <p>
                                Futbolu yalnızca bir spor değil, bir yaşam tarzı olarak gören herkese hitap eden, sosyal bağları güçlendiren
                                ve futbol kültürünü ileriye taşıyan bir platform olmayı hedefliyoruz.
                            </p>
                        </div>
                    </div>

                    {/* Ekip Üyeleri Kartları */}
                    <div className="info-card-list">
                        {teamMembers.map(member => (
                            <InfoCard key={member.id} profileData={member} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;