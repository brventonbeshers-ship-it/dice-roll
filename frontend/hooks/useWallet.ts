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

// wallet: 1776247687393

// wallet: 1776256532429

// wallet: 1776269820473

// wallet: 1776315683549

// wallet: 1776331088357

// wallet: 1776349533226

// wallet: 1776372598113

// wallet: 1776431860549

// wallet: 1776480034273

// wallet: 1776494167434

// wallet: 1776518710892

// wallet: 1776550336126

// wallet: 1776585738059

// wallet: 1776619803878

// wallet: 1776644785044

// wallet: 1776672680923

// wallet: 1776679688826

// wallet: 1776701728482

// wallet: 1776752037204

// wallet: 1776781377111

// wallet: 1776804702621

// wallet: 1776817867073

// wallet: 1776834599246

// wallet: 1776863625254

// wallet: 1776889924009

// wallet: 1776939415636

// wallet: 1776962761622

// wallet: 1777001908253

// wallet: 1777025318135

// wallet: 1777037492629

// wallet: 1777066771605

// wallet: 1777103620735

// wallet: 1777119664207

// wallet: 1777194690324

// wallet: 1777215118304

// wallet: 1777237806580

// wallet: 1777278955816

// wallet: 1777329029591

// wallet: 1777356603281
