import { ArrowUpRight, Coffee } from "lucide-react";
export default function Footer({ onAbout }) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <a className="wordmark" href="#">
            koptum<span>®</span>
          </a>
          <p>
            Kopi yang baik. Teman yang asyik.
            <br />
            Cerita yang nggak ada habisnya.
          </p>
        </div>
        <div className="footer-note">
          <Coffee size={24} />
          <span>
            Dibuat untuk dinikmati,
            <br />
            lebih seru kalau berbagi.
          </span>
        </div>
        <button className="text-link" onClick={onAbout}>
          Kenalan dengan Koptum <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Koptum. Kopi, teman, dan cerita.</span>
        <span>Proyek UTS React Fundamental · Alif Rifky Pratama</span>
      </div>
    </footer>
  );
}
