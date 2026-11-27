import React, { useState, useEffect } from 'react';

/**
 * Product and UI image component engineered for reliable SPA & CDN rendering:
 * - Uses eager loading and synchronous decoding so browsers never paint blank
 *   containers while deferring WebP decode.
 * - Retries once with a cache-bypass parameter on transient network failures
 *   before falling back to the brand icon.
 */
export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/shivnexa-icon.png',
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImgSrc(src);
    setRetryCount(0);
  }, [src]);

  const handleError = () => {
    if (retryCount === 0 && src && !src.startsWith('data:')) {
      const separator = src.includes('?') ? '&' : '?';
      setRetryCount(1);
      setImgSrc(`${src}${separator}retry=1`);
    } else if (imgSrc !== fallbackSrc) {
      setRetryCount(2);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      loading="eager"
      decoding="sync"
      onError={handleError}
      {...props}
    />
  );
}
