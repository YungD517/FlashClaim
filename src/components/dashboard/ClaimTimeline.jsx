import { Clock, CheckCircle, XCircle, AlertTriangle, Loader } from 'lucide-react';
import StatusChip from '../common/StatusChip';

const STATUS_ICON = {
  approved: { icon: CheckCircle, color: 'text-emerald-500' },
  denied: { icon: XCircle, color: 'text-slate-400' },
  flagged: { icon: AlertTriangle, color: 'text-red-500' },
  pending: { icon: Loader, color: 'text-amber-500' },
};

export default function ClaimTimeline({ claims, onSelectClaim }) {
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  if (!claims.length) {
    return (
      <div className="card p-8 text-center">
        <Clock size={32} className="text-slate-300 mx-auto mb-3" />
        <p className="font-medium text-slate-500">No claims yet</p>
        <p className="text-sm text-slate-400 mt-1">Your claim history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {claims.map((claim, index) => {
        const { icon: Icon, color } = STATUS_ICON[claim.status] || STATUS_ICON.pending;
        const isLast = index === claims.length - 1;

        return (
          <div key={claim.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-900 ${
                claim.status === 'approved' ? 'border-emerald-300' :
                claim.status === 'flagged' ? 'border-red-300' :
                claim.status === 'denied' ? 'border-slate-300' :
                'border-amber-300'
              }`}>
                <Icon size={14} className={color} />
              </div>
              {!isLast && <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 my-1" />}
            </div>

            {/* Content */}
            <div
              onClick={() => onSelectClaim?.(claim)}
              className="flex-1 card p-4 mb-3 hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-semibold text-sm text-brand-600">{claim.id}</span>
                    <StatusChip status={claim.status} />
                  </div>
                  <p className="text-sm font-medium mt-1">{claim.damageType}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold">${claim.estimatedRepair?.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {formatDate(claim.submittedAt)} · {formatTime(claim.submittedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
