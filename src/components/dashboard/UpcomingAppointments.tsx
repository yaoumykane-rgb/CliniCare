import type { Appointment, AppointmentStatus } from "../../types/dashboard";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const statusStyles: Record<AppointmentStatus, string> = {
  "en attente": "bg-amber-50 text-amber-700 border-amber-100",
  confirmé: "bg-emerald-50 text-emerald-700 border-emerald-100",
  terminé: "bg-slate-100 text-slate-600 border-slate-200",
  annulé: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">
          Prochains rendez-vous
        </h2>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          {appointments.length} RDV
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="whitespace-nowrap px-3 py-3 font-medium">Patient</th>
              <th className="whitespace-nowrap px-3 py-3 font-medium">Docteur</th>
              <th className="whitespace-nowrap px-3 py-3 font-medium">Date</th>
              <th className="whitespace-nowrap px-3 py-3 font-medium">Heure</th>
              <th className="whitespace-nowrap px-3 py-3 font-medium">Motif</th>
              <th className="whitespace-nowrap px-3 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80"
              >
                <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-800">
                  {appointment.patient}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                  {appointment.docteur}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                  {appointment.date}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                  {appointment.heure}
                </td>
                <td className="px-3 py-3 text-slate-600">{appointment.motif}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[appointment.statut]}`}
                  >
                    {appointment.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
