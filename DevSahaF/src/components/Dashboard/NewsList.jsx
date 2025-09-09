// src/components/Dashboard/NewsList.jsx
import React from 'react';
import './Halisaha.css';

const newsData = [
    {
        date: '14 Mayıs 2025',
        title: 'Yeni Suni Çim Uygulaması Tamamlandı',
        summary: 'Halısahamızın 1 numaralı sahasındaki suni çim yenileme çalışmaları tamamlandı. Yeni nesil çim teknolojisi ile daha konforlu bir oyun deneyimi sunuyoruz.',
    },
    {
        date: '10 Mayıs 2025',
        title: 'Yaz Ligi Kayıtları Başladı',
        summary: 'Geleneksel yaz ligi için takım kayıtları başladı. Bu yıl toplam 16 takım ile gerçekleşecek turnuvada ödül havuzu geçen yıla göre iki katına çıkarıldı.',
    },
    {
        date: '5 Mayıs 2025',
        title: 'Mobil Uygulamamız Yayında',
        summary: 'Halısaha rezervasyonlarını kolaylaştırmak için geliştirdiğimiz mobil uygulamamız artık kullanıma hazır. Uygulama ile anlık saha durumunu görebilir ve rezervasyon yapabilirsiniz.',
    },
    {
        date: '1 Mayıs 2025',
        title: 'Duş ve Soyunma Odaları Yenilendi',
        summary: 'Tesisimizin duş ve soyunma odaları tamamen yenilendi. Yeni dolap sistemi ve geliştirilmiş sıcak su kapasitesi ile daha konforlu bir deneyim sunuyoruz.',
    },
];

const NewsList = () => (
    <div className="haber-list">
        {newsData.map((item, idx) => (
            <div key={idx} className="haber-item">
                <div className="haber-tarih">{item.date}</div>
                <h4 className="haber-baslik">{item.title}</h4>
                <p className="haber-ozet">{item.summary}</p>
                <a href="#" className="haber-link">Detaylar</a>
            </div>
        ))}
    </div>
);

export default NewsList;