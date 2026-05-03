import { useCallback, useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  startOnMount?: boolean;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  startOnMount = false,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const rafRef = useRef<number | null>(null);

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsRunning(true);
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (end - start) * easeOutExpo(progress));
      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsRunning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [start, end, duration]);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCount(start);
    setIsRunning(false);
  }, [start]);

  useEffect(() => {
    if (startOnMount) run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startOnMount, run]);

  return { count, isRunning, run, reset };
}

export function useCounterOnView(end: number, duration = 2000) {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const counter = useCounter({ end, duration });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          counter.run();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [triggered, counter]);

  return { ref, count: counter.count };
}
