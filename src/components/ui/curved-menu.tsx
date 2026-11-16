"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Dribbble, Figma } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

export interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
  footer?: React.ReactNode;
}

export interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
  isActive?: boolean;
  setIsActive?: (isActive: boolean) => void;
}

export const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const defaultNavItems: iNavItem[] = [
  {
    heading: "Home",
    href: "#home",
    subheading: "Welcome to Shivnexa",
    id: "home",
  },
  {
    heading: "About Us",
    href: "#about-us",
    subheading: "Quality & Governance",
    id: "about-us",
  },
  {
    heading: "Products",
    href: "#product-catalogue",
    subheading: "Industrial Safety Catalogue",
    id: "product-catalogue",
  },
  {
    heading: "Contact",
    href: "#contact-us",
    subheading: "B2B Procurement & Support",
    id: "contact-us",
  },
];

export const CustomFooter: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 px-8 sm:px-12 py-6 border-t border-surface-container bg-surface-container-low/40">
      {/* WhatsApp Quick Action */}
      <a
        href="https://wa.me/919964655525?text=Hello%20Shivnexa%2C%20I%20would%20like%20to%20inquire%20about%20your%20industrial%20safety%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-98 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>Inquire on WhatsApp (+91 99646 55525)</span>
      </a>

      {/* Social / Direct Channels */}
      <div className="flex items-center justify-between text-xs text-outline pt-1">
        <span className="font-mono text-[11px]">CIN: U25110KA2026PTC227845</span>
        <div className="flex items-center gap-3 text-primary">
          <a
            href="https://wa.me/919964655525"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:scale-110 transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary-container"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-primary-container"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
  onClick,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    setIsActive(false);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-surface-container py-3.5 sm:py-5 transition-colors duration-300 uppercase cursor-pointer"
    >
      <a
        ref={ref}
        onMouseMove={handleMouseMove}
        href={href}
        onClick={handleClick}
        className="w-full flex items-center justify-between no-underline"
      >
        <div className="relative flex items-baseline gap-2">
          <span className="text-[#275d47] transition-colors duration-300 text-2xl sm:text-3xl font-extralight mr-1 font-mono">
            {index < 10 ? `0${index}.` : `${index}.`}
          </span>
          <div className="flex flex-row gap-0.5">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -8 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.04,
                delayChildren: 0.1,
              }}
              className="relative z-10 block text-2xl sm:text-3xl font-light text-primary tracking-tight transition-colors duration-300"
            >
              {heading.split("").map((letter, i) => {
                return (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: 8 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              })}
            </motion.span>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline text-[20px] group-hover:text-primary transition-colors">
          arrow_forward
        </span>
      </a>
    </motion.div>
  );
};

export const Curve: React.FC = () => {
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full pointer-events-none"
      style={{ fill: "#ffffff" }}
      viewBox={`0 0 200 ${height}`}
      preserveAspectRatio="none"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

export const CurvedNavbar: React.FC<
  iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
  return (
    <>
      {/* Backdrop Dimmer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setIsActive(false)}
        className="fixed inset-0 z-40 bg-[#0f382c]/40 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Sliding Curved Drawer */}
      <motion.div
        variants={MENU_SLIDE_ANIMATION}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-[100dvh] w-[88vw] max-w-[420px] fixed right-0 top-0 z-50 bg-white shadow-2xl flex flex-col justify-between"
      >
        <div className="h-full pt-8 sm:pt-10 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-2 px-8 sm:px-12">
            <div className="flex items-center justify-between text-outline border-b border-surface-container uppercase text-xs font-semibold tracking-wider pb-3 mb-2">
              <span className="text-primary font-bold">NAVIGATION</span>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container cursor-pointer"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <section className="bg-transparent mt-1">
              <div className="w-full">
                {navItems.map((item, index) => {
                  return (
                    <NavLink
                      key={item.href || index}
                      {...item}
                      setIsActive={setIsActive}
                      index={index + 1}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          {footer ? footer : null}
        </div>
        <Curve />
      </motion.div>
    </>
  );
};

const Header: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  footer,
  isActive: externalIsActive,
  setIsActive: externalSetIsActive,
}) => {
  const [internalActive, setInternalActive] = useState(false);
  const isActive = externalIsActive !== undefined ? externalIsActive : internalActive;
  const setIsActive = externalSetIsActive !== undefined ? externalSetIsActive : setInternalActive;

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          aria-label={isActive ? "Close menu" : "Open menu"}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container active:scale-95 transition-all border border-surface-container shadow-xs cursor-pointer"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between items-center pointer-events-none">
            <span
              className={`block h-0.5 w-6 bg-primary rounded-full transition-transform duration-300 ${
                isActive ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-primary rounded-full transition-opacity duration-300 ${
                isActive ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-primary rounded-full transition-transform duration-300 ${
                isActive ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <CurvedNavbar
            setIsActive={setIsActive}
            navItems={navItems}
            footer={footer}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

