"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>(
    {},
  );

  const validate = () => {
    const newErrors: { password?: string; confirm?: string } = {};
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirm = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!token) {
      toast.error("Invalid reset link. No token found.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });
      const data = res.data;
      if (data.status === 200) {
        setSuccess(true);
        toast.success(data.message);
        setTimeout(() => router.push("/signin"), 3000);
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
        <div className="w-full max-w-md m-3 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
          <IoAlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Link
            href="/signin"
            className="inline-block py-2.5 px-6 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
        <div className="w-full max-w-md m-3 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Your password has been updated. Redirecting you to sign in...
          </p>
          <Link
            href="/signin"
            className="inline-block py-2.5 px-6 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
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
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Reset Password
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                  errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                  errors.confirm
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
            {errors.confirm && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.confirm}</span>
              </div>
            )}
          </div>

          {/* Submit */}
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
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="text-black font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center">
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
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
