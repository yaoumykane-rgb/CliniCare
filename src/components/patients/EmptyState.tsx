import { FiUsers } from "react-icons/fi";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <FiUsers className="h-7 w-7" />
      </div>
      <p className="mt-4 font-medium text-slate-600">{message}</p>
      <p className="mt-1 text-sm text-slate-400">
        Modifiez votre recherche ou vos filtres.
      </p>
    </div>
  );
}
