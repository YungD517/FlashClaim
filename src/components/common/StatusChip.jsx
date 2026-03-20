const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  flagged: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  denied: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
};

const STATUS_LABELS = {
  pending: 'Pending',
  approved: 'Auto-Approved',
  flagged: 'Flagged',
  denied: 'Denied',
  processing: 'Processing',
};

export default function StatusChip({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        STATUS_STYLES[status] || STATUS_STYLES.pending
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
