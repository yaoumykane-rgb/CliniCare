import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import type {
  Appointment,
  AppointmentStatus,
} from "../../types/appointment";
import { APPOINTMENT_STATUSES } from "../../types/appointment";
import StatusBadge from "./StatusBadge";

interface AppointmentListProps {
  appointments: Appointment[];
  canManage: boolean;
  canChangeStatus: boolean;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onStatusChange: (appointment: Appointment, statut: AppointmentStatus) => void;
}

export default function AppointmentList({
  appointments,
  canManage,
  canChangeStatus,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: AppointmentListProps) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
            <th className="px-4 py-3 font-medium">Patient</th>
            <th className="px-4 py-3 font-medium">Docteur</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Heure</th>
            <th className="px-4 py-3 font-medium">Motif</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80"
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                {appointment.patient}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {appointment.docteur}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {appointment.date}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {appointment.heure}
              </td>
              <td className="px-4 py-3 text-slate-600">{appointment.motif}</td>
              <td className="whitespace-nowrap px-4 py-3">
                {canChangeStatus ? (
                  <select
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium capitalize text-slate-700 outline-none transition focus:border-teal-500"
                    value={appointment.statut}
                    onChange={(e) =>
                      onStatusChange(
                        appointment,
                        e.target.value as AppointmentStatus,
                      )
                    }
                  >
                    {APPOINTMENT_STATUSES.map((statut) => (
                      <option key={statut} value={statut}>
                        {statut}
                      </option>
                    ))}
                  </select>
                ) : (
                  <StatusBadge statut={appointment.statut} />
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onView(appointment)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    title="Consulter"
                  >
                    <FiEye className="h-4 w-4" />
                  </button>
                  {canManage && (
                    <>
                      <button
                        type="button"
                        onClick={() => onEdit(appointment)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-600"
                        title="Modifier"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(appointment)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                        title="Supprimer"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
