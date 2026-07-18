import type {
  Appointment,
  AppointmentFormData,
  AppointmentStatus,
} from "../types/appointment";

const STORAGE_KEY = "appointments";

const seedAppointments: Appointment[] = [
  {
    id: "a1",
    patient: "Awa Diop",
    docteur: "Dr. Ndiaye",
    date: "2026-07-17",
    heure: "09:00",
    motif: "Consultation générale",
    statut: "confirmé",
    notes: "",
    createdBy: "awa.diop@exemple.com",
    createdAt: "2026-07-10T09:00:00.000Z",
  },
  {
    id: "a2",
    patient: "Moussa Fall",
    docteur: "Dr. Sow",
    date: "2026-07-17",
    heure: "10:30",
    motif: "Suivi diabète",
    statut: "en attente",
    notes: "Apporter les derniers résultats d'analyses.",
    createdBy: "moussa.fall@exemple.com",
    createdAt: "2026-07-11T15:20:00.000Z",
  },
  {
    id: "a3",
    patient: "Fatou Sarr",
    docteur: "Dr. Ndiaye",
    date: "2026-07-18",
    heure: "11:15",
    motif: "Analyse de sang",
    statut: "confirmé",
    notes: "",
    createdBy: "fatou.sarr@exemple.com",
    createdAt: "2026-07-12T08:45:00.000Z",
  },
  {
    id: "a4",
    patient: "Ibrahima Ba",
    docteur: "Dr. Diallo",
    date: "2026-07-20",
    heure: "08:45",
    motif: "Douleurs dorsales",
    statut: "en attente",
    notes: "",
    createdBy: "ibrahima.ba@exemple.com",
    createdAt: "2026-07-14T11:10:00.000Z",
  },
  {
    id: "a5",
    patient: "Aminata Gueye",
    docteur: "Dr. Sow",
    date: "2026-07-15",
    heure: "14:00",
    motif: "Vaccination",
    statut: "terminé",
    notes: "Rappel dans 6 mois.",
    createdBy: "aminata.gueye@exemple.com",
    createdAt: "2026-07-08T10:00:00.000Z",
  },
];

export function getAppointments(): Appointment[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAppointments));
    return seedAppointments;
  }

  try {
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export function createAppointment(data: AppointmentFormData): Appointment[] {
  const appointment: Appointment = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const appointments = [appointment, ...getAppointments()];
  saveAppointments(appointments);
  return appointments;
}

export function updateAppointment(
  id: string,
  data: AppointmentFormData,
): Appointment[] {
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id ? { ...appointment, ...data } : appointment,
  );
  saveAppointments(appointments);
  return appointments;
}

export function updateAppointmentStatus(
  id: string,
  statut: AppointmentStatus,
): Appointment[] {
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id ? { ...appointment, statut } : appointment,
  );
  saveAppointments(appointments);
  return appointments;
}

export function deleteAppointment(id: string): Appointment[] {
  const appointments = getAppointments().filter(
    (appointment) => appointment.id !== id,
  );
  saveAppointments(appointments);
  return appointments;
}
