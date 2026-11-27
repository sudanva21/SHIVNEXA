import React from 'react';
import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion';

export default function AboutPage({ navigateTo }) {
  return (
    <div className="flex flex-col w-full bg-white text-gray-900">
      {/* =========================================================================
          SECTION 1: HERO (About Shivnexa Industries)
          ========================================================================= */}
      <section className="w-full bg-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-8">
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <span>/</span>
            <span className="text-gray-900 font-semibold">About Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle & Badges */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08] text-gray-900 mb-6">
                About <br />
                <span className="text-[#0c432f]">Shivnexa</span> <br />
                Industries
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8 font-normal">
                A trusted partner for industrial safety solutions — providing reliable equipment, protective gear, and workplace safety products for diverse industries.
              </p>

              {/* Accent Badges with Electric Lime Bars */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-5 bg-[#bef264] rounded-full flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 tracking-tight">ISO Compliant Supply</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-5 bg-[#bef264] rounded-full flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 tracking-tight">Industry-Grade Products</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Slanted Parallelogram & Electric Lime Accent */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end py-4 sm:py-6">
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[480px] mx-auto lg:mr-0 select-none">
                {/* Soft Mint Backing Shape */}
                <div
                  className="absolute -right-3 sm:-right-4 -top-3 w-full h-full rounded-2xl sm:rounded-3xl bg-[#dcf4e2]/60 pointer-events-none"
                  style={{ transform: 'skewX(-14deg)' }}
                />

                {/* Main Parallelogram Cut Container with Rounded Corners */}
                <div
                  className="relative w-full aspect-[4/3.4] sm:aspect-[4/3.2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100/80 bg-gray-100"
                  style={{ transform: 'skewX(-14deg)' }}
                >
                  {/* High-Resolution 4K Image (Counter-skewed so the subject remains natural and undistorted) */}
                  <picture>
                    <source srcSet="/about-hero-engineer.webp" type="image/webp" />
                    <img
                      src="/about-hero-engineer.jpg"
                      alt="Shivnexa Senior Industrial Safety Engineer"
                      className="absolute -inset-x-8 -inset-y-4 w-[calc(100%+4rem)] h-[calc(100%+2rem)] object-cover object-top pointer-events-none"
                      style={{ transform: 'skewX(14deg) scale(1.15)' }}
                      loading="eager"
                      decoding="sync"
                    />
                  </picture>
                </div>

                {/* Electric Lime Accent Parallelogram Badge at Bottom-Right */}
                <div
                  className="absolute -bottom-3 sm:-bottom-4 right-5 sm:right-8 w-12 sm:w-16 h-18 sm:h-24 bg-[#bef264] rounded-xl sm:rounded-2xl shadow-md z-10 flex items-center justify-center pointer-events-none"
                  style={{ transform: 'skewX(-14deg)' }}
                >
                  <span
                    className="text-xl sm:text-2xl font-black text-[#073926]/30 select-none"
                    style={{ transform: 'skewX(14deg)' }}
                  >
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATS BANNER
          ========================================================================= */}
      <section className="w-full bg-[#073926] text-white py-10 sm:py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-left">
            {/* Stat 1 */}
            <div className="md:pr-6 md:border-r border-white/10">
              <div className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none text-white">
                500+
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-medium mt-2">
                Products
              </p>
            </div>

            {/* Stat 2 */}
            <div className="md:px-6 md:border-r border-white/10">
              <div className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none text-white">
                100+
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-medium mt-2">
                Industrial Clients
              </p>
            </div>

            {/* Stat 3 */}
            <div className="md:px-6 md:border-r border-white/10">
              <div className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none text-white">
                10+
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-medium mt-2">
                Industry Segments
              </p>
            </div>

            {/* Stat 4 */}
            <div className="md:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none text-white">
                100%
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/70 font-medium mt-2">
                Quality Sourcing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR STORY (Built for Safer Workplaces)
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text & CTA Button */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-3 block">
                OUR STORY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] mb-6">
                Built for <br />
                Safer Workplaces
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Shivnexa Industries Pvt. Ltd. was established with a clear vision — to make industrial workplaces safer, more efficient, and compliant through reliable safety products and equipment.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                We focus on quality, timely supply, and long-term partnerships, serving industries such as manufacturing, construction, utilities, and more.
              </p>

              {/* Electric Lime Action Button */}
              <button
                type="button"
                onClick={() => navigateTo('product-catalogue')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#bef264] hover:bg-[#a3e635] text-[#073926] font-bold text-sm rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
              >
                <span>Explore Our Products</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Right Column: Interactive Image Accordion */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
              <InteractiveImageAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR APPROACH (Quality & Dependability)
          ========================================================================= */}
      <section className="w-full bg-[#fbfdfa] py-16 sm:py-20 border-t border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-2 block">
                OUR APPROACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Quality & Dependability
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
              We combine strong sourcing, quality checks, and customer focus to deliver safety solutions that industries can rely on.
            </p>
          </div>

          {/* 3 Pillar Cards with Top Electric Lime Accent Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {/* Pillar 1 */}
            <div className="md:pr-8 md:border-r border-gray-200">
              <div className="w-8 h-1 bg-[#bef264] rounded-full mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Reliable Supply
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Consistent availability of industrial safety products.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="md:px-8 md:border-r border-gray-200">
              <div className="w-8 h-1 bg-[#bef264] rounded-full mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Quality Assured
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sourced from trusted and certified manufacturers.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="md:pl-8">
              <div className="w-8 h-1 bg-[#bef264] rounded-full mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Customer Focused
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Solutions tailored to your workplace safety needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MANUFACTURING & SUPPLY (Direct & Trusted Sourcing)
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Factory Floor with Yellow Overhead Crane (Slanted Cut Frame) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              {/* SVG Definition for Slanted Cut with Rounded Corners */}
              <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
                <defs>
                  <clipPath id="sourcing-trapezoid-clip" clipPathUnits="objectBoundingBox">
                    <path d="M 0.04,0 
                             L 0.95,0 
                             Q 1.0,0 0.99,0.06 
                             L 0.86,0.94 
                             Q 0.85,1.0 0.80,1.0 
                             L 0.04,1.0 
                             Q 0,1.0 0,0.95 
                             L 0,0.05 
                             Q 0,0 0.04,0 Z" />
                  </clipPath>
                </defs>
              </svg>

              <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[500px] select-none">
                {/* Soft Mint Backing Shape */}
                <div
                  className="absolute -right-3 sm:-right-4 top-0 w-24 sm:w-28 h-full bg-[#dcf4e2]/60 rounded-r-2xl sm:rounded-r-3xl pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)' }}
                />

                {/* Sourcing Image Container with Slanted Cut Shape & Rounded Corners */}
                <div
                  className="relative w-full aspect-[16/10] bg-gray-100 shadow-md transition-transform duration-500 hover:scale-[1.01]"
                  style={{ clipPath: 'url(#sourcing-trapezoid-clip)' }}
                >
                  <picture>
                    <source srcSet="/about-sourcing-factory.webp" type="image/webp" />
                    <img
                      src="/about-sourcing-factory.jpg"
                      alt="Modern automated manufacturing plant with yellow 40-tonne overhead gantry crane"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="eager"
                      decoding="sync"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Verified Checkmark Points */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-3 block">
                MANUFACTURING & SUPPLY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-gray-900 leading-[1.15] mb-4">
                Direct & Trusted <br />
                Sourcing
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                We work with certified manufacturers and verified partners to ensure genuine, high-quality safety equipment at competitive value.
              </p>

              {/* Verified Checklist */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#70b32d] text-[22px]">check_circle</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Verified Manufacturers</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#70b32d] text-[22px]">check_circle</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Quality Inspections</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#70b32d] text-[22px]">check_circle</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Timely Deliveries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WORK WITH US (CTA Card)
          ========================================================================= */}
      <section className="w-full bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-r from-[#042417] via-[#073926] to-[#042417] shadow-xl">
            {/* Subtle emerald ambient radial sheen */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-300/80 mb-2 block">
                  WORK WITH US
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-tight">
                  Let's Build Safer Workplaces <br className="hidden sm:inline" />
                  Together.
                </h2>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => navigateTo('contact-us')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm sm:text-base rounded-full transition-all shadow-md active:scale-98 whitespace-nowrap cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
