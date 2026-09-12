# AeroNyx website — Nightglass pass (2026-09-12)

Design brief for the aeronyx.network redesign. Written before the code, in
English, the way a partner at a top US AI/web3 fund would read the site.

## 1. The story, in one paragraph

AeroNyx is one app that holds the three things people actually protect —
messages, AI, money — under one key the user holds, carried by a
decentralized network that is blind by construction. Chat is end-to-end
encrypted (1:1, groups, calls). The AI (Nyx) has a confidential mode that runs
in a trusted enclave and a memory (MemChain) sealed with the user's key, so
nodes can sync it but never read it. The wallet derives Solana, Ethereum,
BNB, Tron and TAO from one seed, keeps the private keys in a Rust keystore
that never hands them to the app layer, and signs only what the user has
read. Underneath, independent operators run relay nodes that see ciphertext,
signed routing metadata and aggregate health — never payloads, destinations,
memory or the social graph. Open source. The bet: as AI agents become
economic participants, the infrastructure they run on decides who sees what,
and the answer should be "nobody in the middle".

## 2. How a top-tier VC reads a site in thirty seconds

1. **What is it?** — must land in one line for a smart generalist. "The
   encrypted coordination layer for autonomous agents" is a category claim,
   not a product. Landing pages get funded on a wedge with a product behind
   it. The wedge is the private super-app (chat + AI + money) you can
   download today; the protocol is the proof underneath, not the headline.
2. **Show me.** Real product beats particle fields. The sites that read as
   "serious, taste, momentum" in 2026 — Anthropic, Linear, Phantom, Vercel,
   Farcaster, Hyperliquid — are product-first, typographic, calm, with one
   signature interaction. 3D orbs and floating particles are 2021–22 crypto
   shorthand and get pattern-matched as "no product yet".
3. **Prove it.** Live numbers that are strong (1.27 TB carried, 26.8 B
   packets, N independent nodes, two-hop paths ready), open source, and a
   verifiable claim ("what each layer can see"). Not a diagnostics console:
   "awaiting evidence · 0 real · 6 probe" is an internal readiness dashboard
   and it was on the front page.
4. **Why you win.** The architectural invariant — blind nodes, keys on
   device, sealed memory, confidential compute — shown as a mechanism the
   visitor can operate, not a paragraph.
5. **What's the network.** Run a node (DePIN), build on it, roadmap. Keep,
   condense.
6. **Taste.** One hue. OLED-black ground. The product's own type system on
   the site (that coherence is what signals a real design organisation).
   Springs, not fades. Glass only for chrome. Sharp but not brutalist.

## 3. Verdict on Three.js

No. The previous pass already removed the 3D hero and replaced it with a 2D
"watchers" canvas; `three` and `@react-three/fiber` were still in
package.json with zero imports — dead weight, removed in this pass. The
signature moment is the **Product Lens**: the real Nightglass chat screen
(an encrypted conversation with a wallet receipt in it) behind a lens the
visitor drags to see what a relay node actually holds. That is the thesis,
operated by hand. If the team later wants WebGL, it should render the
mechanism (a sealed envelope crossing blind nodes), lazy-loaded and
reduced-motion aware — never decoration.

## 4. What changes

- **Narrative arc** (was 8 protocol-first sections, now 8 product-first):
  Claim → Product Lens → Live proof (four numbers) → One key: Messages / AI /
  Money → What each layer can see → North Star → How it works → Run a node →
  Roadmap → CTA. `CorePrimitives` and `ProductsEcosystem` leave the homepage;
  their content lives on `/privacy-network` and `/memchain`, which stay.
- **Type = the app's** (Nightglass v2): Geist for UI/body, Geist Mono for
  truth (hashes, counters, sizes), Unbounded 700 for the one statement and
  the big numbers. Self-hosted: Geist/Geist Mono as vendored variable WOFF2 (`public/fonts`, SIL OFL) through next/font/local, Unbounded through next/font/google.
- **Color = the app's**: ink `#06060E`, slate `#0D0D1C/#131324/#1A1A2E`, nyx
  `#7462F7` (+ `#A594FF` / `#5548A8`), cyan `#00C2E0` for the network view,
  signal `#14F195` only for live/received moments. The site's earlier
  "no green" rule stands for everything else.
- **Shape**: superellipse-feeling radii 10 / 14 / 20 / 28 / pill, glass
  header (blur 24, rim, specular), phone chassis 44.
- **Motion**: framer springs (320/30 smooth, 500/32 snappy); every entrance
  answers a load or a gesture; reduced-motion renders the resting state.
- **Copy**: product-led, concrete, seven locales (en, ru, zh-Hant, zh-Hans,
  ja, ko, es) in `lib/i18n-nightglass.js`, deep-merged over English so a
  missing string can never surface a key.

## 5. Out of scope here, next

- Secondary pages (`/privacy-network`, `/memchain`) inherit the tokens and
  fonts but keep their layout; a second pass should bring them onto the same
  section grammar.
- Real product photography/video once the app's Nightglass chassis is
  final; the CSS-built phone is deliberately faithful to the app's screen.
- Translations were written for this pass and read naturally, but deserve a
  native review per locale before a press push.
