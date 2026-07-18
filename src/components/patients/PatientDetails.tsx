import { FiX } from "react-icons/fi";
import type { Patient } from "../../types/patient";

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
}

interface DetailRow {
  label: string;
  value: string;
}

export default function PatientDetails({
  patient,
  onClose,
}: PatientDetailsProps) {
  const rows: DetailRow[] = [
    { label: "Date de naissance", value: patient.dateNaissance || "—" },
    { label: "Sexe", value: patient.sexe },
    { label: "Téléphone", value: patient.telephone || "—" },
    { label: "Email", value: patient.email || "—" },
    { label: "Adresse", value: patient.adresse || "—" },
    { label: "Groupe sanguin", value: patient.groupeSanguin },
    { label: "Allergies", value: patient.allergies || "Aucune" },
    {
      label: "Enregistré le",
      value: new Date(patient.createdAt).toLocaleDateString("fr-FR"),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {patient.prenom} {patient.nom}
            </h3>
            <p className="text-sm text-slate-500">Dossier patient</p>
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
              className="flex items-center justify-between gap-4 py-3"
            >
              <dt className="text-sm text-slate-500">{row.label}</dt>
              <dd className="text-sm font-medium capitalize text-slate-800">
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
