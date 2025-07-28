'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
  variant?: 'default' | 'celebration' | 'heart' | 'star';
  origin?: { x: number; y: number };
}

export function ConfettiAnimation({ 
  trigger, 
  onComplete, 
  variant = 'default',
  origin = { x: 0.5, y: 0.5 }
}: ConfettiAnimationProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const runAnimation = async () => {
      try {
        switch (variant) {
          case 'celebration':
            // Multi-burst celebration animation
            await Promise.all([
              confetti({
                particleCount: 100,
                spread: 70,
                origin,
                colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
              }),
              new Promise(resolve => setTimeout(resolve, 200)),
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: origin.x - 0.1, y: origin.y },
                colors: ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3']
              }),
              new Promise(resolve => setTimeout(resolve, 200)),
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: origin.x + 0.1, y: origin.y },
                colors: ['#ffbe76', '#ff7675', '#fd79a8', '#fdcb6e']
              })
            ]);
            break;

          case 'heart':
            // Heart-shaped confetti
            confetti({
              particleCount: 60,
              spread: 55,
              origin,
              shapes: ['square'],
              colors: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ff4757', '#ff3838'],
              scalar: 1.2,
              gravity: 0.8
            });
            break;

          case 'star':
            // Star burst animation
            confetti({
              particleCount: 80,
              spread: 80,
              origin,
              shapes: ['star'],
              colors: ['#ffd700', '#ffed4e', '#ffeaa7', '#fdcb6e', '#e17055'],
              scalar: 1.5,
              gravity: 0.6
            });
            break;

          default:
            // Default vote celebration
            confetti({
              particleCount: 75,
              spread: 65,
              origin,
              colors: ['#4ecdc4', '#45b7d1', '#96ceb4', '#74b9ff', '#0984e3'],
              scalar: 1.1,
              gravity: 0.7
            });
            break;
        }

        // Clean up after animation
        timeoutRef.current = setTimeout(() => {
          onComplete?.();
        }, 3000);

      } catch (error) {
        console.error('Confetti animation error:', error);
        onComplete?.();
      }
    };

    runAnimation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, variant, origin, onComplete]);

  return null; // This component doesn't render anything visible
}

// Hook for easier confetti usage
export function useConfetti() {
  const triggerConfetti = (
    element?: HTMLElement | null,
    variant: ConfettiAnimationProps['variant'] = 'default'
  ) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      };
      
      confetti({
        particleCount: variant === 'celebration' ? 100 : 75,
        spread: variant === 'celebration' ? 70 : 65,
        origin,
        colors: variant === 'heart' 
          ? ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ff4757'] 
          : ['#4ecdc4', '#45b7d1', '#96ceb4', '#74b9ff', '#0984e3'],
        scalar: 1.1,
        gravity: 0.7
      });
    } else {
      // Default center confetti
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#4ecdc4', '#45b7d1', '#96ceb4', '#74b9ff', '#0984e3']
      });
    }
  };

  return { triggerConfetti };
}