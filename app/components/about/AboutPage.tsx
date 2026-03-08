"use client";
import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEnvelope,
  FaHeart,
  FaCode,
  FaUsers,
  FaBell,
  FaSearch,
  FaShieldAlt,
  FaFeatherAlt,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiCloudinary,
} from "react-icons/si";
import Image from "next/image";

const features = [
  {
    icon: <FaFeatherAlt className="text-xl" />,
    title: "Infinite Poetry Feed",
    description:
      "Seamlessly explore posts with infinite scrolling and discover fresh poet suggestions on every visit.",
  },
  {
    icon: <FaBell className="text-xl" />,
    title: "Real-time Notifications",
    description:
      "Redis-powered instant alerts when someone interacts with your poetry or profile.",
  },
  {
    icon: <FaSearch className="text-xl" />,
    title: "Community Search",
    description:
      "Find and connect with fellow poets through powerful search functionality.",
  },
  {
    icon: <FaUsers className="text-xl" />,
    title: "Creative Profiles",
    description:
      "Showcase your poetic contributions with rich media support and full control over your content.",
  },
  {
    icon: <FaShieldAlt className="text-xl" />,
    title: "Secure & Exclusive",
    description:
      "NIT Rourkela identity verification ensures a safe, trusted community of poets.",
  },
  {
    icon: <FaCode className="text-xl" />,
    title: "Admin Dashboard",
    description:
      "Centralized control center for member management, role assignment, and club operations.",
  },
];

const techStack = [
  {
    icon: <SiNextdotjs className="text-2xl" />,
    name: "Next.js",
    color: "group-hover:text-black dark:group-hover:text-white",
  },
  {
    icon: <SiTypescript className="text-2xl" />,
    name: "TypeScript",
    color: "group-hover:text-blue-500",
  },
  {
    icon: <SiTailwindcss className="text-2xl" />,
    name: "Tailwind CSS",
    color: "group-hover:text-cyan-500",
  },
  {
    icon: <SiPrisma className="text-2xl" />,
    name: "Prisma",
    color: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
  },
  {
    icon: <SiPostgresql className="text-2xl" />,
    name: "PostgreSQL",
    color: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  {
    icon: <SiRedis className="text-2xl" />,
    name: "Redis",
    color: "group-hover:text-red-500",
  },
  {
    icon: <SiFirebase className="text-2xl" />,
    name: "Firebase",
    color: "group-hover:text-yellow-500",
  },
  {
    icon: <SiCloudinary className="text-2xl" />,
    name: "Cloudinary",
    color: "group-hover:text-blue-500",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            <FaFeatherAlt className="text-sm" />
            <span>The Poetry Club of NIT Rourkela</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">Kalaam</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A premium digital platform and creative sanctuary where poets can
            share their voice, discover fellow wordsmiths, and engage in
            meaningful artistic expression.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaHeart className="text-sm" />
              Support Us
            </Link>
            <a
              href="https://github.com/ashishsingh752/Kalaam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaGithub className="text-lg" />
              View on GitHub
            </a>
            <a
              href="https://kalaam-nitrkl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:border-indigo-300 dark:hover:border-indigo-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaExternalLinkAlt className="text-sm" />
              Live Website
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-700 to-transparent"></div>
        </div>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              What Makes Kalaam Special
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Built with love for the poetry community, packed with features
              that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Tech Stack
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Built with modern, battle-tested technologies for performance and
              scalability.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`text-gray-400 dark:text-gray-500 transition-colors duration-300 ${tech.color}`}
                >
                  {tech.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Made By Section */}
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-indigo-950 dark:to-slate-900 p-8 sm:p-10 text-white">
            {/* Decorative gradient blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 shrink-0">
                <Image
                  src="https://res.cloudinary.com/dkm6extdv/image/upload/v1772960959/ashish_p6rqdz.jpg"
                  alt="Ashish's Image"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>

              <div className="text-center sm:text-left space-y-3 flex-1">
                <div>
                  <p className="text-xs font-medium text-indigo-300 tracking-wider uppercase mb-1">
                    Designed & Developed by
                  </p>
                  <h3 className="text-2xl font-bold">Ashish Singh</h3>
                  <div className="text-gray-400 text-sm mt-1">
                    <p>Software Engineer - Dassault Systèmes</p>
                    <p>Electrical Engineering</p>
                    <p>2021-2025 · NIT Rourkela</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                  Passionate about building beautiful, performant web
                  applications. Kalaam was crafted with the vision of giving the
                  poetry community a premium digital space they deserve.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <a
                    href="mailto:121ee0368@nitrkl.ac.in"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300"
                  >
                    <FaEnvelope className="text-sm" />
                    Email
                  </a>
                  <a
                    href="https://github.com/ashishsingh752"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300"
                  >
                    <FaGithub className="text-sm" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashishsingh10/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300"
                  >
                    <FaLinkedin className="text-sm" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center pb-8">
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5">
            Made with <FaHeart className="text-red-400 text-xs" /> for the
            Kalaam community
          </p>
        </section>
      </div>
    </div>
  );
}
