import React, { useRef, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface CleanerVisualProps {
  className?: string;
}

export const CleanerVisual: React.FC<CleanerVisualProps> = ({ className = 'w-full h-full' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browser policy: Autoplay requires muted and playsInline
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      try {
        if (typeof video.play === 'function') {
          const playPromise = video.play();
          if (playPromise !== undefined && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
              video.muted = true;
              if (typeof video.play === 'function') {
                video.play().catch(() => {});
              }
            });
          }
        }
      } catch {
        // Safe suppression for headless or legacy environments
      }
    };

    playVideo();

    // Prevent low-power mode or background tab pausing from stopping the loop
    const handlePause = () => {
      try {
        if (typeof video.play === 'function') {
          video.play().catch(() => {});
        }
      } catch {
        // Safe suppression
      }
    };

    video.addEventListener('pause', handlePause);
    return () => {
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#173C32] shadow-lg select-none pointer-events-none transform-gpu ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
    >
      {/* Background Video (Continuous loop, unclickable, unpauseable, muted, responsive, hardware-accelerated) */}
      <video
        ref={videoRef}
        src="/assets/aistudio/video_d965927b.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        className="w-full h-full object-cover object-center transform-gpu will-change-transform"
      />

      {/* Protective Ambient Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#173C32]/90 via-[#173C32]/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#173C32]/30 via-transparent to-transparent pointer-events-none" />

      {/* Top Floating Live Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#173C32]/85 text-[#FAF8F1] backdrop-blur-md border border-white/20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>Aktivitas Tim Kebersihan</span>
        </span>
      </div>


      {/* Bottom Floating Info Pill */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 p-3 sm:p-3.5 rounded-xl bg-[#173C32]/85 backdrop-blur-md border border-white/15 text-[#FAF8F1] shadow-md pointer-events-none">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#285A43] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#A6C7A5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                Petugas Profesional & Terlatih
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#A6C7A5] leading-tight">
                Peralatan bersih dan cairan higienis ramah lingkungan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
