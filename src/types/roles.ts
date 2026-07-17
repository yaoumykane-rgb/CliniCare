export type Role = "docteur" | "patient" | "administrateur";

export const ROLES: { value: Role; label: string }[] = [
  { value: "patient", label: "Patient" },
  { value: "docteur", label: "Docteur" },
  { value: "administrateur", label: "Administrateur" },
];

export const ROLE_LABELS: Record<Role, string> = {
  patient: "Patient",
  docteur: "Docteur",
  administrateur: "Administrateur",
};

export type User = {
  prenom?: string;
  nom?: string;
  email: string;
  password?: string;
  role: Role;
};
