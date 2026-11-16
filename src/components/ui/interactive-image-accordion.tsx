import React, { useState } from "react";

export interface AccordionItemData {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
}

// Authentic default data curated specifically for Shivnexa's industrial safety operations
export const defaultShivnexaAccordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Head & Face Safety",
    subtitle: "EN 397 & IS 2925 Industrial Helmets",
    imageUrl: "/products/017-udyogi-ultra-5000-helmets.webp",
    badge: "Tested Protection",
  },
  {
    id: 2,
    title: "Industrial Hand Protection",
    subtitle: "Heavy-Duty Chemical & Cut Resistant",
    imageUrl: "/about-story-gloves.png",
    badge: "CE Certified",
  },
  {
    id: 3,
    title: "ISI Safety Footwear",
    subtitle: "Steel Toe PU Sole Heavy Work Boots",
    imageUrl: "/products/006-utex-pu-sole-safety-shoes-isi-marked-black.webp",
    badge: "ISI Marked",
  },
  {
    id: 4,
    title: "High-Bay Warehousing",
    subtitle: "Centralized Bulk Procurement Hub",
    imageUrl: "/about-story-warehouse.png",
    badge: "Direct Supply",
  },
  {
    id: 5,
    title: "Factory Infrastructure",
    subtitle: "Quality Inspection & Manufacturing Bays",
    imageUrl: "/about-sourcing-crane.png",
    badge: "Verified Sourcing",
  },
];

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onActivate }) => {
  return (
    <div
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`
        relative h-[360px] sm:h-[400px] md:h-[430px] lg:h-[450px]
        rounded-2xl overflow-hidden cursor-pointer flex-shrink-0
        transition-all duration-500 ease-in-out select-none shadow-sm
        ${
          isActive
            ? "w-[240px] sm:w-[290px] md:w-[320px] lg:w-[340px] ring-2 ring-[#bef264]/80 shadow-md"
            : "w-[48px] sm:w-[54px] md:w-[58px] lg:w-[60px] hover:brightness-110"
        }
      `}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{
          transform: isActive ? "scale(1.03)" : "scale(1)",
        }}
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = "/about-story-warehouse.png";
        }}
      />

      {/* Gradient Dark Overlay */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-500
          ${isActive ? "bg-gradient-to-t from-black/85 via-black/35 to-black/10" : "bg-black/55"}
        `}
      />

      {/* Top Badge (Visible when Active) */}
      {isActive && item.badge && (
        <div className="absolute top-4 left-4 z-10 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#bef264] text-[#073926] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#073926]" />
            {item.badge}
          </span>
        </div>
      )}

      {/* Caption Text: Active vs Inactive state */}
      {isActive ? (
        <div className="absolute bottom-5 left-5 right-5 z-10 text-left transition-all duration-300">
          <div className="w-6 h-0.5 bg-[#bef264] rounded-full mb-2" />
          <h4 className="text-white text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
            {item.title}
          </h4>
          {item.subtitle && (
            <p className="text-white/80 text-xs mt-1 leading-snug line-clamp-1">
              {item.subtitle}
            </p>
          )}
        </div>
      ) : (
        <span
          className="absolute text-white/90 text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap bottom-20 left-1/2 -translate-x-1/2 rotate-90 origin-center transition-all duration-300 pointer-events-none drop-shadow"
        >
          {item.title}
        </span>
      )}
    </div>
  );
};

export interface InteractiveImageAccordionProps {
  items?: AccordionItemData[];
  defaultIndex?: number;
  className?: string;
}

export function InteractiveImageAccordion({
  items = defaultShivnexaAccordionItems,
  defaultIndex = 1,
  className = "",
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Horizontal Flex with completely hidden scrollbars across all viewports */}
      <div
        data-no-scrollbar
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex flex-row items-center justify-start lg:justify-center gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto lg:overflow-x-visible pb-2 pt-1 px-1 no-scrollbar scrollbar-none touch-pan-x [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>
      {/* Mobile Swipe / Tap Hint */}
      <p className="text-[11px] text-gray-400 text-center mt-1 lg:hidden">
        Tap or drag any strip to expand
      </p>
    </div>
  );
}

// Export default and LandingAccordionItem for drop-in compatibility
export const LandingAccordionItem = InteractiveImageAccordion;
export default InteractiveImageAccordion;
