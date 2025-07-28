'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DataFetchErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

interface DataFetchErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  isRetrying: boolean;
}

class DataFetchErrorBoundary extends React.Component<
  DataFetchErrorBoundaryProps,
  DataFetchErrorBoundaryState
> {
  private maxRetries = 3;
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: DataFetchErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
      isRetrying: false,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<DataFetchErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DataFetchErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
      timestamp: new Date().toISOString(),
    });

    // Auto-retry for data fetch errors (but not for component errors)
    if (
      this.isDataFetchError(error) &&
      this.state.retryCount < this.maxRetries
    ) {
      this.autoRetry();
    }
  }

  private isDataFetchError = (error: Error): boolean => {
    const message = error.message.toLowerCase();
    return (
      message.includes('fetch') ||
      message.includes('network') ||
      message.includes('load') ||
      message.includes('timeout') ||
      message.includes('connection')
    );
  };

  private autoRetry = () => {
    this.setState({ isRetrying: true });

    this.retryTimeout = setTimeout(
      () => {
        this.setState(prevState => ({
          hasError: false,
          error: null,
          retryCount: prevState.retryCount + 1,
          isRetrying: false,
        }));
      },
      2000 * (this.state.retryCount + 1)
    ); // Exponential backoff
  };

  retry = () => {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    this.setState({
      hasError: false,
      error: null,
      isRetrying: false,
    });
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DataFetchErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          retry={this.retry}
          retryCount={this.state.retryCount}
          maxRetries={this.maxRetries}
          isRetrying={this.state.isRetrying}
        />
      );
    }

    return this.props.children;
  }
}

interface DataFetchErrorFallbackProps {
  error: Error;
  retry: () => void;
  retryCount?: number;
  maxRetries?: number;
  isRetrying?: boolean;
}

function DataFetchErrorFallback({
  error,
  retry,
  retryCount = 0,
  maxRetries = 3,
  isRetrying = false,
}: DataFetchErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
      >
        <motion.div
          animate={isRetrying ? { rotate: 360 } : {}}
          transition={{
            duration: 2,
            repeat: isRetrying ? Infinity : 0,
            ease: 'linear',
          }}
          className="mb-6"
        >
          {isRetrying ? (
            <RefreshCw className="w-16 h-16 text-blue-500 mx-auto" />
          ) : (
            <Wifi className="w-16 h-16 text-red-500 mx-auto" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {isRetrying ? 'Retrying...' : 'Connection Problem'}
        </h2>

        <p className="text-gray-600 mb-2">
          {isRetrying
            ? 'Attempting to reload contestant data...'
            : 'Unable to load the voting data. Please check your connection and try again.'}
        </p>

        <p className="text-sm text-gray-500 mb-6">{error.message}</p>

        {retryCount > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-center justify-center mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-sm font-medium text-yellow-800">
                Retry attempt {retryCount} of {maxRetries}
              </span>
            </div>
          </div>
        )}

        {!isRetrying && (
          <div className="space-y-3">
            <Button onClick={retry} className="w-full" disabled={isRetrying}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Reload Page
            </Button>
          </div>
        )}

        <div className="mt-6 text-left">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Troubleshooting tips:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Disable VPN if you&apos;re using one</li>
            <li>• Try a different network</li>
            <li>• Clear browser cache and cookies</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default DataFetchErrorBoundary;
