"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function getUser() {
      if (session) setLoading(false);
    }
    getUser();
  }, []);

  const session = useSession();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Hi Ashish You hit the submit button ");
  };

  if (session && session?.data) {
    redirect("/");
  }

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

  return (
    <div className="flex   h-[calc(100vh-5rem)]  lg:p-10  items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm  px-8 py-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center">
          Kalaam: The Poetry Club
        </h3>
        <div className="w-full mt-5 mb-0.5">
          <button
            onClick={() => signIn()}
            className="w-full rounded-md flex justify-center mt-6 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue With Google
          </button>
        </div>
        <div className="w-full flex items-center justify-between mt-2 mb-2">
          <hr className="w-full bg-gray-300 border-0" />
          <span className="text-sm text-gray-500 px-2">OR</span>
          <hr className="w-full bg-gray-300 border-0" />
        </div>

        <div className="w-full flex items-center justify-center mt-1 mb-1">
          <span className="text-xl font-semibold px-2">Register</span>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 mt-6">
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="email"
          >
            Enter Username*
          </label>
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />

          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="email"
          >
            Enter email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />

          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="password"
          >
            Enter password *
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md flex justify-center mt-4 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          have an account?{" "}
          <Link
            href={"/signin"}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
