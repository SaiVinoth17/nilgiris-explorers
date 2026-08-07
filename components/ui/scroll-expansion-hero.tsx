'use client';

import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  firstWordClass?: string;
  restOfTitleClass?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  firstWordClass = 'text-white',
  restOfTitleClass = 'text-emerald-400',
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this 200vh section natively
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out scroll progress for 60fps/120fps fluid physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 25,
    restDelta: 0.0001,
  });

  // GPU-accelerated transforms
  const mediaScale = useTransform(smoothProgress, [0, 0.65], [1, 3.6]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const textLeftX = useTransform(smoothProgress, [0, 0.55], ['0vw', '-75vw']);
  const textRightX = useTransform(smoothProgress, [0, 0.55], ['0vw', '75vw']);

  // Content reveal transforms
  const contentOpacity = useTransform(smoothProgress, [0.4, 0.85], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.4, 0.85], [30, 0]);
  const mediaOverlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.5, 0.15]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className="relative w-full h-[150dvh] sm:h-[180dvh] md:h-[220vh] bg-[#050A08]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] md:h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <Image
            src={bgImageSrc}
            alt="Nilgiris Background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </motion.div>

        {/* Central Content & Expanding Media Box */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
          
          {/* Media Box */}
          <motion.div
            className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            style={{
              width: '320px',
              height: '420px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              scale: mediaScale,
            }}
          >
            {mediaType === 'video' ? (
              <div className="relative w-full h-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover rounded-xl"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <motion.div
                  className="absolute inset-0 bg-black rounded-xl pointer-events-none"
                  style={{ opacity: mediaOverlayOpacity }}
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={mediaSrc}
                  alt={title || 'Nilgiris Media'}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            )}
          </motion.div>

          {/* Subtitle & Scroll cue centered below hero titles */}
          <div className="absolute top-[62%] sm:top-[65%] z-20 flex flex-col items-center text-center px-4 pointer-events-none">
            {date && (
              <motion.p
                className="text-base sm:text-lg md:text-xl text-emerald-200 font-serif italic drop-shadow-md tracking-wide max-w-2xl mb-2"
                style={{ x: textLeftX }}
              >
                {date}
              </motion.p>
            )}
            {scrollToExpand && (
              <motion.p
                className="text-emerald-400 font-semibold text-center uppercase tracking-[0.25em] text-xs sm:text-sm drop-shadow-md"
                style={{ x: textRightX }}
              >
                {scrollToExpand}
              </motion.p>
            )}
          </div>

          {/* Splitting Title Text */}
          <div
            className={`flex items-center justify-center text-center gap-3 sm:gap-6 w-full relative z-20 flex-col sm:flex-row px-4 pointer-events-none ${
              textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
            }`}
          >
            <motion.h2
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black drop-shadow-2xl tracking-tight font-display ${firstWordClass}`}
              style={{ x: textLeftX }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black drop-shadow-2xl tracking-tight font-display ${restOfTitleClass}`}
              style={{ x: textRightX }}
            >
              {restOfTitle}
            </motion.h2>
          </div>

          {/* Revealed Children Section */}
          <motion.div
            className="absolute bottom-4 sm:bottom-8 z-30 w-full max-w-5xl px-4 pointer-events-auto"
            style={{
              opacity: contentOpacity,
              y: contentY,
            }}
          >
            {children}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
