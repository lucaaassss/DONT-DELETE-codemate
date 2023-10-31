import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  // Inter is a Google font
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  // Space_Grotesk is a Google font
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});
export const metadata: Metadata = {
  title: "Codemate",
  description:
    "An online platform designed to facilitate collaborative problem-solving among programming students.It serves as a space where users can ask questions about coding challenges and related topics, and receive answers from both an AI system and fellow users.This combination of AI assistance and community-driven engagement aims to provide reliable solutions to coding queries.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable}${spaceGrotesk.variable}`}>
          {children}
          <h1 className="h1-bold"> HI </h1>
        </body>
      </html>
    </ClerkProvider>
  );
}
