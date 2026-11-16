import React from 'react';
import WhatsAppIcon from './ui/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Direct Quick WhatsApp Inquiry"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center select-none"
    >
      <a
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-md border border-[#c4e3d0] animate-whatsapp-float active:scale-95 transition-transform cursor-pointer shadow-lg"
        href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20have%20an%20inquiry%20regarding%20industrial%20safety%20equipment."
        rel="noopener noreferrer"
        target="_blank"
        aria-label="Direct Quick WhatsApp Inquiry"
        title="Chat on WhatsApp (+91 99646 55525)"
      >
        {/* Continuous Soft Radiating Aura Rings */}
        <span
          className="absolute inset-0 rounded-full bg-[#3d6750]/20 pointer-events-none animate-whatsapp-ring-1"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full bg-[#3d6750]/15 pointer-events-none animate-whatsapp-ring-2"
          aria-hidden="true"
        />

        {/* WhatsApp Icon with Continuous Periodic Micro-Animation */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center animate-whatsapp-wiggle">
          <WhatsAppIcon className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Live Active Online Status Pill */}
        <span className="absolute top-1 right-1 flex h-3.5 w-3.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-white shadow-xs"></span>
        </span>
      </a>
    </aside>
  );
}
