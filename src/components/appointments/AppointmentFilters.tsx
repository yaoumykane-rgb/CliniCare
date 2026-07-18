import { FiSearch } from "react-icons/fi";
import type {
  AppointmentFilters as Filters,
  AppointmentStatus,
} from "../../types/appointment";
import { APPOINTMENT_STATUSES } from "../../types/appointment";

interface AppointmentFiltersProps {
  filters: Filters;
  docteurs: string[];
  onChange: (filters: Filters) => void;
}

const selectClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10";

export default function AppointmentFilters({
  filters,
  docteurs,
  onChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par patient, docteur ou motif…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
        <select
          className={selectClass}
          value={filters.statut}
          onChange={(e) =>
            onChange({
              ...filters,
              statut: e.target.value as AppointmentStatus | "tous",
            })
          }
        >
          <option value="tous">Tous les statuts</option>
          {APPOINTMENT_STATUSES.map((statut) => (
            <option key={statut} value={statut}>
              {statut}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.docteur}
          onChange={(e) => onChange({ ...filters, docteur: e.target.value })}
        >
          <option value="tous">Tous les docteurs</option>
          {docteurs.map((docteur) => (
            <option key={docteur} value={docteur}>
              {docteur}
            </option>
          ))}
        </select>

        <input
          type="date"
          className={`${selectClass} col-span-2 sm:col-span-1`}
          value={filters.date}
          onChange={(e) => onChange({ ...filters, date: e.target.value })}
        />
      </div>
    </div>
  );
}
