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

// fonts: 1776062926254

// layout: 1776063054705

// layout: 1776083823684

// fonts: 1776084197501

// layout: 1776116004685

// fonts: 1776116080537

// layout: 1776143749709

// fonts: 1776143823737

// fonts: 1776170636449

// layout: 1776170890640

// layout: 1776186110582

// fonts: 1776186285452

// fonts: 1776215095292

// layout: 1776215236147

// layout: 1776247727029

// fonts: 1776247784252

// layout: 1776256516725

// layout: 1776269666988

// fonts: 1776269823684

// layout: 1776315522132

// fonts: 1776315703503

// layout: 1776331036894

// fonts: 1776331244128

// layout: 1776349541586

// fonts: 1776349761124

// layout: 1776372592920

// fonts: 1776372702418

// layout: 1776400979817

// fonts: 1776431672887

// layout: 1776431719226

// layout: 1776460424827

// fonts: 1776460587706

// fonts: 1776479930478

// layout: 1776479972791

// fonts: 1776494063622

// layout: 1776494221891

// fonts: 1776518517281

// layout: 1776518772116

// layout: 1776550060056

// fonts: 1776550266204

// layout: 1776585749789

// fonts: 1776585806716

// layout: 1776619518637

// fonts: 1776619678339

// fonts: 1776644622756

// layout: 1776644841302

// fonts: 1776672495510

// layout: 1776679680122

// fonts: 1776679890385

// fonts: 1776701629825

// layout: 1776701815678

// layout: 1776752033964

// fonts: 1776752115775

// layout: 1776781242471

// fonts: 1776781384577

// fonts: 1776804614176

// layout: 1776804841702

// fonts: 1776817609843

// layout: 1776817682551

// layout: 1776834553518

// fonts: 1776834614255

// layout: 1776863272777

// fonts: 1776863504620

// fonts: 1776876566078

// layout: 1776876687362

// layout: 1776889907056

// fonts: 1776889963325
