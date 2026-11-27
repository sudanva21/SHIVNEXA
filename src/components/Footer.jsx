import React from 'react';
import { WordmarkRevealFooter } from './ui/wordmark-reveal-footer';
import WhatsAppIcon from './ui/WhatsAppIcon';

export default function Footer({ navigateTo }) {
  const brandMark = (
    <img
      src="/shivnexa-icon.png"
      alt="Shivnexa Industries Logo"
      className="w-8 h-8 object-contain"
      loading="eager"
      decoding="sync"
    />
  );

  const columns = [
    {
      title: "Navigation",
      links: [
        {
          label: "Home",
          href: "#home",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('home');
          },
        },
        {
          label: "About Us",
          href: "#about-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('about-us');
          },
        },
        {
          label: "Products Catalogue",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue');
          },
        },
        {
          label: "Contact Us",
          href: "#contact-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('contact-us');
          },
        },
      ],
    },
    {
      title: "Safety Equipment",
      links: [
        {
          label: "Gloves & Hand Protection",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'gloves');
          },
        },
        {
          label: "Safety Shoes & Footwear",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'safety-shoes');
          },
        },
        {
          label: "Head Protection",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'head-protection');
          },
        },
        {
          label: "Eye & Face Protection",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'eye-face-protection');
          },
        },
        {
          label: "Masks & Respiratory",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'masks-respiratory');
          },
        },
        {
          label: "Workwear & Reflective",
          href: "#product-catalogue",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('product-catalogue', null, 'workwear-apparel');
          },
        },
      ],
    },
    {
      title: "Corporate & Statutory",
      links: [
        {
          label: "CIN: U25110KA2026PTC227845",
          href: "#about-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('about-us');
          },
        },
        {
          label: "GSTIN: 29ABVCS0462K1ZM",
          href: "#about-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('about-us');
          },
        },
        {
          label: "ROC: Bangalore (Karnataka)",
          href: "#about-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('about-us');
          },
        },
        {
          label: "Chandra Layout Stage 1, Bengaluru",
          href: "#contact-us",
          onClick: (e) => {
            e.preventDefault();
            navigateTo?.('contact-us');
          },
        },
      ],
    },
  ];

  const offices = [
    { city: "Bengaluru", timeZone: "Asia/Kolkata" },
  ];

  // ONLY 3 social icons as strictly requested: Instagram, Facebook, and WhatsApp
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20would%20like%20to%20know%20more%20about%20your%20industrial%20safety%20products.",
      icon: <WhatsAppIcon className="size-4" />,
    },
  ];

  const legal = [
    { label: "Companies Act, 2013", href: "#" },
    { label: "Form GST REG-06", href: "#" },
    { label: "MCA Registered", href: "#" },
    { label: "Karnataka, India - 560040", href: "#" },
  ];

  return (
    <WordmarkRevealFooter
      wordmark="SHIVNEXA"
      brand={{
        name: "Shivnexa Industries Pvt Ltd",
        mark: brandMark,
        blurb:
          "Shivnexa Industries Private Limited provides heavy-duty industrial safety tools and personal protective equipment for high-risk professional workplaces across India.",
        extra: (
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              Direct B2B Procurement Desk
            </span>
            <a
              href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20have%20an%20inquiry%20regarding%20industrial%20safety%20equipment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-98 w-full sm:w-auto self-start"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 99646 55525)</span>
            </a>
          </div>
        ),
      }}
      columns={columns}
      status={{
        label: "Supply & Dispatch Operations Active",
        tone: "ok",
      }}
      offices={offices}
      socials={socials}
      legal={legal}
      reflection={true}
      reveal="inView"
      className="border-t border-border bg-white text-on-surface"
    />
  );
}
