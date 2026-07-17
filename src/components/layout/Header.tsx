import { FiLogOut, FiMenu } from "react-icons/fi";
import { ROLE_LABELS, type Role, type User } from "../../types/roles";

interface HeaderProps {
  user: Partial<User>;
  role: Role;
  title: string;
  onMenuClick: () => void;
  onLogout: () => void;
}

export default function Header({
  user,
  role,
  title,
  onMenuClick,
  onLogout,
}: HeaderProps) {
  const displayName = user.prenom
    ? `${user.prenom} ${user.nom ?? ""}`.trim()
    : (user.email ?? "Utilisateur");

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
              {title}
            </h1>
            <p className="hidden text-sm text-slate-500 sm:block">
              Vue d’ensemble de la clinique
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-700">{displayName}</p>
            <p className="text-xs font-medium text-teal-600">
              {ROLE_LABELS[role]}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}
