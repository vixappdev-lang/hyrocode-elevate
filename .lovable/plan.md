# Refinamentos HyroCode — rodada final

## 1. Hero — substituir orb por visual profissional
Remover toda a animação de "orb com anéis girando" (que ficou amadora) em `src/components/site/Hero.tsx`.

Substituir por uma composição **profissional e elegante**, sem visual circense:
- **Card central tipo "browser mockup"** flutuante mostrando uma interface real (gradiente da marca + linhas de código suaves + um gráfico/dashboard estilizado em SVG).
- **Glow ambiente** atrás (radial suave da cor primária, sem pulsar exagerado).
- **2 cards menores flutuando** nas laterais (um com métrica "+218% conversão", outro com "Performance 98/100" tipo Lighthouse), levemente inclinados em perspectiva.
- **Animação sutil**: float vertical lento (4-6s ease-in-out infinite) nos 3 cards, com delays diferentes. Nada girando. Apenas respiração e leve flutuação — sensação Linear/Vercel/Stripe.
- Manter eyebrow "Bem-vindo à HyroCode", H1 e subtítulo já existentes.
- Remover os chips "Código limpo / Performance / Design premium" do orb.
- Atualizar `styles.css`: remover `orb-spin`, `orb-spin-reverse`, `orb-pulse`. Adicionar `@keyframes float-y` (translateY -8px / +8px).

## 2. Portfólio — mockups estilo apresentação (inspiração elevatelp.com.br)
Em vez de prints chapados, gerar imagens com **mockup de laptop/notebook flutuando em fundo escuro com glow da marca**, mostrando o site do nicho dentro da tela do notebook. Estilo "showcase" de agência premium.

- Regerar `p1..p6` com prompt premium:
  - "Photorealistic floating MacBook Pro mockup on dark navy background with subtle blue glow, displaying a modern Brazilian [nicho] website in Brazilian Portuguese, 3D perspective slightly tilted, soft reflections, agency showcase style, cinematic lighting, no text overlay"
  - Os 6 nichos atuais (Odonto, Barbearia, Estética, Pilates, Advocacia, Restaurante).
- Em `PortfolioSlider.tsx`:
  - Card maior para acomodar o mockup com respiro: `h-[320px] w-[420px] sm:h-[360px] sm:w-[500px]`.
  - `object-cover object-center` (não mais object-top).
  - Remover borda forte; usar fundo `bg-transparent` com glow sutil ao hover.
  - Manter marquee em loop automático.
  - Reorganizar header da seção: eyebrow + título + descrição centralizados com mais respiro (já está, refinar espaçamento).

## 3. Footer — restaurar versão grande centralizada
O footer atual já está com logo grande + descrição + Instagram + "Feito com carinho por HyroCode Desenvolvimento". Está correto, mas usuário diz "não arrumou" — provavelmente quer **mais presença**. Ajustes:
- Aumentar logo para `h-32 sm:h-36`.
- Aumentar descrição (texto maior, line-height generoso).
- Garantir que está sendo renderizado em `routes/index.tsx` (verificar).

## 4. Navbar — logo ainda maior
Em `Navbar.tsx`:
- Logo: `h-24 sm:h-28` (atualmente h-20/h-24).
- Manter `-my-2` para não estourar a barra; aumentar `-my-3` se necessário.
- Não mexer no resto do menu.

## 5. Pricing — borda do plano destacado mais sutil
Em `Pricing.tsx`, no plano `highlighted`:
- Remover a borda gradiente forte permanente (linhas 103-113).
- Estado padrão: borda neutra sutil `border border-white/[0.08]` igual ao outro.
- No `hover` (group): aplicar a borda gradiente mais suave (opacity 60%) + leve glow.
- Manter o badge "Mais escolhido" sempre visível.

## 6. Remover travessões "—" do site
Varrer textos visíveis e trocar todos os `—` (em-dash) por:
- vírgula, ponto, ou reescrita curta conforme o contexto.
Arquivos: `Hero.tsx`, `Proposta.tsx`, `ComoFunciona.tsx`, `Pricing.tsx`, `PortfolioSlider.tsx`, `Footer.tsx`, `ContactModal.tsx`, `Navbar.tsx`. Mantém apenas hífens normais `-` quando necessário (ex: "Don Lucca" não tem). Esse é o tique de IA que o usuário quer eliminar.

## 7. Modal — dropdown de estados bonito (custom)
O `<select>` nativo do HTML é feio e segue o tema do SO. Substituir por **Select do shadcn** (`@/components/ui/select`) em `ContactModal.tsx`:
- Importar `Select, SelectTrigger, SelectValue, SelectContent, SelectItem`.
- Estilizar o trigger com mesma aparência dos inputs (rounded-xl, border-white/10, bg-background/60).
- `SelectContent` herda o tema dark (popover já estilizado) — fica elegante.
- Listar os 27 UFs com nome completo: "SP — São Paulo", "RJ — Rio de Janeiro", etc. (mas como vamos remover travessões, usar formato "SP · São Paulo" ou só "São Paulo (SP)"). → usar **"São Paulo (SP)"** para ficar limpo.
- Manter os outros inputs como estão (já bonitos).

## Arquivos a editar
- `src/components/site/Hero.tsx` (refazer visual)
- `src/components/site/PortfolioSlider.tsx` (cards maiores, mockup-friendly)
- `src/components/site/Navbar.tsx` (logo maior)
- `src/components/site/Footer.tsx` (logo/desc maiores)
- `src/components/site/Pricing.tsx` (borda destaque só no hover)
- `src/components/site/ContactModal.tsx` (Select shadcn)
- `src/styles.css` (remover orb-*, adicionar float-y)
- Substituir todos os `—` em textos visíveis dos componentes acima + `Proposta.tsx` e `ComoFunciona.tsx`

## Arquivos a regerar
- `src/assets/p1-analytics.jpg` ... `p6-ecom.jpg` (premium, mockup de notebook flutuante com site brasileiro do nicho dentro)
