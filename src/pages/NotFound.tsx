import { useLocation, Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar solid />

      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(265 44% 44% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container relative z-10 pt-20 text-center">
          <p className="text-6xl font-bold text-white/20 mb-2">404</p>
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 flex-1 flex items-start justify-center">
        <div className="text-center">
          <Button size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6" asChild>
            <Link to="/"><ArrowLeft size={14} className="mr-1.5" /> Back to Home</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
