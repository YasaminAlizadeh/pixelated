import React, { useState, useContext } from "react";
import {
  IconX,
  IconUser,
  IconLock,
  IconLogin,
  IconMail,
} from "@tabler/icons-react";
import { AuthContext } from "../../context/AuthContext";
import FormInput from "../forms/FormInput";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useContext(AuthContext)!;
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const isPasswordValid = password.length >= 8 && /\d/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLoginMode) {
      if (!email.includes("@")) return setError("Invalid email address");
      if (!isPasswordValid)
        return setError("Password does not meet requirements");
    }

    setLoading(true);

    const endpoint = isLoginMode ? "/auth/login" : "/auth/register";

    const payload = isLoginMode
      ? { username, password }
      : { username, email, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      login({ username: data.username || username, token: data.token });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-zinc-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-zinc-800">
        <header className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <h3 className="font-bold text-zinc-200 text-lg flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
              <IconLogin size={20} />
            </div>
            {isLoginMode ? "Login" : "Create Account"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <IconX size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative flex items-center">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <IconUser size={18} />
              </div>
              <FormInput
                id="username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                extendClasses="pl-8"
              />
            </div>

            {!isLoginMode && (
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <IconMail size={18} />
                </div>
                <FormInput
                  id="email"
                  type="text"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  extendClasses="pl-8"
                />
              </div>
            )}
            <div className="relative flex items-center">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <IconLock size={18} />
              </div>
              <FormInput
                id="password"
                type="password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                extendClasses="pl-8"
              />
            </div>

            {!isLoginMode && password.length > 0 && (
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      password.length >= 8 ? "bg-green-500" : "bg-zinc-700"
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      /\d/.test(password) ? "bg-green-500" : "bg-zinc-700"
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span
                    className={password.length >= 8 ? "text-green-500" : ""}
                  >
                    8+ Characters
                  </span>
                  <span className={/\d/.test(password) ? "text-green-500" : ""}>
                    1+ Number
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isLoginMode ? "Log In" : "Sign Up"}
          </button>

          <div className="text-center text-sm text-zinc-500 mt-2">
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError(null);
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
            >
              {isLoginMode ? "Sign up" : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
