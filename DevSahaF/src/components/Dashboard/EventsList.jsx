// src/components/Dashboard/EventsList.jsx
import React from 'react';
import './Halisaha.css';

const eventsData = [
    {
        day: '20', month: 'May',
        title: 'Mahalle Turnuvası Final Maçı',
        description: 'Yıldızlar FC vs Kartallar Spor',
        time: '19:00', place: 'Saha 1',
    },
    {
        day: '25', month: 'May',
        title: 'Çocuklar İçin Futbol Şenliği',
        description: '7-12 yaş arası çocuklar için futbol etkinliği',
        time: '10:00 - 14:00', place: 'Tüm Sahalar',
    },
    {
        day: '1', month: 'Haz',
        title: 'Yaz Ligi Açılış Töreni',
        description: 'Tüm takımların katılımıyla açılış maçı ve kokteyl',
        time: '18:00', place: 'Ana Saha',
    },
];

const EventsList = () => (
    <div className="etkinlik-list">
        {eventsData.map((e, idx) => (
            <div key={idx} className="etkinlik-item">
                <div className="etkinlik-tarih">
                    <span className="gun">{e.day}</span>
                    <span className="ay">{e.month}</span>
                </div>
                <div className="etkinlik-detay">
                    <h4 className="etkinlik-baslik">{e.title}</h4>
                    <p className="etkinlik-aciklama">{e.description}</p>
                    <div className="etkinlik-bilgi">
                        <span className="etkinlik-saat">{e.time}</span>
                        <span className="etkinlik-yer">{e.place}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default EventsList;