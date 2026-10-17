import './globals.css';
import {prisma} from '@/lib/db';
import KpiCard from './components/kpiCard';
import { money, num } from '@/lib/formats';

export default async  function Home() {
  const result = await prisma.order.aggregate({
    _sum: {
      amount: true,
      quantity: true,
    },
    _count: true,
  });
  const revenue = result._sum.amount ?? 0;
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-semibold">Wholesale sales</h1>
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Revenue" value={money(revenue)} delta={0.124} />
        <KpiCard label="Orders" value={num(result._count)} delta={-0.032} />
        <KpiCard label="Units sold" value={num(result._sum.quantity ?? 0)} delta={1} />
      </section>
    </main>
  );
}