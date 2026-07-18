import { useState } from "react";
import { FiUser, FiCheck, FiSave } from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ROLE_LABELS, type User } from "../types/roles";

function getCurrentUser(): Partial<User> {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "{}") as Partial<User>;
  } catch {
    return {};
  }
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60";

export default function Profile() {
  const [user, setUser] = useState<Partial<User>>(getCurrentUser());
  const [prenom, setPrenom] = useState(user.prenom ?? "");
  const [nom, setNom] = useState(user.nom ?? "");
  const [saved, setSaved] = useState(false);

  const initials =
    `${(user.prenom ?? user.email ?? "?").charAt(0)}${(user.nom ?? "").charAt(0)}`.toUpperCase();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!prenom || !nom) return;

    const updatedUser: Partial<User> = { ...user, prenom, nom };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const accounts = JSON.parse(
      localStorage.getItem("accounts") ?? "[]",
    ) as User[];
    const updatedAccounts = accounts.map((account) =>
      account.email === user.email ? { ...account, prenom, nom } : account,
    );
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    setUser(updatedUser);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <DashboardLayout title="Profil">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-lg shadow-teal-600/25">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-slate-800">
              {user.prenom
                ? `${user.prenom} ${user.nom ?? ""}`.trim()
                : user.email}
            </p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
            {user.role && (
              <span className="mt-1 inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                {ROLE_LABELS[user.role]}
              </span>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <FiUser className="text-teal-600" />
            Informations personnelles
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Modifiez votre prénom et votre nom.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Prénom
              </span>
              <input
                type="text"
                className={`mt-1.5 ${inputClass}`}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Nom</span>
              <input
                type="text"
                className={`mt-1.5 ${inputClass}`}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                className={`mt-1.5 ${inputClass}`}
                value={user.email ?? ""}
                disabled
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Rôle</span>
              <input
                type="text"
                className={`mt-1.5 ${inputClass}`}
                value={user.role ? ROLE_LABELS[user.role] : ""}
                disabled
              />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]"
            >
              <FiSave />
              Enregistrer
            </button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <FiCheck />
                Profil mis à jour
              </span>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
