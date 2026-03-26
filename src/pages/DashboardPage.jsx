import { useNavigate } from 'react-router-dom';
import { FilePlus, FileCheck, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useClaims } from '../context/ClaimsContext';
import ClaimTimeline from '../components/dashboard/ClaimTimeline';

export default function DashboardPage() {
  const { user } = useAuth();
  const { getUserClaims } = useClaims();
  const navigate = useNavigate();
  const claims = getUserClaims(user?.id);

  const approved = claims.filter((c) => c.status === 'approved');
  const pending = claims.filter((c) => c.status === 'pending');
  const totalPayout = approved.reduce((sum, c) => sum + (c.payout || 0), 0);

  const stats = [
    { label: 'Total Claims', value: claims.length, icon: FileCheck, color: 'text-brand-600', bg: 'bg-brand-50 dark:bg-brand-950/30' },
    { label: 'Pending', value: pending.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Total Received', value: `$${totalPayout.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here's an overview of your claims.</p>
        </div>
        <button onClick={() => navigate('/claims/new')} className="btn-primary flex items-center gap-2 w-fit">
          <FilePlus size={18} /> New Claim
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-4 flex items-center gap-4">
            <div className={`p-2.5 rounded-lg ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Claim History */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Claim History</h2>
        <ClaimTimeline
          claims={claims}
          onSelectClaim={(claim) => navigate(`/claims/${claim.id}/result`)}
        />
      </div>
    </div>
  );
}
