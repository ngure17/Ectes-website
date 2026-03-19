"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationCircleIcon as AlertIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Form validation: checks for non-empty email, valid email format, and password length >= 6
  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isFormValid) return; // prevent submission if form is invalid
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      // Role-based redirect
      const role = data.user.role;
      if (role === "admin") router.push("/admin/dashboard");
    //   else if (role === "responder") router.push("/responder");
    //   else if (role === "donor") router.push("/donor");
      else setError("Unknown role");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[url('/ECT.jpg')] bg-cover bg-center bg-no-repeat from-indigo-900 to-gray-900 font-inter">
      <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl w-full max-w-md lg:max-w-5xl">
        {/* LEFT PANEL: Image/Info - Desktop only */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16 bg-indigo-700 text-white">
          <div className="text-center">
            <img
              src="/Ectes Logo.jpg"
              alt="Ectes Logo"
              className="w-full h-auto rounded-xl mb-6 shadow-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x400/3730A3/ffffff?text=HIFADHI";
              }}
              height={"200px"}
            />
            <h2 className="text-4xl font-extrabold mb-3 leading-tight">
              <span className="text-emerald-600 text-3xl">
                ECT Enterprise LTD
              </span>
              <br />
              Building Skills, Futures
            </h2>
            <p className="text-indigo-200 text-lg font-light">
              Driving Innovation.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-10">
          <div className="text-center mb-8">
            <AlertIcon className="mx-auto h-12 w-12 text-indigo-600 mb-2 animate-pulse-slow" />
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              ECTES
            </h1>
            <p className="mt-1 text-sm text-gray-600 font-medium">
              Access Your Secure Account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 border-2 rounded-xl p-3 text-sm placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition duration-150 shadow-sm"
                placeholder="ectes@ect.ac.ke"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 border-2 rounded-xl p-3 text-sm placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition duration-150 shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                className={`p-3 rounded-xl border text-sm text-center font-medium 
                             ${
                               error.includes("Successful")
                                 ? "bg-green-100 border-green-300 text-green-700"
                                 : "bg-red-100 border-red-300 text-red-700"
                             }`}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full py-3 rounded-xl text-white font-bold text-lg tracking-wide transition duration-300 shadow-md
                          ${
                            loading || !isFormValid
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-lg"
                          }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Secure Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition">
              Trouble logging in? Contact Support.
            </a>
          </p>
        </div>
      </div>

      {/* Slow pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
