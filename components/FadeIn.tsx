import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  fullWidth?: boolean;
  blur?: boolean;
  scale?: boolean;
  viewportMargin?: string;
  staggerChildren?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  className = '',
  fullWidth = false,
  blur = false,
  scale = false,
  viewportMargin = "-10%",
  staggerChildren = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin });

  const getInitial = () => {
    const initial: any = { opacity: 0 };
    if (direction === 'up') initial.y = 40;
    if (direction === 'down') initial.y = -40;
    if (direction === 'left') initial.x = 40;
    if (direction === 'right') initial.x = -40;
    if (blur) initial.filter = "blur(10px)";
    if (scale) initial.scale = 0.95;
    return initial;
  };

  const getFinal = () => {
    const final: any = { opacity: 1, x: 0, y: 0 };
    if (blur) final.filter = "blur(0px)";
    if (scale) final.scale = 1;
    return final;
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getFinal() : getInitial()}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.25, 0.4, 0.25, 1] 
      }}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

// New Component: Staggered Character Reveal for Hero
export const CharReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-[130%] -top-[15%] relative">
         <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

export const ScrollRevealText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.5"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <motion.p 
      ref={ref} 
      style={{ opacity }} 
      className={`transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.p>
  );
};

export const ScrollProgressLine: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={ref} className={`w-[1px] bg-zinc-100 relative ${className}`}>
      <motion.div 
        style={{ scaleY: scrollYProgress }} 
        className="absolute top-0 left-0 w-full h-full bg-zinc-900 origin-top"
      />
    </div>
  );
};