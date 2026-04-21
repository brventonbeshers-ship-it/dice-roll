"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  connectWallet,
  fetchTotalRolls,
  fetchUserRolls,
  fetchUserLastResult,
  fetchLeaderboard,
  sendRoll,
} from "@/lib/stacks";
import { DiceDisplay } from "@/components/DiceDisplay";

function shortenAddress(addr: string) {
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

function formatNumber(n: number) {
  return n.toLocaleString();
}

interface FloatingNum {
  id: number;
  x: number;
  y: number;
  value: number;
}

interface LeaderEntry {
  who: string;
  rolls: number;
}

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [myRolls, setMyRolls] = useState(0);
  const [lastResult, setLastResult] = useState(0);
  const [globalRolls, setGlobalRolls] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [rolling, setRolling] = useState(false);
  const [rings, setRings] = useState<number[]>([]);
  const [floats, setFloats] = useState<FloatingNum[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  // Load data
  const loadData = useCallback(async () => {
    const [total, lb] = await Promise.all([fetchTotalRolls(), fetchLeaderboard()]);
    setGlobalRolls(total);
    setLeaderboard(lb);
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Load user data when address changes
  useEffect(() => {
    if (address) {
      Promise.all([fetchUserRolls(address), fetchUserLastResult(address)]).then(
        ([rolls, result]) => {
          setMyRolls(rolls);
          setLastResult(result);
        }
      );
    }
  }, [address]);

  const handleConnect = () => {
    connectWallet(({ stacks }) => {
      setAddress(stacks);
    });
  };

  const handleRoll = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!address) return;

      // Optimistic UI
      const pseudoResult = Math.floor(Math.random() * 6) + 1;
      setMyRolls((c) => c + 1);
      setGlobalRolls((c) => c + 1);
      setLastResult(pseudoResult);

      // Animations
      setRolling(true);
      setTimeout(() => setRolling(false), 400);

      const ringId = ++idRef.current;
      setRings((r) => [...r, ringId]);
      setTimeout(() => setRings((r) => r.filter((id) => id !== ringId)), 600);

      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        const floatId = ++idRef.current;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setFloats((f) => [...f, { id: floatId, x, y, value: pseudoResult }]);
        setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== floatId)), 800);
      }

      // Send transaction
      sendRoll(address).then((success) => {
        if (success) {
          setTimeout(loadData, 5000);
          if (address) {
            setTimeout(() => {
              fetchUserLastResult(address).then(setLastResult);
            }, 5000);
          }
        } else {
          // Revert optimistic update
          setMyRolls((c) => c - 1);
          setGlobalRolls((c) => c - 1);
          setLastResult(0);
        }
      });
    },
    [address, loadData]
  );

  const connected = !!address;

  // Pad leaderboard to 10
  const displayLeaderboard: LeaderEntry[] = [...leaderboard];
  while (displayLeaderboard.length < 10) {
    displayLeaderboard.push({ who: "-", rolls: 0 });
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative grid-bg">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,140,0,0.12)_0%,rgba(255,140,0,0.04)_40%,transparent_70%)]" />
        <div className="absolute bottom-[0%] right-[0%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.12)_0%,rgba(255,215,0,0.04)_40%,transparent_70%)]" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,165,0,0.06)_0%,transparent_60%)]" style={{ animation: "pulse-glow 6s infinite ease-in-out" }} />

        {/* Floating particles */}
        <div className="particle" style={{ left: "10%", bottom: "0%", animationDelay: "0s" }} />
        <div className="particle" style={{ left: "20%", bottom: "5%", animationDelay: "1.5s" }} />
        <div className="particle" style={{ left: "35%", bottom: "0%", animationDelay: "3s" }} />
        <div className="particle-gold particle" style={{ left: "55%", bottom: "10%", animationDelay: "0.5s" }} />
        <div className="particle" style={{ left: "70%", bottom: "0%", animationDelay: "2s" }} />
        <div className="particle-gold particle" style={{ left: "85%", bottom: "5%", animationDelay: "4s" }} />
        <div className="particle" style={{ left: "45%", bottom: "0%", animationDelay: "5s" }} />
        <div className="particle-gold particle" style={{ left: "15%", bottom: "8%", animationDelay: "6s" }} />
        <div className="particle" style={{ left: "60%", bottom: "0%", animationDelay: "2.5s" }} />
        <div className="particle-gold particle" style={{ left: "90%", bottom: "3%", animationDelay: "3.5s" }} />
        <div className="particle" style={{ left: "5%", bottom: "0%", animationDelay: "7s" }} />
        <div className="particle" style={{ left: "75%", bottom: "0%", animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff8c00] to-[#ffd700] flex items-center justify-center text-sm font-bold text-black">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-[#ff8c00]">D</span>
            <span className="text-[#ff9a1a]">i</span>
            <span className="text-[#ffb833]">c</span>
            <span className="text-[#ffc94d]">e</span>
            <span className="text-[#ffd700]"> R</span>
            <span className="text-[#ffe033]">o</span>
            <span className="text-[#ffe966]">l</span>
            <span className="text-[#fff099]">l</span>
          </span>
        </div>

        <button
          onClick={handleConnect}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
            connected
              ? "glass-card text-[#ff8c00] border-[#ff8c00]/20"
              : "bg-gradient-to-r from-[#ff8c00] to-[#ffd700] text-black hover:opacity-90"
          }`}
        >
          {connected ? shortenAddress(address!) : "Connect Wallet"}
        </button>
      </header>

      {/* Global counter */}
      <div className="mt-6 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
          Global Rolls
        </p>
        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff8c00] to-[#ffd700] bg-clip-text text-transparent">
          {formatNumber(globalRolls)}
        </p>
      </div>

      {/* Main content: Dice LEFT + Leaderboard RIGHT */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-12 lg:gap-20 my-8 relative z-10">

        {/* Left side: Roll button + stats */}
        <div className="flex flex-col items-center">
          {/* Last result display */}
          {connected && lastResult > 0 && (
            <div className="mb-6">
              <DiceDisplay value={lastResult} size="lg" />
            </div>
          )}

          <div className="relative">
            {/* Orbiting dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-dot" />
              <div className="orbit-dot-2" />
            </div>

            {/* Glow behind button */}
            <div className="dice-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Ring effects */}
            {rings.map((id) => (
              <div
                key={id}
                className="dice-ring absolute inset-0 rounded-full border-2 border-[#ff8c00]/40"
              />
            ))}

            {/* Floating result numbers */}
            {floats.map((f) => (
              <div
                key={f.id}
                className="float-number absolute text-[#ffd700] font-bold text-xl"
                style={{ left: f.x, top: f.y }}
              >
                +{f.value}
              </div>
            ))}

            {/* The button */}
            <button
              ref={btnRef}
              onClick={handleRoll}
              disabled={!connected}
              className={`relative w-48 h-48 md:w-60 md:h-60 rounded-full cursor-pointer
                bg-gradient-to-br from-[#ff8c00]/10 to-[#ffd700]/10
                border-2 border-[#ff8c00]/30
                flex items-center justify-center
                transition-all duration-100 select-none
                shadow-[0_0_60px_rgba(255,140,0,0.1),inset_0_0_60px_rgba(255,140,0,0.05)]
                ${connected ? "hover:border-[#ff8c00]/60 hover:shadow-[0_0_80px_rgba(255,140,0,0.25),inset_0_0_60px_rgba(255,140,0,0.08)] active:scale-95" : "opacity-40 cursor-not-allowed"}
                ${rolling ? "dice-btn-shake" : ""}
              `}
            >
              <span className="text-3xl md:text-4xl font-black tracking-wider bg-gradient-to-r from-[#ff8c00] to-[#ffd700] bg-clip-text text-transparent">
                ROLL
              </span>
            </button>
          </div>

          {/* My stats */}
          {connected && (
            <div className="text-center mt-8 space-y-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
                  Your Rolls
                </p>
                <p className="text-3xl font-bold text-white/90">
                  {formatNumber(myRolls)}
                </p>
              </div>
            </div>
          )}

          {!connected && (
            <p className="text-white/20 text-sm mt-6">Connect wallet to start rolling</p>
          )}
        </div>

        {/* Right side: Leaderboard */}
        <div className="w-full max-w-sm lg:w-[360px]">
          <div className="glass-card p-6">
            <h2 className="text-sm uppercase tracking-[0.2em] text-white/30 mb-5 text-center">
              Leaderboard
            </h2>

            <div className="space-y-1.5">
              {displayLeaderboard.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                    i === 0 && entry.rolls > 0
                      ? "bg-gradient-to-r from-[#ffd700]/5 to-transparent border border-[#ffd700]/10"
                      : i === 1 && entry.rolls > 0
                      ? "bg-gradient-to-r from-[#c0c0c0]/5 to-transparent border border-[#c0c0c0]/10"
                      : i === 2 && entry.rolls > 0
                      ? "bg-gradient-to-r from-[#cd7f32]/5 to-transparent border border-[#cd7f32]/10"
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-sm font-bold ${
                        i === 0
                          ? "text-[#ffd700]"
                          : i === 1
                          ? "text-[#c0c0c0]"
                          : i === 2
                          ? "text-[#cd7f32]"
                          : "text-white/20"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-mono text-white/60">
                      {entry.who === "-" ? "---" : shortenAddress(entry.who)}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      i === 0 && entry.rolls > 0
                        ? "text-[#ffd700]/80"
                        : i === 1 && entry.rolls > 0
                        ? "text-[#c0c0c0]/80"
                        : i === 2 && entry.rolls > 0
                        ? "text-[#cd7f32]/80"
                        : "text-white/60"
                    }`}
                  >
                    {entry.rolls > 0 ? formatNumber(entry.rolls) : "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// perf: 1775828303348

// a11y: 1775828365931

// ui: 1775828422441

// ui: 1775871358959

// perf: 1775871412353

// a11y: 1775871455789

// ui: 1775920286893

// a11y: 1775920308146

// perf: 1775966738084

// a11y: 1775966747652

// ui: 1775966786416

// perf: 1776046417427

// ui: 1776046623635

// a11y: 1776046671843

// a11y: 1776062798739

// perf: 1776062828447

// ui: 1776062967316

// ui: 1776083905983

// perf: 1776084079319

// a11y: 1776084087669

// ui: 1776116153136

// perf: 1776116291844

// ui: 1776143811208

// perf: 1776143882464

// a11y: 1776143947001

// ui: 1776170745789

// a11y: 1776170885451

// perf: 1776186103201

// ui: 1776186229985

// a11y: 1776186348425

// ui: 1776215111004

// a11y: 1776215130298

// perf: 1776215336050

// a11y: 1776247826404

// perf: 1776247832772

// ui: 1776247877481

// a11y: 1776256370908

// perf: 1776256377280

// ui: 1776256567577

// a11y: 1776269669212

// ui: 1776269720260

// perf: 1776269742267

// ui: 1776315499002

// a11y: 1776315634486

// perf: 1776315743688

// a11y: 1776331141629

// ui: 1776331143814

// perf: 1776331240956

// perf: 1776349595092

// ui: 1776349643111

// a11y: 1776372541198

// perf: 1776372687719

// ui: 1776372781654

// perf: 1776400922877

// ui: 1776401031152

// a11y: 1776401100018

// ui: 1776431759397

// perf: 1776431811491

// a11y: 1776431944097

// a11y: 1776460456138

// perf: 1776460513466

// ui: 1776460638505

// ui: 1776479966328

// a11y: 1776480112733

// perf: 1776480156215

// perf: 1776494024283

// a11y: 1776494136413

// ui: 1776494236861

// a11y: 1776518578476

// ui: 1776518604243

// perf: 1776518668085

// perf: 1776550095708

// a11y: 1776550338641

// ui: 1776550368166

// a11y: 1776585589370

// perf: 1776585687645

// ui: 1776585743310

// a11y: 1776619540920

// ui: 1776619745209

// perf: 1776619792897

// ui: 1776644618512

// perf: 1776644734751

// a11y: 1776644845545

// perf: 1776672513722

// ui: 1776672553549

// a11y: 1776672688427

// perf: 1776679741381

// ui: 1776679744615

// a11y: 1776679798268

// ui: 1776701648792

// a11y: 1776701800676

// perf: 1776752176160

// ui: 1776752214240

// a11y: 1776752222743

// perf: 1776781511460

// ui: 1776781525445
