import { useNavigate } from "react-router-dom";
import { FiActivity, FiGrid, FiLogOut } from "react-icons/fi";
import { ROLE_LABELS, type User } from "../types/roles";

export default function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") ?? "{}") as Partial<User>;

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const roleLabel = user.role ? ROLE_LABELS[user.role] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-100">
      <header className="bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/25">
              <FiActivity className="h-5 w-5" />
            </div>
            <p className="font-bold text-slate-800">CliniCare</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-700">
                {user.prenom
                  ? `${user.prenom} ${user.nom ?? ""}`.trim()
                  : user.email}
              </span>
              {roleLabel && (
                <span className="text-xs text-teal-600 font-medium">
                  {roleLabel}
                </span>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FiLogOut />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/30">
          <FiActivity className="h-8 w-8" />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-slate-800">
          {user.prenom
            ? `Bienvenue, ${user.prenom} !`
            : "Bienvenue dans votre espace"}
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-500">
          Vous êtes connecté à CliniCare
          {roleLabel ? ` en tant que ${roleLabel.toLowerCase()}` : ""}.
        </p>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]"
        >
          <FiGrid />
          Accéder au Dashboard
        </button>
      </main>
    </div>
  );
}