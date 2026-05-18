import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight } from "lucide-react";
import valoresImg from "@/assets/valores-workspace.jpg";

const cards = [
  {
    eyebrow: "Nossa visão",
    title: "Elevar sempre o valor da sua empresa em sites.",
    text: "Sites e landing pages profissionais que mostram exatamente o que seu cliente precisa ver para confiar e converter.",
  },
  {
    eyebrow: "Nossa missão",
    title: "Uma parceria pensando no longo prazo.",
    text: "Priorizamos o suporte ao cliente para garantir uma experiência que só a HyroCode entrega — antes, durante e depois do lançamento.",
  },
];

export function Valores() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="valores" className="relative py-20 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-3 lg:gap-6"
      >
        {/* Card grande — Nossos Valores */}
        <article className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card shadow-[var(--shadow-card)] lg:col-span-2 lg:min-h-[460px]">
          <img
            src={valoresImg}
            alt="Workspace da HyroCode"
            width={1280}
            height={896}
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/85 to-background/35" />
          {/* Decoração: bolinha azul no canto superior direito */}
          <div
            aria-hidden
            className="absolute right-6 top-6 size-14 rounded-full opacity-90 blur-[1px]"
            style={{ background: "var(--gradient-primary)" }}
          />

          <div className="relative flex h-full min-h-[380px] flex-col justify-end p-7 sm:p-10 lg:p-12">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Nossos valores
            </span>
            <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-[34px]">
              Designs inteligentes, resultados precisos — escolha a HyroCode
              para excelência digital.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Conectamos sua empresa aos seus clientes através de sites que
              elevam conversão a níveis extremos.
            </p>
            <a
              href="#proposta"
              className="btn-shine mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Saber mais
              <ArrowRight className="size-4" />
            </a>
          </div>
        </article>

        {/* Coluna direita: Visão + Missão */}
        <div className="grid gap-5 lg:gap-6">
          {cards.map((c) => (
            <article
              key={c.eyebrow}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] p-7 shadow-[var(--shadow-card)] sm:p-8 lg:min-h-[222px]"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in oklab, var(--primary) 14%, var(--card)) 0%, var(--card) 65%)",
              }}
            >
              {/* Glow radial canto superior direito */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 88% 12%, color-mix(in oklab, var(--primary-glow) 32%, transparent), transparent 55%)",
                }}
              />
              {/* Bolinha decorativa */}
              <div
                aria-hidden
                className="absolute right-5 top-5 size-10 rounded-full opacity-85 blur-[1px]"
                style={{ background: "var(--gradient-primary)" }}
              />

              <div className="relative">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {c.eyebrow}
                </span>
                <h4 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                  {c.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
