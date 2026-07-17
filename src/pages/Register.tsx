import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
  FiBriefcase,
} from "react-icons/fi";
import { ROLES, type Role, type User } from "../types/roles";

export default function Register() {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("patient");

  function register(e: React.FormEvent) {
    e.preventDefault();

    if (!prenom || !nom || !email || !password || !role) return;

    const user: User = { prenom, nom, email, password, role };

    const accounts: User[] = JSON.parse(
      localStorage.getItem("accounts") ?? "[]",
    );

    if (accounts.some((account) => account.email === email)) {
      alert("Un compte existe déjà avec cet email.");
      return;
    }

    accounts.push(user);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/30 mb-4">
            <FiActivity className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">CliniCare</h1>
          <p className="text-slate-500 mt-1">Gestion de clinique simplifiée</p>
        </div>

        <form
          onSubmit={register}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-1">
            Inscription
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Créez votre compte en quelques secondes
          </p>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Prénom</span>
              <div className="relative mt-1.5">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Awa"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Nom</span>
              <div className="relative mt-1.5">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Diop"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
            </label>
          </div>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700">Rôle</span>
            <div className="relative mt-1.5">
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                {ROLES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <div className="relative mt-1.5">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="vous@exemple.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="block mb-6">
            <span className="text-sm font-medium text-slate-700">
              Mot de passe
            </span>
            <div className="relative mt-1.5">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]">
            <FiUserPlus />
            Créer un compte
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
