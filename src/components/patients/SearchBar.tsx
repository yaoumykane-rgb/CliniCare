import { FiSearch } from "react-icons/fi";
import type { PatientFilters, Sexe, GroupeSanguin } from "../../types/patient";
import { GROUPES_SANGUINS } from "../../types/patient";

interface SearchBarProps {
  filters: PatientFilters;
  onChange: (filters: PatientFilters) => void;
}

export default function SearchBar({ filters, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par prénom, nom, email ou téléphone…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <select
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
        value={filters.sexe}
        onChange={(e) =>
          onChange({ ...filters, sexe: e.target.value as Sexe | "tous" })
        }
      >
        <option value="tous">Tous les sexes</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
      </select>

      <select
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
        value={filters.groupeSanguin}
        onChange={(e) =>
          onChange({
            ...filters,
            groupeSanguin: e.target.value as GroupeSanguin | "tous",
          })
        }
      >
        <option value="tous">Tous les groupes</option>
        {GROUPES_SANGUINS.map((groupe) => (
          <option key={groupe} value={groupe}>
            {groupe}
          </option>
        ))}
      </select>
    </div>
  );
}
