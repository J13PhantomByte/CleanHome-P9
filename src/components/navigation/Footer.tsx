import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import {
  Mail,
  Clock,
  ShieldCheck,
  Phone,
  ArrowUp,
  Sparkle,
  CalendarCheck,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${anchorId}`);
    }
  };

  return (
    <footer className="bg-[#173C32] text-[#FAF8F1] pt-16 pb-12 border-t border-[#285A43]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Purpose with Official Logo */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 text-2xl font-serif-luxury font-bold text-white focus-clean"
            >
              <img
                src="/assets/aistudio/logo_d6f115d4.png"
                alt="CleanHome Logo"
                className="w-10 h-10 object-contain brightness-110"
              />
              <span>CleanHome</span>
            </Link>
            <p className="text-sm text-[#A6C7A5] leading-relaxed">
              Platform layanan kebersihan hunian profesional Indonesia. Menghadirkan kenyamanan, higienitas optimal, dan tarif transparan dalam Rupiah untuk setiap keluarga.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#A6C7A5]">
              <ShieldCheck className="w-4 h-4 text-[#A6C7A5] shrink-0" />
              <span>Standar Kebersihan & Garansi Kepuasan</span>
            </div>
          </div>

          {/* Quick Links: Layanan & Pemesanan */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A6C7A5] mb-4">
              Layanan & Pemesanan
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('layanan')}
                  className="w-full text-left py-1.5 hover:text-white transition-colors focus-clean cursor-pointer inline-flex items-center justify-between group"
                >
                  <span>Daftar Layanan & Tarif</span>
                  <Sparkle className="w-3.5 h-3.5 text-[#A6C7A5] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('cara-kerja')}
                  className="w-full text-left py-1.5 hover:text-white transition-colors focus-clean cursor-pointer inline-flex items-center justify-between group"
                >
                  <span>Alur Pemesanan Cepat</span>
                  <CalendarCheck className="w-3.5 h-3.5 text-[#A6C7A5] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('tentang')}
                  className="w-full text-left py-1.5 hover:text-white transition-colors focus-clean cursor-pointer"
                >
                  Tentang CleanHome
                </button>
              </li>
              <li>
                <Link
                  to={user ? '/dashboard' : '/login'}
                  onClick={scrollToTop}
                  className="w-full text-left py-1.5 hover:text-white transition-colors focus-clean inline-flex items-center justify-between"
                >
                  <span>{user ? 'Dashboard Reservasi' : 'Portal Pelanggan'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A6C7A5]" />
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    to="/register"
                    onClick={scrollToTop}
                    className="w-full text-left py-1.5 hover:text-white transition-colors focus-clean text-[#A6C7A5] font-semibold"
                  >
                    Daftar Akun Baru
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A6C7A5] mb-4">
              Kebijakan & Privasi
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  to="/privacy"
                  onClick={scrollToTop}
                  className="block py-1.5 hover:text-white transition-colors focus-clean"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={scrollToTop}
                  className="block py-1.5 hover:text-white transition-colors focus-clean"
                >
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="block py-1.5 hover:text-white transition-colors focus-clean"
                >
                  Keamanan Autentikasi
                </Link>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#A6C7A5] space-y-1">
                  <p className="font-semibold text-white">Privasi Terjamin</p>
                  <p className="text-[11px] text-white/70">
                    Data reservasi dan alamat rumah Anda terenkripsi dan terlindungi penuh.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Support (Fully Clickable & Interactive) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A6C7A5] mb-4">
              Layanan Bantuan Pelanggan
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href="mailto:support@cleanhome.id"
                  className="group flex items-start gap-2.5 py-1 hover:text-white transition-colors focus-clean"
                  title="Kirim email ke Customer Support"
                >
                  <Mail className="w-4 h-4 text-[#A6C7A5] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="block font-medium text-white group-hover:underline">support@cleanhome.id</span>
                    <span className="text-[11px] text-[#A6C7A5]">Respon maksimal 2 jam kerja</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20CleanHome%2C%20saya%20ingin%20konsultasi%20pemesanan%20layanan%20kebersihan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 py-1 hover:text-white transition-colors focus-clean"
                  title="Buka obrolan WhatsApp resmi"
                >
                  <Phone className="w-4 h-4 text-[#A6C7A5] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    <span className="block font-medium text-white group-hover:underline">0812-3456-7890 (WhatsApp)</span>
                    <span className="text-[11px] text-[#A6C7A5]">Konsultasi & Penjadwalan Cepat</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 py-1 text-xs text-white/80">
                  <Clock className="w-4 h-4 text-[#A6C7A5] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white">Jam Operasional</span>
                    <span className="text-[11px] text-[#A6C7A5]">Senin sampai Minggu: 08:00 sampai 18:00 WIB</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Responsive Action */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} CleanHome Indonesia. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              onClick={scrollToTop}
              className="py-1 hover:text-white transition-colors focus-clean"
            >
              Privasi
            </Link>
            <Link
              to="/terms"
              onClick={scrollToTop}
              className="py-1 hover:text-white transition-colors focus-clean"
            >
              Ketentuan
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="py-1 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF8F1] transition-colors focus-clean inline-flex items-center gap-1.5 cursor-pointer"
              title="Kembali ke bagian atas halaman"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#A6C7A5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
