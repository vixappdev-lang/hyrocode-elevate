import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/pricing-buttons")({
  server: {
    handlers: {
      GET: async () => {
        const { data } = await supabaseAdmin
          .from("site_settings")
          .select("value")
          .eq("key", "pricing_buttons")
          .maybeSingle();
        return new Response(
          JSON.stringify({ ok: true, value: data?.value ?? null }),
          {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=60, s-maxage=300",
            },
          },
        );
      },
    },
  },
});
