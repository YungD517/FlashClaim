import { Car, Camera, FileText } from 'lucide-react';

export default function ReviewSubmitStep({ data }) {
  const photos = data.photos || [];

  const sections = [
    {
      icon: Car,
      title: 'Vehicle Details',
      items: [
        ['Policy', data.policyNumber || '—'],
        ['Vehicle', `${data.vehicleYear || ''} ${data.vehicleMake || ''} ${data.vehicleModel || ''}`.trim() || '—'],
        ['Color', data.vehicleColor || '—'],
        ['Plate', data.licensePlate || '—'],
      ],
    },
    {
      icon: FileText,
      title: 'Damage Information',
      items: [
        ['Type', data.damageType || '—'],
        ['Description', data.damageDescription || '—'],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Review & Submit</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review your claim details before submitting for AI assessment.
        </p>
      </div>

      {sections.map(({ icon: Icon, title, items }) => (
        <div key={title} className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Icon size={18} className="text-brand-600" />
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {items.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-slate-400 uppercase tracking-wider">{label}</dt>
                <dd className="text-sm font-medium mt-0.5 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      {/* Photos */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Camera size={18} className="text-brand-600" />
          <h3 className="font-semibold text-sm">Uploaded Photos ({photos.length})</h3>
        </div>
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <img
                key={i}
                src={photo.url}
                alt={photo.name}
                className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No photos uploaded — a placeholder will be used for the demo.</p>
        )}
      </div>

      <div className="p-4 rounded-lg bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800">
        <p className="text-sm text-brand-700 dark:text-brand-300">
          By submitting, your claim will be analyzed by our AI engine. Most claims are processed within 3 minutes.
        </p>
      </div>
    </div>
  );
}
