import logo from "@/assets/hyrocode-logo.png";
import { Instagram } from "lucide-react";

const suporte = [
  { href: "#proposta", label: "Central de ajuda" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#precos", label: "Contato" },
];

const empresa = [
  { href: "#top", label: "Início" },
  { href: "#valores", label: "Sobre nós" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#proposta", label: "Proposta" },
  { href: "#precos", label: "Preços" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative">
      {/* Linha divisória com glow azul central */}
      <div aria-hidden className="relative h-px w-full">
        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div
          className="absolute left-1/2 top-[-8px] h-4 w-[42%] -translate-x-1/2 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary-glow) 50%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Marca */}
          <div className="md:col-span-5">
            <img
              src={logo}
              alt="HyroCode"
              className="h-16 w-auto md:h-20"
              draggable={false}
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A HyroCode cria soluções digitais personalizadas, modernas e
              funcionais para destacar o seu negócio online. Sites e
              experiências que realmente convertem.
            </p>
            <a
              aria-label="Instagram HyroCode"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex size-10 items-center justify-center rounded-full glass text-muted-foreground transition-all hover:scale-105 hover:text-primary-glow"
            >
              <Instagram className="size-[18px]" />
            </a>
          </div>

          {/* Suporte */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Suporte
            </h3>
            <ul className="mt-5 space-y-3.5">
              {suporte.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Empresa
            </h3>
            <ul className="mt-5 space-y-3.5">
              {empresa.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year}{" "}
            <span className="text-foreground">HyroCode Desenvolvimento</span>.
            Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Política de privacidade
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
