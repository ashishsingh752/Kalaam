"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IoAlertCircle } from "react-icons/io5";
import { useTheme } from "../ThemeProvider";

interface AuthErrorType {
  identifier?: string;
  password?: string;
}

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const [authState, setAuthState] = useState({
    identifier: "",
    password: "",
  });

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (session) setLoading(false);
    }
    getUser();
  }, []);

  const handleChange = (e: any) => {
    setAuthState({
      ...authState,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", authState);
      const response = res.data;
      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");
        setErrors({});
        signIn("credentials", {
          identifier: authState.identifier,
          password: authState.password,
          callbackUrl: "/",
          redirect: true,
        });
      } else if (response.status === 400) {
        setErrors(response.error?.messages || response.error || {});
        toast.error("Please check the form for errors.");
      } else if (
        response.status === 404 ||
        response.status === 403 ||
        response.status === 401
      ) {
        setErrors({});
        toast.error(
          response.message || "Login failed. Please check your credentials.",
        );
      } else {
        setErrors({});
        toast.error(
          response.message ||
            "An unexpected error occurred. Please try again later.",
        );
      }
    } catch (error: any) {
      if (error.response?.data?.status === 400) {
        setErrors(
          error.response.data.error?.messages ||
            error.response.data.error ||
            {},
        );
        toast.error("Please check the form for errors.");
      } else {
        setErrors({});
        toast.error(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier.trim()) {
      toast.error("Please enter your email or roll number.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await axios.post("/api/auth/forgot-password", {
        identifier: forgotIdentifier.trim(),
      });
      const data = res.data;
      if (data.status === 200) {
        setForgotSent(true);
        toast.success("Reset link sent to your registered email!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const { theme } = useTheme();

  if (loading && session?.data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-10 w-10 text-black dark:text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (session && session?.data) {
    redirect("/");
  }

  const logoSrc =
    theme === "dark"
      ? "https://res.cloudinary.com/dkm6extdv/image/upload/v1772826185/kalaam-logo-light_tk0dg6.png"
      : "https://res.cloudinary.com/dkm6extdv/image/upload/v1772826431/kalaam-logo_chdofs.png";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md m-3 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            कवितालय
          </h3>
          <div className="flex justify-center mt-4 items-center">
            <Image
              src={logoSrc}
              alt="Kalaam Logo"
              width={80}
              height={80}
              className="object-contain rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
            Sign In
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-8">
          {/* Identifier */}
          <div>
            <input
              id="identifier"
              type="text"
              placeholder="Email or Roll Number"
              value={authState.identifier}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                errors.identifier
                  ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-slate-600"
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:border-transparent transition-all`}
            />
            {errors.identifier && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 dark:text-red-400 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.identifier}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                id="password"
                type={isOpen ? "text" : "password"}
                placeholder="Password"
                value={authState.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                  errors.password
                    ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:border-transparent transition-all pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 dark:text-red-400 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.password}</span>
              </div>
            )}
            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                  setForgotSent(false);
                  setForgotIdentifier("");
                }}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 py-2.5 text-white bg-black dark:bg-indigo-600 rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-black dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md m-4 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 relative animate-in fade-in">
            {/* Close button */}
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Close forgot password modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!forgotSent ? (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-7 h-7 text-gray-600 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Forgot Password?
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Enter your email or roll number and we&apos;ll send a reset
                    link to your registered email.
                  </p>
                </div>
                <form
                  onSubmit={handleForgotPassword}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="Email or Roll Number"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="py-2.5 text-white bg-black dark:bg-indigo-600 rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {forgotLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  If an account exists with that identifier, we&apos;ve sent a
                  password reset link to your registered email address.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="py-2.5 px-6 text-white bg-black dark:bg-indigo-600 rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors font-medium"
                >
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
