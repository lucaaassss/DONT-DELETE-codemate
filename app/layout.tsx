/* eslint-disable camelcase */
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import { ThemeProvider } from "@/context/ThemeProvider";

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
    <html lang="en">
      <body className={`${inter.variable}${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient dark:primary-gradient-dark",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>{" "}
          {/* will wrap the entire children with ThemeProvider and ClerkProvider so that they can use light or dark mode and also Clerk authenthication. They do not necessarily have to use it, they just have access to it. It depends on them whether to use it or not */}
        </ClerkProvider>
      </body>
    </html>
  );
}
