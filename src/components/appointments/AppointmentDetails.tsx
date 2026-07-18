import { FiX } from "react-icons/fi";
import type { Appointment } from "../../types/appointment";
import StatusBadge from "./StatusBadge";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
}

interface DetailRow {
  label: string;
  value: string;
}

export default function AppointmentDetails({
  appointment,
  onClose,
}: AppointmentDetailsProps) {
  const rows: DetailRow[] = [
    { label: "Patient", value: appointment.patient },
    { label: "Docteur", value: appointment.docteur },
    { label: "Date", value: appointment.date },
    { label: "Heure", value: appointment.heure },
    { label: "Motif", value: appointment.motif || "—" },
    { label: "Notes", value: appointment.notes || "Aucune" },
    {
      label: "Créé le",
      value: new Date(appointment.createdAt).toLocaleDateString("fr-FR"),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Rendez-vous
            </h3>
            <div className="mt-1">
              <StatusBadge statut={appointment.statut} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <dl className="divide-y divide-slate-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 py-3"
            >
              <dt className="text-sm text-slate-500">{row.label}</dt>
              <dd className="text-right text-sm font-medium text-slate-800">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
