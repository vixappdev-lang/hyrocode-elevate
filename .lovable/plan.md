## 1. Logo realmente maior (sem esticar, sem extender)

A causa raiz já foi confirmada: o PNG `src/assets/hyrocode-logo.png` tem **enorme padding transparente em cima e embaixo** (a marca ocupa só ~40% da altura da imagem). Por isso aumentar `h-*` no CSS dá pouco efeito — só aumenta o "ar".

**Solução:** gerar uma versão cropada do PNG (trim do alpha) e usá-la nos componentes.

- Rodar `sharp` localmente para fazer `trim()` no PNG → salvar como `src/assets/hyrocode-logo-trim.png` (mantém proporção real do símbolo + texto, sem redesenhar nada, mesmas cores, mesma arte).
- Trocar o import em `Navbar.tsx` e `Footer.tsx` para o arquivo cropado.
- Reduzir levemente as classes (`h-10 sm:h-12` na navbar, `h-12 md:h-14` no footer) — como o PNG agora é "puro logo", a marca aparecerá **visivelmente ~50–60% maior** sem ocupar mais espaço de layout e sem distorcer nada.

Nenhum outro componente é tocado.

## 2. Seções "somem" — bug do reveal on scroll

O `useReveal` aplica `opacity: 0` via `.reveal` e só adiciona `.is-visible` quando o `IntersectionObserver` dispara. Em alguns casos (scroll rápido, refresh no meio da página, navegação por âncora) o elemento já está visível antes do observer montar → fica invisível para sempre.

**Correção em `src/hooks/use-reveal.ts`:**
- Checar imediatamente no mount se o elemento já está dentro do viewport (`getBoundingClientRect`) e marcar visível direto.
- Como fallback, garantir `.is-visible` se `prefers-reduced-motion` estiver ativo.
- Adicionar em `styles.css` um fallback `@media (prefers-reduced-motion: reduce) .reveal { opacity: 1; transform: none; }`.

Isso elimina o "sumiço" de Proposta / Valores / Portfólio / Pricing.

## 3. Performance geral

- Adicionar `loading="lazy"` e `decoding="async"` em imagens não-críticas (PortfolioSlider, cards).
- Adicionar `fetchpriority="high"` + preload no logo da navbar (LCP candidato).
- Trocar listeners de scroll para usar `requestAnimationFrame` com flag (Navbar já é `passive`, ok).
- Garantir que `ContactModal` faça import dinâmico (`React.lazy`) — só carrega quando o usuário clica em "Iniciar projeto".
- Revisar animações pesadas em `Hero` (se houver float infinito) para usar `will-change` corretamente.

## 4. Scrollbar transparente

Em `src/styles.css`:

```css
html { scrollbar-width: thin; scrollbar-color: transparent transparent; }
html:hover { scrollbar-color: color-mix(in oklab, white 12%, transparent) transparent; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: transparent; border-radius: 999px; transition: background .25s; }
html:hover ::-webkit-scrollbar-thumb { background: color-mix(in oklab, white 10%, transparent); }
```

Resultado: barra invisível em repouso, aparece sutilmente ao interagir.

## 5. Google SEO — resposta final

**Pergunta:** "consegue fazer integração 100% com Google SEO pra meu site aparecer no topo com precisão máxima?"

**Resposta honesta:**

Posso configurar **toda a parte técnica** que o Google espera (isso eu garanto 100%):

- `<title>` e `meta description` únicos por rota.
- Open Graph + Twitter Card.
- JSON-LD (Organization, WebSite, Service).
- `sitemap.xml` dinâmico (rota TanStack) + `robots.txt`.
- Canonical, lang, viewport, charset corretos.
- Verificação no **Google Search Console** via meta tag (posso fazer end-to-end pelo conector já disponível — gero o token, injeto a tag, chamo verify e cadastro o domínio).
- Envio do sitemap ao GSC.

**O que NÃO existe (e ninguém entrega de verdade):** garantia de "topo do Google". Ranking depende de autoridade do domínio, backlinks, idade, concorrência ("criar site" é altíssima competição — grandes players gastam milhões). O que posso fazer é deixar você **tecnicamente perfeito e indexável** e mirar keywords realistas ("desenvolvimento de sites premium [cidade]", "criação de SaaS sob medida", etc.), o que pode trazer resultado real em semanas/meses.

Se aprovar o plano, na implementação eu já incluo SEO técnico + verificação no Search Console.

---

## Arquivos afetados

- `src/assets/hyrocode-logo-trim.png` (novo, gerado por script)
- `src/components/site/Navbar.tsx` (import + classes)
- `src/components/site/Footer.tsx` (import + classes)
- `src/hooks/use-reveal.ts` (fix observer)
- `src/styles.css` (scrollbar + reduced-motion)
- `src/components/site/ContactModal.tsx` import → lazy em `Pricing.tsx` / `Hero.tsx`
- `src/routes/__root.tsx` (preload do logo, meta verification se aprovado)
- (Opcional, na fase SEO) `src/routes/sitemap[.]xml.ts`, `public/robots.txt`

Sem mexer em cores, navbar layout, identidade visual, hero, pricing, valores ou qualquer estrutura existente.