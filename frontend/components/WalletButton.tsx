interface WalletButtonProps {
  connected: boolean;
  address?: string;
  onConnect: () => void;
}

function shorten(addr: string) {
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

export function WalletButton({ connected, address, onConnect }: WalletButtonProps) {
  return (
    <button
      onClick={onConnect}
      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
        connected
          ? "glass-card text-[#ff8c00] border-[#ff8c00]/20"
          : "bg-gradient-to-r from-[#ff8c00] to-[#ffd700] text-black hover:opacity-90"
      }`}
    >
      {connected && address ? shorten(address) : "Connect Wallet"}
    </button>
  );
}

// walletBtn: 1775828277101

// a11y: 1775828290818

// a11y: 1775871409181

// walletBtn: 1775871508789

// a11y: 1775920292073

// walletBtn: 1775920348440

// a11y: 1775966582355

// walletBtn: 1775966734918

// a11y: 1776046404871

// walletBtn: 1776046464857

// a11y: 1776062791045

// walletBtn: 1776062972013

// walletBtn: 1776083955212

// a11y: 1776084076131

// walletBtn: 1776116127948

// a11y: 1776116268658

// walletBtn: 1776143740169

// a11y: 1776143743365

// a11y: 1776170837755

// walletBtn: 1776170917752

// a11y: 1776186271748

// walletBtn: 1776186334926

// a11y: 1776215128109

// walletBtn: 1776215251813

// walletBtn: 1776247694833

// a11y: 1776247722820

// walletBtn: 1776256373101

// a11y: 1776269663790

// walletBtn: 1776269772463

// walletBtn: 1776315563286

// a11y: 1776331024352

// walletBtn: 1776331235560

// walletBtn: 1776349589918

// a11y: 1776349898547
