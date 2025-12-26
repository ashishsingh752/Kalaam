"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IoAlertCircle } from "react-icons/io5";

interface RegistrationProps {
  name: string;
  email: string;
  password: string;
  roll_number: string;
  yearOfStudy: string;
}

interface AuthErrorType {
  name?: string;
  email?: string;
  password?: string;
  roll_number?: string;
  confirm_password?: string;
}

export default function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<RegistrationProps>({
    name: "",
    email: "",
    password: "",
    roll_number: "",
    yearOfStudy: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setAuthState({
      ...authState,
      [id]: value,
    });
    validateField(id, value);
  };

  const validateField = (id: string, value: string) => {
    let errorMsg = "";

    switch (id) {
      case "name":
        if (!value) errorMsg = "Name is required.";
        else if (value.length < 3)
          errorMsg = "Name must be at least 3 characters.";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.endsWith("nitrkl.ac.in"))
          errorMsg = "Email do not contains @nitrkl.ac.in domain.";
        if (!value) errorMsg = "Email is required.";
        else if (!emailRegex.test(value)) errorMsg = "Invalid email address.";
        break;

      case "password":
        if (!value) errorMsg = "Password is required.";
        else if (value.length < 6)
          errorMsg = "Password must be at least 6 characters.";
        break;

      case "roll_number":
        const rollNumberPattern = /^[0-9]{3}[A-Z]{2}[0-9]{4}$/;
        if (!value) errorMsg = "Roll number is required.";
        if (!rollNumberPattern.test(value)) {
          errorMsg = "Roll number must be in the format 111XX1111.";
        }
        if (value.length > 9) errorMsg = "Roll number must be 9 characters.";

        break;

      case "confirm_password":
        if (value !== authState.password) errorMsg = "Passwords do not match.";
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMsg,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check for any errors before submitting
    const formErrors = Object.values(errors).filter(Boolean);
    if (formErrors.length > 0) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", authState);
      const response = res.data;
      if (response.status === 200) {
        toast.success(response.message);
        setAuthState({
          name: "",
          email: "",
          password: "",
          roll_number: "",
          yearOfStudy: "",
        });
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else if (response.status === 400) {
        setErrors(response.error);
        toast.error("Failed to register. Please check the form and try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] lg:p-10 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
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
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Register</h2>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-8">
          {/* Name */}
          <div>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={authState.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
            />
            {errors.name && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Roll Number */}
          <div>
            <input
              id="roll_number"
              type="text"
              placeholder="Roll Number (e.g., 121CS1234)"
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

          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email (@nitrkl.ac.in)"
              value={authState.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Year of Study */}
          <div>
            <select
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
              name="yearOfStudy"
              id="yearOfStudy"
              value={authState.yearOfStudy}
              onChange={handleChange}
            >
              <option value="">Select Year of Study</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
              <option value="5">Alumni</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                id="password"
                type={isOpen ? "text" : "password"}
                placeholder="Password (min. 6 characters)"
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

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                id="confirm_password"
                type={isOpenConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateField("confirm_password", e.target.value);
                }}
                className={`w-full px-4 py-2.5 text-sm rounded-lg border ${
                  errors.confirm_password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpenConfirm(!isOpenConfirm)}
              >
                {isOpenConfirm ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs">
                <IoAlertCircle size={14} />
                <span>{errors.confirm_password}</span>
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-black font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
