import React, { useState, useRef } from 'react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function ContactPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productInterest: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const nameInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScrollToForm = () => {
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedRef = 'SNX-RFQ-' + Math.floor(1000 + Math.random() * 9000);
    setRefNumber(generatedRef);
    setSubmitted(true);
  };

  // WhatsApp quick forward link with user's inputted details
  const whatsappForwardUrl = `https://wa.me/919964655525?text=${encodeURIComponent(
    `Hello Shivnexa, I have submitted an inquiry (Ref #${refNumber || 'NEW'}).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProduct Interest: ${formData.productInterest || 'General Inquiry'}\nMessage: ${formData.message || 'Looking for pricing and availability.'}`
  )}`;

  return (
    <div className="flex flex-col w-full bg-white pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-24">
      {/* =========================================================================
          HERO SECTION: Contact Us + Action Buttons + Official Gear Visual
          ========================================================================= */}
      <section className="w-full bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-8 sm:pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Heading, Subtitle & Action Buttons */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">
              {/* Tag: Electric lime bar + GET IN TOUCH */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-7 sm:w-8 h-1 sm:h-1.5 bg-[#bef264] rounded-full inline-block" />
                <span className="text-xs sm:text-sm uppercase font-extrabold tracking-wider text-[#0c432f]">
                  GET IN TOUCH
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0c432f] tracking-tight leading-[1.08] mb-4 sm:mb-5">
                Contact Us
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-lg mb-6 sm:mb-8 leading-relaxed font-normal">
                Reach out to our team for product inquiries, quotations, or technical support.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* 1. WhatsApp Inquiry Button */}
                <a
                  href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20am%20reaching%20out%20for%20product%20inquiries%20and%20quotations."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0c432f] hover:bg-[#072e1f] text-white font-semibold text-sm sm:text-base rounded-full shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>WhatsApp Inquiry</span>
                </a>

                {/* 2. Get a Quote Button */}
                <button
                  type="button"
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-gray-50 border-2 border-[#0c432f]/40 hover:border-[#0c432f] text-[#0c432f] font-semibold text-sm sm:text-base rounded-full transition-all active:scale-98 cursor-pointer shadow-xs"
                >
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Right Column: Yellow Helmet, Goggles & Gloves with Angled Green Geometry */}
            <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px]">
                <img
                  src="/contact-hero-gear.png"
                  alt="Shivnexa Certified Protective Gear"
                  className="w-full h-auto object-contain select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN SECTION: Contact Details Card (Left) vs Send an Inquiry Form (Right)
          ========================================================================= */}
      <section className="w-full bg-white pt-6 sm:pt-10 lg:pt-14">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* -------------------------------------------------------------------
                LEFT COLUMN: Contact Details Card
                ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#f4f8f5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#e4efe7] shadow-xs">
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0c432f] mb-6 sm:mb-8 tracking-tight">
                  Contact Details
                </h2>

                <div className="flex flex-col">
                  {/* Phone / WhatsApp */}
                  <div className="pb-5 sm:pb-6 border-b border-[#e2ece4]">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1">
                      Phone / WhatsApp
                    </span>
                    <a
                      href="https://wa.me/919964655525"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-[#0c432f] hover:underline inline-block"
                    >
                      +91 99646 55525
                    </a>
                  </div>

                  {/* Email */}
                  <div className="py-5 sm:py-6 border-b border-[#e2ece4]">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:info@shivnexaindustries.com"
                      className="text-sm sm:text-base font-bold text-[#0c432f] hover:underline break-all inline-block"
                    >
                      info@shivnexaindustries.com
                    </a>
                  </div>

                  {/* Location */}
                  <div className="py-5 sm:py-6 border-b border-[#e2ece4]">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1">
                      Location
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#0c432f]">
                      Bengaluru, Karnataka
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Floor No.: 2nd Floor, Bldg No.: 12/6, 5th Main Rd, Chandra Layout Stage 1, Bengaluru Urban - 560040
                    </p>
                  </div>

                  {/* Working Hours */}
                  <div className="pt-5 sm:pt-6">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1">
                      Working Hours
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                      Mon – Sat, 09:00 AM – 06:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: Send an Inquiry Form
                ------------------------------------------------------------------- */}
            <div id="inquiry-form" className="lg:col-span-7 w-full scroll-mt-24">
              <h2 className="text-2xl sm:text-[30px] font-extrabold text-[#0c432f] mb-6 sm:mb-8 tracking-tight">
                Send an Inquiry
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                {/* 1. Your Name */}
                <div>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full h-12 sm:h-13 px-4 rounded-xl border border-gray-200 bg-white text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c432f]/20 focus:border-[#0c432f] transition-all shadow-2xs"
                  />
                </div>

                {/* 2. Phone Number & Email Address (Side-by-Side on desktop/tablet) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full h-12 sm:h-13 px-4 rounded-xl border border-gray-200 bg-white text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c432f]/20 focus:border-[#0c432f] transition-all shadow-2xs"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full h-12 sm:h-13 px-4 rounded-xl border border-gray-200 bg-white text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c432f]/20 focus:border-[#0c432f] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 3. Product Interest Dropdown with Chevron */}
                <div className="relative">
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className={`w-full h-12 sm:h-13 px-4 pr-11 rounded-xl border border-gray-200 bg-white text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#0c432f]/20 focus:border-[#0c432f] transition-all shadow-2xs cursor-pointer ${
                      formData.productInterest ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}
                  >
                    <option value="" disabled>
                      Product Interest
                    </option>
                    <option value="Head & Face Safety" className="text-gray-900">
                      Head &amp; Face Safety
                    </option>
                    <option value="Industrial Hand Protection" className="text-gray-900">
                      Industrial Hand Protection
                    </option>
                    <option value="Safety Shoes & Footwear" className="text-gray-900">
                      Safety Shoes &amp; Footwear
                    </option>
                    <option value="Respiratory Safety & Masks" className="text-gray-900">
                      Respiratory Safety &amp; Masks
                    </option>
                    <option value="Fall Protection & Harnesses" className="text-gray-900">
                      Fall Protection &amp; Harnesses
                    </option>
                    <option value="Eye & Face Protection" className="text-gray-900">
                      Eye &amp; Face Protection
                    </option>
                    <option value="Workwear & High-Vis Jackets" className="text-gray-900">
                      Workwear &amp; High-Vis Jackets
                    </option>
                    <option value="Full Bulk Catalog Procurement" className="text-gray-900">
                      Full Bulk Catalog Procurement
                    </option>
                    <option value="Other / Custom Inquiry" className="text-gray-900">
                      Other / Custom Inquiry
                    </option>
                  </select>
                  {/* Dropdown Chevron Arrow matching mockup */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* 4. Your Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full p-4 rounded-xl border border-gray-200 bg-white text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c432f]/20 focus:border-[#0c432f] transition-all shadow-2xs resize-y min-h-[120px]"
                  />
                </div>

                {/* 5. Send Inquiry Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0c432f] hover:bg-[#072e1f] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>

                {/* Success Feedback Confirmation Card */}
                {submitted && (
                  <div className="p-5 rounded-xl bg-[#f0f9f3] border border-[#bfe7cd] text-[#0c432f] flex flex-col gap-3 mt-2 animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-emerald-600 text-[24px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-base">
                          Inquiry Received — Ref #{refNumber}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          Thank you, {formData.name || 'valued customer'}. Our industrial sales team will review your requirements and reach out promptly.
                        </p>
                      </div>
                    </div>

                    {/* Instant WhatsApp Redirection Option */}
                    <div className="pt-2 border-t border-[#bfe7cd]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-gray-500">
                        Need an immediate quotation?
                      </span>
                      <a
                        href={whatsappForwardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg shadow-xs transition-all"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Forward to WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
