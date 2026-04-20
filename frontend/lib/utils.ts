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

// fmt: 1776116007879

// utils: 1776116135345

// fmt: 1776143867734

// utils: 1776143924924

// utils: 1776170820453

// fmt: 1776170913559

// fmt: 1776186108398

// utils: 1776186212081

// utils: 1776215315147

// fmt: 1776215327703

// utils: 1776247917741

// fmt: 1776247923131

// utils: 1776256365713

// fmt: 1776256470859

// fmt: 1776269673414

// utils: 1776269872738

// fmt: 1776315621769

// utils: 1776315697131

// utils: 1776331086175

// fmt: 1776331237756

// fmt: 1776349522489

// utils: 1776349836804

// utils: 1776372641932

// fmt: 1776372735524

// utils: 1776400972437

// fmt: 1776401042717

// fmt: 1776431710865

// utils: 1776431947281

// fmt: 1776460570760

// fmt: 1776479923986

// utils: 1776479968559

// fmt: 1776494011050

// utils: 1776494230377

// fmt: 1776518591471

// utils: 1776518698191

// fmt: 1776550279769

// utils: 1776550392704

// utils: 1776585549299

// fmt: 1776585791952

// fmt: 1776619522894

// utils: 1776619729679

// fmt: 1776644633457

// utils: 1776644666582

// fmt: 1776672745409

// utils: 1776679838858

// fmt: 1776679843092

// utils: 1776701720986

// fmt: 1776701745705
