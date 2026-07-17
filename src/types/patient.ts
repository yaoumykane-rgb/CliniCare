export type Sexe = "homme" | "femme";

export type GroupeSanguin =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export const GROUPES_SANGUINS: GroupeSanguin[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export interface Patient {
  id: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  sexe: Sexe;
  telephone: string;
  email: string;
  adresse: string;
  groupeSanguin: GroupeSanguin;
  allergies: string;
  createdAt: string;
}

export type PatientFormData = Omit<Patient, "id" | "createdAt">;

export interface PatientFilters {
  search: string;
  sexe: Sexe | "tous";
  groupeSanguin: GroupeSanguin | "tous";
}
