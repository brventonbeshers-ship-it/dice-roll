import { useCallback, useRef } from "react";

export function useSound(enabled = true) {
  const audioCtx = useRef<AudioContext | null>(null);

  const playRoll = useCallback(() => {
    if (!enabled) return;
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [enabled]);

  return { playRoll };
}

// sound: 1775828433164

// sound: 1775871516166

// sound: 1775920350631

// sound: 1775966600080

// sound: 1776046560738

// sound: 1776062917039

// sound: 1776083820506

// sound: 1776116076113

// sound: 1776143809046

// sound: 1776170758741

// sound: 1776186357797

// sound: 1776215134486

// sound: 1776247718628

// sound: 1776256304946

// sound: 1776269618760

// sound: 1776315638655

// sound: 1776330989393

// sound: 1776349579427

// sound: 1776372835332

// sound: 1776400863287

// sound: 1776431892361

// sound: 1776479983252
