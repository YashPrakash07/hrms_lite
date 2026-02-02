import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{
            marginLeft: '250px',
            flex: 1,
            padding: '2rem',
            backgroundColor: 'var(--background)',
            overflowX: 'hidden'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
