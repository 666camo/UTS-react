# Koptum — keputusan implementasi

Sumber persyaratan: Ketentuan_UTS_KopiKu.pdf, seluruh 3 halaman. Pengguna meminta proyek sesuai ketentuan dengan brand Koptum. Folder dan package: uts-alif. Proyek lokal untuk UTS, tidak memerlukan hosting atau backend.

React 19 + Vite 5 + pnpm. Seluruh ikon Lucide, seluruh CSS src/index.css. Header, Footer, MainContent terpisah; kartu menerima props. 15 objek menu, 8 properti wajib, foto asli JPG lokal public/images dan dokumentasi sumber foto. Tanpa API menu saat runtime.

Desain pilihan implementer: editorial kafe, krem hangat, hijau hutan, serif pada judul dan sans-serif pada kontrol. Hero foto besar, banner promo, kategori beserta jumlah item, grid kartu responsif 4/2/1 kolom. Drawer keranjang dan modal aksesibel menggunakan dialog native; bukan alert/prompt/confirm.

Favorit memakai waktu penambahan untuk sortir terbaru/terlama. Komentar minimal 5 karakter setelah trim, rating 1–5, terbaru paling atas, form tetap terbuka. Rating awal dari data dan rata-rata setelah komentar. Semua aksi bisnis menghasilkan toast serta notifikasi belum dibaca. Filter/sortir/pencarian juga memberi toast. Data lokal dipersistenkan dengan useLocalStorage; error storage diberi feedback.

CartContext menggunakan useReducer + Context. Stok berkurang setelah pembayaran simulasi, bukan saat add. Kuantitas tidak melebihi stok tersisa. Promo tidak ditumpuk: UTS25 25% subtotal, HEMAT10 10% subtotal, KOPI15 15% subtotal kategori Kopi. PDF tidak menentukan besaran/kondisi, sehingga ini keputusan implementer. Pajak 10% setelah diskon, dibulatkan Rupiah. Checkout mengosongkan keranjang, menyimpan snapshot struk/riwayat, dan mengurangi stok atomik. Reset memulihkan stok + menghapus riwayat/keranjang dengan modal konfirmasi. Tidak ada pembayaran nyata.

Alternatif: satu App besar lebih singkat tetapi tidak memenuhi struktur acuan; backend tidak diperlukan untuk tugas yang menyimpan data lokal. Dipilih komponen dan contexts sesuai struktur PDF.
