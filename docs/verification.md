# Hasil verifikasi — 15 November 2026

## Perintah

- `pnpm install --frozen-lockfile`: berhasil, lockfile konsisten, esbuild postinstall berhasil.
- `pnpm test`: **10 pengujian lulus, 0 gagal**.
- `pnpm build`: berhasil dengan Vite 5.4.21.
- `pnpm dev` dan `pnpm preview --port 4173`: berhasil melayani aplikasi lokal.

## Pengujian browser Playwright

- 15 kartu ditampilkan, seluruh 15 foto menu dan hero berhasil dimuat.
- Favorit tersimpan, ikon aktif, tab Favorit memfilter; urutan terbaru/terlama benar.
- Pencarian nama dan kondisi hasil kosong; sortir harga terendah.
- Form menolak rating kosong dan komentar whitespace; ulasan valid langsung muncul paling atas tanpa menutup popup.
- Toast tampil dalam lapisan dialog aktif, termasuk saat validasi gagal.
- UTS25: kopi Rp24.000 menghasilkan total Rp19.800 setelah diskon dan pajak.
- KOPI15 pada kopi Rp24.000 + fries Rp24.000 menghasilkan Rp48.840; HEMAT10 menghasilkan Rp47.520.
- Kode tidak valid menampilkan error; tambah/kurangi/hapus item bekerja.
- Keranjang, favorit, ulasan, stok, dan riwayat tetap ada setelah reload.
- Checkout menampilkan struk dan menyimpan riwayat; stok berkurang sesuai jumlah dibeli.
- 22 klik tambah menu dengan stok 20 menghasilkan kuantitas 20; tambah dari drawer juga tidak melewati stok. Checkout 20 menghabiskan stok dan add berikutnya ditolak.
- Daftar notifikasi memuat aksi; membuka daftar menghapus badge belum dibaca.
- Batal reset mempertahankan data; konfirmasi reset menghapus riwayat/keranjang dan memulihkan stok.
- Native dialog menghalangi fokus kontrol halaman belakang; Escape menutup popup dan fokus kembali ke tombol pemicu.
- Struk localStorage dengan `promo` berupa object ditolak, menampilkan peringatan pemulihan; aplikasi tetap berfungsi.
- Skenario isolasi menghasilkan 0 runtime error dan 0 permintaan sumber eksternal saat runtime.
- Production preview: HTTP 200, 15 kartu, promo UTS25, checkout dan struk berhasil; 0 error console/runtime.

## Responsif dan tinjauan

| Lebar viewport | Kolom menu | Overflow horizontal | Header |
| --- | --- | --- | --- |
| 320 px | 1 | Tidak ada | Sesuai viewport |
| 375 px | 1 | Tidak ada | Sesuai viewport |
| 768 px | 2 | Tidak ada | Sesuai viewport |
| 1024 px | 4 | Tidak ada | Sesuai viewport |
| 1440 px | 4 | Tidak ada | Sesuai viewport |

Screenshot desktop, ponsel, drawer, dan struk disimpan lokal dalam `test-results/` (tidak disertakan dalam ZIP sumber). Teks deskripsi kartu pada ponsel 13 px, kontrol utama memiliki target sentuh besar. Drawer ponsel sesuai lebar viewport. Skenario tambahan dijalankan dengan reduced motion.

Review kode independen memeriksa stok, promo campuran, persistensi, dan layout. Temuan validasi pricing tersimpan dan keterbacaan ponsel telah diperbaiki. Regresi validasi storage memiliki pengujian yang terlebih dahulu gagal lalu lulus setelah perbaikan.

## Batas verifikasi

Pengujian ini dilakukan pada browser lokal/emulasi ukuran layar, bukan perangkat fisik atau server produksi. Pembayaran memang simulasi; pengiriman uang, backend, sinkronisasi antarperangkat, serta hosting tidak termasuk lingkup tugas PDF. Data lokal pengujian pada preview utama dibersihkan sebelum penyerahan.
