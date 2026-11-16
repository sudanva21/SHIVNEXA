import React from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { BgGradient } from '@/components/ui/bg-gradient';
import GlassyCarousel from '@/components/ui/glassy-coverflow-carousel';
import RisingInk from '@/components/ui/rising-ink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { Factory, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';

export default function HomePage({ navigateTo }) {
  const featuredIds = [
    'sn-gl-001', // Utex Xpert Chem 601 Triple Dipped Gloves
    'sn-sh-001', // Utex PU Sole Safety Shoes — ISI Marked, Black
    'sn-hd-001', // Udyogi Ultra 5000 Helmets
    'sn-ey-001', // 3M 1709IN Safety Goggles — Anti-Scratch
    'sn-ms-001', // Dweej N95 Mask
    'sn-hp-001', // Honeywell Ear Plugs
    'sn-ww-005', // 90 GSM Reflective Jacket with Pocket and Zip
    'sn-fp-001', // Safety Harness
  ];

  const featuredList = featuredIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const featuredCarouselItems = (featuredList.length === 8 ? featuredList : PRODUCTS.slice(0, 8)).map((product) => ({
    id: product.id,
    title: product.name,
    subtitle: `${product.category} · ${product.price ? `${product.price} · ` : ''}${product.standard || product.code}`,
    image: product.homeImage || product.image,
    accent: '#0f382c',
    description: product.description || product.shortDescription,
    category: product.category,
    code: product.code,
    price: product.price,
    href: `https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20am%20interested%20in%20inquiring%20about%20${encodeURIComponent(product.name)}%20(Code%3A%20${product.code})${product.price ? `%20priced%20at%20${encodeURIComponent(product.price)}` : ''}.%20Please%20share%20quotation%20and%20availability.`,
    linkLabel: 'Inquire on WhatsApp'
  }));

  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1: FULL-PAGE HERO */}
      <section className="relative w-full overflow-hidden border-b border-surface-container lg:min-h-[calc(100vh-5rem)] flex flex-col lg:justify-center">
        {/* Radial Brand Gradient Background (Desktop Only) */}
        <BgGradient
          className="z-0 hidden lg:block"
          gradientFrom="#f8fbf9"
          gradientTo="#b3d7c3"
          gradientSize="125% 125%"
          gradientPosition="50% 15%"
          gradientStop="20%"
        />

        {/* MOBILE-ONLY HERO */}
        <div className="block lg:hidden relative z-10 w-full px-5 pt-4 pb-4 overflow-hidden bg-gradient-to-b from-[#f3f9f4] via-[#eaf4ec] to-[#dfefe1]">
          {/* Angled Helmet, Goggles & Girder Visual on the right */}
          <div className="absolute right-0 top-0 h-[470px] sm:h-[510px] w-[58%] max-w-[290px] sm:max-w-[320px] pointer-events-none select-none overflow-hidden z-0">
            <img
              src="/mobile-hero-clean-visual.png"
              alt="Shivnexa Industrial Safety Gear"
              className="w-full h-full object-contain object-right-top"
            />
          </div>

          <div className="relative z-10 flex flex-col">
            {/* Headline */}
            <h1 className="text-[31px] font-extrabold tracking-tight leading-[1.12] text-[#0b1d16]">
              Reliable Equipment.
              <span className="block text-[#0e6b47] mt-0.5">Safer Workplaces.</span>
            </h1>

            {/* Lime-green curved underline swoosh */}
            <svg
              viewBox="0 0 150 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-36 h-2 text-[#70bd44] mt-0.5 -mb-0.5"
            >
              <path
                d="M2 5C40 9 105 10 148 4"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Paragraph Subtitle */}
            <p className="mt-3.5 text-[13px] text-[#2c3e35] max-w-[240px] leading-relaxed font-normal">
              Explore dependable industrial safety tools and protective equipment designed for high-risk work environments.
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col gap-2.5 w-[195px] mb-8">
              <button
                type="button"
                onClick={() => navigateTo('product-catalogue')}
                className="inline-flex items-center justify-between w-full h-11 px-5 rounded-[14px] bg-[#0a3827] hover:bg-[#07291c] text-white font-bold text-xs tracking-wide shadow-sm transition-all active:scale-98 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20would%20like%20to%20know%20more%20about%20your%20industrial%20safety%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-row items-center justify-center gap-2 w-full h-11 px-3.5 rounded-[45px] bg-white border-[3px] border-[#1f734d] text-[#1f734d] font-[550] text-xs whitespace-nowrap tracking-wide transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:bg-[#1f734d] hover:text-white hover:scale-[1.03] active:bg-[#1f734d] active:text-white active:scale-98"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert" />
                <span className="whitespace-nowrap transition-colors duration-300 font-[550] select-none">
                  WhatsApp Inquiry
                </span>
              </a>
            </div>

            {/* 3-Column Micro-Features Strip */}
            <div className="relative z-10 w-full bg-white rounded-[24px] border border-[#dceddf] shadow-xs p-3.5 grid grid-cols-3 divide-x divide-[#e2efe5] mb-3.5">
              <div className="flex items-center justify-center gap-2 px-1">
                <div className="w-8 h-8 rounded-lg bg-[#e7f5ec] flex items-center justify-center text-[#0e6b47] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#0e6b47]" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[12px] font-bold text-[#0c2117]">Tested</span>
                  <span className="text-[12px] font-bold text-[#0c2117]">Standards</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 px-1">
                <div className="w-8 h-8 rounded-lg bg-[#e7f5ec] flex items-center justify-center text-[#0e6b47] shrink-0">
                  <Factory className="w-4 h-4 text-[#0e6b47]" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[12px] font-bold text-[#0c2117]">Direct</span>
                  <span className="text-[12px] font-bold text-[#0c2117]">Factory</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 px-1">
                <div className="w-8 h-8 rounded-lg bg-[#e7f5ec] flex items-center justify-center text-[#0e6b47] shrink-0">
                  <Headphones className="w-4 h-4 text-[#0e6b47]" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[12px] font-bold text-[#0c2117]">B2B</span>
                  <span className="text-[12px] font-bold text-[#0c2117]">Support</span>
                </div>
              </div>
            </div>

            {/* Featured Spotlight Card */}
            <div
              className="relative z-10 w-full bg-white rounded-[24px] border border-[#dceddf] shadow-xs p-3.5 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all"
              onClick={() => navigateTo('product-detail', 'sn-hd-001')}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#f4f7f5] flex items-center justify-center p-0.5 shrink-0 border border-[#e8f1eb]">
                  <img
                    src="/spotlight-helmet-clean.png"
                    alt="Udyogi Ultra 6000 Helmets"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <span className="self-start text-[9px] uppercase font-bold text-[#156e43] bg-[#e7f6eb] px-1.5 py-0.5 rounded tracking-wide mb-0.5">
                    FEATURED GEAR
                  </span>
                  <h4 className="text-sm font-bold text-[#0c2117] truncate">
                    Udyogi Ultra 6000 Helmets
                  </h4>
                  <p className="text-[11px] text-[#556b60]">
                    Industrial Safety · EN 397
                  </p>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full bg-[#e6f5eb] flex items-center justify-center text-[#115e3b] shrink-0 hover:bg-[#d5eedd] transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-[#115e3b]" />
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3.5 mb-1">
              <span className="w-6 h-1.5 bg-[#1b5e3f] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#bad8c6] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#bad8c6] rounded-full"></span>
            </div>
          </div>
        </div>

        {/* DESKTOP-ONLY HERO (100% Intact and Untouched) */}
        <div className="hidden lg:block relative z-10 max-w-[1280px] w-full mx-auto px-margin py-8 sm:py-12 lg:py-16 my-auto">
          <div className="grid grid-cols-12 gap-14 items-center">
            {/* Left Content */}
            <div className="col-span-7 flex flex-col justify-center">
              <RisingInk
                as="h1"
                text={"Reliable Equipment.\nSafer Workplaces."}
                className="text-6xl xl:text-7xl text-primary tracking-tight font-extrabold leading-[1.1] cursor-default"
                color="#0f382c"
                colors={["#275d47", "#0a251c"]}
                plates={8}
                lift={0.42}
                radius={1.5}
                shadow={0.65}
                stiffness={1.1}
                damping={0.55}
                pop={1.2}
                intro={true}
                view="pointer"
              />
              <p className="mt-5 text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Explore dependable industrial safety tools and personal protective equipment for professional workplaces. Quality equipment designed for high-risk industrial environments.
              </p>

              {/* Action Buttons: Responsive & Balanced */}
              <div className="mt-8 flex flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigateTo('product-catalogue')}
                  className="relative group border-none bg-transparent p-0 outline-none cursor-pointer text-base"
                >
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-xl transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
                  ></span>

                  <span
                    className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[#061d15] via-[#0f382c] to-[#061d15]"
                  ></span>

                  <div
                    className="relative flex items-center justify-between py-3 px-6 text-base text-white rounded-xl transform -translate-y-1 bg-gradient-to-r from-[#0c432f] via-[#1b5e43] to-[#0c432f] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  >
                    <span className="select-none font-semibold">Explore Products</span>

                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 ml-2 -mr-1 transition duration-200 group-hover:translate-x-1"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>

                <a
                  className="relative group inline-flex items-center justify-between w-[220px] h-12 rounded-xl cursor-pointer border border-[#1EBE5D] bg-[#25D366] hover:bg-[#1EBE5D] active:border-[#128C7E] active:bg-[#128C7E] overflow-hidden transition-all duration-300 shadow-sm"
                  href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20would%20like%20to%20know%20more%20about%20your%20industrial%20safety%20products."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-white font-semibold text-base pl-5 pr-14 transition-all duration-300 group-hover:text-transparent group-hover:opacity-0 select-none whitespace-nowrap">
                    WhatsApp Inquiry
                  </span>
                  <span className="absolute right-0 top-0 h-full w-12 bg-white flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:bg-white border-l border-[#1EBE5D]/30 group-hover:border-transparent">
                    <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </a>
              </div>

              {/* Value propositions: 3-column micro-stats bar */}
              <div className="mt-10 pt-6 border-t border-surface-container/60 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-start text-left p-2.5 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[22px] mb-0.5">verified</span>
                  <span className="text-xs font-bold text-primary leading-tight">Tested Standards</span>
                  <span className="text-[11px] text-outline mt-0.5">EN &amp; IS Certified</span>
                </div>
                <div className="flex flex-col items-start text-left p-2.5 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[22px] mb-0.5">local_shipping</span>
                  <span className="text-xs font-bold text-primary leading-tight">Direct Factory</span>
                  <span className="text-[11px] text-outline mt-0.5">Immediate Dispatch</span>
                </div>
                <div className="flex flex-col items-start text-left p-2.5 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[22px] mb-0.5">support_agent</span>
                  <span className="text-xs font-bold text-primary leading-tight">B2B Support</span>
                  <span className="text-[11px] text-outline mt-0.5">WhatsApp RFQ</span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase (Desktop Only) */}
            <div className="col-span-5 flex justify-center">
              <div
                className="w-full max-w-[480px] bg-surface-container-low/50 p-5 rounded-2xl border border-surface-container cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigateTo('product-detail', 'sn-hd-001')}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white flex items-center justify-center p-4">
                  <img
                    className="w-full h-full object-contain"
                    alt="Udyogi Ultra 5000 Helmets"
                    src="/products/017-udyogi-ultra-5000-helmets.webp"
                  />
                </div>
                <div className="mt-4 px-2 pb-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs uppercase font-semibold text-primary">Head Protection</span>
                    <span className="text-xs font-mono text-outline">SN-HD-001</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary">Udyogi Ultra 5000 Helmets</h3>
                  <p className="text-sm text-outline mt-1">Industrial safety helmet engineered for workplace head protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Down Hint */}
        <div className="relative z-10 hidden lg:flex w-full justify-center pb-4 text-outline/60 text-xs font-medium items-center gap-1">
          <span>Scroll down</span>
          <span className="material-symbols-outlined text-[16px] animate-bounce">expand_more</span>
        </div>
      </section>

      {/* SECTION 2: CATEGORY SHOWCASE */}
      <section className="w-full bg-surface-container-low/30 py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary tracking-tight">
                Product Categories
              </h2>
              <p className="text-base text-on-surface-variant mt-2 max-w-xl">
                Protection equipment engineered for civil, industrial, and high-risk workplace environments.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-semibold text-sm transition-colors cursor-pointer self-start md:self-auto"
              onClick={() => navigateTo('product-catalogue')}
            >
              <span>View All Categories</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Clean Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {/* Card 1: Head & Face */}
            <div className="md:col-span-7 bg-white rounded-xl border border-surface-container p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-primary">
                    Head &amp; Face Protection
                  </h3>
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[24px]">construction</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
                  Industrial hard hats, anti-fog face shields, visor mounts, and acoustic earmuffs built for high-impact construction.
                </p>
              </div>
              <div
                className="my-3 sm:my-4 aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-low cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'head-protection')}
              >
                <img
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  alt="Head & Face Protection"
                  src="/products/017-udyogi-ultra-5000-helmets.webp"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-primary font-medium text-xs sm:text-sm hover:underline self-start cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'head-protection')}
              >
                <span>View Products</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Card 2: Hand & Arm */}
            <div className="md:col-span-5 bg-white rounded-xl border border-surface-container p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-primary">
                    Hand &amp; Arm Protection
                  </h3>
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[24px]">front_hand</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Cut-resistant HPPE weave, chemical nitrile dipping, and molten-slag welding gauntlets.
                </p>
              </div>
              <div
                className="my-3 sm:my-4 aspect-[16/8] rounded-lg overflow-hidden bg-surface-container-low cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'gloves')}
              >
                <img
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  alt="Hand & Arm Protection"
                  src="/products/001-utex-xpert-chem-601-triple-dipped-gloves.webp"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-primary font-medium text-xs sm:text-sm hover:underline self-start cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'gloves')}
              >
                <span>View Gloves</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Card 3: Footwear */}
            <div className="md:col-span-4 bg-white rounded-xl border border-surface-container p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="text-base sm:text-lg font-bold text-primary">
                    Safety Footwear
                  </h4>
                  <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px]">hiking</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Puncture-resistant Kevlar midsoles, 200J steel toe safety shoes, and oil-resistant outsoles.
                </p>
              </div>
              <div
                className="my-3 sm:my-4 aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-low cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'safety-shoes')}
              >
                <img
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  alt="Safety Footwear"
                  src="/products/006-utex-pu-sole-safety-shoes-isi-marked-black.webp"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-primary font-medium text-xs sm:text-sm hover:underline cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'safety-shoes')}
              >
                <span>Discover Boots →</span>
              </button>
            </div>

            {/* Card 4: Fall Protection */}
            <div className="md:col-span-4 bg-white rounded-xl border border-surface-container p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="text-base sm:text-lg font-bold text-primary">
                    Fall Protection
                  </h4>
                  <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px]">accessibility_new</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Full body safety harnesses, shock-absorbing twin lanyards, and scaffolding anchor hooks.
                </p>
              </div>
              <div
                className="my-3 sm:my-4 aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-low cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'fall-protection')}
              >
                <img
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  alt="Fall Protection"
                  src="/products/033-safety-harness.webp"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-primary font-medium text-xs sm:text-sm hover:underline cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'fall-protection')}
              >
                <span>View Harnesses →</span>
              </button>
            </div>

            {/* Card 5: Respiratory Safety */}
            <div className="md:col-span-4 bg-white rounded-xl border border-surface-container p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="text-base sm:text-lg font-bold text-primary">
                    Respiratory Safety
                  </h4>
                  <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px]">masks</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Half-mask silicone respirators, particulate filters, and organic vapor cartridges.
                </p>
              </div>
              <div
                className="my-3 sm:my-4 aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-low cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'masks-respiratory')}
              >
                <img
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  alt="Respiratory Safety"
                  src="/products/011-dweej-n95-mask.webp"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-primary font-medium text-xs sm:text-sm hover:underline cursor-pointer"
                onClick={() => navigateTo('product-catalogue', null, 'masks-respiratory')}
              >
                <span>Explore Masks →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PRODUCTS GRID */}
      <section className="w-full bg-white py-12 lg:py-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary tracking-tight">
                Featured Products
              </h2>
              <p className="text-base text-on-surface-variant mt-2 max-w-xl">
                Standard safety equipment available for bulk supply and immediate dispatch.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-semibold text-sm transition-colors cursor-pointer self-start md:self-auto"
              onClick={() => navigateTo('product-catalogue')}
            >
              <span>View All Products</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 3D Glassy Coverflow Carousel - Full Width */}
        <div className="w-full">
          <GlassyCarousel
            items={featuredCarouselItems}
            layout="website"
            initialIndex={0}
            autoPlay={true}
            interval={2000}
            label="Featured Industrial Products Coverflow"
            style={{
              "--color-background": "transparent",
              "--color-foreground": "#111e17",
              "--color-card": "#ffffff",
              "--color-card-foreground": "#111e17",
              "--color-muted-foreground": "#495a50",
              "--color-border": "#d7e6db",
              "--color-primary": "#0f382c",
              "--color-primary-foreground": "#ffffff",
              "--carousel-shadow-color": "#0f382c",
            }}
            onCardAction={(item) => navigateTo('product-detail', item.id)}
          />
        </div>
      </section>

      {/* SECTION 4: ABOUT SHIVNEXA BRIEF */}
      <section className="w-full bg-surface-container-low/30 py-12 lg:py-16 border-t border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-primary tracking-tight">
                About Shivnexa Industries
              </h2>
              <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
                Shivnexa Industries Private Limited provides industrial safety tools and personal protective equipment for professional requirements. We support site managers, contractors, and safety teams across diverse manufacturing and infrastructure sites.
              </p>
              <p className="mt-3 text-sm text-outline leading-relaxed">
                Our products undergo quality checks conforming to Indian and international safety standards, delivering reliable performance when working conditions demand it most.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-primary text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                  onClick={() => navigateTo('about-us')}
                >
                  <span>Learn More</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
                <span className="text-xs text-primary font-semibold">
                  Registered Pvt. Ltd. | GST &amp; MCA Compliant
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-low shadow-sm border border-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Industrial quality control inspection at Shivnexa facility"
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLEAN TRUST PILLARS */}
      <section className="w-full bg-white py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low/40 rounded-xl p-6 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-white text-primary flex items-center justify-center mb-4 shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="text-lg font-bold text-primary">
                Quality Tested Products
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                Tested for demanding workplace environments. Each product batch meets statutory industrial safety criteria.
              </p>
            </div>

            <div className="bg-surface-container-low/40 rounded-xl p-6 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-white text-primary flex items-center justify-center mb-4 shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-[24px]">engineering</span>
              </div>
              <h3 className="text-lg font-bold text-primary">
                Professional Assistance
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                Direct consultation for product compliance sheets, equipment specifications, and site safety needs.
              </p>
            </div>

            <div className="bg-surface-container-low/40 rounded-xl p-6 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-white text-primary flex items-center justify-center mb-4 shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-[24px]">quickreply</span>
              </div>
              <h3 className="text-lg font-bold text-primary">
                Direct Inquiries
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                Prompt response via WhatsApp and official channels for quotations and bulk order delivery schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLEAN BOTTOM BANNER */}
      <section className="w-full bg-white pb-12 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          <div className="bg-primary text-white rounded-2xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Looking for the Right Equipment?
              </h2>
              <p className="mt-2 text-base text-white/80 leading-relaxed">
                Connect directly with our team for product specifications, batch bulk orders, or general inquiries.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0 w-full lg:w-auto">
              <a
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-base px-6 py-3.5 sm:py-3 rounded-lg shadow-sm transition-all text-center w-full sm:w-auto active:scale-98"
                href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20am%20looking%20for%20industrial%20safety%20equipment%20specifications%20and%20quotation."
                rel="noopener noreferrer"
                target="_blank"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-3.5 sm:py-3 rounded-lg transition-all text-center cursor-pointer border border-white/20 w-full sm:w-auto active:scale-98"
                onClick={() => navigateTo('contact-us')}
              >
                <span>Send Inquiries</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
