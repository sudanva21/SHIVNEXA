import React from 'react';

/**
 * Official WhatsApp Icon Component
 * Uses the verified official WhatsApp branding icon provided in /whatsapp.png
 */
export default function WhatsAppIcon({ className = 'w-5 h-5', alt = 'WhatsApp' }) {
  return (
    <img
      src="/whatsapp.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      loading="eager"
      draggable={false}
    />
  );
}

