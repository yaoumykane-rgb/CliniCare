import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import PatientTable from "../components/patients/PatientTable";
import PatientCard from "../components/patients/PatientCard";
import PatientForm from "../components/patients/PatientForm";
import PatientDetails from "../components/patients/PatientDetails";
import SearchBar from "../components/patients/SearchBar";
import ConfirmModal from "../components/patients/ConfirmModal";
import EmptyState from "../components/patients/EmptyState";
import { usePatients } from "../hooks/usePatients";
import type { Patient, PatientFormData } from "../types/patient";
import type { Role, User } from "../types/roles";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; patient: Patient }
  | { type: "view"; patient: Patient }
  | { type: "delete"; patient: Patient };

function getCurrentRole(): Role {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") ?? "{}",
    ) as Partial<User>;
    return user.role ?? "patient";
  } catch {
    return "patient";
  }
}

export default function Patients() {
  const {
    patients,
    totalCount,
    loading,
    filters,
    setFilters,
    addPatient,
    editPatient,
    removePatient,
  } = usePatients();

  const [modal, setModal] = useState<ModalState>({ type: "none" });

  const role = getCurrentRole();
  const canEdit = role === "administrateur" || role === "docteur";

  function closeModal() {
    setModal({ type: "none" });
  }

  function handleSubmit(data: PatientFormData) {
    if (modal.type === "edit") {
      editPatient(modal.patient.id, data);
    } else {
      addPatient(data);
    }
    closeModal();
  }

  function handleDelete() {
    if (modal.type === "delete") {
      removePatient(modal.patient.id);
    }
    closeModal();
  }

  return (
    <DashboardLayout title="Patients">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {totalCount} patient{totalCount > 1 ? "s" : ""} enregistré
            {totalCount > 1 ? "s" : ""}
            {patients.length !== totalCount &&
              ` — ${patients.length} affiché${patients.length > 1 ? "s" : ""}`}
          </p>

          {canEdit && (
            <button
              type="button"
              onClick={() => setModal({ type: "create" })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]"
            >
              <FiPlus />
              Ajouter un patient
            </button>
          )}
        </div>

        <SearchBar filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />
          </div>
        ) : patients.length === 0 ? (
          <EmptyState message="Aucun patient trouvé." />
        ) : (
          <>
            <PatientTable
              patients={patients}
              canEdit={canEdit}
              onView={(patient) => setModal({ type: "view", patient })}
              onEdit={(patient) => setModal({ type: "edit", patient })}
              onDelete={(patient) => setModal({ type: "delete", patient })}
            />

            <div className="grid gap-4 sm:grid-cols-2 md:hidden">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  canEdit={canEdit}
                  onView={(p) => setModal({ type: "view", patient: p })}
                  onEdit={(p) => setModal({ type: "edit", patient: p })}
                  onDelete={(p) => setModal({ type: "delete", patient: p })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {(modal.type === "create" || modal.type === "edit") && (
        <PatientForm
          patient={modal.type === "edit" ? modal.patient : undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      )}

      {modal.type === "view" && (
        <PatientDetails patient={modal.patient} onClose={closeModal} />
      )}

      {modal.type === "delete" && (
        <ConfirmModal
          title="Supprimer le patient"
          message={`Voulez-vous vraiment supprimer ${modal.patient.prenom} ${modal.patient.nom} ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </DashboardLayout>
  );
}
