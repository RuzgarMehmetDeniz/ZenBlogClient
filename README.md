# ZenBlog Client

ZenBlog platformunun Angular tabanlı istemci uygulaması. [ZenBlogServer](https://github.com/RuzgarMehmetDeniz/ZenBlogServer) API'si ile haberleşen, hem ziyaretçi tarafı (blog okuma, yorum yapma, iletişim) hem de yönetim paneli (içerik yönetimi) içeren tam kapsamlı bir blog istemcisidir.

## İçindekiler

- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Özellikler](#özellikler)
  
## Kullanılan Teknolojiler

- **Angular** — Modül tabanlı yapı (standalone olmayan component'ler)
- **TypeScript**
- **Bootstrap** — Arayüz bileşenleri ve grid sistemi
- **RxJS** — Asenkron veri akışı yönetimi
- **JWT tabanlı kimlik doğrulama** — HTTP Interceptor ile otomatik token ekleme

## Proje Yapısı

```
src/app/
│
├── _admincomponents/category/     → Yönetim paneli bileşenleri
│   ├── blog/
│   ├── comment/
│   ├── contact-info/
│   ├── message/
│   ├── social/
│   ├── category.html / .ts / .css
│
├── _guards/
│   └── auth-guard.ts              → Route koruması
│
├── _interceptors/
│   ├── token-interceptor.ts       → İsteklere otomatik JWT ekleme
│   └── zone-interceptor.ts
│
├── _layouts/
│   ├── admin-layout/              → Yönetim paneli düzeni
│   └── main-layout/                → Genel site düzeni
│
├── _main-components/home/         → Ziyaretçi tarafı bileşenleri
│   ├── blogdetails/
│   ├── comment-form/
│   ├── contact-main/
│   ├── login/
│   ├── send-message/
│   ├── home.html / .ts / .css
│
├── _models/                       → DTO tanımları
│   ├── blog.ts
│   ├── category.ts
│   ├── commentDto.ts
│   ├── contactInfoDto.ts
│   ├── loginDto.ts
│   ├── messageDto.ts
│   ├── result.ts
│   ├── socialDto.ts
│   ├── subCommentDto.ts
│   └── userDto.ts
│
├── _services/                      → API iletişim servisleri
│   ├── auth-service.ts
│   ├── blog-service.ts
│   ├── category-service.ts
│   ├── comment-service.ts
│   ├── contact-info-service.ts
│   ├── message-service.ts
│   ├── social-service.ts
│   ├── subcomment-service.ts
│   └── sweetalert-service.ts
│
├── app-module.ts
├── app-routing-module.ts
└── app.ts
```

## Özellikler

### Ziyaretçi Tarafı
- Ana sayfa üzerinden blog listeleme
- Blog detay sayfası (yazar bilgisi, kategori, yorumlar)
- Yorum yapma
- Kategoriye göre blog filtreleme
- İletişim formu ve harita entegrasyonu
- Giriş (login) ekranı

### Yönetim Paneli
- **Kategoriler** — Oluşturma, güncelleme, silme
- **Bloglar** — Kapak/içerik görseli, kategori ataması ile tam CRUD
- **Yorumlar** — Yorum yönetimi
- **İletişim Bilgileri** — Adres, telefon, e-posta, harita URL yönetimi
- **Mesajlar** — Okunmuş/okunmamış mesaj ayrımı ile gelen kutusu
- **Sosyal Medya** — Sosyal medya bağlantılarının yönetimi

### Teknik Detaylar
- **Route Guard** (`auth-guard.ts`) ile yetkisiz erişim engelleme
- **HTTP Interceptor** (`token-interceptor.ts`) ile her isteğe otomatik JWT token ekleme
- **Reaktif form doğrulama** — `ngForm` ile zorunlu alan kontrolü, backend validasyon hatalarının forma yansıtılması
- **SweetAlert / Alertify** entegrasyonu ile kullanıcı bildirimleri


## İlgili Proje

Bu istemcinin bağlandığı backend API için: [ZenBlogServer](https://github.com/RuzgarMehmetDeniz/ZenBlogServer)

## Proje Resimleri
# <img width="1196" height="509" alt="Home1" src="https://github.com/user-attachments/assets/fececfea-b9ca-406a-9b44-fe7ff3f97713" />
# <img width="982" height="518" alt="Home2" src="https://github.com/user-attachments/assets/532536ae-f704-447f-a17e-ebaf7ab61d53" />
# <img width="1045" height="359" alt="Home3" src="https://github.com/user-attachments/assets/1c8b922b-beda-4414-a69b-c9add56d5a7a" />
# <img width="1045" height="472" alt="Home4" src="https://github.com/user-attachments/assets/c01bd121-0e15-4e0b-ad37-8c326da34530" />
# <img width="1252" height="530" alt="Detail1" src="https://github.com/user-attachments/assets/ed2aa106-43cc-4e03-bacf-022bcbcd8ec7" />
# <img width="1079" height="494" alt="detail2" src="https://github.com/user-attachments/assets/ec1f0ed0-74bd-450a-b5d2-1af7ee69c2c9" />
# <img width="1045" height="408" alt="detail3" src="https://github.com/user-attachments/assets/1a642184-72ec-4bd6-a467-e4d8d9328d92" />
# <img width="1221" height="410" alt="detail4" src="https://github.com/user-attachments/assets/a3f24c4e-01f2-40a2-bc2b-30aec4451346" />
# <img width="1222" height="932" alt="contact1" src="https://github.com/user-attachments/assets/e1dbcbe6-4110-4b83-8e7e-c774f8494669" />
# <img width="469" height="467" alt="login" src="https://github.com/user-attachments/assets/044428e4-dc5c-4e4e-b170-a02eb38dbe69" />
# <img width="1353" height="633" alt="admincategory" src="https://github.com/user-attachments/assets/0a1e1e1d-72a3-4f7a-955d-3489e5f020d7" />
# <img width="1366" height="768" alt="adminblog" src="https://github.com/user-attachments/assets/a4a1dbd4-8dd7-4523-9486-bace61a31f52" />
# <img width="1194" height="157" alt="admincontact" src="https://github.com/user-attachments/assets/032a5e6e-653d-4622-a0d2-7d73c405e842" />
# <img width="1366" height="768" alt="adminsocial" src="https://github.com/user-attachments/assets/bacb15e2-54e4-4cc9-9856-3885bd2f6490" />
# <img width="1366" height="768" alt="adminmessage2" src="https://github.com/user-attachments/assets/cec8f3bb-0679-4b86-a662-b0be192fd4a5" />
# <img width="1366" height="768" alt="adminmessage1" src="https://github.com/user-attachments/assets/a903503d-79e7-48f4-8c1b-6d6daa9663e1" />
