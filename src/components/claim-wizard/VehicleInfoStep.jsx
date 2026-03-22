export default function VehicleInfoStep({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Vehicle Information</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter the details of the vehicle involved in the claim.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Policy Number</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. POL-1234567"
            value={data.policyNumber || ''}
            onChange={(e) => update('policyNumber', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">License Plate</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. ABC-1234"
            value={data.licensePlate || ''}
            onChange={(e) => update('licensePlate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Make</label>
          <select className="select-field" value={data.vehicleMake || ''} onChange={(e) => update('vehicleMake', e.target.value)}>
            <option value="">Select make</option>
            {['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Model</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Camry"
            value={data.vehicleModel || ''}
            onChange={(e) => update('vehicleModel', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Year</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 2022"
            min="2000"
            max="2026"
            value={data.vehicleYear || ''}
            onChange={(e) => update('vehicleYear', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Color</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Silver"
            value={data.vehicleColor || ''}
            onChange={(e) => update('vehicleColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
