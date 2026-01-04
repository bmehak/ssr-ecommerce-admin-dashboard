import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; //

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard | E-commerce",
  description: "Server-rendered product management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#000", color: "#fff", minHeight: "100vh" }}
      >

        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}