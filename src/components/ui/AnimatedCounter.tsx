'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (value: number) => string;
  animationTrigger?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  formatter,
  animationTrigger = true
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(value);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!animationTrigger || value === previousValue.current) return;

    setIsAnimating(true);
    const startValue = previousValue.current;
    const difference = value - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (difference * easeOutCubic);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
        previousValue.current = value;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, animationTrigger]);

  const formatValue = (val: number) => {
    if (formatter) return formatter(val);
    
    const rounded = Number(val.toFixed(decimals));
    return rounded.toLocaleString();
  };

  const formattedValue = `${prefix}${formatValue(displayValue)}${suffix}`;

  return (
    <motion.span
      className={`${className} ${isAnimating ? 'text-green-500' : ''}`}
      animate={{
        scale: isAnimating ? [1, 1.1, 1] : 1,
        color: isAnimating ? ['currentColor', '#22c55e', 'currentColor'] : 'currentColor'
      }}
      transition={{
        scale: { duration: 0.3, ease: 'easeInOut' },
        color: { duration: 0.5, ease: 'easeInOut' }
      }}
    >
      {formattedValue}
    </motion.span>
  );
}

// Number flip animation for individual digits
interface FlipNumberProps {
  value: number;
  className?: string;
}

export function FlipNumber({ value, className = '' }: FlipNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    if (value !== displayValue) {
      setPreviousValue(displayValue);
      setDisplayValue(value);
    }
  }, [value, displayValue]);

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayValue}
          initial={{ y: value > previousValue ? 20 : -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: value > previousValue ? -20 : 20, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className="inline-block"
        >
          {displayValue.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Pulsing animation for vote count increases
interface PulsingCounterProps {
  value: number;
  className?: string;
  pulseColor?: string;
}

export function PulsingCounter({ 
  value, 
  className = '', 
  pulseColor = 'rgb(34, 197, 94)' // green-500
}: PulsingCounterProps) {
  const [shouldPulse, setShouldPulse] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (value > previousValue.current) {
      setShouldPulse(true);
      const timer = setTimeout(() => setShouldPulse(false), 600);
      previousValue.current = value;
      return () => clearTimeout(timer);
    }
    previousValue.current = value;
  }, [value]);

  return (
    <motion.span
      className={className}
      animate={{
        scale: shouldPulse ? [1, 1.15, 1] : 1,
        color: shouldPulse ? [pulseColor, pulseColor, 'currentColor'] : 'currentColor'
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut'
      }}
    >
      {value.toLocaleString()}
    </motion.span>
  );
}