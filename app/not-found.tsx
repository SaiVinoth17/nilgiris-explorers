import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1D17] flex flex-col items-center justify-center p-4 text-center">
      <div className="font-display text-9xl font-bold text-[#00D26A]/20 mb-4 tracking-tighter">
        404
      </div>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
        Oops! You've Explored <span className="gradient-text">Too Far</span>
      </h1>
      <p className="text-white/60 text-lg max-w-md mx-auto mb-10">
        The page you are looking for has either been moved, deleted, or never existed in the Nilgiris.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <Link href="/tours" className="btn-secondary">
          View Tour Packages
        </Link>
      </div>
    </div>
  );
}
