import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('sn-gl-001');
  const [initialCategory, setInitialCategory] = useState('all');

  // Handle URL Hash navigation and browser back/forward buttons
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
      } else if (hash === 'about-us') {
        setCurrentPage('about-us');
      } else if (hash === 'product-catalogue' || hash === 'products') {
        setCurrentPage('product-catalogue');
      } else if (hash === 'contact-us') {
        setCurrentPage('contact-us');
      } else if (hash.startsWith('product-detail/') || hash.startsWith('product/')) {
        const parts = hash.split('/');
        if (parts[1]) {
          setSelectedProductId(parts[1]);
        }
        setCurrentPage('product-detail');
      } else if (hash === 'safety-standards') {
        setSelectedProductId('sn-gl-001');
        setCurrentPage('product-detail');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (page, productId = null, category = 'all') => {
    if (productId) {
      setSelectedProductId(productId);
      window.location.hash = `product-detail/${productId}`;
    } else if (category && category !== 'all') {
      setInitialCategory(category);
      window.location.hash = page;
    } else {
      window.location.hash = page;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest font-body-md text-on-surface antialiased flex flex-col">
      {/* Fixed Global Navigation */}
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      {/* Main Content Area */}
      <main className="w-full pt-16 sm:pt-20 bg-surface-container-lowest min-h-screen flex-1">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'about-us' && <AboutPage navigateTo={navigateTo} />}
        {currentPage === 'product-catalogue' && (
          <CataloguePage initialCategory={initialCategory} navigateTo={navigateTo} />
        )}
        {currentPage === 'product-detail' && (
          <ProductDetailPage productId={selectedProductId} navigateTo={navigateTo} />
        )}
        {currentPage === 'contact-us' && <ContactPage navigateTo={navigateTo} />}
      </main>

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Global Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
