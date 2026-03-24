import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu } from 'lucide-react';
import { useClaims } from '../context/ClaimsContext';
import AIBoundingBox from '../components/assessment/AIBoundingBox';
import SettlementProposal from '../components/assessment/SettlementProposal';
import StatusChip from '../components/common/StatusChip';

export default function ClaimResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClaimById } = useClaims();
  const [phase, setPhase] = useState('scanning'); // scanning → analyzing → complete
  const [progress, setProgress] = useState(0);

  const claim = getClaimById(id);

  useEffect(() => {
    if (!claim) return;

    // Simulate AI analysis phases
    const timer1 = setTimeout(() => setPhase('analyzing'), 2500);
    const timer2 = setTimeout(() => setPhase('complete'), 4500);

    // Progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 80);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, [claim]);

  if (!claim) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">Claim not found.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">{claim.id}</h1>
            <StatusChip status={claim.status} />
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            {claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel} · {claim.damageType}
          </p>
        </div>
      </div>

      {/* Progress bar (shows during analysis) */}
      {phase !== 'complete' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center">
              <Cpu size={20} className="text-brand-600 animate-pulse" />
            </div>
            <div>
              <p className="font-semibold">
                {phase === 'scanning' ? 'Scanning damage...' : 'Analyzing repair costs...'}
              </p>
              <p className="text-sm text-slate-400">
                {phase === 'scanning'
                  ? 'AI is detecting damage regions in the uploaded photos'
                  : 'Cross-referencing with repair cost database'}
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 text-right mt-1">{Math.min(progress, 100)}%</p>
        </div>
      )}

      {/* AI Assessment */}
      <div>
        <h2 className="text-sm font-semibold mb-3">AI Damage Assessment</h2>
        <AIBoundingBox
          boundingBoxes={claim.boundingBoxes}
          scanning={phase === 'scanning'}
        />
      </div>

      {/* Damage details */}
      {phase === 'complete' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">AI Confidence</p>
            <p className="text-2xl font-bold text-brand-600 mt-1">{claim.aiConfidence}%</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Risk Score</p>
            <p className={`text-2xl font-bold mt-1 ${
              claim.riskScore >= 80 ? 'text-emerald-600' :
              claim.riskScore >= 60 ? 'text-amber-600' : 'text-red-600'
            }`}>{claim.riskScore}</p>
          </div>
        </div>
      )}

      {/* Settlement Proposal */}
      {phase === 'complete' && <SettlementProposal claim={claim} />}
    </div>
  );
}
