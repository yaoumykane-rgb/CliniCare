import { FiEye, FiEdit2, FiTrash2, FiPhone, FiMail } from "react-icons/fi";
import type { Patient } from "../../types/patient";

interface PatientCardProps {
  patient: Patient;
  canEdit: boolean;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export default function PatientCard({
  patient,
  canEdit,
  onView,
  onEdit,
  onDelete,
}: PatientCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">
            {patient.prenom} {patient.nom}
          </p>
          <p className="text-xs capitalize text-slate-400">
            {patient.sexe} — né(e) le {patient.dateNaissance}
          </p>
        </div>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
          {patient.groupeSanguin}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <FiPhone className="h-4 w-4 text-slate-400" />
          {patient.telephone}
        </p>
        <p className="flex items-center gap-2">
          <FiMail className="h-4 w-4 text-slate-400" />
          {patient.email}
        </p>
      </div>

      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onView(patient)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <FiEye className="h-4 w-4" />
          Voir
        </button>
        {canEdit && (
          <>
            <button
              type="button"
              onClick={() => onEdit(patient)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-200 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50"
            >
              <FiEdit2 className="h-4 w-4" />
              Modifier
            </button>
            <button
              type="button"
              onClick={() => onDelete(patient)}
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
