# Rencana implementasi Koptum

Goal: memenuhi seluruh fitur wajib dan nilai plus PDF dalam aplikasi React lokal.
Spec: design.md. Stack: React 19, Vite 5, pnpm, lucide-react, CSS global.

- [x] Data dan aset: 15 menu/8 properti + 15 JPG asli dan sumbernya.
- [x] Logika: test-first pricing (3 promo, pajak, pembulatan) dan reducer (batas stok, checkout, reset, input tidak valid).
- [x] Contexts dan hook: keranjang/stok/riwayat, favorit/komentar, notifikasi/toast, localStorage dengan penanganan error.
- [x] UI: Header, Footer, MainContent, MenuCard, StarRating, Modal, CartDrawer, HistoryModal, NotificationsModal; info dan komentar; cari/filter/sortir.
- [x] Verifikasi: pnpm test + pnpm build, browser desktop/mobile, alur komentar/favorit/promo/checkout/reset/persistensi, tidak ada dialog browser terlarang.

Review focus: stok habis/klik berulang; promo kopi pada cart campuran; data storage rusak; komentar whitespace; fokus keyboard/drawer layar kecil.
