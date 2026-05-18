import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function checkAuth(request: Request) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const got = request.headers.get("x-admin-token") || "";
  if (got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export const Route = createFileRoute("/api/public/admin-visitors")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request)) return Response.json({ ok: false }, { status: 401 });

        const url = new URL(request.url);
        const days = Math.min(90, parseInt(url.searchParams.get("days") || "30", 10) || 30);
        const limit = Math.min(500, parseInt(url.searchParams.get("limit") || "200", 10) || 200);
        const since = new Date(Date.now() - days * 86400_000).toISOString();

        const { data, error } = await supabaseAdmin
          .from("visitor_events")
          .select("*")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
        return Response.json({ ok: true, rows: data ?? [] });
      },
    },
  },
});
