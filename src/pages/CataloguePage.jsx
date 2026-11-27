import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const ITEMS_PER_PAGE = 24;

export default function CataloguePage({ initialCategory = 'all', navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  const categories = useMemo(() => [
    { id: 'all', label: `All Products (${PRODUCTS.length})` },
    ...CATEGORIES.map((c) => {
      const count = PRODUCTS.filter(
        (p) => p.categoryId === c.id || p.category === c.name || p.filterCategory === c.name
      ).length;
      return {
        id: c.id,
        name: c.name,
        label: `${c.name} (${count})`,
      };
    }),
  ], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.code.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(q)) ||
        (product.catalogName && product.catalogName.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'all' ||
        product.category === selectedCategory ||
        product.filterCategory === selectedCategory ||
        product.categoryId === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (safePage > 3) pages.push('...');
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
      pages.push(i);
    }
    if (safePage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }, [totalPages, safePage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === safePage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Top Header & Search Section */}
      <section className="w-full bg-surface-container-low/40 py-8 border-b border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-outline mb-3">
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <span>/</span>
            <span className="text-primary font-medium">Products</span>
          </nav>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary tracking-tight">
                Products
              </h1>
              <p className="text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                Browse our industrial safety equipment, protective gear, and certified site systems.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-6 bg-white p-2 sm:p-3 rounded-xl border border-surface-container flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                search
              </span>
              <input
                className="w-full h-10 pl-10 pr-4 bg-surface-container-low/50 text-on-surface placeholder-outline text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                id="catalogue-search"
                placeholder={`Search ${PRODUCTS.length} products by name or code (e.g., Utex, 3M, Karam, SN-GL-001)...`}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            {/* Results count & reset */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 px-1">
              <span className="text-xs text-outline font-medium whitespace-nowrap">
                {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} available
              </span>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  type="button"
                  className="text-xs text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1"
                  onClick={handleReset}
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills: Edge-to-edge smooth touch scrolling on mobile */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id || (cat.name && selectedCategory === cat.name);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`shrink-0 text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-on-surface-variant hover:text-primary hover:bg-surface-container-low border border-surface-container'
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="w-full py-10 lg:py-14 min-h-[500px]">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  className="product-card group flex flex-col bg-white rounded-xl border border-surface-container p-2.5 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-full aspect-square bg-surface-container-low/40 rounded-lg overflow-hidden flex items-center justify-center p-2.5 sm:p-4 mb-2 sm:mb-3 cursor-pointer"
                    onClick={() => navigateTo('product-detail', product.id)}
                  >
                    <img
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                      src={product.image}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/shivnexa-icon.png';
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1 gap-1">
                    <span className="text-[10px] sm:text-xs uppercase font-medium text-outline truncate">
                      {product.category}
                    </span>
                    <span className="text-[10px] sm:text-xs text-outline font-mono shrink-0">
                      {product.code}
                    </span>
                  </div>
                  <h3
                    className="text-xs sm:text-base font-bold text-primary tracking-tight cursor-pointer hover:text-primary-container transition-colors line-clamp-2 leading-tight sm:leading-snug mb-2 min-h-[2.2rem] sm:min-h-[2.75rem]"
                    onClick={() => navigateTo('product-detail', product.id)}
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between gap-1 mb-3">
                    {product.price ? (
                      <span className="font-extrabold text-[#0c432f] text-xs sm:text-sm">
                        {product.price}
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-primary/80 bg-surface-container-low px-2 py-0.5 rounded border border-surface-container">
                        Bulk Quote
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 pt-2.5 mt-auto border-t border-surface-container">
                    <button
                      type="button"
                      className="w-full sm:flex-1 h-8 sm:h-9 inline-flex items-center justify-center bg-surface-container hover:bg-surface-variant text-primary font-semibold text-[11px] sm:text-xs rounded-lg transition-colors cursor-pointer active:scale-98"
                      onClick={() => navigateTo('product-detail', product.id)}
                    >
                      Details
                    </button>
                    <a
                      className="w-full sm:flex-1 h-8 sm:h-9 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-[11px] sm:text-xs rounded-lg shadow-sm transition-all active:scale-98"
                      href={`https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20am%20interested%20in%20inquiring%20about%20${encodeURIComponent(product.name)}%20(${product.code})${product.price ? `%20priced%20at%20${encodeURIComponent(product.price)}` : ''}.%20Please%20share%20pricing%20and%20availability.`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-surface-container-low/40 rounded-xl border border-surface-container text-center px-4">
              <span className="material-symbols-outlined text-[36px] text-outline mb-2">inventory_2</span>
              <h3 className="text-lg font-bold text-primary">
                No products found
              </h3>
              <p className="text-sm text-outline max-w-sm mt-1 mb-4">
                No items match your search. Try resetting filters or search for another keyword.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-primary-container transition-all cursor-pointer"
                onClick={handleReset}
              >
                <span>Reset Filters</span>
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredProducts.length > ITEMS_PER_PAGE && (
            <div className="mt-10 pt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-outline font-medium">
                Showing{' '}
                <span className="text-primary font-semibold">
                  {(safePage - 1) * ITEMS_PER_PAGE + 1}
                </span>
                –
                <span className="text-primary font-semibold">
                  {Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span>{' '}
                of{' '}
                <span className="text-primary font-semibold">
                  {filteredProducts.length}
                </span>{' '}
                products
              </p>

              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => handlePageChange(safePage - 1)}
                  className="h-9 px-3 rounded-lg border border-surface-container bg-white text-xs sm:text-sm font-semibold text-primary hover:bg-surface-container-low disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Prev
                </button>
                {pageNumbers.map((page, idx) =>
                  page === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-xs text-outline select-none">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`h-9 min-w-[36px] px-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                        page === safePage
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => handlePageChange(safePage + 1)}
                  className="h-9 px-3 rounded-lg border border-surface-container bg-white text-xs sm:text-sm font-semibold text-primary hover:bg-surface-container-low disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
