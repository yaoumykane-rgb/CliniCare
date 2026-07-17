import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Patient } from "../../types/patient";

interface PatientTableProps {
  patients: Patient[];
  canEdit: boolean;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export default function PatientTable({
  patients,
  canEdit,
  onView,
  onEdit,
  onDelete,
}: PatientTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500">
            <th className="px-4 py-3 font-medium">Patient</th>
            <th className="px-4 py-3 font-medium">Sexe</th>
            <th className="px-4 py-3 font-medium">Téléphone</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Groupe</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">
                  {patient.prenom} {patient.nom}
                </p>
                <p className="text-xs text-slate-400">
                  Né(e) le {patient.dateNaissance}
                </p>
              </td>
              <td className="px-4 py-3 capitalize text-slate-600">
                {patient.sexe}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {patient.telephone}
              </td>
              <td className="px-4 py-3 text-slate-600">{patient.email}</td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                  {patient.groupeSanguin}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onView(patient)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    title="Consulter"
                  >
                    <FiEye className="h-4 w-4" />
                  </button>
                  {canEdit && (
                    <>
                      <button
                        type="button"
                        onClick={() => onEdit(patient)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-600"
                        title="Modifier"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(patient)}
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
