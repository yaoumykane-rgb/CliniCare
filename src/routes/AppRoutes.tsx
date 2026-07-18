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

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";
import Profile from "../pages/Profile";

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

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}