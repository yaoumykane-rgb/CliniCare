import type { Stat } from "../../types/dashboard";

interface StatCardProps {
  stat: Stat;
}

export default function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
          {stat.evolution && (
            <p className="mt-2 text-xs font-medium text-teal-600">
              {stat.evolution}
            </p>
          )}
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.accent}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
