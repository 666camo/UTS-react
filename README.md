# Koptum — kopi, teman, dan cerita

Proyek **uts-alif** untuk UTS React Fundamental 2026, berdasarkan seluruh ketentuan `Ketentuan_UTS_KopiKu.pdf`. Brand antarmuka: **Koptum**.

## Menjalankan

Gunakan Node.js 20.19+ atau 22+ dan pnpm. Dari folder proyek:

```powershell
cd "D:\react\UTS react\uts-alif"
pnpm install
pnpm dev
```

Buka alamat localhost yang ditampilkan Vite (biasanya http://127.0.0.1:5173).

```powershell
pnpm test
pnpm build
pnpm preview
```

`pnpm test` menggunakan test runner bawaan Node.js, tanpa framework pengujian tambahan. `pnpm-lock.yaml` disertakan agar versi dependensi konsisten. React 19.2.0, Vite 5.4.21, dan ikon lucide-react. Tidak memakai Bootstrap.

## Fitur dan pemetaan ketentuan

| Ketentuan                   | Implementasi                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| Header, Footer, MainContent | `src/components/`, seluruhnya komponen fungsional                                                 |
| 15 data menu, 8 properti    | `src/data/menu.js`, disalurkan ke `MenuCard` melalui props                                        |
| 15 foto asli lokal          | `public/images/`, JPG berbeda untuk tiap menu                                                     |
| Cari nama                   | Input di Header; pintasan `/` pada desktop                                                        |
| Kategori + jumlah           | Semua, Kopi, Non-Kopi, Makanan, Snack, Favorit                                                    |
| Info                        | Popup foto, nama, kategori, harga, stok, rating, deskripsi, ulasan                                |
| Favorit                     | Hati merah, tab Favorit, waktu penambahan disimpan                                                |
| Sortir                      | Rekomendasi, harga naik/turun, rating, nama; terbaru/terlama di Favorit                           |
| Komentar                    | Rating 1–5; teks minimal 5 karakter setelah trim; terbaru di atas; modal tetap terbuka            |
| Toast dan notifikasi        | Aksi bisnis tercatat, badge belum dibaca; membuka daftar menandai telah dibaca                    |
| Keranjang                   | Drawer, kuantitas, hapus, batas stok, promo, pajak, struk                                         |
| Riwayat                     | Pesanan dibayar, total kumulatif, buka kembali struk                                              |
| Reset                       | Konfirmasi popup; pulihkan stok, hapus riwayat dan keranjang                                      |
| localStorage                | Custom hook `useLocalStorage`, validasi data rusak dan pesan kegagalan penyimpanan                |
| Context + reducer           | CartContext dengan useReducer; ToastContext; NotificationContext                                  |
| CSS dan ikon                | Seluruh styling di `src/index.css`; ikon lucide-react                                             |
| Responsif dan aksesibilitas | Grid desktop/tablet/ponsel, native dialog dengan Escape/focus trap, label kontrol, reduced motion |

## Aturan transaksi

- Stok berkurang **saat pembayaran simulasi berhasil**. Add/kuantitas dibatasi stok tersisa.
- **UTS25:** 25% seluruh subtotal; **HEMAT10:** 10% seluruh subtotal; **KOPI15:** 15% subtotal kategori Kopi.
- Satu kode per transaksi, tanpa minimum belanja atau batas nominal. Besaran/kondisi ini merupakan keputusan implementasi karena PDF hanya menyebut nama kode.
- Pajak = 10% dari subtotal setelah diskon. Diskon dan pajak dibulatkan ke Rupiah.
- Contoh: kopi Rp24.000 + UTS25 → diskon Rp6.000 + pajak Rp1.800 → total **Rp19.800**.
- Rating awal berasal dari data menu. Setelah ada ulasan pengguna, rating menampilkan rata-rata ulasan yang masuk.
- Favorit, ulasan, keranjang, stok terjual, riwayat dan notifikasi tersimpan di browser perangkat ini. Reset stok/riwayat mempertahankan favorit dan ulasan. Data browser yang sengaja dihapus tidak dapat dipulihkan.
- Pembayaran adalah **simulasi UTS**; tidak ada backend, payment gateway, atau penagihan uang.

## Struktur

```text
public/images/               15 foto JPG
public/fonts/                Manrope + lisensi OFL
src/components/              Header, Footer, MainContent, MenuCard,
                             Modal, InfoModal, ReviewModal, StarRating,
                             CartDrawer, Receipt, HistoryModal, NotificationsModal
src/context/                 CartContext, cartReducer, ToastContext, NotificationContext
src/hooks/useLocalStorage.js
src/data/menu.js
src/utils/                   pricing.js, storage.js
src/index.css
src/App.jsx
src/main.jsx
tests/                       pricing, stok/transaksi, validasi storage, foto lokal
docs/                        desain, rencana, sumber gambar, hasil verifikasi
```

## Sumber aset

Daftar URL unduhan untuk setiap foto: [`docs/image-sources.json`](docs/image-sources.json). Foto dari Unsplash dan Wikimedia Commons disalin lokal; aplikasi tidak mengunduh foto atau data menu dari API eksternal saat runtime. Foto merupakan ilustrasi menu proyek, bukan dokumentasi produk bisnis nyata.

French Fries: [StockSnap melalui Wikimedia Commons](https://commons.wikimedia.org/wiki/File:French_Fries.JPG), CC0. Foto lainnya melalui [Unsplash](https://unsplash.com/license), lihat URL masing-masing pada daftar sumber. Font [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), SIL Open Font License, salinan lisensi ada di `public/fonts/OFL.txt`.

Script `scripts/download-images.py` hanya untuk mereproduksi aset saat pengembangan (Python + Pillow); tidak diperlukan untuk menjalankan aplikasi karena semua aset sudah disertakan.
