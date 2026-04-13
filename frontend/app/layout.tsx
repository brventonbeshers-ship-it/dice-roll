import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dice Roll — On-Chain Dice Game",
  description: "Roll dice on Stacks blockchain. Track stats, climb the leaderboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="talentapp:project_verification" content="6a285372e38a56936b6c0d7c998984b0a749caf248abaac133eb2f7a980aa6391663e3dffbd18eff0aac580f335690e622689c7fccad6188af5262c3529d6a06" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

// fonts: 1775828340506

// layout: 1775828405691

// layout: 1775871364144

// fonts: 1775871428070

// fonts: 1775920341090

// layout: 1775920470222

// fonts: 1775966603266

// layout: 1775966697160

// layout: 1776046476408

// fonts: 1776046718238
