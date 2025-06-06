import { Link } from "@tanstack/react-router";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useAuthStore } from "./store/auth";

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-taskhub-light via-taskhub-middle to-taskhub-dark overflow-hidden border-t-[2px] border-t-taskhub-middle/30">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="mb-8 relative">
          <div className="bg-taskhub-darker rounded-3xl p-6 animate-float">
            <CheckCircle size={64} className="text-font-primarly" />
          </div>
          <Sparkles
            size={24}
            className="absolute -top-2 -right-2 text-yellow-400 animate-spin"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-font-primarly mb-6 tracking-tight">
          Task
          <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
            Hub
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-font-secondary mb-12 max-w-2xl leading-relaxed">
          Organize your life, one task at a time.
          <br />
          <span className="text-font-primarly/80">
            Simple. Powerful. Beautiful.
          </span>
        </p>

        <Link
          to={ isAuthenticated ? "/explore" : "/auth/login" }
          className="cursor-pointer group bg-taskhub-darker hover:bg-taskhub-dark text-font-primarly font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 text-lg"
        >
          Get Started
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>

        <div className="flex flex-wrap gap-4 mt-16 justify-center">
          {["Free Forever", "No Sign-up Required", "Privacy First"].map(
            (feature, index) => (
              <div
                key={feature}
                className="bg-taskhub-middle/60 backdrop-blur-sm text-font-primarly px-6 py-3 rounded-full text-sm font-medium border border-taskhub-darker/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {feature}
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
