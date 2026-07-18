import { NavLink } from "react-router-dom";
import {
  FiActivity,
  FiHome,
  FiGrid,
  FiUsers,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import type { NavItem } from "../../types/dashboard";
import type { Role } from "../../types/roles";

const navItems: NavItem[] = [
  {
    label: "Accueil",
    to: "/home",
    icon: FiHome,
    roles: ["administrateur", "docteur", "patient"],
  },
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: FiGrid,
    roles: ["administrateur", "docteur", "patient"],
  },
  {
    label: "Patients",
    to: "/patients",
    icon: FiUsers,
    roles: ["administrateur", "docteur"],
  },
  {
    label: "Rendez-vous",
    to: "/appointments",
    icon: FiCalendar,
    roles: ["administrateur", "docteur", "patient"],
  },
  {
    label: "Profil",
    to: "/profile",
    icon: FiUser,
    roles: ["administrateur", "docteur", "patient"],
  },
];

interface SidebarProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, open, onClose }: SidebarProps) {
  const items = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/25">
            <FiActivity className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">CliniCare</p>
            <p className="text-xs text-slate-500">Gestion de clinique</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {items.map((item) =>
            item.disabled ? (
              <span
                key={item.to}
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400"
                title="Bientôt disponible"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-400">
                  Bientôt
                </span>
              </span>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}
