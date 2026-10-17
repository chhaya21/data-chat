"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RANGES = [
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "180", label: "Last 6 months" },
  { value: "365", label: "Last 12 months" },
];

type FiltersProps = {
  regions: string[];
  categories: string[];
};

export default function Filters({ regions, categories }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key); // "All" removes the filter from the URL
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const selectClass = "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        aria-label="Date range"
        className={selectClass}
        value={params.get("days") ?? "90"}
        onChange={(e) => setParam("days", e.target.value)}
      >
        {RANGES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      <select
        aria-label="Region"
        className={selectClass}
        value={params.get("region") ?? ""}
        onChange={(e) => setParam("region", e.target.value)}
      >
        <option value="">All regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        aria-label="Category"
        className={selectClass}
        value={params.get("category") ?? ""}
        onChange={(e) => setParam("category", e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}