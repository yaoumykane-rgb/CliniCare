import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiActivity, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import type { User } from "../types/roles";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) return;

    const accounts: User[] = JSON.parse(
      localStorage.getItem("accounts") ?? "[]",
    );

    const account = accounts.find(
      (item) => item.email === email && item.password === password,
    );

    if (!account) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(account));
    navigate("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/30 mb-4">
            <FiActivity className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">CliniCare</h1>
          <p className="text-slate-500 mt-1">Gestion de clinique simplifiée</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-1">
            Connexion
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Accédez à votre espace de gestion
          </p>

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

          <label className="block mb-4">
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

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 active:scale-[0.98]">
            Se connecter
            <FiArrowRight className="transition group-hover:translate-x-0.5" />
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Pas de compte ?{" "}
            <Link
              to="/register"
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
