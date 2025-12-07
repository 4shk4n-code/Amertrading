"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-16">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-[var(--foreground)]">
              Something went wrong
            </h1>
            <p className="mb-8 text-[var(--foreground)]/70">
              We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--primary)]/90"
                aria-label="Reload page"
              >
                Reload Page
              </button>
              <Link
                href="/en"
                className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-6 py-3 font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--card-bg)]/80"
                aria-label="Go to homepage"
              >
                Go to Homepage
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-[var(--foreground)]/60">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-[var(--card-bg)] p-4 text-xs text-[var(--foreground)]">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

