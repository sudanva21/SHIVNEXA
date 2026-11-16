"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// 36 precomputed, harmonic durations between 18s and 28s.
// Stable across all renders to eliminate Framer Motion resets and CPU thrashing.
const HARMONIC_DURATIONS = [
    22.4, 25.8, 20.3, 27.5, 23.1, 28.7, 21.6, 26.2, 24.5, 29.1,
    20.8, 25.3, 28.0, 22.9, 26.8, 21.2, 27.4, 23.7, 28.5, 22.1,
    26.6, 24.2, 29.5, 21.9, 25.7, 27.8, 23.4, 28.2, 22.7, 26.9,
    24.8, 29.3, 21.5, 25.9, 27.2, 23.8,
];

export function FloatingPaths({
    position,
    className = "text-slate-950 dark:text-white",
}: {
    position: number;
    className?: string;
}) {
    // Retain exact 36-path mathematical coordinate equations from React Bits
    const paths = useMemo(() => {
        return Array.from({ length: 36 }, (_, i) => ({
            id: i,
            d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
            color: `rgba(15,23,42,${0.1 + i * 0.03})`,
            // Thin, elegant stroke width (0.6px to 0.95px)
            width: 0.6 + (i % 4) * 0.1,
            duration: HARMONIC_DURATIONS[i % HARMONIC_DURATIONS.length],
            delay: (i * 0.2) % 4,
            baseOpacity: 0.12 + i * 0.012,
        }));
    }, [position]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden [transform:translateZ(0)]">
            <svg
                className={`w-full h-full ${className}`}
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="none"
                shapeRendering="geometricPrecision"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={path.baseOpacity}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{
                            pathLength: 0.88,
                            pathOffset: 0,
                            opacity: 0.7,
                            x: 0,
                            y: 0,
                        }}
                        animate={{
                            // 1. Lines NEVER vanish or blink: pathLength stays 88% to 100% drawn
                            pathLength: [0.88, 1, 0.88],
                            // 2. Smooth drift without pushing lines off screen (0 -> 0.12 -> 0)
                            pathOffset: [0, 0.12, 0],
                            // 3. Gentle breathing luminance instead of jarring on/off strobing
                            opacity: [0.65, 1, 0.65],
                            // 4. GPU-accelerated micro-floating wave for silky organic motion
                            x: [0, position * (8 + (path.id % 4) * 2), 0],
                            y: [0, (path.id % 2 === 0 ? -6 : 6), 0],
                        }}
                        transition={{
                            duration: path.duration,
                            delay: path.delay,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div
                        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Button
                            variant="ghost"
                            className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Discover Excellence
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
