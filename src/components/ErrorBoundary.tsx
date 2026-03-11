import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log but never expose to user
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[50vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-bold text-primary mb-3">
                Something went wrong
              </h2>
              <p className="text-muted-foreground mb-6">
                Please refresh the page or contact us at{" "}
                <a
                  href="mailto:info@applyza.com"
                  className="text-secondary underline hover:no-underline"
                >
                  info@applyza.com
                </a>
              </p>
              <Button
                variant="teal"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
              >
                Refresh Page
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
