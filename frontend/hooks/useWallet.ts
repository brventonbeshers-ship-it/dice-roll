import { useState, useCallback } from "react";
import { connectWallet } from "@/lib/stacks";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(() => {
    connectWallet(({ stacks }) => setAddress(stacks));
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, connected: !!address, connect, disconnect };
}

// wallet: 1775828293997

// wallet: 1775871545213

// wallet: 1775966741283

// wallet: 1776046562916

// wallet: 1776062923862

// wallet: 1776084133277

// wallet: 1776116200947

// wallet: 1776143805868

// wallet: 1776170750859

// wallet: 1776186152005

// wallet: 1776215118531
