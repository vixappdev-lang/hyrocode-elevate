## 1. Portfólio — imagens realistas premium (regerar as 6)

Substituir as 6 imagens em `src/assets/p1..p6-*.jpg` por screenshots **mockup-realista** de sites brasileiros modernos, formato retrato 768×1024 (mantém o card já portrait do `PortfolioSlider`).

Usar `imagegen` modelo **`premium`** (não `standard`) — é o que entrega texto legível, fotografia realista e UI crível.

Prompt base aprimorado por nicho:
> "Ultra-realistic, photographic-quality screenshot of a modern Brazilian [NICHO] website homepage in Brazilian Portuguese, mobile/tablet portrait view, edge-to-edge no device frame, no browser chrome. Premium contemporary web design 2025: large hero photography of real [SUJEITO], elegant sans-serif typography, headline '[HEADLINE]' clearly legible, subheadline, prominent CTA button '[CTA]', navigation bar at top with logo and 3-4 links, glimpse of next section below (services / testimonials / gallery). Color palette: [PALETA]. Awwwards-level composition, sharp focus, real photography (not illustration), accurate Portuguese text, professional UI spacing."

Nichos (mesmos 6 já mapeados — só refinamos prompts e paletas):
1. **Odontologia** — branco/menta/azul claro · headline "Cuidamos do seu sorriso" · CTA "Agendar consulta" · foto paciente real sorrindo, dentista ao fundo.
2. **Barbearia** — preto profundo + cobre/âmbar · headline "Estilo que marca" · CTA "Agendar horário" · foto barbeiro fazendo corte, iluminação cinematográfica.
3. **Estética & Beleza** — bege/rosé/champagne · headline "Sua beleza em primeiro lugar" · CTA "Agendar avaliação" · foto skincare close-up.
4. **Pilates** — sage/cream/off-white · headline "Movimento que transforma" · CTA "Aula experimental" · foto reformer studio luz natural.
5. **Advocacia** — navy profundo + dourado · headline "Defendemos seus direitos" · CTA "Consultoria gratuita" · foto advogado escritório clássico.
6. **Restaurante italiano** — terracota/creme/oliva · headline "Sabores que contam histórias" · CTA "Reservar mesa" · foto prato de massa servido, mesa rústica.

Sem mudar o `PortfolioSlider.tsx` (já está em retrato responsivo e bem dimensionado).

## 2. Nova seção "Nossos Valores" (inspirada no print)

Adicionar `src/components/site/Valores.tsx` e plugar em `src/routes/index.tsx` **entre `Proposta` e `PortfolioSlider`**.

Layout (desktop ≥ lg):
```
┌─────────────────────────┬───────────────────┐
│                         │   NOSSA VISÃO     │
│   NOSSOS VALORES        │   título + texto  │
│   (card grande c/ bg    ├───────────────────┤
│    image + overlay,     │   NOSSA MISSÃO    │
│    headline, CTA)       │   título + texto  │
└─────────────────────────┴───────────────────┘
```
- Grid `lg:grid-cols-3`: card grande ocupa `lg:col-span-2`, dois cards menores empilhados na coluna direita.
- Mobile/tablet: stack 1 coluna, `gap-5`.

Card grande:
- Altura `min-h-[420px] lg:min-h-[460px]`.
- Imagem de fundo (workspace dev — gerar `src/assets/valores-workspace.jpg`, 1280×860, escura, monitores com código + dashboards) + overlay `bg-gradient-to-tr from-background/95 via-background/80 to-background/40`.
- Conteúdo bottom-left: eyebrow `NOSSOS VALORES` (primary), h3 grande font-display, parágrafo, botão `Saber mais` (variant default já existente, com `btn-shine`).
- **NÃO usar vermelho** do print — manter paleta HyroCode: eyebrow em `text-primary`, CTA usa `--gradient-primary` (azul/glow).

Cards menores (2):
- `rounded-2xl border border-white/[0.06]` com fundo **gradiente sutil HyroCode** (não vermelho liso): `bg-gradient-to-br from-primary/15 via-card to-card` + glow radial no canto superior direito (decoração `::after`-like via div com `radial-gradient(circle at 85% 15%, color-mix(in oklab, var(--primary-glow) 28%, transparent), transparent 55%)`).
- Eyebrow uppercase tracking, h4 font-display, parágrafo muted.
- Bolinha decorativa no canto superior direito (`size-12 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-80 blur-[2px]`) — equivalente sofisticado do círculo vermelho do print.

Conteúdo:
- **Card grande** — eyebrow "NOSSOS VALORES", h3 "Designs inteligentes, resultados precisos — escolha a HyroCode para excelência digital.", parágrafo "Conectamos sua empresa aos seus clientes através de sites que elevam conversão a níveis extremos.", CTA "Saber mais" → `#proposta`.
- **Nossa Visão** — "Elevar sempre o valor da sua empresa em sites." + "Sites e landing pages profissionais que mostram exatamente o que seu cliente precisa ver."
- **Nossa Missão** — "Uma parceria pensando no longo prazo." + "Priorizamos o suporte ao cliente para garantir uma experiência que só a HyroCode entrega."

Reveal animation com `useReveal` no container.

## 3. Footer — reorganizar + linha divisória com glow azul

Manter a estrutura 3 colunas atual mas refinar `src/components/site/Footer.tsx`:

- **Linha superior do footer com glow azul central** (o "efeito impressão" pedido):
  - Substituir `border-t border-white/[0.06]` por um `<div>` decorativo no topo do `<footer>`:
    ```
    <div aria-hidden className="relative h-px w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2
                      bg-gradient-to-r from-transparent via-primary/60 to-transparent
                      blur-[0.5px]" />
      <div className="absolute left-1/2 top-[-6px] h-3 w-[40%] -translate-x-1/2
                      bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,var(--primary-glow)_45%,transparent),_transparent_70%)]
                      opacity-70" />
    </div>
    ```
  - Estático, sem animação, vai sumindo nas pontas.

- **Reorganização visual** (mais arejado, alinhamentos consistentes):
  - Aumentar padding vertical: `py-20 sm:py-24`.
  - Container `max-w-7xl` (em vez de 6xl) → mais respiro.
  - Grid: `grid-cols-1 md:grid-cols-12 gap-12 md:gap-10`.
    - Coluna marca: `md:col-span-5` (logo, descrição, Instagram).
    - Coluna Suporte: `md:col-span-3`.
    - Coluna Empresa: `md:col-span-4`.
  - Headings de coluna: tamanho menor, mesmo tracking, **cor `text-foreground`** (não primary, mantém minimalismo).
  - Espaçamento entre links `space-y-3.5`.
  - Logo `h-16 md:h-20` (reduzir um pouco — estava muito grande).
  - Descrição com `max-w-sm` e leading-relaxed mantidos.
  - Botão Instagram: `size-10`, `rounded-full`, glass, hover `text-primary-glow`.

- **Barra inferior**: separar com `mt-16 pt-6 border-t border-white/[0.05]`, layout `flex flex-col sm:flex-row items-center justify-between gap-3`:
  - Esquerda: `© {year} HyroCode Desenvolvimento. Todos os direitos reservados.`
  - Direita: pequeno link "Política de privacidade" + "Termos" (`text-xs text-muted-foreground hover:text-foreground`).

## 4. Não tocar
- Hero, Navbar, Pricing, ComoFunciona, ContactModal, tokens em `styles.css`, `PortfolioSlider.tsx`.

## Arquivos
- **Editar**: `src/components/site/Footer.tsx`, `src/routes/index.tsx`.
- **Criar**: `src/components/site/Valores.tsx`.
- **Regerar (premium)**: `src/assets/p1-analytics.jpg` … `p6-ecom.jpg`.
- **Gerar novo**: `src/assets/valores-workspace.jpg` (1280×860, workspace dev escuro).
