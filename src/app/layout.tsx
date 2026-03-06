import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: "SJMaterial",
  description: "Modern premium ecommerce platform for building materials",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-black font-sans text-slate-100">
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-screen pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
