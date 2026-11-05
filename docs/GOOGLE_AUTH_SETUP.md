# Panduan Konfigurasi Google Authentication — CleanHome

Dokumentasi resmi ini menjelaskan langkah demi langkah integrasi Google Login menggunakan Supabase Auth dan Google Cloud Console untuk CleanHome.

---

## 1. Langkah di Google Cloud Console

### A. Buat atau Pilih Proyek
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat proyek baru atau pilih proyek yang sudah ada (misalnya `cleanhome-production`).

### B. Konfigurasi Layar Persetujuan OAuth (OAuth Consent Screen)
1. Buka menu **APIs & Services** > **OAuth consent screen**.
2. Pilih User Type **External**, lalu klik **Create**.
3. Isi informasi aplikasi:
   - **App name**: `CleanHome`
   - **User support email**: Email admin/pengembang Anda.
   - **App logo**: Unggah logo CleanHome (opsional).
   - **Authorized domains**: Tambahkan domain Supabase Anda (misalnya `supabase.co`).
   - **Developer contact information**: Masukkan alamat email Anda.
4. Klik **Save and Continue**.
5. Pada tab **Scopes**, klik **Add or Remove Scopes**, lalu pilih:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
6. Klik **Save and Continue** hingga selesai.
7. Di halaman ringkasan, jika masih dalam status "Testing", tambahkan email akun Google penguji di bagian **Test users**.

### C. Buat Kredensial OAuth 2.0 (Client ID & Client Secret)
1. Buka menu **APIs & Services** > **Credentials**.
2. Klik **Create Credentials** > pilih **OAuth client ID**.
3. Pilih Application type: **Web application**.
4. Beri nama: `CleanHome Web Client`.
5. Pada bagian **Authorized JavaScript origins**, tambahkan:
   - `http://localhost:3000` (lingkungan pengujian lokal)
   - URL domain produksi aplikasi Anda (misal: `https://cleanhome.id` atau URL Cloud Run).
6. Pada bagian **Authorized redirect URIs**, tambahkan:
   - `https://<REF_PROYEK_SUPABASE>.supabase.co/auth/v1/callback`
   *(Ganti `<REF_PROYEK_SUPABASE>` dengan ID referensi proyek Supabase Anda).*
7. Klik **Create**.
8. Salin nilai **Client ID** dan **Client Secret** yang muncul pada pop-up modal.

---

## 2. Langkah di Supabase Dashboard

### A. Aktifkan Penyedia Google
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan pilih proyek Anda.
2. Masuk ke menu navigasi kiri: **Authentication** > **Providers**.
3. Cari **Google** dalam daftar penyedia identitas, lalu klik untuk membukanya.
4. Ubah switch menjadi **Enable Google provider: ON**.
5. Masukkan kredensial yang didapat dari Google Cloud Console:
   - **Client ID**: Tempel Client ID Anda.
   - **Client Secret**: Tempel Client Secret Anda.
6. Klik tombol **Save**.

### B. Konfigurasi URL Redirect & Site URL
1. Di panel **Authentication**, buka submenu **URL Configuration**.
2. Di bagian **Site URL**, masukkan:
   - `http://localhost:3000` (atau URL aplikasi produksi Anda).
3. Di bagian **Redirect URLs**, tambahkan:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/**`
   - URL aplikasi hosting/Cloud Run Anda dengan pola `https://domain-anda/dashboard`.
4. Klik **Save**.

---

## 3. Konfigurasi Environment Variable di CleanHome

Pastikan file konfigurasi `.env` atau `.env.local` memiliki kredensial publik Supabase yang valid:

```bash
VITE_SUPABASE_URL="https://<ref-proyek>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOi..."
```

> **Catatan Keamanan:**
> - Hanya `VITE_SUPABASE_URL` dan `VITE_SUPABASE_PUBLISHABLE_KEY` (anon public key) yang boleh ada di frontend.
> - **Jangan pernah** memasukkan Google Client Secret atau Supabase `SERVICE_ROLE_KEY` ke dalam variabel lingkungan sisi klien.

---

## 4. Alur Kerja Teknis (Flow Diagram)

1. Pengguna membuka halaman `/login` atau `/register` CleanHome.
2. Pengguna mengklik tombol **Lanjutkan dengan Google**.
3. CleanHome memanggil `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: ... } })`.
4. Browser dialihkan ke server Google OAuth untuk otorisasi akun pengguna.
5. Setelah disetujui, Google mengalihkan ke `https://<ref>.supabase.co/auth/v1/callback`.
6. Supabase memvalidasi token, membuat baris baru di tabel `auth.users`, lalu memicu trigger database PostgreSQL `handle_new_user()` untuk membuat entri profil pelanggan di tabel `public.profiles`.
7. Supabase mengalihkan browser kembali ke `http://localhost:3000/dashboard` dengan sesi terotentikasi.
8. `AuthContext` mendeteksi perubahan sesi melalui `onAuthStateChange`, mengunduh profil, dan menampilkan antarmuka Customer Dashboard CleanHome.

---

## 5. Pemecahan Masalah (Troubleshooting)

- **Error: `redirect_uri_mismatch`**:
  Pastikan URI callback di Google Cloud Console persis sama dengan:
  `https://<project-ref>.supabase.co/auth/v1/callback` tanpa trailing slash tambahan.

- **Error: `access_denied` atau akun tidak bisa login**:
  Jika status aplikasi Google Cloud masih "Testing", pastikan email Google yang digunakan sudah dimasukkan ke daftar **Test users** di layar OAuth Consent Screen.

- **Tampilan Evaluasi Lokal**:
  Jika kredensial Supabase belum diisi, CleanHome secara otomatis mengaktifkan mode demonstrasi dan evaluasi interaktif sehingga tim penguji dapat mengevaluasi seluruh antarmuka dan alur navigasi tanpa hambatan jaringan.
