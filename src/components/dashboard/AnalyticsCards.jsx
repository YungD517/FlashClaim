import { FileCheck, Clock, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';
import { ANALYTICS } from '../../data/mockData';

const cards = [
  { label: 'Total Claims', value: ANALYTICS.totalClaims.toLocaleString(), icon: FileCheck, color: 'text-brand-600', bg: 'bg-brand-50 dark:bg-brand-950/30' },
  { label: 'This Month', value: ANALYTICS.claimsThisMonth, icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { label: 'Avg. Processing', value: ANALYTICS.avgProcessingTime, icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { label: 'Auto-Approval', value: `${ANALYTICS.autoApprovalRate}%`, icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { label: 'Total Payouts', value: ANALYTICS.totalPayouts, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { label: 'Flagged Rate', value: `${ANALYTICS.flaggedRate}%`, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card p-4 lg:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className={`p-2 rounded-lg ${bg}`}>
              <Icon size={20} className={color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
