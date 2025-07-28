'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'default' | 'card' | 'inline';
}

export function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
  variant = 'default',
}: ErrorMessageProps) {
  const baseClasses = 'flex flex-col items-center text-center';
  
  const variants = {
    default: 'p-8 bg-red-50 border-2 border-red-200 rounded-lg',
    card: 'p-6 bg-white border border-red-200 rounded-lg shadow-sm',
    inline: 'p-4 bg-red-50 border-l-4 border-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(baseClasses, variants[variant], className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
      <p className="text-red-600 mb-4 max-w-md">{message}</p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
}