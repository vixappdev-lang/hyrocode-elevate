import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion + already-visible elements (fix sections vanishing)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (reduced || inView) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);

    // Safety fallback: never leave the element invisible
    const safety = window.setTimeout(() => {
      el.classList.add("is-visible");
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return ref;
}
