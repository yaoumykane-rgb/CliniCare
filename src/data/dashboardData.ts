import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiClock,
  FiUserPlus,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
} from "react-icons/fi";
import type { Stat, Activity, Appointment } from "../types/dashboard";

export const stats: Stat[] = [
  {
    id: "patients",
    title: "Patients",
    value: "248",
    evolution: "+12 ce mois",
    icon: FiUsers,
    accent: "bg-teal-100 text-teal-600",
    roles: ["administrateur", "docteur"],
  },
  {
    id: "docteurs",
    title: "Docteurs",
    value: "16",
    evolution: "+2 ce mois",
    icon: FiUserCheck,
    accent: "bg-cyan-100 text-cyan-600",
    roles: ["administrateur", "patient"],
  },
  {
    id: "rdv-jour",
    title: "Rendez-vous du jour",
    value: "23",
    evolution: "5 terminés",
    icon: FiCalendar,
    accent: "bg-amber-100 text-amber-600",
    roles: ["administrateur", "docteur", "patient"],
  },
  {
    id: "rdv-attente",
    title: "En attente",
    value: "8",
    evolution: "à confirmer",
    icon: FiClock,
    accent: "bg-rose-100 text-rose-600",
    roles: ["administrateur", "docteur", "patient"],
  },
];

export const activities: Activity[] = [
  {
    id: "a1",
    label: "Nouveau patient enregistré : Awa Diop",
    time: "Il y a 10 min",
    icon: FiUserPlus,
    accent: "bg-teal-100 text-teal-600",
  },
  {
    id: "a2",
    label: "Rendez-vous confirmé avec Dr. Ndiaye",
    time: "Il y a 45 min",
    icon: FiCheckCircle,
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "a3",
    label: "Dossier médical mis à jour : Moussa Fall",
    time: "Il y a 2 h",
    icon: FiFileText,
    accent: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "a4",
    label: "Rendez-vous annulé : Fatou Sarr",
    time: "Il y a 3 h",
    icon: FiXCircle,
    accent: "bg-rose-100 text-rose-600",
  },
];

export const appointments: Appointment[] = [
  {
    id: "r1",
    patient: "Awa Diop",
    docteur: "Dr. Ndiaye",
    date: "17/07/2026",
    heure: "09:00",
    motif: "Consultation générale",
    statut: "confirmé",
  },
  {
    id: "r2",
    patient: "Moussa Fall",
    docteur: "Dr. Sow",
    date: "17/07/2026",
    heure: "10:30",
    motif: "Suivi diabète",
    statut: "en attente",
  },
  {
    id: "r3",
    patient: "Fatou Sarr",
    docteur: "Dr. Ndiaye",
    date: "17/07/2026",
    heure: "11:15",
    motif: "Analyse de sang",
    statut: "confirmé",
  },
  {
    id: "r4",
    patient: "Ibrahima Ba",
    docteur: "Dr. Diallo",
    date: "18/07/2026",
    heure: "08:45",
    motif: "Douleurs dorsales",
    statut: "en attente",
  },
  {
    id: "r5",
    patient: "Aminata Gueye",
    docteur: "Dr. Sow",
    date: "18/07/2026",
    heure: "14:00",
    motif: "Vaccination",
    statut: "terminé",
  },
];
