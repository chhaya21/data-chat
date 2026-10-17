import './globals.css';
import {prisma} from '@/lib/db';
import KpiCard from './components/kpiCard';

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-semibold">Wholesale sales</h1>
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Revenue" value="$48,200" delta={0.124} />
        <KpiCard label="Orders" value="312" delta={-0.032} />
        <KpiCard label="Units sold" value="1,840" delta={1} />
      </section>
    </main>
  );
}