export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr || "---";
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

// utils: 1775828337332

// fmt: 1775828467954

// utils: 1775871457996

// fmt: 1775871468569

// fmt: 1775920281687

// utils: 1775920418402

// fmt: 1775966648436

// utils: 1775966743473

// fmt: 1776046615280

// utils: 1776046722411

// fmt: 1776062832777

// utils: 1776063012805

// fmt: 1776083834247

// utils: 1776084096023
