import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import StatusChip from '../common/StatusChip';

const STATUS_FILTERS = ['all', 'pending', 'approved', 'flagged', 'denied'];

export default function ClaimsTable({ claims, onSelectClaim }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = claims.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.vehicleMake?.toLowerCase().includes(search.toLowerCase()) ||
      c.vehicleModel?.toLowerCase().includes(search.toLowerCase()) ||
      c.damageType?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const riskColor = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search claims..."
            className="input-field pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-slate-400 flex-shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <th className="px-4 py-3">Claim ID</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Damage</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((claim) => (
              <tr
                key={claim.id}
                onClick={() => onSelectClaim(claim)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-mono font-medium text-brand-600">{claim.id}</td>
                <td className="px-4 py-3">
                  {claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{claim.damageType}</td>
                <td className="px-4 py-3 font-medium">${claim.estimatedRepair?.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-semibold ${riskColor(claim.riskScore)}`}>{claim.riskScore}</span>
                </td>
                <td className="px-4 py-3"><StatusChip status={claim.status} /></td>
                <td className="px-4 py-3 text-slate-500">{formatDate(claim.submittedAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                  No claims match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400">
        Showing {filtered.length} of {claims.length} claims
      </div>
    </div>
  );
}
