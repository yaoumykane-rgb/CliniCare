import type { Patient, PatientFormData } from "../types/patient";

const STORAGE_KEY = "patients";

const seedPatients: Patient[] = [
  {
    id: "p1",
    prenom: "Awa",
    nom: "Diop",
    dateNaissance: "1992-04-15",
    sexe: "femme",
    telephone: "77 123 45 67",
    email: "awa.diop@exemple.com",
    adresse: "Dakar, Sénégal",
    groupeSanguin: "O+",
    allergies: "Pénicilline",
    createdAt: "2026-06-01T09:00:00.000Z",
  },
  {
    id: "p2",
    prenom: "Moussa",
    nom: "Fall",
    dateNaissance: "1985-11-02",
    sexe: "homme",
    telephone: "76 234 56 78",
    email: "moussa.fall@exemple.com",
    adresse: "Thiès, Sénégal",
    groupeSanguin: "A+",
    allergies: "",
    createdAt: "2026-06-10T14:30:00.000Z",
  },
  {
    id: "p3",
    prenom: "Fatou",
    nom: "Sarr",
    dateNaissance: "2001-07-23",
    sexe: "femme",
    telephone: "70 345 67 89",
    email: "fatou.sarr@exemple.com",
    adresse: "Saint-Louis, Sénégal",
    groupeSanguin: "B-",
    allergies: "Arachide",
    createdAt: "2026-07-02T10:15:00.000Z",
  },
  {
    id: "p4",
    prenom: "Ibrahima",
    nom: "Ba",
    dateNaissance: "1978-01-30",
    sexe: "homme",
    telephone: "78 456 78 90",
    email: "ibrahima.ba@exemple.com",
    adresse: "Ziguinchor, Sénégal",
    groupeSanguin: "AB+",
    allergies: "",
    createdAt: "2026-07-08T16:45:00.000Z",
  },
];

export function getPatients(): Patient[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPatients));
    return seedPatients;
  }

  try {
    return JSON.parse(raw) as Patient[];
  } catch {
    return [];
  }
}

function savePatients(patients: Patient[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

export function createPatient(data: PatientFormData): Patient[] {
  const patient: Patient = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const patients = [patient, ...getPatients()];
  savePatients(patients);
  return patients;
}

export function updatePatient(id: string, data: PatientFormData): Patient[] {
  const patients = getPatients().map((patient) =>
    patient.id === id ? { ...patient, ...data } : patient,
  );
  savePatients(patients);
  return patients;
}

export function deletePatient(id: string): Patient[] {
  const patients = getPatients().filter((patient) => patient.id !== id);
  savePatients(patients);
  return patients;
}
