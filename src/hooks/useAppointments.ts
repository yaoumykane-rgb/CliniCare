import { useEffect, useMemo, useState } from "react";
import type {
  Appointment,
  AppointmentFilters,
  AppointmentFormData,
  AppointmentStatus,
} from "../types/appointment";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
  updateAppointmentStatus,
} from "../services/appointmentService";

interface UseAppointmentsOptions {
  /** Si défini, ne retourne que les rendez-vous créés par cet email (rôle patient). */
  restrictToEmail?: string;
}

export function useAppointments({ restrictToEmail }: UseAppointmentsOptions) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AppointmentFilters>({
    search: "",
    statut: "tous",
    docteur: "tous",
    date: "",
  });

  useEffect(() => {
    setAppointments(getAppointments());
    setLoading(false);
  }, []);

  const visibleAppointments = useMemo(() => {
    if (!restrictToEmail) return appointments;
    return appointments.filter(
      (appointment) => appointment.createdBy === restrictToEmail,
    );
  }, [appointments, restrictToEmail]);

  const docteurs = useMemo(() => {
    const names = new Set(
      visibleAppointments.map((appointment) => appointment.docteur),
    );
    return [...names].sort();
  }, [visibleAppointments]);

  const filteredAppointments = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return visibleAppointments.filter((appointment) => {
      const matchesSearch =
        query === "" ||
        [appointment.patient, appointment.docteur, appointment.motif]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatut =
        filters.statut === "tous" || appointment.statut === filters.statut;

      const matchesDocteur =
        filters.docteur === "tous" || appointment.docteur === filters.docteur;

      const matchesDate =
        filters.date === "" || appointment.date === filters.date;

      return matchesSearch && matchesStatut && matchesDocteur && matchesDate;
    });
  }, [visibleAppointments, filters]);

  function addAppointment(data: AppointmentFormData): void {
    setAppointments(createAppointment(data));
  }

  function editAppointment(id: string, data: AppointmentFormData): void {
    setAppointments(updateAppointment(id, data));
  }

  function changeStatus(id: string, statut: AppointmentStatus): void {
    setAppointments(updateAppointmentStatus(id, statut));
  }

  function removeAppointment(id: string): void {
    setAppointments(deleteAppointment(id));
  }

  return {
    appointments: filteredAppointments,
    totalCount: visibleAppointments.length,
    docteurs,
    loading,
    filters,
    setFilters,
    addAppointment,
    editAppointment,
    changeStatus,
    removeAppointment,
  };
}
