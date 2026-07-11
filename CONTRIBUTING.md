# Panduan Kontribusi (Contributing Guide)

Terima kasih telah tertarik untuk berkontribusi di **ReactAja**! Proyek ini bertujuan untuk menyediakan komponen UI dan animasi berkualitas tinggi untuk React yang siap disalin dan ditempel langsung ke proyek mana pun.

Ikuti panduan langkah demi langkah di bawah ini untuk memulai berkontribusi.

---

## 1. Persiapan Awal (Getting Started)

### Langkah 1: Fork Repositori
Lakukan fork pada repositori ini ke akun GitHub Anda dengan menekan tombol **Fork** di pojok kanan atas halaman GitHub utama.

### Langkah 2: Clone ke Lokal
Buka terminal Anda dan lakukan clone repositori hasil fork tersebut ke komputer Anda:
```bash
git clone https://github.com/USERNAME/reactaja.git
cd reactaja
```
*(Ganti `USERNAME` dengan nama pengguna GitHub Anda)*

### Langkah 3: Setup Lingkungan Pengembangan

Anda bisa menjalankan server pengembangan dengan salah satu dari dua cara berikut:

#### Opsi A: Menggunakan Docker (Direkomendasikan)
Jika Anda memiliki Docker terinstal, cukup jalankan perintah berikut untuk mengunduh dependencies dan menyalakan server secara otomatis:
```bash
docker compose up
```
Website pengembangan akan langsung berjalan di alamat [http://localhost:5173](http://localhost:5173).

#### Opsi B: Menggunakan Node.js Lokal
Jika ingin menjalankan langsung tanpa Docker, pastikan Node.js terinstal, kemudian jalankan:
```bash
npm install
npm run dev
```

---

## 2. Alur Git (Git Workflow)

1. Buat branch baru dari branch `main` sebelum mulai menulis kode. Gunakan nama branch yang deskriptif dan terstruktur:
   ```bash
   git checkout -b feat/nama-komponen
   # atau untuk perbaikan bug
   git checkout -b fix/nama-bug
   ```
2. Selalu tulis pesan commit secara jelas dan deskriptif. Disarankan menggunakan format *Conventional Commits*:
   - `feat(components): tambah komponen modern button`
   - `fix(docs): perbaiki typo di halaman instalasi`

---

## 3. Aturan Pembuatan Komponen & Animasi

Semua komponen baru harus diletakkan di direktori yang sesuai di bawah `src/components/ui/`:

- **Komponen UI Statis / Interaktif**: Letakkan di `src/components/ui/components/`
- **Komponen Animasi**: Letakkan di `src/components/ui/animations/`

### Ketentuan Kode Komponen:
- Gunakan React fungsional modern dengan Hooks (functional components).
- Kode harus bersih, modular, dan memiliki props yang mudah disesuaikan.
- Jika komponen menggunakan dependensi tambahan (seperti `framer-motion` atau `lucide-react`), pastikan dependensi tersebut sudah terdaftar di `package.json`.

---

## 4. Menambahkan Halaman Dokumentasi

Agar komponen baru Anda muncul di sidebar website dokumentasi, Anda harus mendaftarkannya:

### Langkah 1: Buat Data Dokumentasi
Buka folder `src/data/docs/`:
- Jika berupa komponen biasa, edit file `src/data/docs/componentsData.jsx`.
- Jika berupa animasi, edit file `src/data/docs/animationsData.jsx`.

Tambahkan entri data baru untuk komponen Anda dengan format objek seperti berikut:

```javascript
export const componentsDocs = {
  // ... entri yang sudah ada
  "nama-komponen": {
    id: "nama-komponen",
    title: "Nama Komponen",
    description: "Deskripsi singkat fungsi komponen Anda.",
    category: "UI Components",
    dependencies: [
      { name: "lucide-react", url: "https://lucide.dev" }
    ],
    // Tulis spesifikasi prop yang didukung untuk ditampilkan di tabel
    props: [
      { name: "text", type: "string", default: '"Click Me"', desc: "Teks tombol" },
      { name: "onClick", type: "function", default: "undefined", desc: "Event handler klik" }
    ],
    // Sediakan versi kode JS/TS serta CSS/Tailwind
    code: {
      js: {
        css: `// Kode komponen React (JavaScript) menggunakan CSS Stylesheet`,
        tailwind: `// Kode komponen React (JavaScript) menggunakan Tailwind CSS`
      },
      ts: {
        css: `// Kode komponen React (TypeScript) menggunakan CSS Stylesheet`,
        tailwind: `// Kode komponen React (TypeScript) menggunakan Tailwind CSS`
      }
    },
    // Jika menggunakan Opsi CSS, cantumkan source CSS stylesheet-nya di sini
    css: `.button-custom-style { ... }`
  }
};
```

### Langkah 2: Daftarkan di Sidebar
Buka file `src/data/docsData.jsx`. Daftarkan id komponen Anda ke dalam array `docsCategories` pada kategori yang sesuai agar link-nya otomatis muncul di bilah navigasi kiri:

```javascript
export const docsCategories = [
  // ...
  {
    title: "UI Components",
    id: "ui-components",
    items: [
      // ...
      { id: "nama-komponen", name: "Nama Komponen Baru" } // Daftarkan di sini
    ]
  }
];
```

---

## 5. Uji Coba & Verifikasi

Sebelum mengirimkan kontribusi Anda, pastikan:

1. Server pengembangan berjalan lancar tanpa error di console browser.
2. Build produksi dapat dikompilasi dengan sukses:
   ```bash
   npm run build
   ```

---

## 6. Mengirim Pull Request (PR)

1. Push branch fitur Anda ke repositori fork Anda di GitHub:
   ```bash
   git push origin feat/nama-komponen
   ```
2. Buka repositori asli **ReactAja** di GitHub. Anda akan melihat tombol pop-up **Compare & pull request**.
3. Buat Pull Request baru dengan menjelaskan:
   - Apa yang dilakukan oleh komponen tersebut.
   - Mengapa komponen ini berguna bagi pengguna ReactAja.
   - Lampirkan screenshot atau GIF dari komponen jika memungkinkan.
4. Tim kami akan meninjau kode Anda dan memberikan umpan balik sebelum menggabungkannya (merge) ke branch utama.
