import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { Menu, X, ArrowRight, UserCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAnchorClick = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${anchorId}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F1]/95 backdrop-blur-md border-b border-[#285A43]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark with User Uploaded Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-2xl font-serif-luxury font-bold tracking-tight text-[#173C32] whitespace-nowrap shrink-0 focus-clean"
          >
            <img
              src="/assets/aistudio/logo_d6f115d4.png"
              alt="CleanHome Logo"
              className="w-10 h-10 object-contain drop-shadow-xs"
            />
            <span>CleanHome</span>
          </Link>

          {/* Zone 2: Navigation Links (Indonesian Language) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#24332A]">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#285A43] transition-colors whitespace-nowrap shrink-0 focus-clean"
            >
              Beranda
            </Link>
            <button
              type="button"
              onClick={() => handleAnchorClick('layanan')}
              className="hover:text-[#285A43] transition-colors whitespace-nowrap shrink-0 focus-clean cursor-pointer"
            >
              Layanan & Tarif
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('cara-kerja')}
              className="hover:text-[#285A43] transition-colors whitespace-nowrap shrink-0 focus-clean cursor-pointer"
            >
              Cara Pemesanan
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('tentang')}
              className="hover:text-[#285A43] transition-colors whitespace-nowrap shrink-0 focus-clean cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('kontak')}
              className="hover:text-[#285A43] transition-colors whitespace-nowrap shrink-0 focus-clean cursor-pointer"
            >
              Bantuan
            </button>
          </nav>

          {/* Zone 3: Primary Action (Desktop lg+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#285A43] hover:bg-[#173C32] rounded-xl transition-all shadow-sm focus-clean whitespace-nowrap shrink-0 cursor-pointer"
              >
                <UserCircle className="w-4 h-4 text-[#A6C7A5]" />
                <span>{profile?.full_name?.split(' ')[0] || 'Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#24332A] hover:text-[#285A43] transition-colors focus-clean whitespace-nowrap shrink-0"
                >
                  Masuk Akun
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#285A43] hover:bg-[#173C32] rounded-xl transition-all shadow-sm focus-clean whitespace-nowrap shrink-0"
                >
                  Daftar Sekarang
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Header Right: Quick Action + Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {!user ? (
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#285A43] bg-white border border-[#285A43]/20 rounded-lg hover:bg-[#FAF8F1] transition-colors"
              >
                Masuk
              </Link>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#285A43] rounded-lg"
              >
                Dashboard
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#24332A] hover:bg-[#A6C7A5]/20 focus-clean cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#285A43]/10 bg-[#FAF8F1] px-4 sm:px-6 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5 text-base font-medium text-[#24332A]">
            <Link
              to="/"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/80 active:bg-[#285A43]/10 text-left transition-colors"
            >
              Beranda
            </Link>
            <button
              type="button"
              onClick={() => handleAnchorClick('layanan')}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/80 active:bg-[#285A43]/10 text-left transition-colors cursor-pointer"
            >
              Layanan & Tarif
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('cara-kerja')}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/80 active:bg-[#285A43]/10 text-left transition-colors cursor-pointer"
            >
              Cara Pemesanan
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('tentang')}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/80 active:bg-[#285A43]/10 text-left transition-colors cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              type="button"
              onClick={() => handleAnchorClick('kontak')}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/80 active:bg-[#285A43]/10 text-left transition-colors cursor-pointer"
            >
              Bantuan
            </button>
          </nav>

          <div className="pt-4 border-t border-[#285A43]/10 flex flex-col gap-2.5">
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-semibold text-white bg-[#285A43] rounded-xl"
              >
                Masuk ke Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-medium text-[#24332A] border border-[#285A43]/20 rounded-xl bg-white"
                >
                  Masuk Akun
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#285A43] rounded-xl shadow-sm"
                >
                  Daftar Sekarang
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
