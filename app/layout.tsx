import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Appbar from "./components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalaam: The Poetry Club",
  description:
    "This website is made for the kalaam club of the NIT Rourkela made by the Ashish Singh and Gaurav Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          </Providers>
      </body>
    </html>
  );
}
