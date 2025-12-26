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

interface AuthErrorType {
  roll_number?: string;
  password?: string;
}

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const [authState, setAuthState] = useState({
    roll_number: "",
    password: "",
  });

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
        signIn("credentials", {
          roll_number: authState.roll_number,
          password: authState.password,
          callbackUrl: "/",
          redirect: true,
        });
      } else if (response.status === 404 || response.status === 403) {
        setErrors(response.error);
        toast.error(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && session?.data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-10 w-10 text-black"
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
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (session && session?.data) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md m-3 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900">कवितालय</h3>
          <div className="flex justify-center mt-4 items-center">
            <Image
              src="https://res.cloudinary.com/dkm6extdv/image/upload/v1728752557/ii-removebg-preview_jjqgoy.png"
              alt="Kalaam Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Sign In</h2>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-8">
          {/* Roll Number */}
          <div>
            <input
              id="roll_number"
              type="text"
              placeholder="Institute Roll Number"
              value={authState.roll_number}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                errors.roll_number
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
            />
            {errors.roll_number && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.roll_number}</span>
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
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 py-2.5 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
