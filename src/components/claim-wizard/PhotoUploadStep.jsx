import { useState, useRef } from 'react';
import { Upload, Image, X, Camera } from 'lucide-react';

export default function PhotoUploadStep({ data, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const photos = data.photos || [];

  const addPhoto = (file) => {
    if (photos.length >= 4) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhotos = [...photos, { name: file.name, url: e.target.result, size: file.size }];
      onChange({ ...data, photos: newPhotos });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange({ ...data, photos: newPhotos });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    files.forEach(addPhoto);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
    files.forEach(addPhoto);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Upload Damage Photos</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload up to 4 clear photos of the vehicle damage for AI assessment.
        </p>
      </div>

      {/* Damage type */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Damage Type</label>
        <select
          className="select-field"
          value={data.damageType || ''}
          onChange={(e) => onChange({ ...data, damageType: e.target.value })}
        >
          <option value="">Select damage type</option>
          {['Front Bumper Collision', 'Rear-End Collision', 'Side Panel Scratch', 'Fender Bender', 'Windshield Crack', 'Hail Damage', 'Vandalism', 'Other'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Damage Description</label>
        <textarea
          className="input-field min-h-[100px] resize-none"
          placeholder="Describe the damage in detail..."
          value={data.damageDescription || ''}
          onChange={(e) => onChange({ ...data, damageDescription: e.target.value })}
        />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
            <Upload size={24} className="text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <p className="font-medium">Drop photos here or click to browse</p>
            <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB each · Max 4 photos</p>
          </div>
        </div>
      </div>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img src={photo.url} alt={photo.name} className="w-full h-28 object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-2 py-1 truncate">
                {photo.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder if no photos */}
      {photos.length === 0 && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <Camera size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            For the best AI assessment, upload clear, well-lit photos from multiple angles.
          </p>
        </div>
      )}
    </div>
  );
}
