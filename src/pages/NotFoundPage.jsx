import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-slate-950">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            Flash<span className="text-brand-600">Claim</span>
          </span>
        </div>

        {/* 404 */}
        <div className="relative mb-8">
          <p className="text-[120px] sm:text-[160px] font-black text-slate-100 dark:text-slate-800 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-brand-50 dark:bg-brand-950/30 rounded-full flex items-center justify-center">
              <Search size={32} className="text-brand-600" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
          Claim not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or may have been moved.
          Even our AI couldn't track this one down.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <Link to="/login" className="btn-secondary flex items-center justify-center gap-2">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
