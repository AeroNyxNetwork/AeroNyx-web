/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason: Create a dedicated MemChain landing page so the homepage
 * can return to protocol-layer storytelling while Memory Chain gets a
 * citation-ready SEO/GEO surface of its own.
 * Modification Reason: v1.1 - Apple-grade page rhythm and mobile polish.
 *   Tightened the hero visual on phone widths, unified card surfaces through
 *   globals.css v3.3 utilities, and adjusted CTA/text rhythm so the page feels
 *   premium without sacrificing the claim-safe MemChain story.
 *
 * Historical Notes:
 *   v1.0 - New page for node-blind AI memory positioning.
 * Main Functionality:
 *   - Explains MemChain as a local-first, node-blind AI memory layer.
 *   - Shows the remember/store/recall pipeline, privacy boundary, benchmark
 *     claims, comparison table, and FAQ based on the approved product material.
 * Dependencies:
 *   - components/layout/AILHeader and Footer for shared site chrome.
 *   - components/ui/SEO and Container for metadata/layout.
 *   - components/ui/MinimalAILBackground for the existing visual system.
 *
 * Main Logical Flow:
 *   1. Render SEO metadata and shared background/header.
 *   2. Present the MemChain hero and claim-safe positioning.
 *   3. Explain pipeline, pillars, benchmarks, comparison, privacy boundary,
 *      and FAQ without overstating zero-knowledge or benchmark leadership.
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
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import AILHeader from '../components/layout/AILHeader';
import Footer from '../components/layout/Footer';
import { DEFAULT_LOCALE } from '../lib/i18n';

const MinimalAILBackground = dynamic(
  () => import('../components/ui/MinimalAILBackground'),
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
        <MinimalAILBackground />
      </Suspense>

      <AILHeader />

      <main className="relative z-10 pt-24 md:pt-32">
        <Hero />
        <Pipeline />
        <Pillars />
        <Benchmarks />
        <Comparison />
        <PrivacyBoundary />
        <FAQ />
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        >
          <MemoryVisual />
        </motion.div>
      </div>
    </Container>
  </section>
);

const MemoryVisual = () => (
  <div className="page-surface relative min-h-[26rem] overflow-hidden border p-4 md:min-h-[32rem] md:p-5">
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    <div className="relative z-10 flex h-full min-h-[23rem] flex-col justify-between md:min-h-[29rem]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-eyebrow text-white/35">device hippocampus</span>
        <span className="border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">local first</span>
      </div>
      <div className="space-y-3">
        {['allergic to shellfish', 'prefers quiet work blocks', 'project uses Rust relay nodes', 'asks for Traditional Chinese summaries'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + index * 0.08, ease: EASE }}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border border-white/10 bg-white/[0.035] p-3"
          >
            <span className="h-2 w-2 rounded-pill bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.75)]" />
            <span className="min-w-0 text-sm text-white/72">{item}</span>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-cipher-light">sealed</span>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {['ciphertext', 'blind index', 'opaque edge'].map((label) => (
          <div key={label} className="border border-white/10 bg-black/40 p-3">
            <div className="font-mono text-lg text-white">0x{label.length}ae</div>
            <div className="mt-1 text-[10px] uppercase tracking-eyebrow text-white/36">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
      <div className="mt-10 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.035] text-[10px] uppercase tracking-eyebrow text-white/42">
              <th className="p-4 font-medium">Dimension</th>
              <th className="p-4 font-medium text-brand-light">MemChain</th>
              <th className="p-4 font-medium">Typical cloud memory</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([dimension, memchain, cloud]) => (
              <tr key={dimension} className="border-b border-white/10 last:border-b-0">
                <td className="p-4 text-sm text-white/70">{dimension}</td>
                <td className="p-4 text-sm text-white">{memchain}</td>
                <td className="p-4 text-sm text-white/48">{cloud}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="max-w-3xl">
    <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{eyebrow}</div>
    <h2 className="mt-3 text-display-md font-light text-white">{title}</h2>
    <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">{description}</p>
  </div>
);
