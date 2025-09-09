// src/components/Dashboard/OyuncuTransfer.jsx
import React, { useState, useEffect } from 'react';
import OyuncuSidebar from './OyuncuSidebar';
import styles from './OyuncuBase.module.css';

const allPlayers = [
    {
        id: 1,
        name: 'Mehmet Demir',
        position: 'forvet',
        city: 'istanbul',
        age: 28,
        price: 150,
        stats: { Şut: 85, Pas: 70, Hız: 80 },
        rating: 4,
        reviews: 12,
        bio:
            'Hızlı ve çevik bir forvet oyuncusu. Gol atmayı seviyor ve takım oyununa önem veriyor.',
        avatar: 'pp-1'
    },
    {
        id: 2,
        name: 'Ali Yılmaz',
        position: 'kaleci',
        city: 'ankara',
        age: 32,
        price: 200,
        stats: { Refleks: 90, Pozisyon: 85, Çıkışlar: 75 },
        rating: 5,
        reviews: 18,
        bio:
            'Tecrübeli bir kaleci. Kritik kurtarışlar yapabilir ve takımı organize etmekte başarılı.',
        avatar: 'pp-2'
    },
    {
        id: 3,
        name: 'Ayşe Kaya',
        position: 'orta-saha',
        city: 'izmir',
        age: 25,
        price: 180,
        stats: { Pas: 95, Teknik: 90, Dayanıklılık: 85 },
        rating: 4.5,
        reviews: 15,
        bio:
            'Yaratıcı bir orta saha oyuncusu. Oyun kurmada ve asist yapmada başarılı.',
        avatar: 'pp-3'
    },
    {
        id: 4,
        name: 'Emre Şahin',
        position: 'defans',
        city: 'bursa',
        age: 30,
        price: 170,
        stats: { Müdahale: 88, Kafa: 92, Fizik: 85 },
        rating: 4,
        reviews: 10,
        bio:
            'Güçlü ve sağlam bir defans oyuncusu. Hava toplarında etkili ve liderlik özellikleri var.',
        avatar: 'pp-4'
    },
    {
        id: 5,
        name: 'Mustafa Öztürk',
        position: 'forvet',
        city: 'istanbul',
        age: 26,
        price: 220,
        stats: { Şut: 95, Hız: 90, Bitiricilik: 92 },
        rating: 5,
        reviews: 22,
        bio:
            'Gol krallığı yaşamış bir forvet. Ceza sahası içinde çok etkili ve soğukkanlı.',
        avatar: 'pp-5'
    },
    {
        id: 6,
        name: 'Zeynep Aydın',
        position: 'orta-saha',
        city: 'antalya',
        age: 24,
        price: 160,
        stats: { Teknik: 88, Pas: 85, Çalım: 90 },
        rating: 4,
        reviews: 14,
        bio:
            'Teknik kapasitesi yüksek bir orta saha. Çalım atma ve oyun kurma becerileri üst düzeyde.',
        avatar: 'pp-6'
    }
];

const positions = [
    { value: '', label: 'Tüm Pozisyonlar' },
    { value: 'kaleci', label: 'Kaleci' },
    { value: 'defans', label: 'Defans' },
    { value: 'orta-saha', label: 'Orta Saha' },
    { value: 'forvet', label: 'Forvet' }
];

const priceRanges = [
    { value: '', label: 'Tüm Fiyatlar' },
    { value: '0-100', label: '0₺ - 100₺' },
    { value: '100-200', label: '100₺ - 200₺' },
    { value: '200-300', label: '200₺ - 300₺' },
    { value: '300+', label: '300₺ ve üzeri' }
];

const starsFor = n => Array.from({ length: 5 }, (_, i) => i < n);

const OyuncuTransfer = () => {
    // page state
    const [filters, setFilters] = useState({
        city: '',
        position: '',
        price: '',
        rating: '',
        search: ''
    });
    const [visiblePlayers, setVisiblePlayers] = useState(allPlayers);
    const [invited, setInvited] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // modal & form step
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        age: '',
        city: '',
        phone: '',
        email: '',
        photo: null,
        experience: '',
        skills: { Şut: 0, Pas: 0, Hız: 0, Fizik: 0, Teknik: 0 },
        bio: '',
        price: '',
        availability: 'weekends',
        notes: '',
        terms: false
    });
    const [hoverSkill, setHoverSkill] = useState({});

    // apply filters
    useEffect(() => {
        const arr = allPlayers.filter(p => {
            if (filters.city && p.city !== filters.city) return false;
            if (filters.position && p.position !== filters.position) return false;
            if (filters.price) {
                if (filters.price === '300+' ? p.price < 300 : (() => {
                    const [min, max] = filters.price.split('-').map(Number);
                    return p.price < min || p.price > max;
                })()) return false;
            }
            if (filters.rating && p.rating < Number(filters.rating)) return false;
            const term = filters.search.trim().toLowerCase();
            if (term && !(p.name + p.bio).toLowerCase().includes(term)) return false;
            return true;
        });
        setVisiblePlayers(arr);
        setCurrentPage(1);
    }, [filters]);

    // pagination
    const paginated = visiblePlayers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const totalPages = Math.ceil(visiblePlayers.length / perPage);

    // handlers
    const onFilterChange = e => {
        const { id, value } = e.target;
        setFilters(f => ({ ...f, [id.replace('-filter', '')]: value }));
    };
    const onSearchChange = e =>
        setFilters(f => ({ ...f, search: e.target.value }));
    const invite = id => {
        if (window.confirm('Oyuncuyu davet etmek istediğinize emin misiniz?')) {
            setInvited(s => new Set(s).add(id));
            alert('Davet gönderildi!');
        }
    };

    const openModal = () => {
        setShowModal(true);
        setStep(1);
    };
    const closeModal = () => setShowModal(false);
    const next = () => {
        if (validateStep()) setStep(s => s + 1);
    };
    const prev = () => setStep(s => s - 1);

    function validateStep() {
        if (step === 1) {
            if (!form.name.trim()) { alert('Ad Soyad gerekli'); return false; }
            const age = Number(form.age);
            if (!age || age < 16 || age > 60) { alert('Yaş 16-60 arası olmalı'); return false; }
            if (!form.city) { alert('Şehir seçiniz'); return false; }
        }
        if (step === 2) {
            if (!form.experience) { alert('Deneyim seçiniz'); return false; }
            if (!form.bio.trim()) { alert('Biyografi gerekli'); return false; }
        }
        return true;
    }

    const onPhotoChange = e => {
        setForm(f => ({ ...f, photo: e.target.files[0] || null }));
    };
    const onSkillHover = (skill, val) =>
        setHoverSkill(h => ({ ...h, [skill]: val }));
    const onSkillLeave = skill =>
        setHoverSkill(h => ({ ...h, [skill]: undefined }));
    const onSkillClick = (skill, val) =>
        setForm(f => ({
            ...f,
            skills: { ...f.skills, [skill]: val }
        }));
    const onFormChange = e => {
        const { id, value, checked } = e.target;
        if (id === 'terms-check') setForm(f => ({ ...f, terms: checked }));
        else setForm(f => ({ ...f, [id]: value }));
    };

    const submitForm = () => {
        if (!form.price || Number(form.price) < 0) { alert('Geçerli ücret giriniz'); return; }
        if (!form.terms) { alert('Koşulları kabul edin'); return; }
        alert('Başarıyla eklendiniz!');
        closeModal();
        setForm({
            name: '', age: '', city: '', phone: '',
            email: '', photo: null, experience: '',
            skills: { Şut: 0, Pas: 0, Hız: 0, Fizik: 0, Teknik: 0 },
            bio: '', price: '', availability: 'weekends',
            notes: '', terms: false
        });
        setStep(1);
    };

    return (
        <>
            <OyuncuSidebar />

            <main className={styles.mainContent}>
                <div className={styles.container}>
                    {/* Header */}
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>Transfer Durağı</h1>
                        <button
                            id="add-yourself-btn"
                            className={styles.btnPrimary}
                            onClick={openModal}
                        >
                            <i className="fas fa-user-plus" /> Kendini Ekle
                        </button>
                    </div>

                    {/* Filters */}
                    <div className={styles.filtersSection}>
                        <div className={styles.filtersContainer}>
                            <div className={styles.filterGroup}>
                                <label>Şehir</label>
                                <select
                                    id="city-filter"
                                    className={styles.formControl}
                                    value={filters.city}
                                    onChange={onFilterChange}
                                >
                                    <option value="">Tüm Şehirler</option>
                                    <option value="istanbul">İstanbul</option>
                                    <option value="ankara">Ankara</option>
                                    <option value="izmir">İzmir</option>
                                    <option value="bursa">Bursa</option>
                                    <option value="antalya">Antalya</option>
                                    <option value="adana">Adana</option>
                                    <option value="konya">Konya</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label>Pozisyon</label>
                                <select
                                    id="position-filter"
                                    className={styles.formControl}
                                    value={filters.position}
                                    onChange={onFilterChange}
                                >
                                    {positions.map(p => (
                                        <option key={p.value} value={p.value}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label>Fiyat Aralığı</label>
                                <select
                                    id="price-filter"
                                    className={styles.formControl}
                                    value={filters.price}
                                    onChange={onFilterChange}
                                >
                                    {priceRanges.map(r => (
                                        <option key={r.value} value={r.value}>
                                            {r.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label>Puan</label>
                                <select
                                    id="rating-filter"
                                    className={styles.formControl}
                                    value={filters.rating}
                                    onChange={onFilterChange}
                                >
                                    <option value="">Tüm Puanlar</option>
                                    <option value="5">5 Yıldız</option>
                                    <option value="4">4+ Yıldız</option>
                                    <option value="3">3+ Yıldız</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchInput}>
                                <i className="fas fa-search" />
                                <input
                                    type="text"
                                    placeholder="Oyuncu ara..."
                                    className={styles.formControl}
                                    value={filters.search}
                                    onChange={onSearchChange}
                                />
                            </div>
                            <button className={styles.btnPrimary}>Ara</button>
                        </div>
                    </div>

                    {/* Players Grid */}
                    <div className={styles.playersGrid}>
                        {paginated.map(p => (
                            <div key={p.id} className={styles.playerCard}>
                                <div className={styles.playerHeader}>
                                    <div className={styles.playerAvatar}>
                                        <img
                                            src={`/img/${p.avatar}.png`}
                                            alt={p.name}
                                        />
                                    </div>
                                    <div className={styles.playerPrice}>
                                        <span className={styles.priceTag}>{p.price}₺</span>
                                        <span className={styles.pricePeriod}>/ Maç</span>
                                    </div>
                                </div>
                                <div className={styles.playerBody}>
                                    <h3 className={styles.playerName}>{p.name}</h3>
                                    <div className={styles.playerPosition}>
                                        <span
                                            className={`${styles.positionBadge} ${styles[p.position.replace('-', '')] || ''
                                                }`}
                                        >
                                            {positions.find(x => x.value === p.position)?.label ||
                                                p.position}
                                        </span>
                                    </div>
                                    <div className={styles.playerInfo}>
                                        <div className={styles.infoItem}>
                                            <i className="fas fa-map-marker-alt" />
                                            <span>
                                                {p.city.charAt(0).toUpperCase() + p.city.slice(1)}
                                            </span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <i className="fas fa-calendar" />
                                            <span>{p.age} yaş</span>
                                        </div>
                                    </div>
                                    <div className={styles.playerStats}>
                                        {Object.entries(p.stats).map(([k, v]) => (
                                            <div key={k} className={styles.statItem}>
                                                <span className={styles.statLabel}>{k}</span>
                                                <div className={styles.statBar}>
                                                    <div
                                                        className={styles.statFill}
                                                        style={{ width: `${v}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.playerRating}>
                                        <div className={styles.starRating}>
                                            {starsFor(Math.round(p.rating)).map((full, i) =>
                                                full ? (
                                                    <i key={i} className="fas fa-star" />
                                                ) : (
                                                    <i key={i} className="far fa-star" />
                                                )
                                            )}
                                        </div>
                                        <span className={styles.ratingCount}>
                                            ({p.reviews} değerlendirme)
                                        </span>
                                    </div>
                                    <p className={styles.playerBio}>{p.bio}</p>
                                </div>
                                <div className={styles.playerFooter}>
                                    <button
                                        className={`${styles.btnPrimary} ${styles.btnBlock}`}
                                        disabled={invited.has(p.id)}
                                        onClick={() => invite(p.id)}
                                    >
                                        {invited.has(p.id) ? (
                                            <>
                                                <i className="fas fa-check" /> Davet Gönderildi
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-user-plus" /> Takıma Çağır
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <button
                            className={styles.paginationBtn}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(cp => cp - 1)}
                        >
                            <i className="fas fa-chevron-left" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`${styles.paginationBtn} ${currentPage === i + 1 ? styles.active : ''
                                    }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className={styles.paginationBtn}
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(cp => cp + 1)}
                        >
                            <i className="fas fa-chevron-right" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Add Yourself Modal */}
            {showModal && (
                <div
                    id="add-yourself-modal"
                    className={`${styles.modal} ${styles.show}`}
                >
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Kendini Transfer Listesine Ekle</h2>
                            <button className={styles.closeModal} onClick={closeModal}>
                                <i className="fas fa-times" />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            {/* Step Indicators */}
                            <div className={styles.stepIndicators}>
                                <div
                                    className={`${styles.step} ${step === 1
                                        ? styles.active
                                        : step > 1
                                            ? styles.completed
                                            : ''
                                        }`}
                                >
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepLabel}>Kişisel Bilgiler</div>
                                </div>
                                <div
                                    className={`${styles.step} ${step === 2
                                        ? styles.active
                                        : step > 2
                                            ? styles.completed
                                            : ''
                                        }`}
                                >
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepLabel}>Futbol Bilgileri</div>
                                </div>
                                <div
                                    className={`${styles.step} ${step === 3 ? styles.active : ''}`}
                                >
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepLabel}>Fiyat ve Onay</div>
                                </div>
                            </div>

                            {/* Step Contents */}
                            {step === 1 && (
                                <div className={`${styles.stepContent} ${styles.active}`}>
                                    <div className={styles.formGroup}>
                                        <label>Ad Soyad</label>
                                        <input
                                            id="player-name"
                                            type="text"
                                            className={styles.formControl}
                                            value={form.name}
                                            onChange={onFormChange}
                                        />
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Yaş</label>
                                            <input
                                                id="player-age"
                                                type="number"
                                                className={styles.formControl}
                                                min="16"
                                                max="60"
                                                value={form.age}
                                                onChange={onFormChange}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Şehir</label>
                                            <select
                                                id="player-city"
                                                className={styles.formControl}
                                                value={form.city}
                                                onChange={onFormChange}
                                            >
                                                <option value="">Şehir Seçin</option>
                                                <option value="istanbul">İstanbul</option>
                                                <option value="ankara">Ankara</option>
                                                <option value="izmir">İzmir</option>
                                                <option value="bursa">Bursa</option>
                                                <option value="antalya">Antalya</option>
                                                <option value="adana">Adana</option>
                                                <option value="konya">Konya</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Telefon</label>
                                        <input
                                            id="player-phone"
                                            type="tel"
                                            className={styles.formControl}
                                            value={form.phone}
                                            onChange={onFormChange}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>E-posta</label>
                                        <input
                                            id="player-email"
                                            type="email"
                                            className={styles.formControl}
                                            value={form.email}
                                            onChange={onFormChange}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Fotoğraf</label>
                                        <div className={styles.fileUpload}>
                                            <input
                                                id="player-photo"
                                                type="file"
                                                className={styles.fileInput}
                                                accept="image/*"
                                                onChange={onPhotoChange}
                                            />
                                            <label htmlFor="player-photo" className={styles.fileLabel}>
                                                <i className="fas fa-upload" /> Fotoğraf Yükle
                                            </label>
                                            <span className={styles.fileName}>
                                                {form.photo ? form.photo.name : 'Dosya seçilmedi'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className={`${styles.stepContent} ${styles.active}`}>
                                    <div className={styles.formGroup}>
                                        <label>Pozisyon</label>
                                        <select
                                            id="player-experience"
                                            className={styles.formControl}
                                            value={form.experience}
                                            onChange={onFormChange}
                                        >
                                            <option value="">Deneyim Seçin</option>
                                            <option value="beginner">Başlangıç (0-1 yıl)</option>
                                            <option value="intermediate">Orta (1-3 yıl)</option>
                                            <option value="advanced">İleri (3-5 yıl)</option>
                                            <option value="professional">Profesyonel (5+ yıl)</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Becerilerini Değerlendir</label>
                                        <div className={styles.skillRating}>
                                            {Object.keys(form.skills).map(skill => {
                                                const sel = form.skills[skill];
                                                const hov = hoverSkill[skill];
                                                return (
                                                    <div key={skill} className={styles.skillItem}>
                                                        <span className={styles.skillName}>{skill}</span>
                                                        <div
                                                            className={styles.skillStars}
                                                            data-selected={sel}
                                                        >
                                                            {[1, 2, 3, 4, 5].map(v => (
                                                                <i
                                                                    key={v}
                                                                    className={
                                                                        (hov || sel) >= v
                                                                            ? 'fas fa-star'
                                                                            : 'far fa-star'
                                                                    }
                                                                    data-value={v}
                                                                    onMouseEnter={() => onSkillHover(skill, v)}
                                                                    onMouseLeave={() => onSkillLeave(skill)}
                                                                    onClick={() => onSkillClick(skill, v)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Kısa Biyografi</label>
                                        <textarea
                                            id="player-bio"
                                            className={styles.formControl}
                                            rows="3"
                                            value={form.bio}
                                            onChange={onFormChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className={`${styles.stepContent} ${styles.active}`}>
                                    <div className={styles.formGroup}>
                                        <label>Maç Başı Ücret (₺)</label>
                                        <input
                                            id="player-price"
                                            type="number"
                                            className={styles.formControl}
                                            min="0"
                                            step="10"
                                            value={form.price}
                                            onChange={onFormChange}
                                        />
                                        <p className={styles.textMuted}>
                                            Ortalama 100₺ - 250₺ arası.
                                        </p>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Müsaitlik Durumu</label>
                                        <select
                                            id="player-availability"
                                            className={styles.formControl}
                                            value={form.availability}
                                            onChange={onFormChange}
                                        >
                                            <option value="weekends">Hafta Sonu</option>
                                            <option value="weekdays">Hafta İçi</option>
                                            <option value="evenings">Akşam</option>
                                            <option value="anytime">Her Zaman</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Özel Notlar</label>
                                        <textarea
                                            id="player-notes"
                                            className={styles.formControl}
                                            rows="2"
                                            value={form.notes}
                                            onChange={onFormChange}
                                        />
                                    </div>
                                    <div className={styles.confirmationBox}>
                                        <h3>Onay</h3>
                                        <p>
                                            Bilgiler doğru, takım kaptanları bunlara erişebilecek.
                                        </p>
                                        <div className={styles.formCheck}>
                                            <input
                                                id="terms-check"
                                                type="checkbox"
                                                className={styles.formCheckInput}
                                                checked={form.terms}
                                                onChange={onFormChange}
                                            />
                                            <label
                                                htmlFor="terms-check"
                                                className={styles.formCheckLabel}
                                            >
                                                Koşulları kabul ediyorum
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className={styles.stepNavigation}>
                                <button
                                    id="prev-step"
                                    className={styles.btnOutline}
                                    disabled={step === 1}
                                    onClick={prev}
                                >
                                    Geri
                                </button>
                                {step < 3 ? (
                                    <button
                                        id="next-step"
                                        className={styles.btnPrimary}
                                        onClick={next}
                                    >
                                        İleri
                                    </button>
                                ) : (
                                    <button
                                        id="submit-player"
                                        className={styles.btnPrimary}
                                        onClick={submitForm}
                                    >
                                        Kaydet
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OyuncuTransfer;
