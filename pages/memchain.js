/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason: Create a dedicated MemChain landing page so the homepage
 * can return to protocol-layer storytelling while Memory Chain gets a
 * citation-ready SEO/GEO surface of its own.
 * Modification Reason: v1.5 - Product-grade memory flow animation.
 *   Upgraded the hero visual from a static sealed-fact list into a live
 *   remember/store/recall flow: facts are sealed on device, synced as
 *   ciphertext to a blind node, and recalled back into the local hippocampus.
 *   The animation respects prefers-reduced-motion, avoids horizontal
 *   transforms on mobile, and keeps all privacy claims within the approved
 *   node-blind boundary.
 *
 * Historical Notes:
 * v1.4 - VC-grade product page refinement.
 *   Added a compact hero proof rail, converted the comparison table into
 *   responsive claim cards, and added a closing product action band. These
 *   changes make MemChain easier to understand from a first-principles
 *   product lens while preserving all existing privacy and benchmark limits.
 *   The hero visual now animates vertically to avoid transient horizontal
 *   overflow on iPhone-class screens.
 *
 * Historical Notes:
 * v1.3 - Advantage lab market context polish.
 *   Added an interactive comparison lab that makes MemChain's node-blind,
 *   low-latency, offline, bring-your-own-brain, and zero-retrieval-inference
 *   advantages visible before the detailed pipeline/table sections, with a
 *   concise market-category note for SEO/GEO readers.
 *
 * Historical Notes:
 *   v1.0 - New page for node-blind AI memory positioning.
 * Main Functionality:
 *   - Explains MemChain as a local-first, node-blind AI memory layer.
 *   - Shows the interactive advantage lab, remember/store/recall pipeline,
 *     privacy boundary, benchmark claims, comparison table, and FAQ based on
 *     the approved product material.
 * Dependencies:
 *   - components/layout/SiteHeader and Footer for shared site chrome.
 *   - components/ui/SEO and Container for metadata/layout.
 *   - components/ui/ProtocolBackground for the existing visual system.
 *
 * Main Logical Flow:
 *   1. Render SEO metadata and shared background/header.
 *   2. Present the MemChain hero and claim-safe positioning.
 *   3. Explain pipeline, pillars, benchmarks, comparison, privacy boundary,
 *      FAQ, and product actions without overstating zero-knowledge or
 *      benchmark leadership.
 *
 * Important Note for Next Developer:
 *   - Do not call MemChain a blockchain or a zero-knowledge proof system.
 *   - Keep the external AI provider limitation visible: if users choose an
 *     external LLM for distillation/answers, relevant plaintext goes to that
 *     provider; AeroNyx storage nodes still cannot read memory contents.
 *   - Any future accuracy claim above the measured 66-68 percent end-to-end
 *     range must be backed by a fresh benchmark before it appears here.
 *
 * Last Modified: v1.1 - Secondary page typography polish
 * Last Modified: v1.2 - Interactive MemChain advantage lab
 * Last Modified: v1.3 - Market-category context and mobile metric polish
 * Last Modified: v1.4 - VC-grade product page refinement
 * Last Modified: v1.5 - Product-grade memory flow animation
 * ============================================
 */

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import { DEFAULT_LOCALE } from '../lib/i18n';

const ProtocolBackground = dynamic(
  () => import('../components/ui/ProtocolBackground'),
  {
    ssr: false,
    suspense: true,
    loading: () => <div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />,
  }
);

const EASE = [0.16, 1, 0.3, 1];

const keywords = [
  'node-blind memory',
  'end-to-end encrypted memory',
  'private AI memory',
  'local-first AI memory',
  'offline recall',
  'encrypted cross-device sync',
  'personal AI memory',
  'on-device embeddings',
  'bring your own LLM',
  'MemChain',
];

const heroProofs = [
  {
    value: '0',
    label: 'readable bytes on node',
    detail: 'ciphertext + blind indexes only',
  },
  {
    value: '2-40ms',
    label: 'recall class',
    detail: 'node-side 2-5ms / local 15-40ms design path',
  },
  {
    value: 'offline',
    label: 'local hippocampus',
    detail: 'recall works when the encrypted local copy has the memory',
  },
];

const memoryFlowStages = [
  {
    label: 'Remember',
    title: 'Device distills',
    detail: 'fact extracted locally',
  },
  {
    label: 'Seal',
    title: 'Key wraps memory',
    detail: 'AES envelope + signature',
  },
  {
    label: 'Store',
    title: 'Blind node sync',
    detail: 'ciphertext only',
  },
  {
    label: 'Recall',
    title: 'Local answer',
    detail: 'memory returns unreadable to node',
  },
];

const pipeline = [
  {
    label: 'Remember',
    title: 'Distill on the device',
    description: 'AI conversations are distilled into self-contained facts, categorized, encrypted, signed, and kept locally before any sync.',
    details: ['Conversation sensing is limited to AI memory flows', 'Fact distillation and classification happen client-side', 'AES-256-GCM envelope plus device signature'],
  },
  {
    label: 'Store',
    title: 'Nodes stay blind',
    description: 'Storage nodes receive ciphertext, blind indexes, client-computed vectors, and opaque relationship edges. They cannot read or re-sign memories.',
    details: ['Ciphertext only', 'Keyed blind indexes', 'Content addressing and deduplication'],
  },
  {
    label: 'Recall',
    title: 'Local-first retrieval',
    description: 'Recall starts from the encrypted local copy, then fuses semantic, keyword, time, and structured search before injecting only the relevant memory.',
    details: ['Offline recall when local data is present', 'No LLM call for retrieval', 'Node fallback only when local cache misses'],
  },
];

const pillars = [
  {
    title: 'Node-blind',
    description: 'The node stores memory, but cannot read it. This is not a promise to look away; the infrastructure lacks the keys.',
    boundary: 'Precise claim: AeroNyx storage nodes cannot read memory contents.',
  },
  {
    title: 'Local-first',
    description: 'Every memory keeps an encrypted local copy, making recall fast, resilient, and usable offline when the local copy has the answer.',
    boundary: 'Measured node-side recall is 2-5ms. Local recall is designed for a 15-40ms class path.',
  },
  {
    title: 'Bring your own brain',
    description: 'Users can choose DeepSeek, OpenAI, local models, or any OpenAI-compatible model. The memory layer is not locked to one vendor.',
    boundary: 'If an external AI provider is selected, relevant plaintext is sent to that provider by user choice.',
  },
];

const benchmarkCards = [
  {
    value: '95-99%',
    label: 'retrieval hit rate',
    note: 'Measured in our LongMemEval-S runs under end-to-end encrypted memory constraints.',
  },
  {
    value: '66-68%',
    label: 'economic-brain end-to-end score',
    note: 'Measured with an economical model tier, ahead of GPT-4o reading full history in the same setup baseline.',
  },
  {
    value: '2-5ms',
    label: 'node-side recall latency',
    note: 'Recall path avoids model inference and stays in the millisecond class.',
  },
  {
    value: '0',
    label: 'LLM calls for retrieval',
    note: 'Search and ranking do not burn model tokens; models are used for distillation and answers.',
  },
];

const comparisonRows = [
  ['Server can read memory', 'No. Ciphertext plus blind indexes.', 'Usually yes. Cloud memory is commonly stored in readable form.'],
  ['Primary location', 'User device plus blind encrypted backup.', 'Provider cloud.'],
  ['Recall latency', 'Millisecond-class local or node recall.', 'Typically hundreds of milliseconds to seconds.'],
  ['Offline usage', 'Yes, when the local encrypted copy has the memory.', 'Usually no.'],
  ['AI model choice', 'User selected model or local model.', 'Platform selected model.'],
  ['Cross-device recovery', 'Identity-derived keys and encrypted sync.', 'Account-centric cloud sync.'],
  ['Retrieval cost', 'No model inference for retrieval.', 'Often depends on hosted inference or platform search.'],
];

const advantageAxes = [
  {
    id: 'blind',
    label: 'Server Blindness',
    metric: '0 readable bytes',
    title: 'The node holds memory it cannot open.',
    description:
      'MemChain stores ciphertext, blind indexes, and opaque relationship edges. The storage node can sync and order memory, but it cannot read or re-sign the facts.',
    memchain: {
      title: 'MemChain',
      headline: 'Cryptographically unreadable',
      proof: 'ciphertext + blind index',
      detail: 'Infrastructure lacks the keys, so privacy is enforced by architecture instead of policy.',
    },
    cloud: {
      title: 'Typical cloud memory',
      headline: 'Readable service memory',
      proof: 'plaintext service record',
      detail: 'The provider can commonly inspect, rank, migrate, or expose memory because the server owns the readable state.',
    },
  },
  {
    id: 'speed',
    label: 'Recall Speed',
    metric: '2-40ms',
    title: 'Recall should feel instant, not like a cloud round trip.',
    description:
      'Node-side recall measured at 2-5ms. Local recall is designed for a 15-40ms path, while typical cloud memory often lives in the hundreds-of-milliseconds to seconds range.',
    memchain: {
      title: 'MemChain',
      headline: '2-5ms node / 15-40ms local',
      proof: 'millisecond-class recall',
      detail: 'Retrieval avoids model inference and starts from the device-side encrypted hippocampus.',
    },
    cloud: {
      title: 'Typical cloud memory',
      headline: 'hundreds of ms to seconds',
      proof: 'network + hosted retrieval',
      detail: 'Recall usually depends on remote services, queueing, hosted search, and model-adjacent orchestration.',
    },
  },
  {
    id: 'offline',
    label: 'Offline Recall',
    metric: 'works offline',
    title: 'Memory should survive a bad network.',
    description:
      'MemChain keeps an encrypted local copy. When the relevant memory is present locally, recall continues without contacting the storage node.',
    memchain: {
      title: 'MemChain',
      headline: 'local encrypted hippocampus',
      proof: 'offline recall path',
      detail: 'The device can search its own encrypted memory copy and sync later.',
    },
    cloud: {
      title: 'Typical cloud memory',
      headline: 'cloud dependency',
      proof: 'offline miss',
      detail: 'If the memory only exists in a provider cloud, the product degrades when the network disappears.',
    },
  },
  {
    id: 'brain',
    label: 'BYO Brain',
    metric: 'user chosen',
    title: 'The memory layer should not lock you to one model.',
    description:
      'MemChain separates memory ownership from model choice. Users can choose an external AI provider or a local model, while the memory layer remains portable.',
    memchain: {
      title: 'MemChain',
      headline: 'bring your own brain',
      proof: 'OpenAI-compatible or local',
      detail: 'Memory gets better as the user changes models; it is not trapped inside one assistant product.',
    },
    cloud: {
      title: 'Typical cloud memory',
      headline: 'platform-selected brain',
      proof: 'vendor lock-in',
      detail: 'Memory quality, portability, and model access are often bound to the platform that stores the memory.',
    },
  },
  {
    id: 'cost',
    label: 'Recall Cost',
    metric: '0 model calls',
    title: 'Search should not burn a model call every time.',
    description:
      'MemChain retrieval uses search and ranking instead of model inference. Models are used for distillation and answers, not for every memory lookup.',
    memchain: {
      title: 'MemChain',
      headline: 'zero LLM calls for retrieval',
      proof: 'search/rank only',
      detail: 'Recall can stay fast and cheap because the retrieval path is not an inference path.',
    },
    cloud: {
      title: 'Typical cloud memory',
      headline: 'often inference-adjacent',
      proof: 'hosted retrieval cost',
      detail: 'Hosted memory systems often couple search, ranking, and summarization to provider-side compute.',
    },
  },
];

const faqs = [
  {
    q: 'Can AeroNyx read my memories?',
    a: 'No. MemChain storage nodes hold only device-encrypted ciphertext and irreversible blind indexes. Without your identity-derived keys, the node cannot decrypt memory contents.',
  },
  {
    q: 'Where is memory stored?',
    a: 'The primary copy lives on your device in encrypted form. Nodes keep an encrypted backup for cross-device sync and recovery.',
  },
  {
    q: 'Can a new device recover memory?',
    a: 'Yes, the new device can refill from the encrypted node backup and rebuild local indexes. If the identity or wallet backup is lost, encrypted memories cannot be recovered.',
  },
  {
    q: 'Does memory work offline?',
    a: 'Yes. Offline recall works when the relevant memory is already in the local encrypted copy.',
  },
  {
    q: 'Is it on by default?',
    a: 'No. Memory should require explicit first-use consent, and users must be able to disable it and delete memory from settings.',
  },
];

export default function MemChainPage() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '/memchain' : `/${activeLocale}/memchain`;

  return (
    <>
      <SEO
        title="MemChain | Node-blind AI memory by AeroNyx"
        description="MemChain is local-first, node-blind AI memory: your AI remembers you, while AeroNyx storage nodes cannot read your memories."
        canonicalUrl={`https://aeronyx.network${canonicalPath}`}
        keywords={keywords}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10 pt-24 md:pt-32">
        <Hero />
        <MemoryAdvantageLab />
        <Pipeline />
        <Pillars />
        <Benchmarks />
        <Comparison />
        <PrivacyBoundary />
        <FAQ />
        <MemChainAction />
      </main>

      <Footer />
    </>
  );
}

const Hero = () => (
  <section className="pb-12 md:pb-24">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="inline-flex items-center gap-2 border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
            MemChain / Node-blind memory
          </div>
          <h1 className="mt-6 max-w-4xl text-display-xl font-light text-white">
            The first AI memory your server cannot read.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62 md:text-xl">
            Your AI remembers you; the memory belongs to you alone. MemChain turns
            personal context into encrypted, local-first memory that can sync
            across devices without giving storage nodes readable data.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/privacy-network"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/20 px-6 py-3 text-center text-xs uppercase leading-none tracking-eyebrow text-white transition-colors hover:border-brand-line hover:bg-brand-faint md:text-sm"
            >
              Explore privacy network
            </Link>
            <a
              href="#privacy-boundary"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/10 px-6 py-3 text-center text-xs uppercase leading-none tracking-eyebrow text-white/60 transition-colors hover:text-white md:text-sm"
            >
              Read privacy boundary
            </a>
          </div>

          <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
            {heroProofs.map((item) => (
              <div key={item.label} className="page-card min-w-0 border p-3 md:p-4">
                <div className="font-mono text-2xl font-light leading-none text-white md:text-3xl">
                  {item.value}
                </div>
                <div className="mt-2 text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
                  {item.label}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-white/42">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        >
          <MemoryVisual />
        </motion.div>
      </div>
    </Container>
  </section>
);

const MemoryVisual = () => {
  const reduced = useReducedMotion();

  return (
    <div className="page-surface relative min-h-[31rem] overflow-hidden border p-4 md:min-h-[34rem] md:p-5">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[28rem] flex-col md:min-h-[31rem]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-eyebrow text-white/35">device hippocampus</span>
          <span className="border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">local first</span>
        </div>

        <div className="relative mt-5 overflow-hidden border border-white/10 bg-black/30 p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <MemoryNodeCard
              label="Device"
              title="Plain memory stays local"
              detail="conversation distilled before sync"
              tone="device"
            />
            <MemoryNodeCard
              label="Blind node"
              title="Cannot read contents"
              detail="ciphertext + blind index"
              tone="node"
            />
            <MemoryNodeCard
              label="Recall"
              title="Answer uses local context"
              detail="node never sees the fact"
              tone="recall"
            />
          </div>

          <div className="relative mt-5 h-40 overflow-hidden sm:h-28">
            <div className="absolute left-[10%] right-[10%] top-[36%] h-px bg-white/10" />
            <motion.div
              className="absolute left-[10%] top-[36%] h-px w-[80%] origin-left bg-brand-light/70"
              initial={{ scaleX: 0 }}
              animate={reduced ? { scaleX: 1 } : { scaleX: [0, 0.48, 0.72, 1] }}
              transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: EASE, times: [0, 0.42, 0.68, 1] }}
            />
            <motion.div
              className="absolute top-[36%] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-pill border border-brand-line bg-brand-faint shadow-[0_0_28px_rgba(151,136,247,0.35)]"
              initial={{ left: '8%' }}
              animate={reduced ? { left: '50%' } : { left: ['8%', '39%', '66%', '88%'] }}
              transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: EASE, times: [0, 0.42, 0.68, 1] }}
            >
              <span className="h-2 w-2 rounded-pill bg-brand-light" />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {memoryFlowStages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  className="min-w-0 border border-white/10 bg-white/[0.025] px-2 py-2"
                  initial={{ opacity: 0.45, y: 8 }}
                  animate={reduced ? { opacity: 1, y: 0 } : { opacity: [0.45, 1, 0.58], y: [8, 0, 8] }}
                  transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, delay: index * 0.62, ease: EASE }}
                >
                  <div className="text-[9px] uppercase tracking-[0.12em] text-brand-light">{stage.label}</div>
                  <div className="mt-1 truncate text-xs text-white/72">{stage.title}</div>
                  <div className="mt-0.5 hidden truncate text-[10px] text-white/42 sm:block">{stage.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['ciphertext', 'blind index', 'opaque edge'].map((label, index) => (
            <motion.div
              key={label}
              className="border border-white/10 bg-black/40 p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + index * 0.08, ease: EASE }}
            >
              <div className="font-mono text-lg text-white">0x{label.length}ae</div>
              <div className="mt-1 text-[10px] uppercase tracking-eyebrow text-white/36">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MemoryNodeCard = ({ label, title, detail, tone }) => {
  const active = tone !== 'node';

  return (
    <div className={`min-w-0 border p-3 ${
      active ? 'border-brand-line bg-brand-faint' : 'border-white/10 bg-white/[0.025]'
    }`}>
      <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-pill border ${
        active ? 'border-brand-line text-brand-light' : 'border-white/10 text-white/36'
      }`}>
        <span className="h-2 w-2 rounded-pill bg-current" />
      </div>
      <div className="text-[10px] uppercase tracking-eyebrow text-white/35">{label}</div>
      <h3 className="mt-2 text-sm font-medium leading-snug text-white">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{detail}</p>
    </div>
  );
};

const MemoryAdvantageLab = () => {
  const [activeAxisId, setActiveAxisId] = useState('blind');
  const activeAxis = advantageAxes.find((axis) => axis.id === activeAxisId) || advantageAxes[0];

  return (
    <section className="border-y border-white/10 bg-white/[0.015] py-12 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:sticky lg:top-28"
          >
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
              Interactive proof
            </div>
            <h2 className="mt-4 text-display-lg font-light text-white">
              Not another memory table. A different trust model.
            </h2>
            <p className="mt-4 max-w-copy text-base leading-relaxed text-white/58 md:text-lg">
              Tap each axis to see the core MemChain advantage: the server cannot
              read memory, recall feels instant, offline memory works, model choice
              stays open, and retrieval does not spend a model call.
            </p>
            <div className="mt-4 max-w-copy border border-white/10 bg-black/20 px-3 py-2 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/34">
              Category context: Zep / Mem0 / Supermemory / ChatGPT Memory-style cloud memory
            </div>

            <div className="mt-6 grid gap-2">
              {advantageAxes.map((axis) => {
                const active = axis.id === activeAxisId;
                return (
                  <button
                    key={axis.id}
                    type="button"
                    onClick={() => setActiveAxisId(axis.id)}
                    className={`grid min-h-[52px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded border px-4 py-3 text-left transition-colors duration-fast ${
                      active
                        ? 'border-brand-line bg-brand-faint text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/58 hover:border-white/20 hover:text-white'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="min-w-0 text-sm font-medium">{axis.label}</span>
                    <span className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] ${
                      active ? 'text-brand-light' : 'text-white/36'
                    }`}>
                      {axis.metric}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            key={activeAxis.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="page-surface overflow-hidden rounded border"
          >
            <div className="border-b border-white/10 p-5 md:p-6">
              <div className="mb-3 inline-flex border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">
                {activeAxis.metric}
              </div>
              <h3 className="text-display-md font-light text-white">{activeAxis.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                {activeAxis.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_0.42fr_1fr]">
              <MemoryModeCard mode={activeAxis.memchain} tone="memchain" />
              <MemoryAxisVisual axisId={activeAxis.id} />
              <MemoryModeCard mode={activeAxis.cloud} tone="cloud" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const MemoryModeCard = ({ mode, tone }) => {
  const isMemChain = tone === 'memchain';

  return (
    <div className={`min-h-full border-b border-white/10 p-5 md:p-6 lg:border-b-0 ${
      isMemChain ? 'bg-brand-faint/60 lg:border-r' : 'bg-black/25 lg:border-l'
    } border-white/10`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className={`text-[10px] uppercase tracking-eyebrow ${
          isMemChain ? 'text-brand-light' : 'text-white/36'
        }`}>
          {mode.title}
        </span>
        <span className={`h-2 w-2 rounded-pill ${
          isMemChain ? 'bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.75)]' : 'bg-white/20'
        }`} />
      </div>
      <h4 className="text-2xl font-light text-white md:text-3xl">{mode.headline}</h4>
      <div className={`mt-5 border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] ${
        isMemChain
          ? 'border-brand-line bg-black/25 text-brand-light'
          : 'border-white/10 bg-white/[0.025] text-white/40'
      }`}>
        {mode.proof}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/58">{mode.detail}</p>
    </div>
  );
};

const MemoryAxisVisual = ({ axisId }) => {
  const labels = {
    blind: ['plaintext', 'ciphertext'],
    speed: ['850ms', '5ms'],
    offline: ['offline miss', 'local hit'],
    brain: ['locked', 'BYO'],
    cost: ['model call', '0 calls'],
  };
  const [cloudLabel, memchainLabel] = labels[axisId] || labels.blind;

  return (
    <div className="relative flex min-h-[16rem] items-center justify-center overflow-hidden border-b border-white/10 bg-black/35 p-5 lg:border-b-0">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.26) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 w-full max-w-[15rem]">
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-white/34">{cloudLabel}</span>
          <span className="text-brand-light">{memchainLabel}</span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-pill bg-white/10">
          <motion.div
            key={axisId}
            initial={{ width: '18%' }}
            animate={{ width: axisId === 'speed' ? '96%' : '86%' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="h-full rounded-pill bg-brand-light"
          />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          {['seal', 'rank', 'recall'].map((step, index) => (
            <motion.div
              key={`${axisId}-${step}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: EASE }}
              className="border border-white/10 bg-white/[0.035] px-2 py-3 text-center"
            >
              <div className="mx-auto mb-2 h-2 w-2 rounded-pill bg-brand-light/80" />
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/42">
                {step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Pipeline = () => (
  <section className="border-y border-white/10 bg-white/[0.015] py-12 md:py-20">
    <Container>
      <SectionHeader
        eyebrow="Pipeline"
        title="Remember, store, recall - without readable server memory."
        description="MemChain is designed as a three-stage privacy path: device-side distillation, blind encrypted storage, and local-first recall."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {pipeline.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
            className="page-card border p-4 md:p-5"
          >
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{item.label}</div>
            <h2 className="mt-4 text-2xl font-light text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{item.description}</p>
            <ul className="mt-5 space-y-2">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-white/48">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-brand-light/70" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Container>
  </section>
);

const Pillars = () => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow="Pillars"
        title="Privacy is the architecture, not a policy sentence."
        description="MemChain is built around precise claims the product can defend: node-blind storage, local-first recall, and user-selected AI models."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="page-card border p-4 md:p-5">
            <h2 className="text-2xl font-light text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{pillar.description}</p>
            <div className="mt-5 border border-brand-line bg-brand-faint p-3 text-xs leading-relaxed text-brand-light/88">
              {pillar.boundary}
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const Benchmarks = () => (
  <section className="border-y border-white/10 bg-black/40 py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow="Claim-safe benchmark"
        title="Fast, private recall is the wedge."
        description="Measured with our LongMemEval-S internal runs in July 2026. The page states measured results and keeps model-tier projections out of product claims."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {benchmarkCards.map((item) => (
          <div key={item.label} className="page-card border p-4 md:p-5">
            <div className="font-mono text-3xl font-light text-white md:text-4xl">{item.value}</div>
            <div className="mt-3 text-[10px] uppercase tracking-eyebrow text-white/42">{item.label}</div>
            <p className="mt-3 text-xs leading-relaxed text-white/46">{item.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border border-warn/25 bg-warn/[0.06] p-4 text-sm leading-relaxed text-white/60">
        Honest boundary: we do not claim SOTA accuracy, industry-best scores, or a formally proven zero-knowledge system. The differentiation is privacy, speed, cost, offline recall, and user ownership.
      </div>
    </Container>
  </section>
);

const Comparison = () => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow="Comparison"
        title="MemChain vs typical cloud memory services."
        description="The product difference is structural: who can read memory, where recall happens, and whether users can leave with their context."
      />
      <div className="mt-10 grid gap-3">
        {comparisonRows.map(([dimension, memchain, cloud]) => (
          <article key={dimension} className="page-card grid gap-4 border p-4 md:grid-cols-[0.72fr_1fr_1fr] md:p-5">
            <div>
              <div className="text-[10px] uppercase tracking-eyebrow text-white/35">dimension</div>
              <h3 className="mt-2 text-lg font-light text-white">{dimension}</h3>
            </div>
            <div className="border border-brand-line bg-brand-faint p-3">
              <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">MemChain</div>
              <p className="mt-2 text-sm leading-relaxed text-white">{memchain}</p>
            </div>
            <div className="border border-white/10 bg-black/25 p-3">
              <div className="text-[10px] uppercase tracking-eyebrow text-white/34">Typical cloud memory</div>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{cloud}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const PrivacyBoundary = () => (
  <section id="privacy-boundary" className="border-y border-white/10 bg-white/[0.015] py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">Privacy boundary</div>
          <h2 className="mt-4 text-display-md font-light text-white">The node is blind. The chosen brain still matters.</h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-white/62">
          <p>
            MemChain storage nodes are cryptographically unable to read your memories.
            They hold only device-encrypted ciphertext and irreversible blind indexes.
            Encryption, decryption, and search happen on your device, with keys derived
            from your identity and never uploaded.
          </p>
          <p>
            Important limitation: when you choose an external AI service to distill or
            answer over memories, the relevant plaintext is sent to that provider of
            your choosing. With a local AI model, memory can remain on device through
            the full memory path.
          </p>
        </div>
      </div>
    </Container>
  </section>
);

const FAQ = () => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow="FAQ"
        title="Short answers for users, builders, and AI search."
        description="These answers are intentionally direct so product pages, docs, and AI engines can cite them without ambiguity."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map((item) => (
          <article key={item.q} className="page-card border p-4 md:p-5">
            <h2 className="text-lg font-medium text-white">{item.q}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{item.a}</p>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const MemChainAction = () => (
  <section className="border-t border-white/10 py-14 md:py-20" style={{ background: 'var(--surface-1, #0C0C13)' }}>
    <Container>
      <div className="page-surface border p-5 text-center md:p-8">
        <div className="mx-auto mb-4 inline-flex border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
          Own the memory layer
        </div>
        <h2 className="mx-auto max-w-3xl text-display-md font-light text-white">
          A private memory system should make AI more useful without making the server more powerful.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/58 md:text-lg">
          MemChain keeps durable context portable, encrypted, and local-first so
          humans and agents can remember across tools without handing readable
          memory to infrastructure.
        </p>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
          <Link
            href="/privacy-network"
            className="inline-flex min-h-[48px] items-center justify-center bg-white px-5 py-3 text-center text-xs uppercase tracking-eyebrow text-black transition-colors hover:bg-white/90"
          >
            Explore Privacy Network
          </Link>
          <a
            href="#privacy-boundary"
            className="inline-flex min-h-[48px] items-center justify-center border border-white/15 px-5 py-3 text-center text-xs uppercase tracking-eyebrow text-white/70 transition-colors hover:border-brand-line hover:bg-brand-faint hover:text-white"
          >
            Review Privacy Boundary
          </a>
        </div>
      </div>
    </Container>
  </section>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="max-w-3xl">
    <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{eyebrow}</div>
    <h2 className="mt-3 text-display-md font-light text-white">{title}</h2>
    <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">{description}</p>
  </div>
);
