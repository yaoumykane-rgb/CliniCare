export type AppointmentStatus =
  | "en attente"
  | "confirmé"
  | "terminé"
  | "annulé";

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "en attente",
  "confirmé",
  "terminé",
  "annulé",
];

export interface Appointment {
  id: string;
  patient: string;
  docteur: string;
  date: string;
  heure: string;
  motif: string;
  statut: AppointmentStatus;
  notes: string;
  createdBy: string;
  createdAt: string;
}

export type AppointmentFormData = Omit<Appointment, "id" | "createdAt">;

export interface AppointmentFilters {
  search: string;
  statut: AppointmentStatus | "tous";
  docteur: string;
  date: string;
}
