import { useState } from "react";
import { FiX } from "react-icons/fi";
import type {
  GroupeSanguin,
  Patient,
  PatientFormData,
  Sexe,
} from "../../types/patient";
import { GROUPES_SANGUINS } from "../../types/patient";

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

const emptyForm: PatientFormData = {
  prenom: "",
  nom: "",
  dateNaissance: "",
  sexe: "homme",
  telephone: "",
  email: "",
  adresse: "",
  groupeSanguin: "O+",
  allergies: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10";

export default function PatientForm({
  patient,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormData>(
    patient
      ? {
          prenom: patient.prenom,
          nom: patient.nom,
          dateNaissance: patient.dateNaissance,
          sexe: patient.sexe,
          telephone: patient.telephone,
          email: patient.email,
          adresse: patient.adresse,
          groupeSanguin: patient.groupeSanguin,
          allergies: patient.allergies,
        }
      : emptyForm,
  );

  function updateField<K extends keyof PatientFormData>(
    key: K,
    value: PatientFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.prenom || !form.nom || !form.telephone) return;

    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            {patient ? "Modifier le patient" : "Ajouter un patient"}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Prénom *</span>
            <input
              type="text"
              className={`mt-1.5 ${inputClass}`}
              value={form.prenom}
              onChange={(e) => updateField("prenom", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Nom *</span>
            <input
              type="text"
              className={`mt-1.5 ${inputClass}`}
              value={form.nom}
              onChange={(e) => updateField("nom", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Date de naissance
            </span>
            <input
              type="date"
              className={`mt-1.5 ${inputClass}`}
              value={form.dateNaissance}
              onChange={(e) => updateField("dateNaissance", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Sexe</span>
            <select
              className={`mt-1.5 ${inputClass}`}
              value={form.sexe}
              onChange={(e) => updateField("sexe", e.target.value as Sexe)}
            >
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Téléphone *
            </span>
            <input
              type="tel"
              placeholder="77 123 45 67"
              className={`mt-1.5 ${inputClass}`}
              value={form.telephone}
              onChange={(e) => updateField("telephone", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              placeholder="patient@exemple.com"
              className={`mt-1.5 ${inputClass}`}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Adresse</span>
            <input
              type="text"
              placeholder="Ville, pays"
              className={`mt-1.5 ${inputClass}`}
              value={form.adresse}
              onChange={(e) => updateField("adresse", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Groupe sanguin
            </span>
            <select
              className={`mt-1.5 ${inputClass}`}
              value={form.groupeSanguin}
              onChange={(e) =>
                updateField("groupeSanguin", e.target.value as GroupeSanguin)
              }
            >
              {GROUPES_SANGUINS.map((groupe) => (
                <option key={groupe} value={groupe}>
                  {groupe}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Allergies
            </span>
            <input
              type="text"
              placeholder="Aucune"
              className={`mt-1.5 ${inputClass}`}
              value={form.allergies}
              onChange={(e) => updateField("allergies", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700"
          >
            {patient ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
