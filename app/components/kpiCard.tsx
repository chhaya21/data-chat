type kpiCardProps = {
  label: string;
  value: string;
  delta: number | null;
};

export default function KpiCard({ label, value, delta }: kpiCardProps) {
  const color =
    delta === null
      ? "text-gray-500"
      : delta >= 0
      ? "text-green-600"
      : "text-red-600";
  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className={`mt-1 text-sm ${color}`}>
        {delta === null
          ? "No prior period"
          : `${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(
              1
            )}% vs previous period`}
      </p>
    </div>
  );
}
