import './globals.css';
import {prisma} from '@/lib/db';
import KpiCard from './components/kpiCard';
import { money, num } from '@/lib/formats';
import { Suspense } from "react";
import Filters from "./components/filters";


const ALLOWED_DAYS = [30, 90, 180, 365];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; category?: string; days?: string }>;
}) {
  const sp = await searchParams;

  // URL is user input: fall back to 90 for anything unrecognised
  const days = ALLOWED_DAYS.includes(Number(sp.days)) ? Number(sp.days) : 90;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const where = {
    orderDate: { gte: since },
    ...(sp.region ? { region: sp.region } : {}),
    ...(sp.category ? { category: sp.category } : {}),
  };

  const [result, regionRows, categoryRows] = await Promise.all([
    prisma.order.aggregate({
      where,
      _sum: { amount: true, quantity: true },
      _count: true,
    }),
    prisma.order.findMany({ distinct: ["region"], select: { region: true }, orderBy: { region: "asc" } }),
    prisma.order.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } }),
  ]);

  const revenue = result._sum.amount ?? 0;
  const units = result._sum.quantity ?? 0;
  const orders = result._count;

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">Wholesale sales</h1>
        <Suspense>
          <Filters
            regions={regionRows.flatMap((r) => r.region == null ? [] : [r.region])}
            categories={categoryRows.flatMap((c) => c.category ? [c.category] : [])}
          />
        </Suspense>
      </header>

      {orders === 0 ? (
        <p className="rounded-lg border border-gray-200 p-8 text-gray-500">
          No orders match these filters. Clear a filter or widen the date range.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-3">
          <KpiCard label="Revenue" value={money(revenue)} delta={null} />
          <KpiCard label="Orders" value={num(orders)} delta={null} />
          <KpiCard label="Units sold" value={num(units)} delta={null} />
        </section>
      )}
    </main>
  );
}