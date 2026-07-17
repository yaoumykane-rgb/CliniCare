import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentActivities from "../components/dashboard/RecentActivities";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";
import {
  activities as activitiesData,
  appointments as appointmentsData,
  stats as statsData,
} from "../data/dashboardData";
import type {
  Activity,
  Appointment,
  Stat,
} from "../types/dashboard";
import type { Role, User } from "../types/roles";

function getCurrentUser(): Partial<User> {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "{}") as Partial<User>;
  } catch {
    return {};
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const user = getCurrentUser();
  const role: Role = user.role ?? "patient";

  useEffect(() => {
    setLoading(true);

    const timer = window.setTimeout(() => {
      setStats(statsData.filter((stat) => stat.roles.includes(role)));
      setActivities(activitiesData);
      setAppointments(
        role === "patient"
          ? appointmentsData.slice(0, 3)
          : appointmentsData,
      );
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [role]);

  return (
    <DashboardLayout title="Dashboard">
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500">
              Bonjour
              {user.prenom ? `, ${user.prenom}` : ""} — voici un aperçu rapide
              de votre activité.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <RecentActivities activities={activities} />
            </div>
            <div className="xl:col-span-3">
              <UpcomingAppointments appointments={appointments} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
