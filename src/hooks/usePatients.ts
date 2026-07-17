import { useEffect, useMemo, useState } from "react";
import type { Patient, PatientFilters, PatientFormData } from "../types/patient";
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from "../services/patientService";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PatientFilters>({
    search: "",
    sexe: "tous",
    groupeSanguin: "tous",
  });

  useEffect(() => {
    setPatients(getPatients());
    setLoading(false);
  }, []);

  const filteredPatients = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        query === "" ||
        [patient.prenom, patient.nom, patient.email, patient.telephone]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesSexe =
        filters.sexe === "tous" || patient.sexe === filters.sexe;

      const matchesGroupe =
        filters.groupeSanguin === "tous" ||
        patient.groupeSanguin === filters.groupeSanguin;

      return matchesSearch && matchesSexe && matchesGroupe;
    });
  }, [patients, filters]);

  function addPatient(data: PatientFormData): void {
    setPatients(createPatient(data));
  }

  function editPatient(id: string, data: PatientFormData): void {
    setPatients(updatePatient(id, data));
  }

  function removePatient(id: string): void {
    setPatients(deletePatient(id));
  }

  return {
    patients: filteredPatients,
    totalCount: patients.length,
    loading,
    filters,
    setFilters,
    addPatient,
    editPatient,
    removePatient,
  };
}
