import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import SafeImage from '@/components/ui/SafeImage';

export default function ProductDetailPage({ productId = 'sn-gl-001', navigateTo }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  useEffect(() => {
    setActiveAngleIndex(0);
  }, [productId]);

  // Deduplicate gallery images by URL to never show redundant image holders
  const rawImages = (product.detailImages && product.detailImages.length > 0)
    ? product.detailImages
    : [{ label: 'Primary View', url: product.image, alt: product.name }];

  const seenUrls = new Set();
  const galleryImages = [];
  for (const img of rawImages) {
    if (img && img.url && !seenUrls.has(img.url)) {
      seenUrls.add(img.url);
      galleryImages.push(img);
    }
  }
  if (galleryImages.length === 0 && product.image) {
    galleryImages.push({ label: 'Primary View', url: product.image, alt: product.name });
  }

  const currentMainImage = galleryImages[activeAngleIndex]?.url || product.image;
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 3).length > 0
    ? PRODUCTS.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 3)
    : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const whatsappInquiryUrl = `https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20am%20interested%20in%20inquiring%20about%20${encodeURIComponent(product.name)}%20(Code%3A%20${product.code})${product.price ? `%20priced%20at%20${encodeURIComponent(product.price)}` : ''}.%20Please%20share%20detailed%20quotation%20and%20availability.`;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Clean Breadcrumb Navigation */}
      <div className="w-full border-b border-surface-container py-3">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin flex items-center gap-2 text-sm text-outline">
          <button
            type="button"
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigateTo('product-catalogue')}
          >
            Products
          </button>
          <span>/</span>
          <span className="text-on-surface font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="w-full py-8 lg:py-12">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="w-full aspect-[4/3] bg-surface-container-low/40 rounded-xl border border-surface-container flex items-center justify-center p-6">
                <SafeImage
                  id="main-product-stage"
                  className="w-full h-full object-contain"
                  alt={product.name}
                  src={currentMainImage}
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((img, idx) => {
                    const isActive = activeAngleIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`thumb-btn p-2 rounded-lg border transition-all cursor-pointer ${
                          isActive
                            ? 'border-primary bg-surface-container-low/60 shadow-sm'
                            : 'border-surface-container bg-white hover:border-outline'
                        }`}
                        onClick={() => setActiveAngleIndex(idx)}
                      >
                        <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
                          <SafeImage
                            className="w-full h-full object-contain"
                            alt={img.label}
                            src={img.url}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Product Information & Single Inquire on WhatsApp CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                    {product.name}
                  </h1>
                  {product.price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#0c432f]">
                        {product.price}
                      </span>
                      <span className="text-xs font-normal text-outline">/ unit (bulk supply)</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-[#0c432f] bg-[#eef7f2] px-3 py-1 rounded-md border border-[#cbe4d4]">
                        Price on Request
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-outline mt-1 font-mono">
                  Item Code: <span className="text-on-surface font-medium">{product.code}</span>
                </p>
              </div>

              <p className="text-base text-on-surface-variant leading-relaxed">
                {product.description}
              </p>

              {/* Clean Key Highlights */}
              <div className="border-t border-b border-surface-container py-4 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-outline">
                  Key Specifications
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="text-sm">
                    <span className="text-outline">Standard:</span>{' '}
                    <span className="font-semibold text-primary">{product.standard}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-outline">Category:</span>{' '}
                    <span className="font-semibold text-primary">{product.category}</span>
                  </div>
                  {product.specs?.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx} className="text-sm">
                      <span className="text-outline">{spec.param}:</span>{' '}
                      <span className="font-semibold text-primary">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single CTA: Inquire on WhatsApp */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  className="w-full h-12 inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-base rounded-lg transition-all shadow-md active:scale-98"
                  href={whatsappInquiryUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <p className="text-xs text-outline text-center">
                  Direct inquiry for quotation, specifications, and volume orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Technical Specifications Table */}
      {product.specs && (
        <section className="w-full py-10 bg-surface-container-low/40 border-t border-surface-container">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Product Specifications
            </h2>
            <div className="bg-white rounded-xl border border-surface-container overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead className="bg-surface-container text-primary font-semibold border-b border-surface-container">
                  <tr>
                    <th className="py-3 px-5 w-1/3">Parameter</th>
                    <th className="py-3 px-5 w-2/3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {product.specs.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 1 ? 'bg-surface-container-low/20' : 'bg-white'}
                    >
                      <td className="py-3 px-5 font-medium text-primary">{row.param}</td>
                      <td className="py-3 px-5 text-on-surface-variant">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="w-full py-12 border-t border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-xl border border-surface-container p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div
                    className="w-full aspect-[4/3] bg-surface-container-low/40 rounded-lg overflow-hidden flex items-center justify-center p-2 sm:p-4 mb-2 sm:mb-3 cursor-pointer"
                    onClick={() => navigateTo('product-detail', rel.id)}
                  >
                    <SafeImage
                      className="w-full h-full object-contain"
                      alt={rel.name}
                      src={rel.image}
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase font-medium text-outline mb-0.5 truncate">
                    {rel.category}
                  </p>
                  <h3
                    className="text-xs sm:text-base font-bold text-primary cursor-pointer hover:text-primary-container transition-colors line-clamp-2 leading-tight mb-2 min-h-[2.2rem] sm:min-h-[2.5rem]"
                    onClick={() => navigateTo('product-detail', rel.id)}
                    title={rel.name}
                  >
                    {rel.name}
                  </h3>
                </div>
                <div className="pt-2 sm:pt-4 mt-auto">
                  <button
                    type="button"
                    className="w-full h-8 sm:h-10 inline-flex items-center justify-center bg-surface-container hover:bg-surface-variant text-primary font-medium text-[11px] sm:text-sm rounded-lg transition-colors cursor-pointer"
                    onClick={() => navigateTo('product-detail', rel.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
