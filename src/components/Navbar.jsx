import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { CurvedNavbar } from './ui/curved-menu';

export default function Navbar({ currentPage, navigateTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about-us', label: 'About Us', icon: 'info' },
    { id: 'product-catalogue', label: 'Products', icon: 'inventory_2' },
    { id: 'contact-us', label: 'Contact Us', icon: 'support_agent' },
  ];

  const handleNavClick = (pageId, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  const curvedNavItems = [
    {
      heading: 'Home',
      href: '#home',
      id: 'home',
      onClick: (e) => handleNavClick('home', e),
    },
    {
      heading: 'About Us',
      href: '#about-us',
      id: 'about-us',
      onClick: (e) => handleNavClick('about-us', e),
    },
    {
      heading: 'Products',
      href: '#product-catalogue',
      id: 'product-catalogue',
      onClick: (e) => handleNavClick('product-catalogue', e),
    },
    {
      heading: 'Contact Us',
      href: '#contact-us',
      id: 'contact-us',
      onClick: (e) => handleNavClick('contact-us', e),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-container transition-all">
      <div className="h-16 sm:h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo and Title */}
        <div className="flex items-center">
          <a
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
            onClick={(e) => handleNavClick('home', e)}
            href="#home"
          >
            <img
              src="/shivnexa-icon.png"
              alt="Shivnexa Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-extrabold tracking-wider text-primary">
                SHIVNEXA
              </span>
              <span className="text-[9px] sm:text-[10px] text-outline tracking-wider uppercase font-semibold">
                Industries Pvt Ltd
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links (Unchanged) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'product-catalogue' && currentPage === 'product-detail');
            return (
              <a
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'text-primary font-bold text-base py-1 border-b-2 border-primary transition-all'
                    : 'text-on-surface-variant hover:text-primary font-medium text-base py-1 transition-colors cursor-pointer'
                }
                onClick={(e) => handleNavClick(item.id, e)}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Action Group: Official WhatsApp CTA (desktop) + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            className="hidden md:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm active:scale-95 border border-[#1EBE5D]/30"
            href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20would%20like%20to%20inquire%20about%20your%20industrial%20safety%20products."
            rel="noopener noreferrer"
            target="_blank"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp Inquiry</span>
          </a>

          {/* Mobile Hamburger Animated Toggle Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container active:scale-95 transition-all border border-surface-container shadow-xs cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
              <span
                className={`block h-0.5 w-5 bg-primary rounded-full transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 bg-primary rounded-full transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 bg-primary rounded-full transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Animated Curved Drawer Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <CurvedNavbar
            setIsActive={setMobileMenuOpen}
            navItems={curvedNavItems}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
