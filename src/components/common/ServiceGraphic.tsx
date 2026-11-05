import React, { useState } from 'react';

export const SERVICE_ASSET_MAP: Record<string, { image: string; badge: string }> = {
  'general-home-cleaning': {
    image: '/assets/aistudio/Pembersihan_Rumah_Standar_b062651e.jpg',
    badge: 'Pembersihan Hunian',
  },
  'deep-kitchen-cleaning': {
    image: '/assets/aistudio/Pembersihan_Dapur_Intensif_e446e6a3.jpg',
    badge: 'Dapur Intensif',
  },
  'bathroom-sanitization': {
    image: '/assets/aistudio/Sanitasi___Kerak_Kamar_Mand_eab80223.jpg',
    badge: 'Sanitasi Kamar Mandi',
  },
  'bedroom-linen-refresh': {
    image: '/assets/aistudio/Kamar_Tidur___Pergantian_Sprei_7f1894f7.jpg',
    badge: 'Kamar Tidur & Sprei',
  },
  'living-room-carpet-care': {
    image: '/assets/aistudio/Ruang_Keluarga___Perawatan_Sofa_599341be.jpg',
    badge: 'Ruang Keluarga & Sofa',
  },
  'full-move-in-deep-cleaning': {
    image: '/assets/aistudio/Deep_Cleaning_Menyeluruh_6f358856.jpg',
    badge: 'Deep Cleaning Borongan',
  },
};

interface ServiceGraphicProps {
  slug: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
}

export const ServiceGraphic: React.FC<ServiceGraphicProps> = ({
  slug,
  name,
  imageUrl,
  className = 'w-full h-48',
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const matchedConfig = SERVICE_ASSET_MAP[slug];
  const imageSrc = imageUrl || matchedConfig?.image;
  const badgeLabel = matchedConfig?.badge || 'Layanan Bersih';

  if (imageSrc && !imageFailed) {
    return (
      <div className={`relative overflow-hidden bg-[#173C32]/10 ${className}`}>
        <img
          src={imageSrc}
          alt={name}
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft protective gradient for title readability & premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#173C32]/75 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#173C32]/85 text-[#FAF8F1] backdrop-blur-xs shadow-xs border border-white/20">
            {badgeLabel}
          </span>
        </div>
      </div>
    );
  }

  // Graceful fallback pattern if image cannot be rendered
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#173C32] to-[#285A43] flex items-center justify-center p-6 ${className}`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A6C7A5_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative text-center text-white">
        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <svg className="w-7 h-7 text-[#A6C7A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="text-xs font-semibold tracking-wider text-[#A6C7A5]">{name}</span>
      </div>
    </div>
  );
};
