import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/src/theme/ThemeProviders";
import { AppProvider } from "@/src/contexts/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center w-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 text-[16px]`}
      >
        <ThemeProviders>
          <AppProvider>
            <div className="max-w-[100vw] w-[100vW] mb-20"> {children}</div>
          </AppProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
