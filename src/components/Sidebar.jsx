import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Shield, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();

  const policyholderLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/claims/new', icon: FilePlus, label: 'New Claim' },
  ];

  const adminLinks = [
    { to: '/admin', icon: Shield, label: 'Admin Dashboard' },
  ];

  const links = user?.role === 'admin' ? adminLinks : policyholderLinks;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-semibold text-sm">Menu</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900">
            <p className="text-xs font-semibold text-brand-700 dark:text-brand-300">FlashClaim v1.0</p>
            <p className="text-[10px] text-brand-600/70 dark:text-brand-400/70 mt-0.5">AI-Powered Claims Processing</p>
          </div>
        </div>
      </aside>
    </>
  );
}
