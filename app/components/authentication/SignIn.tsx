"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Google from "next-auth/providers/google";

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
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", authState);
      const response = res.data;
      if (response.status === 200) {
        signIn("credentials", {
          roll_number: authState.roll_number,
          password: authState.password,
          callbackUrl: "/",
          redirect: true,
        });
      } else if (response.status === 404) {
        setErrors(response.error);
        // console.log(response.error);
        alert(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("error happened", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Image
          className="h-40 w-40"
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={40}
          height={40}
          alt="Loading..."
        />
      </div>
    );
  }

  if (session && session?.data) {
    redirect("/");
  }

  return (
    <div className="flex  h-[calc(100vh-5rem)]  bg-gray-200 items-center justify-center b">
      <div className="w-full max-w-sm px-8 py-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center">
          Kalaam: The Poetry Club
        </h3>
        {/* Temporarily disable Google authentication. Will be enabled soon. */}
        {/* <button
          onClick={() => signIn("google")}
          className="w-full rounded-md flex justify-center mt-6 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-400"
        >
          Continue With Google
        </button> */}

        <div className="w-full flex items-center justify-between mt-2 mb-2">
          <hr className="w-full bg-gray-300 border-0" />
          {/* <span className="text-sm text-gray-500 px-2">OR</span> */}
          <hr className="w-full bg-gray-300 border-0" />
        </div>

        <div className="w-full flex items-center justify-center mt-1 mb-1">
          <span className="text-xl font-semibold px-2">Sign In</span>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 mt-6">
          <input
            id="roll_number"
            type="roll_number"
            placeholder="Enter Your Institute Roll Number"
            onChange={handleChange}
            className="w-full px-4 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0"
          />
          <span className="text-red-400 font-semibold">
            {errors?.roll_number}
          </span>

          <div className="relative w-full">
            <input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 text-sm py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-0"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          <span className="text-red-400 font-semibold">
            {errors?.roll_number}
          </span>

          <button
            type="submit"
            className="w-full rounded-md flex justify-center mt-4 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-400"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          {errors && <p className="text-red-500 mt-2">{errors?.password}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
