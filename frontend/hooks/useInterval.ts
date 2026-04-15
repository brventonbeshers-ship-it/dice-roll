import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// interval: 1775828489852

// interval: 1775871369319

// interval: 1775920432962

// interval: 1775966687620

// interval: 1776046524367

// interval: 1776063020485

// interval: 1776084011713

// interval: 1776116078348

// interval: 1776143760239

// interval: 1776170815236

// interval: 1776186274925

// interval: 1776215323503

// interval: 1776247822156
