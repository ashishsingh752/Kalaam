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
    "This website is made for posting poetry by Ashish Singh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('kalaam-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-premium-gradient dark:bg-dark-gradient bg-fixed min-h-screen transition-colors duration-300`}
      >
        <Providers>
          <Header />
          <main className="pt-24 min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
