import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const has = document.cookie.split(";").some((c) => c.trim().startsWith("hc_consent=accepted"));
    if (!has) return;
    fetch("/api/public/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || "",
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);
  return null;
}
