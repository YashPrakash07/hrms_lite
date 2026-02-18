import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackendPrimer from "@/components/BackendPrimer";
import { Toaster } from 'sonner';
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRMS Lite",
  description: "Lightweight Human Resource Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" richColors />
        <BackendPrimer />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
