import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/common/ThemeToggle';

export default function LoginPage() {
  const { login } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError(result.error);
    }
  };

  const quickLogin = async (role) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const e = role === 'admin' ? 'admin@flashclaim.com' : 'user@flashclaim.com';
    const result = login(e, 'demo');
    setLoading(false);
    if (result.success) navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Zap size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight">FlashClaim</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Claims processed<br />in minutes, not weeks.
            </h1>
            <p className="text-brand-200 text-lg max-w-md">
              AI-powered damage assessment delivers instant, accurate claim settlements
              your policyholders can trust.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                ['2.4 min', 'Avg. Processing'],
                ['94%', 'AI Accuracy'],
                ['73%', 'Auto-Approved'],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold">{stat}</p>
                  <p className="text-sm text-brand-300 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-brand-300">© 2026 FlashClaim. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">FlashClaim</span>
            </div>
            <ThemeToggle />
          </div>

          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo quick login */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400 text-center mb-3">Demo Quick Access</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => quickLogin('user')} className="btn-secondary text-sm py-2">
                Policyholder
              </button>
              <button onClick={() => quickLogin('admin')} className="btn-secondary text-sm py-2">
                Admin / Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
