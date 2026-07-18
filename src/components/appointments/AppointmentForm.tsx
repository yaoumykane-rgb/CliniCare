import { useState } from "react";
import { FiX } from "react-icons/fi";
import type {
  Appointment,
  AppointmentFormData,
  AppointmentStatus,
} from "../../types/appointment";
import { APPOINTMENT_STATUSES } from "../../types/appointment";

interface AppointmentFormProps {
  appointment?: Appointment;
  /** Valeurs imposées pour le rôle patient (nom + email). */
  lockedPatient?: { name: string; email: string };
  canChangeStatus: boolean;
  onSubmit: (data: AppointmentFormData) => void;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60";

export default function AppointmentForm({
  appointment,
  lockedPatient,
  canChangeStatus,
  onSubmit,
  onCancel,
}: AppointmentFormProps) {
  const [form, setForm] = useState<AppointmentFormData>(
    appointment
      ? {
          patient: appointment.patient,
          docteur: appointment.docteur,
          date: appointment.date,
          heure: appointment.heure,
          motif: appointment.motif,
          statut: appointment.statut,
          notes: appointment.notes,
          createdBy: appointment.createdBy,
        }
      : {
          patient: lockedPatient?.name ?? "",
          docteur: "",
          date: "",
          heure: "",
          motif: "",
          statut: "en attente",
          notes: "",
          createdBy: lockedPatient?.email ?? "",
        },
  );

  function updateField<K extends keyof AppointmentFormData>(
    key: K,
    value: AppointmentFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.patient || !form.docteur || !form.date || !form.heure) return;

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
            {appointment ? "Modifier le rendez-vous" : "Prendre un rendez-vous"}
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
            <span className="text-sm font-medium text-slate-700">
              Patient *
            </span>
            <input
              type="text"
              placeholder="Nom du patient"
              className={`mt-1.5 ${inputClass}`}
              value={form.patient}
              disabled={Boolean(lockedPatient)}
              onChange={(e) => updateField("patient", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Docteur *
            </span>
            <input
              type="text"
              placeholder="Dr. Ndiaye"
              className={`mt-1.5 ${inputClass}`}
              value={form.docteur}
              onChange={(e) => updateField("docteur", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Date *</span>
            <input
              type="date"
              className={`mt-1.5 ${inputClass}`}
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Heure *</span>
            <input
              type="time"
              className={`mt-1.5 ${inputClass}`}
              value={form.heure}
              onChange={(e) => updateField("heure", e.target.value)}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Motif</span>
            <input
              type="text"
              placeholder="Consultation générale"
              className={`mt-1.5 ${inputClass}`}
              value={form.motif}
              onChange={(e) => updateField("motif", e.target.value)}
            />
          </label>

          {canChangeStatus && (
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Statut</span>
              <select
                className={`mt-1.5 ${inputClass} capitalize`}
                value={form.statut}
                onChange={(e) =>
                  updateField("statut", e.target.value as AppointmentStatus)
                }
              >
                {APPOINTMENT_STATUSES.map((statut) => (
                  <option key={statut} value={statut}>
                    {statut}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Notes (facultatif)
            </span>
            <textarea
              rows={3}
              placeholder="Informations complémentaires…"
              className={`mt-1.5 resize-none ${inputClass}`}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
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
            {appointment ? "Enregistrer" : "Confirmer"}
          </button>
        </div>
      </form>
    </div>
  );
}
