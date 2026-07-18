import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import AppointmentList from "../components/appointments/AppointmentList";
import AppointmentCard from "../components/appointments/AppointmentCard";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentDetails from "../components/appointments/AppointmentDetails";
import AppointmentFilters from "../components/appointments/AppointmentFilters";
import ConfirmModal from "../components/patients/ConfirmModal";
import EmptyState from "../components/patients/EmptyState";
import { useAppointments } from "../hooks/useAppointments";
import type {
  Appointment,
  AppointmentFormData,
} from "../types/appointment";
import type { Role, User } from "../types/roles";

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; appointment: Appointment }
  | { type: "view"; appointment: Appointment }
  | { type: "delete"; appointment: Appointment };

function getCurrentUser(): Partial<User> {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "{}") as Partial<User>;
  } catch {
    return {};
  }
}

export default function Appointments() {
  const user = getCurrentUser();
  const role: Role = user.role ?? "patient";

  const isPatient = role === "patient";
  const canManage = role === "administrateur";
  const canChangeStatus = role === "administrateur" || role === "docteur";

  const {
    appointments,
    totalCount,
    docteurs,
    loading,
    filters,
    setFilters,
    addAppointment,
    editAppointment,
    changeStatus,
    removeAppointment,
  } = useAppointments({
    restrictToEmail: isPatient ? user.email : undefined,
  });

  const [modal, setModal] = useState<ModalState>({ type: "none" });

  function closeModal() {
    setModal({ type: "none" });
  }

  function handleSubmit(data: AppointmentFormData) {
    if (modal.type === "edit") {
      editAppointment(modal.appointment.id, data);
    } else {
      addAppointment(data);
    }
    closeModal();
  }

  function handleDelete() {
    if (modal.type === "delete") {
      removeAppointment(modal.appointment.id);
    }
    closeModal();
  }

  const lockedPatient =
    isPatient && user.email
      ? {
          name: `${user.prenom ?? ""} ${user.nom ?? ""}`.trim() || user.email,
          email: user.email,
        }
      : undefined;

  return (
    <DashboardLayout title="Rendez-vous">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {totalCount} rendez-vous
            {appointments.length !== totalCount &&
              ` — ${appointments.length} affiché${appointments.length > 1 ? "s" : ""}`}
          </p>

          {(canManage || isPatient) && (
            <button
              type="button"
              onClick={() => setModal({ type: "create" })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]"
            >
              <FiPlus />
              {isPatient ? "Prendre un rendez-vous" : "Ajouter un rendez-vous"}
            </button>
          )}
        </div>

        <AppointmentFilters
          filters={filters}
          docteurs={docteurs}
          onChange={setFilters}
        />

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />
          </div>
        ) : appointments.length === 0 ? (
          <EmptyState message="Aucun rendez-vous trouvé." />
        ) : (
          <>
            <AppointmentList
              appointments={appointments}
              canManage={canManage}
              canChangeStatus={canChangeStatus}
              onView={(appointment) => setModal({ type: "view", appointment })}
              onEdit={(appointment) => setModal({ type: "edit", appointment })}
              onDelete={(appointment) =>
                setModal({ type: "delete", appointment })
              }
              onStatusChange={(appointment, statut) =>
                changeStatus(appointment.id, statut)
              }
            />

            <div className="grid gap-4 sm:grid-cols-2 md:hidden">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  canManage={canManage}
                  canChangeStatus={canChangeStatus}
                  onView={(a) => setModal({ type: "view", appointment: a })}
                  onEdit={(a) => setModal({ type: "edit", appointment: a })}
                  onDelete={(a) => setModal({ type: "delete", appointment: a })}
                  onStatusChange={(a, statut) => changeStatus(a.id, statut)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {(modal.type === "create" || modal.type === "edit") && (
        <AppointmentForm
          appointment={modal.type === "edit" ? modal.appointment : undefined}
          lockedPatient={modal.type === "create" ? lockedPatient : undefined}
          canChangeStatus={canChangeStatus}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      )}

      {modal.type === "view" && (
        <AppointmentDetails
          appointment={modal.appointment}
          onClose={closeModal}
        />
      )}

      {modal.type === "delete" && (
        <ConfirmModal
          title="Supprimer le rendez-vous"
          message={`Voulez-vous vraiment supprimer le rendez-vous de ${modal.appointment.patient} le ${modal.appointment.date} à ${modal.appointment.heure} ?`}
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </DashboardLayout>
  );
}
