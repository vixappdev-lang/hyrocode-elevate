## Visão geral

Reorganizar o admin em um **painel profissional estilo macOS** (sidebar fixa à esquerda + topbar com traffic lights + conteúdo full-bleed nos cantos, **nada centralizado**), adicionar Dashboard com gráficos reais, Rastreio com mapa Leaflet, Solicitações, Configurações (botões "Quero esse" configuráveis), banner de cookies LGPD, segurança realista e SEO/sitemap reforçado para o Google.

> Honestidade: anti-DDoS/anti-VPN só blindam de verdade na camada CDN (Cloudflare). No código entrego deterrents fortes + headers + rate-limit. Cloudflare você ativa depois — eu deixo o passo-a-passo.

---

## 1. Admin — layout profissional, sem centralização

```
┌────────────────────────────────────────────────────────────────┐
│ ● ● ●   HyroCode Admin · Dashboard       🔍 buscar    ⚙  👤   │ ← Topbar h-12 fixa
├──────────┬─────────────────────────────────────────────────────┤
│ ▦ Dashboard │  KPI ─ KPI ─ KPI ─ KPI                          │
│ ⌖ Rastreio  │  ┌──────────────────┐  ┌────────────┐           │
│ ✉ Solicit.  │  │  Área 30d (full) │  │  Donut     │           │
│ ⚙ Config.   │  └──────────────────┘  └────────────┘           │
│             │  ┌────────────────────────────────┐               │
│ ─────       │  │  Barras: top países            │               │
│ Logout      │  └────────────────────────────────┘               │
└──────────┴─────────────────────────────────────────────────────┘
```

Regras de layout (todas as páginas do admin seguem):
- **Sidebar 240px fixa** colada na borda esquerda (não flutuante, não centralizada). Recolhe pra 56px (só ícones).
- **Topbar 48px fixa** colada no topo, full-width, com 3 "traffic lights" macOS (decorativos), título contextual, busca e menu de usuário no canto direito.
- **Conteúdo**: `padding: 24px 32px`, grid 12 colunas, ocupa **100% do espaço restante** — sem `max-w-*` centralizado. Widgets se distribuem nos cantos (KPIs no topo, gráfico grande à esquerda, secundário à direita, lista full-width embaixo).
- Cards: bordas `rgba(255,255,255,0.06)`, fundo `--card`, raio 16px, sombra interna sutil. **Sem neon**, só `--primary` discreto nos accents.

Rotas:
- `/admin` → redirect `/admin/dashboard`
- `/admin/dashboard` — 4 KPIs (Visitantes 24h/7d/30d, Solicitações) + área 30d (recharts) + donut devices + barras top países
- `/admin/rastreio` — **mapa Leaflet full-bleed** ocupando 65% à esquerda, painel direito 35% com lista de visitantes (IP mascarado, cidade/região/país, device, browser, OS, ISP, flag VPN, timestamp). Filtros no topo da coluna direita.
- `/admin/solicitacoes` — grid 2 colunas dos cards de contato (a tela atual reaproveitada dentro do novo shell)
- `/admin/configuracoes` — formulário em 2 colunas: à esquerda, 3 inputs (URL botão Essencial / Pro / Premium) + texto custom de cada um. À direita, preview ao vivo do Pricing.

## 2. Banco de dados (uma migração)

- `visitor_events` — id, ip, country, region, city, lat, lng, device, os, browser, user_agent, referrer, path, is_vpn, is_proxy, asn, isp, created_at
- `site_settings` — key TEXT PK, value JSONB (guarda `{essencial: {url, label}, pro: {...}, premium: {...}}`)
- `user_roles` + enum `app_role` + função `has_role()` SECURITY DEFINER (padrão correto de RBAC)
- RLS: tabelas novas só leitura por admin; escrita via service role nos endpoints. `contact_submissions` permanece como está.

## 3. Endpoints (`/api/public/*`, auth via `x-admin-token`)

- `POST /api/public/track` — recebe pageview, server-side faz geo-IP + detecção VPN/proxy (ipapi.co free tier, sem chave) e grava em `visitor_events`. Só dispara se `hc_consent=accepted`.
- `GET /api/public/admin-visitors` — paginado + filtros (período, país, device, vpn)
- `GET /api/public/admin-stats` — KPIs e séries do dashboard
- `GET/PUT /api/public/admin-settings` — lê/grava `site_settings`

## 4. SEO + Sitemap para o Google (capricho máximo)

**Sitemap dinâmico** (`src/routes/sitemap[.]xml.ts`) — já existe, vou enriquecer com:
- `<lastmod>` real (build time + última atualização de cada rota)
- Múltiplas entradas (raiz, âncoras principais do site mapeadas como `/#proposta`, `/#portfolio`, `/#precos`, `/#contato` — útil para sitelinks)
- Cache adequado (`max-age=3600`, `s-maxage=86400`)
- Header `X-Robots-Tag: index, follow`

**robots.txt** — já existe, vou reforçar:
- Mantém `Disallow: /admin/` e `/api/`
- Adiciona `Sitemap: https://hyrocode.online/sitemap.xml`
- Adiciona bloco específico para `User-agent: Googlebot` permitindo tudo público

**JSON-LD no root** (`__root.tsx`):
- `Organization` (nome HyroCode, logo, URL, sameAs com redes sociais quando você der)
- `WebSite` com `potentialAction` (SearchAction) — habilita caixa de busca do Google
- `BreadcrumbList` por rota

**Meta tags reforçadas** na home (`/`):
- title otimizado para palavras-chave ("criar site", "desenvolvimento de sites", "agência de sites premium")
- description com CTA + cidade/região se você quiser focar Brasil
- `og:image` apontando pra imagem real (gero uma 1200×630 com logo + tagline se quiser)
- `twitter:card summary_large_image`
- `canonical` em `hyrocode.online`

**Search Console**: o site já está indexado segundo você. Vou adicionar a meta de verificação como secret/env se você quiser (`GOOGLE_SITE_VERIFICATION`).

**Honestidade sobre "topo no Google sempre"**: ninguém entrega isso de forma honesta — depende de autoridade do domínio, backlinks, conteúdo e tempo (semanas a meses). O que faço entrega a **base técnica perfeita** (Core Web Vitals verdes, schema rico, sitemap impecável, headers corretos). O resto é trabalho de conteúdo.

## 5. Cookie banner LGPD (responsivo)

- Componente fixo bottom-center no desktop, bottom full-width no mobile
- Texto: "Usamos cookies para entender como você navega e melhorar a experiência. Você pode aceitar ou rejeitar."
- Botões "Aceitar" / "Rejeitar" + link discreto "Saiba mais"
- Persiste em `localStorage` (`hc_consent`) + cookie de 12 meses
- Aceitar → habilita o `/api/public/track`. Rejeitar → silêncio total.

## 6. Segurança — camada realista

**No código (eu faço agora):**
- Headers em `vite.config.ts` (`routeRules`) e `__root.tsx`: CSP estrita, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy
- Deterrents client-side (site público + admin): bloqueio de F12, Ctrl+Shift+I/J/C/U, botão direito, drag de imagem, seleção em áreas sensíveis. Detecção de DevTools aberto (timing trick) → overlay blur. **Não bloqueia dev experiente** (impossível), mas afasta 95%
- Anti-clone: ofuscação dos chunks (terser mangle agressivo), watermark invisível no HTML, meta `X-Robots-Tag` no admin com `noindex, nofollow, noarchive`
- Detecção de VPN/proxy server-side (ipapi flags) — **só sinaliza** no admin, não bloqueia (bloquear pune iCloud Private Relay, VPN corporativa etc.)
- Rate-limit em memória (token bucket por IP) no `/api/public/contact` e `/api/public/track`

**Fora do código (você ativa — instruções no final):**
- Cloudflare na frente de `hyrocode.online`: DDoS L3/4/7, WAF, Bot Fight Mode, Browser Integrity Check, Hotlink Protection. **É o único anti-DDoS real.**

## 7. Performance (corrige "as seções somem" / lentidão)

- Lazy-load das seções abaixo da dobra com `React.lazy` + Suspense fallbacks com skeleton (resolve o sumiço — provavelmente o `useReveal` está tirando opacity sem voltar em algum caso)
- Code-split: admin não vai pro bundle público
- Preload do logo + hero no `<head>`
- `font-display: swap` + preconnect aos domínios de fontes
- Imagens com `width/height` explícitos (zera CLS)
- Mapa Leaflet só carrega na rota `/admin/rastreio` (dynamic import)

## 8. Botões "Quero esse" configuráveis

- Pricing puxa `site_settings` via loader server-side
- Cada um dos 3 cards usa a URL configurada no admin (fallback pro modal de contato atual)
- Você edita URL + texto direto em `/admin/configuracoes` e vê o preview ao vivo

---

## Detalhes técnicos

- Stack: TanStack Start + `createServerFn` + server routes (sem edge functions)
- Mapa: `leaflet` + `react-leaflet` (lazy, só admin). Tiles OpenStreetMap. Sem chave.
- Geo-IP: `ipapi.co/{ip}/json/` — 1k req/dia grátis sem chave. Pra escalar troca pra `ipinfo.io` (pede secret na hora se você quiser)
- Gráficos: `recharts` (já instalado), tema dark, sem neon
- Auth admin: continua via `ADMIN_TOKEN` (já configurado)
- Cookies: `hc_consent=accepted|rejected`, 12 meses, SameSite=Lax

## Arquivos

**Novos:**
- `src/routes/admin/route.tsx` (layout macOS — sidebar + topbar)
- `src/routes/admin/dashboard.tsx`
- `src/routes/admin/rastreio.tsx`
- `src/routes/admin/solicitacoes.tsx`
- `src/routes/admin/configuracoes.tsx`
- `src/routes/api/public/track.ts`
- `src/routes/api/public/admin-visitors.ts`
- `src/routes/api/public/admin-stats.ts`
- `src/routes/api/public/admin-settings.ts`
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/Topbar.tsx`
- `src/components/admin/VisitorMap.tsx` (Leaflet lazy)
- `src/components/admin/charts/*` (Area, Donut, Bars wrappers)
- `src/components/site/CookieBanner.tsx`
- `src/lib/security.ts` (rate-limit + geo-IP)
- `src/lib/anti-inspect.ts`
- Migração SQL

**Editados:**
- `src/routes/__root.tsx` (headers, JSON-LD Organization+WebSite, cookie banner, anti-inspect)
- `src/routes/index.tsx` (meta tags reforçadas + og:image)
- `src/routes/sitemap[.]xml.ts` (enriquecido)
- `src/routes/admin.contatos.tsx` (vira `/admin/solicitacoes`, removida a antiga)
- `src/components/site/Pricing.tsx` (puxa URLs do settings)
- `public/robots.txt` (bloco Googlebot)
- `vite.config.ts` (headers globais)
- `package.json` (`leaflet`, `react-leaflet`, `@types/leaflet`)

## O que NÃO faço (e por quê)

- ❌ Bloquear quem usa VPN — derruba usuário legítimo. Só sinalizo no admin.
- ❌ "Anti-DDoS no código" — fisicamente impossível, é trabalho de CDN. Te dou o setup Cloudflare.
- ❌ Mexer em design público, cores, copy, layout do site — fica intocado.

---

## Pós-implementação — passo Cloudflare (você faz)

1. Cria conta grátis no Cloudflare → adiciona `hyrocode.online`
2. Troca os nameservers no seu registrador pelos do Cloudflare
3. Ativa: SSL Full (strict), Always Use HTTPS, HSTS, Bot Fight Mode, Browser Integrity Check, Hotlink Protection, Rate Limiting (5 req/s por IP no `/api/`)
4. (Opcional) Adiciona uma regra WAF custom: bloquear países que você não atende

Depois disso o site está blindado de verdade.

---

Confirma que posso seguir? Sigo na ordem: migração → admin shell → endpoints → dashboard → rastreio → settings → cookie banner → segurança → SEO/sitemap final.