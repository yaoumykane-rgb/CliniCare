import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiUser,
} from "react-icons/fi";
import type {
  Appointment,
  AppointmentStatus,
} from "../../types/appointment";
import { APPOINTMENT_STATUSES } from "../../types/appointment";
import StatusBadge from "./StatusBadge";

interface AppointmentCardProps {
  appointment: Appointment;
  canManage: boolean;
  canChangeStatus: boolean;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onStatusChange: (appointment: Appointment, statut: AppointmentStatus) => void;
}

export default function AppointmentCard({
  appointment,
  canManage,
  canChangeStatus,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: AppointmentCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">{appointment.patient}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
            <FiUser className="h-3.5 w-3.5" />
            {appointment.docteur}
          </p>
        </div>
        <StatusBadge statut={appointment.statut} />
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-slate-400" />
          {appointment.date}
        </p>
        <p className="flex items-center gap-2">
          <FiClock className="h-4 w-4 text-slate-400" />
          {appointment.heure} — {appointment.motif}
        </p>
      </div>

      {canChangeStatus && (
        <select
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium capitalize text-slate-700 outline-none transition focus:border-teal-500"
          value={appointment.statut}
          onChange={(e) =>
            onStatusChange(appointment, e.target.value as AppointmentStatus)
          }
        >
          {APPOINTMENT_STATUSES.map((statut) => (
            <option key={statut} value={statut}>
              {statut}
            </option>
          ))}
        </select>
      )}

      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onView(appointment)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <FiEye className="h-4 w-4" />
          Voir
        </button>
        {canManage && (
          <>
            <button
              type="button"
              onClick={() => onEdit(appointment)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-200 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50"
            >
              <FiEdit2 className="h-4 w-4" />
              Modifier
            </button>
            <button
              type="button"
              onClick={() => onDelete(appointment)}
              className="flex items-center justify-center rounded-xl border border-rose-200 px-3 py-2 text-rose-600 transition hover:bg-rose-50"
              title="Supprimer"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
