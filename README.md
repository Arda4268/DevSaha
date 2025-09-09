# DevSaha - Halı Saha Rezervasyon Sistemi

## Proje Tanımı
DevSaha, halı saha rezervasyonlarını, takım oluşturmayı ve oyuncu performans takibini kolaylaştıran tam yığın bir web uygulamasıdır. 

* **Backend:** Java Spring Boot, Spring Security, JWT, JPA ve Hibernate kullanılarak güvenli ve ölçeklenebilir bir RESTful API olarak geliştirilmiştir.
* **Frontend:** React, JavaScript ve Tailwind CSS kullanılarak dinamik, responsive ve kullanıcı dostu bir arayüz oluşturulmuştur.

## Özellikler
* **Halı Saha Rezervasyonu:** Kullanıcılar müsait olan halı sahaları görüntüleyebilir ve rezervasyon yapabilir.
* **Takım Yönetimi:** Oyuncular kendi takımlarını oluşturabilir veya mevcut takımlara katılabilir.
* **Oyuncu Kiralama:** Eksik oyuncusu olan takımlar için oyuncu kiralama özelliği mevcuttur.
* **Maç İstatistikleri:** Maç sonrası skor, gol ve asist gibi istatistiklerin eklenmesi.
* **Oyuncu Performansı:** Oyuncuların geçmiş performanslarının ve istatistiklerinin takibi.
* **Güvenli Kimlik Doğrulama:** JWT (JSON Web Tokens) ve Refresh Token mekanizması ile güvenli oturum yönetimi.

## Teknolojiler
**Backend (DevSaha)**
* Java 17
* Spring Boot
* Spring Security
* JWT
* JPA / Hibernate
* PostgreSQL
* Maven

**Frontend (DevSahaF)**
* React
* JavaScript
* Axios
* Tailwind CSS
* React Router

## Kurulum ve Çalıştırma
Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Backend Kurulumu
1.  **`DevSaha`** klasörüne gidin:
    ```bash
    cd DevSaha
    ```
2.  **`application.properties`** dosyasını veritabanı ayarlarınıza göre güncelleyin:
    ```properties
    # Örneğin:
    spring.datasource.url=jdbc:postgresql://localhost:5432/devsaha
    spring.datasource.username=postgres
    spring.datasource.password=your_password
    ```
3.  Projenin bağımlılıklarını indirin ve Spring Boot uygulamasını çalıştırın:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    Backend sunucusu varsayılan olarak `http://localhost:8080` adresinde çalışacaktır.

### 2. Frontend Kurulumu
1.  Yeni bir terminalde **`DevSahaF`** klasörüne gidin:
    ```bash
    cd DevSahaF
    ```
2.  Gerekli node modüllerini kurun:
    ```bash
    npm install
    ```
3.  React uygulamasını başlatın:
    ```bash
    npm start
    ```
    Frontend uygulaması varsayılan olarak `http://localhost:3000` adresinde açılacaktır.

---

## Proje Klasör Yapısı
Projeniz iki ana klasörden oluşur:

* `DevSaha/`: Spring Boot backend projesini içerir.
* `DevSahaF/`: React frontend projesini içerir.

## Katkıda Bulunma
Projeye katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.

## Lisans
Bu proje, MIT Lisansı altında yayımlanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakınız.
