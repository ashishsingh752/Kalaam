"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    email: "",
    password: "",
    roll_number: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

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
      const res = await axios.post("/api/auth/signup", authState);
      const response = res.data;
      if (response.status === 200) {
        router.push(`/signin?message=${response.message}`);
        alert(response.message);
        setLoading(false);
      } else if (response.status === 400) {
        setErrors(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log("error happened", error);
      setLoading(false);
    }
  };

  if (session) {
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
            onClick={() => signIn("google")}
            className="w-full rounded-md flex justify-center mt-6 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue With Google
          </button>
        </div>
        <div className="w-full flex items-center justify-between mt-2 ">
          <hr className="w-full bg-gray-300 border-0" />
          <span className="text-sm text-gray-500 px-2">OR</span>
          <hr className="w-full bg-gray-300 border-0" />
        </div>

        <div className="w-full flex items-center justify-center  mb-1">
          <span className="text-xl font-semibold px-2">Register</span>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-1 mt-6">
          {/* name */}
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="name"
          >
            name*
          </label>
          <input
            id="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
            className="w-full px-4 text-sm py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className="text-red-400 font-semibold">{errors?.name}</span>

          {/* roll_number */}
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="name"
          >
            roll number*
          </label>
          <input
            id="roll_number"
            type="text"
            placeholder="00XX0000"
            onChange={handleChange}
            className="w-full px-4 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className="text-red-400 font-semibold">
            {errors?.roll_number}
          </span>

          {/* email  */}
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="email"
          >
            email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-1  text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className="text-red-400 font-semibold">{errors?.email}</span>

          {/* password section */}
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="password"
          >
            password *
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full text-sm px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <div
              className="absolute text-sm inset-y-0 right-0 pr-3 flex items-center  leading-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          <span className="text-red-400 font-semibold">{errors?.password}</span>

          {/* password__confirmation
          <label
            className="text-sm text-gray-700 font-medium block"
            htmlFor="password"
          >
            password confirmation *
          </label>
          <div className="relative w-full">
            <input
              id="password__confirmation"
              type="password"
              placeholder="Enter Password Again"
              onChange={handleChange}
              className="w-full text-sm px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
          </div> */}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-md flex justify-center mt-4 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          {/* {errors && <p className="text-red-500 mt-2">{errors}</p>} */}
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
