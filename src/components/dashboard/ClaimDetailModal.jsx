import { X, CheckCircle, XCircle, AlertTriangle, Car, DollarSign } from 'lucide-react';
import StatusChip from '../common/StatusChip';
import AIBoundingBox from '../assessment/AIBoundingBox';

export default function ClaimDetailModal({ claim, onClose, onUpdateStatus }) {
  if (!claim) return null;

  const riskColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30';
    if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30';
    return 'text-red-600 bg-red-50 dark:bg-red-950/30';
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50 fade-in" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white dark:bg-slate-900 z-50 slide-in overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="font-bold text-lg">{claim.id}</h2>
            <StatusChip status={claim.status} />
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* AI Assessment Image */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Car size={16} className="text-brand-600" /> AI Damage Assessment
            </h3>
            <AIBoundingBox boundingBoxes={claim.boundingBoxes} />
          </div>

          {/* Risk & Confidence */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${riskColor(claim.riskScore)}`}>
              <p className="text-xs font-medium opacity-70">Risk Score</p>
              <p className="text-2xl font-bold">{claim.riskScore}</p>
            </div>
            <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-600">
              <p className="text-xs font-medium opacity-70">AI Confidence</p>
              <p className="text-2xl font-bold">{claim.aiConfidence}%</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Make', claim.vehicleMake],
                ['Model', claim.vehicleModel],
                ['Year', claim.vehicleYear],
                ['Color', claim.vehicleColor],
                ['Plate', claim.licensePlate],
                ['Policy', claim.policyNumber],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Damage Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Damage Details</h3>
            <p className="text-xs text-slate-400 mb-1">{claim.damageType}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{claim.damageDescription}</p>
          </div>

          {/* Financial */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign size={16} className="text-brand-600" /> Settlement Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Repair</span>
                <span className="font-medium">${claim.estimatedRepair?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deductible</span>
                <span className="font-medium text-red-600">-${claim.deductible?.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between">
                <span className="font-semibold">Payout Amount</span>
                <span className="font-bold text-emerald-600">${claim.payout?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {claim.status === 'pending' || claim.status === 'flagged' ? (
            <div className="flex gap-3">
              <button
                onClick={() => onUpdateStatus(claim.id, 'approved')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                <CheckCircle size={16} /> Approve
              </button>
              <button
                onClick={() => onUpdateStatus(claim.id, 'denied')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <XCircle size={16} /> Deny
              </button>
              {claim.status !== 'flagged' && (
                <button
                  onClick={() => onUpdateStatus(claim.id, 'flagged')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-amber-300 dark:border-amber-700 text-amber-600 font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                >
                  <AlertTriangle size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-center text-sm text-slate-500">
              This claim has been {claim.status}.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
