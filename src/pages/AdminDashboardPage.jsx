import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useClaims } from '../context/ClaimsContext';
import { ANALYTICS } from '../data/mockData';
import AnalyticsCards from '../components/dashboard/AnalyticsCards';
import ClaimsTable from '../components/dashboard/ClaimsTable';
import ClaimDetailModal from '../components/dashboard/ClaimDetailModal';

export default function AdminDashboardPage() {
  const { claims, updateClaimStatus } = useClaims();
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleUpdateStatus = (id, status) => {
    updateClaimStatus(id, status);
    setSelectedClaim(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Claims Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor, review, and manage all insurance claims.
        </p>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4">Claims Volume</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ANALYTICS.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="claims" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4">Flagged Claims Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ANALYTICS.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="flagged" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Claims Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">All Claims</h2>
        <ClaimsTable claims={claims} onSelectClaim={setSelectedClaim} />
      </div>

      {/* Detail Modal */}
      {selectedClaim && (
        <ClaimDetailModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
