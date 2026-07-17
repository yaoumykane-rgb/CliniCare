import type { IconType } from "react-icons";
import type { Role } from "./roles";

export interface Stat {
  id: string;
  title: string;
  value: string;
  evolution?: string;
  icon: IconType;
  accent: string;
  roles: Role[];
}

export interface Activity {
  id: string;
  label: string;
  time: string;
  icon: IconType;
  accent: string;
}

export type AppointmentStatus =
  | "en attente"
  | "confirmé"
  | "terminé"
  | "annulé";

export interface Appointment {
  id: string;
  patient: string;
  docteur: string;
  date: string;
  heure: string;
  motif: string;
  statut: AppointmentStatus;
}

export interface NavItem {
  label: string;
  to: string;
  icon: IconType;
  roles: Role[];
  disabled?: boolean;
}
