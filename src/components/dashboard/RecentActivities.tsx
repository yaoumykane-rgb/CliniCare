import type { Activity } from "../../types/dashboard";

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Activités récentes
      </h2>
      <ul className="mt-4 divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <li
              key={activity.id}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-700">{activity.label}</p>
                <p className="text-sm text-slate-400">{activity.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
