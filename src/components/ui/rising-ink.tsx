"use client";

import React, { useEffect, useRef, useState, useMemo, type CSSProperties, type ElementType } from "react";

export interface RisingInkProps {
  /** Text to display. Words wrap as whole units and whitespace is preserved. */
  text: string;
  /** Element to render. Default "span". */
  as?: ElementType;
  /** Colour of the letter faces. Defaults to the surrounding text colour ("currentColor"). */
  color?: string;
  /** Two colours for the extrusion. Solid: gradient from edge to deepest point. Stack: outline & fill. Default: ["#305c48", "#0f382c"] */
  colors?: [string, string];
  /** A smooth solid extrusion, or a stack of separate outlined plates. Default "solid". */
  extrusion?: "solid" | "stack";
  /** Maximum number of plates in the stack at full lift, from 1 to 16. Default 7. */
  plates?: number;
  /** How high the letters under the pointer rise, relative to the font size. Default 0.5. */
  lift?: number;
  /** Size of the area around the pointer that lifts, relative to the font size. Default 1.4. */
  radius?: number;
  /** Pointer: perspective from above cursor. Fixed: fixed angle. Default "pointer". */
  view?: "pointer" | "fixed";
  /** Strength of the perspective extrusion. Default 1.3. */
  perspective?: number;
  /** Direction extrusions point in fixed view, in degrees. Default 35. */
  angle?: number;
  /** Stiffness of the springs lifting each letter. Default 1. */
  stiffness?: number;
  /** Damping of the springs. Lower values overshoot and bounce more. Default 0.5. */
  damping?: number;
  /** Strength of the jump a click gives the letters around it. 0 turns it off. Default 1. */
  pop?: number;
  /** Soft contact shadow under raised letters, from 0 to 1. Default 0.6. */
  shadow?: number;
  /** A lift sweeps once through the text the first time it scrolls into view. Default true. */
  intro?: boolean;
  /** Where the pointer is followed: anywhere over the parent element, or only over the text. Default "parent". */
  area?: "parent" | "text";
  /** Holds the letters flat. Reduced-motion users always get this. Default false. */
  paused?: boolean;
  /** Extra class names for styling (font size, font weight, etc.). */
  className?: string;
  /** Inline styles for the root element. */
  style?: CSSProperties;
}

// Color interpolation utility
function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace("#", "").trim();
  if (c.length === 3) c = c.split("").map(ch => ch + ch).join("");
  const num = parseInt(c, 16);
  if (isNaN(num)) return [15, 56, 44];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function interpolateRgb(c1: [number, number, number], c2: [number, number, number], t: number): string {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

interface LetterState {
  z: number;
  vz: number;
  popZ: number;
  popVz: number;
  dirX: number;
  dirY: number;
}

export default function RisingInk({
  text,
  as: Tag = "span",
  color = "currentColor",
  colors = ["#387458", "#0f382c"],
  extrusion = "solid",
  plates = 7,
  lift = 0.5,
  radius = 1.4,
  view = "pointer",
  perspective = 1.3,
  angle = 35,
  stiffness = 1,
  damping = 0.5,
  pop = 1,
  shadow = 0.6,
  intro = true,
  area = "parent",
  paused = false,
  className = "",
  style,
}: RisingInkProps) {
  const containerRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerPos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const introProgress = useRef<number>(intro ? 0 : 2);
  const lettersState = useRef<LetterState[]>([]);
  const animFrameId = useRef<number>(0);
  const fontSizeRef = useRef<number>(56);

  // Parse color values
  const rgb1 = useMemo(() => hexToRgb(colors[0] || "#387458"), [colors]);
  const rgb2 = useMemo(() => hexToRgb(colors[1] || "#0f382c"), [colors]);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Split text into tokens (words and spaces/newlines)
  const tokens = useMemo(() => {
    const parts = text.split(/(\r?\n|\s+)/);
    let charCounter = 0;
    return parts.map(part => {
      const isNewline = part === "\n" || part === "\r\n";
      const isSpace = /^\s+$/.test(part) && !isNewline;
      const chars = isNewline || isSpace ? [] : part.split("");
      const startIndex = charCounter;
      charCounter += chars.length;
      return {
        part,
        isNewline,
        isSpace,
        chars,
        startIndex,
      };
    });
  }, [text]);

  const totalChars = useMemo(() => {
    let count = 0;
    tokens.forEach(t => { count += t.chars.length; });
    return count;
  }, [tokens]);

  // Initialize or resize letters state
  useEffect(() => {
    lettersState.current = Array.from({ length: totalChars }, () => ({
      z: 0,
      vz: 0,
      popZ: 0,
      popVz: 0,
      dirX: 0,
      dirY: 0,
    }));
  }, [totalChars]);

  // Measure font size
  useEffect(() => {
    if (containerRef.current) {
      const fs = parseFloat(window.getComputedStyle(containerRef.current).fontSize);
      if (!isNaN(fs) && fs > 0) fontSizeRef.current = fs;
    }
  }, [text, className]);

  // Pointer tracking
  useEffect(() => {
    if (paused || reducedMotion) return;
    const targetElement = area === "parent" && containerRef.current?.parentElement
      ? containerRef.current.parentElement
      : containerRef.current;

    if (!targetElement) return;

    const onPointerMove = (e: PointerEvent) => {
      pointerPos.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onPointerLeave = () => {
      pointerPos.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      if (pop <= 0) return;
      const fs = fontSizeRef.current;
      const clickX = e.clientX;
      const clickY = e.clientY;
      const maxDist = radius * fs * 1.5;

      letterRefs.current.forEach((el, i) => {
        if (!el || !lettersState.current[i]) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(clickX - cx, clickY - cy);
        if (dist < maxDist) {
          const impulse = (1 - dist / maxDist) * pop * fs * 0.45;
          lettersState.current[i].popVz += impulse;
        }
      });
    };

    targetElement.addEventListener("pointermove", onPointerMove as EventListener);
    targetElement.addEventListener("pointerleave", onPointerLeave as EventListener);
    targetElement.addEventListener("click", onClick as EventListener);

    return () => {
      targetElement.removeEventListener("pointermove", onPointerMove as EventListener);
      targetElement.removeEventListener("pointerleave", onPointerLeave as EventListener);
      targetElement.removeEventListener("click", onClick as EventListener);
    };
  }, [area, paused, reducedMotion, radius, pop]);

  // Intro wave trigger with IntersectionObserver
  useEffect(() => {
    if (!intro || paused || reducedMotion || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          introProgress.current = -0.3; // Start sweep
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [intro, paused, reducedMotion]);

  // Main animation loop
  useEffect(() => {
    if (paused || reducedMotion) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(0.04, (time - lastTime) / 1000);
      lastTime = time;

      const fs = fontSizeRef.current;
      const maxLiftPx = lift * fs;
      const maxDist = Math.max(20, radius * fs);
      const isFixed = view === "fixed";
      const fixedRad = (angle * Math.PI) / 180;
      const fixedDx = Math.cos(fixedRad);
      const fixedDy = Math.sin(fixedRad);

      // Advance intro sweep
      if (introProgress.current < 1.4) {
        introProgress.current += dt * 0.9;
      }

      letterRefs.current.forEach((el, i) => {
        if (!el || !lettersState.current[i]) return;
        const state = lettersState.current[i];
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        let targetZ = 0;
        let dirX = isFixed ? fixedDx : 0;
        let dirY = isFixed ? fixedDy : 0;

        // Pointer proximity
        if (pointerPos.current.active) {
          const dx = pointerPos.current.x - cx;
          const dy = pointerPos.current.y - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const factor = Math.max(0, 1 - dist / maxDist);
            // Smooth bell curve
            const smooth = factor * factor * (3 - 2 * factor);
            targetZ = smooth * maxLiftPx;

            if (!isFixed && dist > 1) {
              // Perspective vector away from cursor
              dirX = (-dx / dist) * perspective;
              dirY = (-dy / dist) * perspective;
            }
          }
        }

        // Intro wave sweep effect
        if (introProgress.current < 1.4 && totalChars > 0) {
          const charNorm = i / totalChars;
          const waveDist = Math.abs(introProgress.current - charNorm);
          if (waveDist < 0.25) {
            const waveFactor = Math.cos((waveDist / 0.25) * (Math.PI / 2));
            targetZ = Math.max(targetZ, waveFactor * maxLiftPx * 0.75);
          }
        }

        // Spring simulation for Z
        const k = 140 * stiffness;
        const d = 14 * damping;
        const fSpring = -k * (state.z - targetZ) - d * state.vz;
        state.vz += fSpring * dt;
        state.z += state.vz * dt;

        // Spring simulation for Pop jump
        const fPop = -k * 1.3 * state.popZ - d * 0.9 * state.popVz;
        state.popVz += fPop * dt;
        state.popZ += state.popVz * dt;

        // Total lift
        const currentLift = Math.max(0, state.z + state.popZ);

        // Smooth directions
        state.dirX += (dirX - state.dirX) * 0.25;
        state.dirY += (dirY - state.dirY) * 0.25;

        // Render extrusion layers & shadow
        if (currentLift < 0.2) {
          el.style.transform = "none";
          el.style.textShadow = "none";
        } else {
          // Generate 3D plate extrusion layers
          const numPlates = Math.max(2, Math.min(16, plates));
          const plateShadows: string[] = [];

          for (let p = 1; p <= numPlates; p++) {
            const t = p / numPlates;
            const pxOffset = t * currentLift * 0.55;
            const layerX = (state.dirX * pxOffset).toFixed(1);
            const layerY = (state.dirY * pxOffset + pxOffset * 0.35).toFixed(1);
            const layerColor = interpolateRgb(rgb1, rgb2, t);

            if (extrusion === "stack") {
              plateShadows.push(`${layerX}px ${layerY}px 0px ${layerColor}`);
            } else {
              plateShadows.push(`${layerX}px ${layerY}px 0.5px ${layerColor}`);
            }
          }

          // Soft ambient contact shadow under raised letters
          if (shadow > 0) {
            const sBlur = (currentLift * 0.75 + 4).toFixed(1);
            const sY = (currentLift * 0.8 + 2).toFixed(1);
            const sAlpha = Math.min(0.55, shadow * 0.35 * (currentLift / maxLiftPx + 0.3)).toFixed(3);
            plateShadows.push(`0px ${sY}px ${sBlur}px rgba(10, 25, 18, ${sAlpha})`);
          }

          el.style.textShadow = plateShadows.join(", ");
          el.style.transform = `translate3d(0, ${(-currentLift * 0.45).toFixed(1)}px, ${(currentLift).toFixed(1)}px)`;
        }
      });

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [paused, reducedMotion, stiffness, damping, lift, radius, plates, extrusion, perspective, view, angle, shadow, totalChars, rgb1, rgb2]);

  return (
    <Tag
      ref={containerRef}
      className={`inline-block select-none ${className}`}
      style={{
        color,
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...style,
      }}
      aria-label={text}
    >
      {tokens.map((token, tIdx) => {
        if (token.isNewline) {
          return <br key={`nl-${tIdx}`} />;
        }
        if (token.isSpace) {
          return <span key={`sp-${tIdx}`} className="inline-block">&nbsp;</span>;
        }

        return (
          <span
            key={`word-${tIdx}`}
            className="inline-block whitespace-nowrap"
            style={{ transformStyle: "preserve-3d" }}
          >
            {token.chars.map((char, cIdx) => {
              const charIndex = token.startIndex + cIdx;
              return (
                <span
                  key={`char-${charIndex}`}
                  ref={el => { letterRefs.current[charIndex] = el; }}
                  className="inline-block transition-transform duration-75"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, text-shadow",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
