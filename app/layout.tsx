import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/static/Header";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalaam: The Poetry Club",
  description:
    "This website is made for the Kalaam club of NIT Rourkela by Ashish Singh.",
};

export const runtime = "nodejs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-premium-gradient bg-fixed min-h-screen`}
      >
        <Providers>
          <Header />
          <main className="pt-24 min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
