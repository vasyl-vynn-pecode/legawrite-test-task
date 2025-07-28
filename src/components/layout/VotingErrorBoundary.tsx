'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VotingErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void; resetErrorBoundary: () => void }>;
}

interface VotingErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
}

class VotingErrorBoundary extends React.Component<VotingErrorBoundaryProps, VotingErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: VotingErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<VotingErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error details for debugging
    console.error('VotingErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: 'VotingErrorBoundary',
      timestamp: new Date().toISOString(),
      errorId: this.state.errorId,
    });

    // Report error to monitoring service (if available)
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: React.ErrorInfo) => {
    // In a real app, you would send this to your error reporting service
    // like Sentry, Bugsnag, or custom analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          error_boundary: 'VotingErrorBoundary',
          component_stack: errorInfo.componentStack,
        },
      });
    }
  };

  retry = () => {
    // Clear any existing timeout
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    // Add a small delay to prevent rapid retry attempts
    this.retryTimeoutId = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: '',
      });
    }, 1000);
  };

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || VotingErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          retry={this.retry}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

interface VotingErrorFallbackProps {
  error: Error;
  retry: () => void;
  resetErrorBoundary: () => void;
}

function VotingErrorFallback({ error, retry, resetErrorBoundary }: VotingErrorFallbackProps) {
  const isVotingError = error.message.toLowerCase().includes('vote');
  const isDataFetchError = error.message.toLowerCase().includes('fetch') || 
                          error.message.toLowerCase().includes('load');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50 border-2 border-red-200 rounded-lg mx-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </motion.div>

      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-800 mb-3">
          {isVotingError 
            ? 'Voting Error' 
            : isDataFetchError 
              ? 'Data Loading Error'
              : 'Something Went Wrong'}
        </h2>
        
        <p className="text-red-700 mb-2 font-medium">
          {isVotingError 
            ? 'There was a problem submitting your vote.'
            : isDataFetchError
              ? 'Unable to load contestant data.'
              : 'An unexpected error occurred in the voting system.'}
        </p>
        
        <p className="text-red-600 text-sm mb-6">
          {error.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={retry}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50"
          >
            <Home className="w-4 h-4" />
            Reload Page
          </Button>
        </div>

        <div className="mt-6 p-3 bg-red-100 border border-red-300 rounded text-sm">
          <p className="text-red-800 font-medium mb-1">What you can do:</p>
          <ul className="text-red-700 text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Wait a moment and try again</li>
            {isVotingError && <li>• Your previous votes are safely saved</li>}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default VotingErrorBoundary;