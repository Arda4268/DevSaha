// src/components/OyuncuRandevular.jsx
import React, { useState, useEffect } from 'react';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuRandevular.module.css';

const OyuncuRandevular = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);

    const [halisahaList, setHalisahaList] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredFields, setFilteredFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);

    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    const [opponentName, setOpponentName] = useState('');
    const [opponentData, setOpponentData] = useState(null);

    const [activeAppointments, setActiveAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        const slots = [];
        for (let h = 8; h <= 22; h++) {
            slots.push(`${h.toString().padStart(2, '0')}:00`);
        }
        setTimeSlots(slots);
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const username = localStorage.getItem('username');
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            };

            // Kendi takım adını al
            const uRes = await fetch(
                `http://localhost:8080/oyuncu/by-username/${username}`,
                { headers }
            );
            if (!uRes.ok) throw new Error('Kendi takım bilgisi alınamadı');
            const uData = await uRes.json();
            const myTeam = uData.takim.name;

            // Aktif randevular
            const resA = await fetch('http://localhost:8080/randevu/list/durum', {
                method: 'POST',
                headers,
                body: JSON.stringify({ durum: 'PLANLANDI' })
            });
            if (!resA.ok) throw new Error('Aktif randevular alınamadı');
            let listA = await resA.json();
            listA = listA.filter(a => a.takim1 === myTeam || a.takim2 === myTeam);
            const enrichedA = await Promise.all(
                listA.map(async a => {
                    const hData = await (
                        await fetch(
                            `http://localhost:8080/halisaha/by-username/${a.halisahaUsername}`,
                            { headers }
                        )
                    ).json();
                    const t1 = await (
                        await fetch(
                            `http://localhost:8080/takim/by-name/${encodeURIComponent(a.takim1)}`,
                            { headers }
                        )
                    ).json();
                    const t2 = await (
                        await fetch(
                            `http://localhost:8080/takim/by-name/${encodeURIComponent(a.takim2)}`,
                            { headers }
                        )
                    ).json();
                    return {
                        ...a,
                        halisahaName: hData.name,
                        team1: { id: t1.id, name: t1.name },
                        team2: { id: t2.id, name: t2.name }
                    };
                })
            );
            setActiveAppointments(enrichedA);

            // Geçmiş randevular
            const resP = await fetch('http://localhost:8080/randevu/list/durum', {
                method: 'POST',
                headers,
                body: JSON.stringify({ durum: 'TAMAMLANDI' })
            });
            if (!resP.ok) throw new Error('Geçmiş randevular alınamadı');
            let listP = await resP.json();
            listP = listP.filter(a => a.takim1 === myTeam || a.takim2 === myTeam);
            const enrichedP = await Promise.all(
                listP.map(async a => {
                    const hData = await (
                        await fetch(
                            `http://localhost:8080/halisaha/by-username/${a.halisahaUsername}`,
                            { headers }
                        )
                    ).json();
                    const t1 = await (
                        await fetch(
                            `http://localhost:8080/takim/by-name/${encodeURIComponent(a.takim1)}`,
                            { headers }
                        )
                    ).json();
                    const t2 = await (
                        await fetch(
                            `http://localhost:8080/takim/by-name/${encodeURIComponent(a.takim2)}`,
                            { headers }
                        )
                    ).json();
                    return {
                        ...a,
                        halisahaName: hData.name,
                        team1: { id: t1.id, name: t1.name },
                        team2: { id: t2.id, name: t2.name }
                    };
                })
            );
            setPastAppointments(enrichedP);
        } catch (err) {
            console.error(err);
            alert(err.message);
            setActiveAppointments([]);
            setPastAppointments([]);
        }
    };

    const switchTab = tab => {
        setActiveTab(tab);
        fetchAppointments();
    };

    const handleCancel = async id => {
        if (!window.confirm('Bu randevuyu iptal etmek istediğinize emin misiniz?')) return;
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`http://localhost:8080/randevu/${id}/durum`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ durum: 'IPTAL' })
        });
        if (!res.ok) {
            const txt = await res.text();
            alert('İptal edilemedi: ' + txt);
        } else {
            alert('Randevu iptal edildi');
            fetchAppointments();
        }
    };

    const resetModal = () => {
        setStep(1);
        setSelectedCity('');
        setFilteredFields([]);
        setSelectedField(null);
        setSelectedDate('');
        setSelectedTime('');
        setOpponentName('');
        setOpponentData(null);
    };

    const openModal = () => {
        resetModal();
        setShowModal(true);
        fetch('http://localhost:8080/halisaha/list')
            .then(res => res.json())
            .then(data => {
                setHalisahaList(data);
                setCities([...new Set(data.map(item => item.adres.split(',')[0].trim()))]);
            })
            .catch(err => alert('Halisaha listesi alınamadı: ' + err.message));
    };

    const closeModal = () => {
        resetModal();
        setShowModal(false);
    };

    const prev = () => setStep(s => Math.max(1, s - 1));
    const next = () => setStep(s => Math.min(2, s + 1));

    const handleCity = e => {
        const city = e.target.value;
        setSelectedCity(city);
        setFilteredFields(
            halisahaList.filter(f => f.adres.split(',')[0].trim() === city)
        );
    };

    const handleOpponentSearch = async () => {
        if (!opponentName.trim()) {
            alert('Lütfen rakip takım adını girin');
            return;
        }
        const token = localStorage.getItem('accessToken');
        const res = await fetch(
            `http://localhost:8080/takim/by-name/${encodeURIComponent(opponentName)}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return alert('Takım bulunamadı.');
        setOpponentData(await res.json());
    };

    const submit = async () => {
        try {
            if (!selectedField) throw new Error('Lütfen bir halı saha seçin');
            if (!selectedDate) throw new Error('Lütfen bir tarih seçin');
            if (!selectedTime) throw new Error('Lütfen bir saat seçin');
            if (!opponentData) throw new Error('Lütfen geçerli bir rakip takımı seçin');

            const token = localStorage.getItem('accessToken');
            const username = localStorage.getItem('username');
            const uRes = await fetch(
                `http://localhost:8080/oyuncu/by-username/${username}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!uRes.ok) throw new Error('Kendi takım bilgisi alınamadı');
            const uData = await uRes.json();

            const [y, m, d] = selectedDate.split('-').map(Number);
            const [hh, mm] = selectedTime.split(':').map(Number);
            const pad = v => v.toString().padStart(2, '0');
            const isoDate = `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:00`;

            const body = {
                halisahaId: selectedField.id,
                sahaId: selectedField.sahaId || selectedField.id,
                takim1Id: uData.takim.id,
                takim2Id: opponentData.id,
                tarih: isoDate
            };

            const res = await fetch('http://localhost:8080/randevu/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error('Randevu oluşturulamadı: ' + txt);
            }

            alert('Randevu başarıyla oluşturuldu');
            closeModal();
            fetchAppointments();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <OyuncuSidebar />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    {/* Header */}
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>Randevular</h1>
                        <button onClick={openModal} className={styles.btnPrimary}>
                            + Randevu Oluştur
                        </button>
                    </div>
                    {/* Sekmeler */}
                    <div className={styles.tabsContainer}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'active' ? styles.active : ''}`}
                            onClick={() => switchTab('active')}
                        >
                            Aktif Randevular
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'past' ? styles.active : ''}`}
                            onClick={() => switchTab('past')}
                        >
                            Geçmiş Randevular
                        </button>
                    </div>
                    {/* Aktif */}
                    {activeTab === 'active' && (
                        <div className={styles.appointmentsList}>
                            {activeAppointments.length === 0 && <p>Aktif randevu yok</p>}
                            {activeAppointments.map((a, i) => (
                                <div key={i} className={styles.appointmentCard}>
                                    <div className={styles.dateBox}>
                                        <span className={styles.dateDay}>{new Date(a.tarih).getDate()}</span>
                                        <span className={styles.dateMonth}>
                                            {new Date(a.tarih).toLocaleString('default', { month: 'short' })}
                                        </span>
                                        <span className={styles.dateTime}>
                                            {new Date(a.tarih).getHours().toString().padStart(2, '0')}:00
                                        </span>
                                    </div>
                                    <div className={styles.appointmentDetails}>
                                        <h3 className={styles.appointmentTitle}>{a.halisahaName}</h3>
                                        <div className={styles.teams}>
                                            <div className={styles.team}>
                                                <img
                                                    src={`/img/team-logo-${a.team1.id}.png`}
                                                    alt={a.team1.name}
                                                    className={styles.teamLogo}
                                                />
                                                <span>{a.team1.name}</span>
                                            </div>
                                            <span className={styles.vs}>–</span>
                                            <div className={styles.team}>
                                                <img
                                                    src={`/img/team-logo-${a.team2.id}.png`}
                                                    alt={a.team2.name}
                                                    className={styles.teamLogo}
                                                />
                                                <span>{a.team2.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.appointmentActions}>
                                        <button
                                            className={styles.btnCancel}
                                            onClick={() => handleCancel(a.id)}
                                        >
                                            İptal Et
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Geçmiş */}
                    {activeTab === 'past' && (
                        <div className={styles.appointmentsList}>
                            {pastAppointments.length === 0 && <p>Geçmiş randevu yok</p>}
                            {pastAppointments.map((a, i) => (
                                <div key={i} className={`${styles.appointmentCard} ${styles.past}`}>
                                    <div className={styles.dateBox}>
                                        <span className={styles.dateDay}>{new Date(a.tarih).getDate()}</span>
                                        <span className={styles.dateMonth}>
                                            {new Date(a.tarih).toLocaleString('default', { month: 'short' })}
                                        </span>
                                        <span className={styles.dateTime}>
                                            {new Date(a.tarih).getHours().toString().padStart(2, '0')}:00
                                        </span>
                                    </div>
                                    <div className={styles.appointmentDetails}>
                                        <h3 className={styles.appointmentTitle}>{a.halisahaName}</h3>
                                        <div className={styles.teams}>
                                            <div className={styles.team}>
                                                <img
                                                    src={`/img/team-logo-${a.team1.id}.png`}
                                                    alt={a.team1.name}
                                                    className={styles.teamLogo}
                                                />
                                                <span>{a.team1.name}</span>
                                            </div>
                                            <span className={styles.vs}>–</span>
                                            <div className={styles.team}>
                                                <img
                                                    src={`/img/team-logo-${a.team2.id}.png`}
                                                    alt={a.team2.name}
                                                    className={styles.teamLogo}
                                                />
                                                <span>{a.team2.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.appointmentActions}>
                                        <button className={styles.btnEvaluate}>Değerlendir</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Modal */}
                    {showModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                                {/* Modal içeriği aynı kalacak */}
                                <div className={styles.modalHeader}>
                                    <h2>Randevu Oluştur</h2>
                                    <button onClick={closeModal} className={styles.closeBtn}>
                                        ×
                                    </button>
                                </div>

                                <div className={styles.stepIndicators}>
                                    {['Saha', 'Zaman & Rakip'].map((lbl, i) => (
                                        <div
                                            key={i}
                                            className={`
                      ${styles.step}
                      ${step === i + 1 ? styles.active : ''}
                      ${step > i + 1 ? styles.completed : ''}
                    `}
                                        >
                                            <div className={styles.stepNumber}>{i + 1}</div>
                                            <div className={styles.stepLabel}>{lbl}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.modalBody}>
                                    {step === 1 && (
                                        <>
                                            <label className={styles.label}>Şehir Seçin</label>
                                            <select
                                                className={styles.select}
                                                value={selectedCity}
                                                onChange={handleCity}
                                            >
                                                <option value="">-- Şehir --</option>
                                                {cities.map(c => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className={styles.fieldsGrid}>
                                                {filteredFields.map(f => (
                                                    <div
                                                        key={f.id}
                                                        className={`
                            ${styles.fieldCard}
                            ${selectedField === f ? styles.selected : ''}
                          `}
                                                        onClick={() => setSelectedField(f)}
                                                    >
                                                        <img
                                                            src={`/img/halısaha-${f.id}.png`}
                                                            alt=""
                                                            className={styles.fieldImg}
                                                        />
                                                        <div className={styles.fieldInfoCard}>
                                                            <h3>{f.name}</h3>
                                                            <p>{f.adres}</p>
                                                        </div>
                                                        <button className={styles.selectBtn}>Seç</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && selectedField && (
                                        <>
                                            <div className={styles.selectedFieldHeader}>
                                                <img
                                                    src={`/img/halısaha-${selectedField.id}.png`}
                                                    alt=""
                                                    className={styles.fieldImgLarge}
                                                />
                                                <div className={styles.fieldInfoLarge}>
                                                    <h3>{selectedField.name}</h3>
                                                    <p>{selectedField.adres}</p>
                                                </div>
                                            </div>

                                            <label className={styles.label}>Tarih Seçin</label>
                                            <input
                                                type="date"
                                                className={styles.select}
                                                value={selectedDate}
                                                onChange={e => setSelectedDate(e.target.value)}
                                            />

                                            <label className={styles.label}>Saat Seçin</label>
                                            <div className={styles.timeGrid}>
                                                {timeSlots.map(t => (
                                                    <div
                                                        key={t}
                                                        className={`${styles.timeCell} ${selectedTime === t ? styles.selectedCell : ''
                                                            }`}
                                                        onClick={() => setSelectedTime(t)}
                                                    >
                                                        {t}
                                                    </div>
                                                ))}
                                            </div>

                                            <label className={styles.label}>Rakip Takım</label>
                                            <div className={styles.opponentSearch}>
                                                <input
                                                    type="text"
                                                    className={styles.select}
                                                    placeholder="Takım ismi"
                                                    value={opponentName}
                                                    onChange={e => setOpponentName(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className={styles.btnOutline}
                                                    onClick={handleOpponentSearch}
                                                >
                                                    Ara
                                                </button>
                                            </div>

                                            {opponentData && (
                                                <div className={styles.opponentCard}>
                                                    <img
                                                        src={`/img/team-logo-${opponentData.id}.png`}
                                                        alt=""
                                                        className={styles.opponentLogo}
                                                    />
                                                    <div className={styles.opponentInfo}>
                                                        <h4>{opponentData.name}</h4>
                                                        <p>{opponentData.sehir}</p>
                                                        <p>Galibiyet: {opponentData.galibiyet}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className={styles.modalFooter}>
                                    <button
                                        onClick={prev}
                                        disabled={step === 1}
                                        className={styles.btnOutline}
                                    >
                                        Geri
                                    </button>
                                    <button
                                        onClick={step === 1 ? next : submit}
                                        className={styles.btnPrimary}
                                    >
                                        {step === 1 ? 'İleri' : 'Kaydet'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default OyuncuRandevular;
