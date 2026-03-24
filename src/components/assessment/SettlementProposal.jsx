import { useState } from 'react';
import { DollarSign, Zap, CheckCircle, Shield } from 'lucide-react';

export default function SettlementProposal({ claim }) {
  const [accepted, setAccepted] = useState(false);

  if (!claim) return null;

  const items = [
    { label: 'AI Damage Assessment', value: claim.estimatedRepair, type: 'neutral' },
    { label: 'Labor & Parts Estimate', value: Math.round(claim.estimatedRepair * 0.65), type: 'neutral' },
    { label: 'Paint & Finishing', value: Math.round(claim.estimatedRepair * 0.35), type: 'neutral' },
    { label: 'Policy Deductible', value: -claim.deductible, type: 'deduction' },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} />
          <h3 className="font-semibold">Settlement Proposal</h3>
        </div>
        <p className="text-sm text-brand-100">Claim {claim.id} · AI-Generated Estimate</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Line items */}
        <div className="space-y-3">
          {items.map(({ label, value, type }) => (
            <div key={label} className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">{label}</span>
              <span className={`font-medium ${type === 'deduction' ? 'text-red-500' : ''}`}>
                {type === 'deduction' ? '-' : ''}${Math.abs(value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-700" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Instant Payout Amount</p>
            <p className="text-xs text-slate-400 mt-0.5">Funds deposited within 24 hours</p>
          </div>
          <p className="text-3xl font-bold text-emerald-600">${claim.payout?.toLocaleString()}</p>
        </div>

        {/* AI confidence */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
          <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-brand-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium">AI Confidence: {claim.aiConfidence}%</p>
            <p className="text-xs text-slate-400">Based on damage pattern analysis and repair cost database</p>
          </div>
        </div>

        {/* Accept button */}
        {!accepted ? (
          <button
            onClick={() => setAccepted(true)}
            className="w-full flex items-center justify-center gap-2 btn-primary py-3 text-base"
          >
            <DollarSign size={18} />
            Accept Instant Payout
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <CheckCircle size={18} />
            <span className="font-semibold">Payout Accepted — Processing</span>
          </div>
        )}

        <p className="text-[11px] text-center text-slate-400">
          By accepting, you agree to the settlement terms. You may dispute within 30 days.
        </p>
      </div>
    </div>
  );
}
