import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Role, User } from "../../types/roles";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

function getCurrentUser(): Partial<User> {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "{}") as Partial<User>;
  } catch {
    return {};
  }
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = getCurrentUser();
  const role: Role = user.role ?? "patient";

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={user}
          role={role}
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
