"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

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
        else if (value.length < 3) errorMsg = "Name must be at least 3 characters.";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!value.endsWith("nitrkl.ac.in")) errorMsg = "Email do not contains @nitrkl.ac.in domain.";
        if (!value) errorMsg = "Email is required.";
        else if (!emailRegex.test(value)) errorMsg = "Invalid email address.";
        break;

      case "password":
        if (!value) errorMsg = "Password is required.";
        else if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
        break;

      case "roll_number":
        const rollNumberPattern = /^[0-9]{3}[A-Z]{2}[0-9]{4}$/;
        if (!value) errorMsg = "Roll number is required.";
        if (!rollNumberPattern.test(value)) {
          errorMsg = "Roll number must be in the format 111XX1111.";
        }
        if (value.length > 9) errorMsg = "Roll number must be at 9 characters.";

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
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] lg:p-10 items-center justify-center bg-gray-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-sm m-3 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-2xl font-semibold text-center">Kalaam: The Poetry Club</h3>
        <div className="flex justify-center pt-5 items-center">
          <Image
            src={
              "https://res.cloudinary.com/dkm6extdv/image/upload/v1718981080/kalaam-images/xgnmihsqctrq7wsvhdlc.png"
            }
            alt="Kalaam Logo"
            width={100}
            height={100}
            className=" "
          />
        </div>
        <div className="w-full flex items-center mt-2 justify-center mb-1">
          <span className="text-xl font-semibold px-2">Register</span>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-1 mt-6">
          {/* Name */}
          <input
            id="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className={`w-full px-4 text-sm py-1 rounded-md border ${errors.name ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0`}
          />
          {errors.name && <span className="text-red-400 font-semibold">{errors.name}</span>}

          {/* Roll Number */}
          <input
            id="roll_number"
            type="text"
            placeholder="Roll Number"
            onChange={handleChange}
            className={`w-full px-4 py-1 text-sm rounded-md border ${errors.roll_number ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0`}
          />
          {errors.roll_number && <span className="text-red-400 font-semibold">{errors.roll_number}</span>}

          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full px-4 py-1 text-sm rounded-md border ${errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0`}
          />
          {errors.email && <span className="text-red-400 font-semibold">{errors.email}</span>}

          {/* Year of Study */}
          <div className="flex flex-row">
            <div className="w-full text-sm px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0">
              <label className="text-sm text-gray-500">Year of Study</label>
            </div>
            <select
              className="w-full text-sm px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0"
              name="yearOfStudy"
              id="yearOfStudy"
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
              <option value="5">Our Alumni</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className={`w-full text-sm px-4 py-1 rounded-md border ${errors.password ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0`}
            />
            <div
              className="absolute text-sm inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && <span className="text-red-400 font-semibold">{errors.password}</span>}

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              id="confirm_password"
              type={isOpenConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirm_password", e.target.value);
              }}
              className={`w-full text-sm px-4 py-1 rounded-md border ${errors.confirm_password ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0`}
            />
            <div
              className="absolute text-sm inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
              onClick={() => setIsOpenConfirm(!isOpenConfirm)}
            >
              {isOpenConfirm ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.confirm_password && <span className="text-red-400 font-semibold">{errors.confirm_password}</span>}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
