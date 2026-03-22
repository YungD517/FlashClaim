import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send, Car, Camera, FileCheck } from 'lucide-react';
import { useClaims } from '../context/ClaimsContext';
import VehicleInfoStep from '../components/claim-wizard/VehicleInfoStep';
import PhotoUploadStep from '../components/claim-wizard/PhotoUploadStep';
import ReviewSubmitStep from '../components/claim-wizard/ReviewSubmitStep';

const STEPS = [
  { id: 0, label: 'Vehicle Info', icon: Car },
  { id: 1, label: 'Upload Photos', icon: Camera },
  { id: 2, label: 'Review & Submit', icon: FileCheck },
];

export default function NewClaimPage() {
  const navigate = useNavigate();
  const { addClaim } = useClaims();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    policyNumber: '',
    licensePlate: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    damageType: '',
    damageDescription: '',
    photos: [],
  });

  const canNext = () => {
    if (step === 0) return data.policyNumber && data.vehicleMake && data.vehicleModel;
    if (step === 1) return data.damageType && data.damageDescription;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    const newClaim = addClaim({
      ...data,
      userId: '1',
      estimatedRepair: Math.floor(Math.random() * 5000) + 500,
      deductible: 500,
      payout: 0,
      boundingBoxes: [
        { x: 15, y: 45, w: 45, h: 30, label: 'Primary Damage', severity: 'moderate' },
        { x: 50, y: 55, w: 25, h: 20, label: 'Secondary', severity: 'minor' },
      ],
    });

    // Calculate payout
    newClaim.payout = Math.max(0, newClaim.estimatedRepair - newClaim.deductible);

    navigate(`/claims/${newClaim.id}/result`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map(({ id, label, icon: Icon }) => (
          <div key={id} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step === id
                    ? 'bg-brand-600 text-white'
                    : step > id
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Icon size={16} />
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step === id ? 'text-brand-600' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {id < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${step > id ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card p-6 sm:p-8">
        {step === 0 && <VehicleInfoStep data={data} onChange={setData} />}
        {step === 1 && <PhotoUploadStep data={data} onChange={setData} />}
        {step === 2 && <ReviewSubmitStep data={data} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-secondary flex items-center gap-1 disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="btn-primary flex items-center gap-1"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} /> Submit Claim
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
