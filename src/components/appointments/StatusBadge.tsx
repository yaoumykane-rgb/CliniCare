import type { AppointmentStatus } from "../../types/appointment";

const styles: Record<AppointmentStatus, string> = {
  "en attente": "bg-amber-50 text-amber-700 border-amber-100",
  confirmé: "bg-emerald-50 text-emerald-700 border-emerald-100",
  terminé: "bg-slate-100 text-slate-600 border-slate-200",
  annulé: "bg-rose-50 text-rose-700 border-rose-100",
};

interface StatusBadgeProps {
  statut: AppointmentStatus;
}

export default function StatusBadge({ statut }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${styles[statut]}`}
    >
      {statut}
    </span>
  );
}
