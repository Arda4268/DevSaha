// Info.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Sections.css'; // Ortak section stilleri

// AccordionItem bileşeni
const AccordionItem = ({ title, content, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div className="accordion-item">
            <div className="accordion-header">
                <button className={`accordion-button ${isOpen ? 'active' : ''}`} onClick={onClick}>
                    {title}
                </button>
            </div>
            <div
                ref={contentRef}
                style={{ maxHeight: `${height}` }}
                className={`accordion-content ${isOpen ? 'active' : ''}`}
            >
                {content}
            </div>
        </div>
    );
};

// SSS Verileri
const faqData = [
    { id: 1, title: "Halı Saha Otomasyonu nedir?", content: "Halı Saha Otomasyonu, halı saha rezervasyonlarını kolaylaştıran, takım ve oyuncu bulmanızı sağlayan, halı sahaları listeleyip karşılaştırmanıza olanak tanıyan bir dijital platformdur." },
    { id: 2, title: "Nasıl rezervasyon yapabilirim?", content: "Sisteme üye olduktan sonra, istediğiniz şehir ve semtteki halı sahaları görüntüleyebilir, müsait saatleri kontrol edebilir ve online ödeme yaparak rezervasyonunuzu tamamlayabilirsiniz." },
    { id: 3, title: "Takım oluşturmak için ne yapmalıyım?", content: "Profilinizden 'Takım Oluştur' seçeneğine tıklayarak takımınızı oluşturabilir, arkadaşlarınızı davet edebilir veya sistemde kayıtlı oyuncuları takımınıza ekleyebilirsiniz." },
    { id: 4, title: "Maç sonuçlarını nasıl kaydedebilirim?", content: "Rezervasyon yaptığınız maç tamamlandıktan sonra, 'Maçlarım' bölümünden ilgili maçı seçerek sonucu girebilir, gol atanları ve asist yapanları kaydedebilirsiniz." },
    { id: 5, title: "Halı saha işletmecisiyim, nasıl kayıt olabilirim?", content: "İşletme kayıt formunu doldurarak sistemimize başvurabilirsiniz. Ekibimiz başvurunuzu inceleyip en kısa sürede sizinle iletişime geçecektir." },
];

function Info() {
    const [openAccordionId, setOpenAccordionId] = useState(null);

    const handleAccordionClick = (id) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };

    return (
        <section id="nedir" className="section">
            <div className="section-header">
                <h2>Nedir?</h2>
                <p>Halı Saha Otomasyonu hakkında sık sorulan sorular</p>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>Halı Saha Otomasyonu Nasıl Çalışır?</h3>
                    <p>Platformumuzun sunduğu hizmetler ve kullanım şekli hakkında bilgiler</p>
                </div>
                <div className="card-content">
                    <div className="accordion">
                        {faqData.map(item => (
                            <AccordionItem
                                key={item.id}
                                title={item.title}
                                content={item.content}
                                isOpen={openAccordionId === item.id}
                                onClick={() => handleAccordionClick(item.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;