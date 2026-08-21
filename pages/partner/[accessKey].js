/**
 * ============================================
 * File: pages/partner/[accessKey].js
 * ============================================
 * Creation Reason:
 *   Give reviewed AeroNyx partners a non-enumerable, current delivery brief
 *   covering real client capabilities, Rust node milestones, and the honest
 *   boundary between shipped, beta, hardening, and planned work.
 *
 * Main Functionality:
 *   - Validates a fixed 64-hex unlisted route token and returns the normal 404
 *     surface for every mismatch, with no deployment-time configuration.
 *   - Publishes a bilingual English/Simplified-Chinese delivery brief without
 *     adding the route to navigation, sitemap, robots.txt, or public SEO data.
 *   - Uses no-store, noindex, noarchive, and no-referrer response boundaries.
 *   - Separates current client delivery, Rust protocol delivery, limitations,
 *     recent evidence, and next milestones without fictional percentages.
 *   - Adds review filters, status definitions, secure-link copy feedback,
 *     print/PDF output, and reviewer contact actions for partner diligence.
 *   - Publishes a decision summary, dependency ownership matrix, sticky review
 *     index, and a public-safe machine-readable JSON snapshot.
 *   - Provides executive and technical review depths, active-section context,
 *     explicit evidence levels, next validation gates, and a partner pilot path.
 *   - Adds capability search, evidence-source provenance, and a browser-local
 *     reviewer workspace with an explicit public-safe handoff export.
 *   - Adds a review decision memo, revision delta, and validated local handoff
 *     import so partner teams can continue diligence across browsers safely.
 *   - Adds stable evidence references, handoff-readiness feedback, and a
 *     human-readable Markdown decision memo that never includes the access URL.
 *   - Reuses the public immutable release contract to show partner-verifiable
 *     platform artifacts, distribution assurance, and exact SHA-256 digests.
 *   - Adds a browser-local findings register with severity, ownership, due
 *     dates, closure state, and blocker-aware handoff readiness.
 *   - Connects stable APP/NODE evidence references to findings so reviewers
 *     can flag an item and return to its verification record without copying.
 *
 * Dependencies:
 *   - next/head, next/link, and next/router for metadata and locale switching.
 *   - components/ui/AeroNyxLogo and Container for shared identity and layout.
 *   - components/ui/DownloadsModal for the canonical release contract.
 *
 * Main Logical Flow:
 *   1. getServerSideProps rejects missing, malformed, or incorrect keys.
 *   2. The authorized response receives private no-store crawler/referrer
 *      headers before any page content is rendered.
 *   3. Reviewers choose executive or technical depth, then scan, filter,
 *      export, print, or validate evidence before a partner pilot decision.
 *   4. Optional checklist progress, findings, and notes stay in the reviewer's
 *      browser; nothing is transmitted unless a handoff file is exported.
 *
 * Important Note for Next Developer:
 *   - [PARTNER-BUILD-BRIEF 2026-08-21 by Codex] The fixed route token is an
 *     unlisted convenience link, not a secret or an authentication boundary.
 *   - This repository is public. Keep every field on the page public-safe and
 *     add account authorization before publishing commercial secrets.
 *   - Update CLIENT_BUILD, RUST_NODE_HEAD, VERIFIED_DATE, and status claims
 *     only after the corresponding release or Rust milestone is verified.
 *   - Do not add this route to sitemap.xml, robots.txt, header, or footer.
 *   - Keep status definitions evidence-based. "Available" means presently
 *     usable; it must never be inferred from a roadmap or design document.
 *   - Exported JSON must remain public-safe and must never contain the access
 *     URL, route key, private endpoints, customer traffic, or node identities.
 *   - Executive depth only changes presentation. Technical evidence must stay
 *     in the DOM, JSON export, and print output so no review fact is discarded.
 *   - Reviewer workspace storage must never use the route key as an identifier
 *     or send notes to analytics, logs, APIs, or AeroNyx infrastructure.
 *   - Imported handoffs are untrusted input. Keep schema, size, enum, and text
 *     bounds strict before updating any browser-local review state.
 *   - Evidence citations and decision memos must be share-safe by default;
 *     never place window.location, route params, or the access key in them.
 *   - Release evidence must come from DownloadsModal named exports. Never copy
 *     version URLs or digests into this file as a second release authority.
 *   - Findings are reviewer-authored untrusted input. Keep them local-only,
 *     bounded, schema-validated, and escaped in every portable artifact.
 *   - Finding references may contain only public-safe APP-xx or NODE-xx IDs;
 *     never accept URLs, endpoints, node IDs, or free-form identifiers there.
 *   - [PARTNER-EXECUTIVE-SUMMARY 2026-08-21 by Codex] Keep the first-screen
 *     decision links synchronized with their target sections. The report uses
 *     a deliberately static visual surface; do not reintroduce decorative
 *     animation that competes with evidence review or print output.
 *
 * Last Modified: v2.1 - Static diligence surface and first-screen decision links.
 * ============================================
 */

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AeroNyxLogo from '../../components/ui/AeroNyxLogo';
import Container from '../../components/ui/Container';
import {
  RELEASE_BUILD,
  RELEASE_CHANNELS,
  RELEASE_VERSION,
} from '../../components/ui/DownloadsModal';

const CLIENT_BUILD = `${RELEASE_VERSION}+${RELEASE_BUILD}`;
const RUST_NODE_HEAD = '849bdcd';
const VERIFIED_DATE = '2026-08-19';
const REVIEW_REVISION = '2.1';
const PARTNER_PROGRESS_ACCESS_KEY = 'f92fc1bea7d9afcb9d2478af7fe443f13721f52c59db0d9fcd3c02080fac0604';
const REVIEW_WORKSPACE_STORAGE_KEY = 'aeronyx.partner.review.workspace.v1';
const REVIEW_NOTES_MAX_LENGTH = 2000;
const REVIEW_ORGANIZATION_MAX_LENGTH = 120;
const REVIEW_FINDINGS_MAX = 12;
const REVIEW_FINDING_TITLE_MAX_LENGTH = 180;
const REVIEW_FINDING_OWNER_MAX_LENGTH = 80;
const REVIEW_FINDING_REFERENCE_MAX_LENGTH = 24;
const REVIEW_HANDOFF_MAX_BYTES = 100 * 1024;
const REVIEW_HANDOFF_SCHEMA = 'aeronyx.partner.review.handoff.v4';
const REVIEW_DECISIONS = Object.freeze(['undecided', 'pilot', 'conditional', 'hold', 'no_go']);
const REVIEW_FINDING_SEVERITIES = Object.freeze(['blocker', 'high', 'medium', 'low']);
const REVIEW_FINDING_STATUSES = Object.freeze(['open', 'resolved']);
const REVIEW_FINDING_REFERENCE_PATTERN = /^(APP|NODE)-\d{2}$/;
const EMPTY_REVIEW_CHECKS = Object.freeze({
  scope: false,
  privacy: false,
  evidence: false,
  operations: false,
  decision: false,
});
const ACCESS_KEY_PATTERN = /^[a-f0-9]{64}$/;
const STATUS_TONE = {
  available: {
    dot: 'bg-ok',
    badge: 'border-brand-line bg-brand-faint text-brand-light',
  },
  beta: {
    dot: 'bg-cipher-light',
    badge: 'border-cipher/25 bg-cipher/5 text-cipher-light',
  },
  hardening: {
    dot: 'bg-warn',
    badge: 'border-warn/25 bg-warn/5 text-warn',
  },
  progress: {
    dot: 'border border-white/45 bg-transparent',
    badge: 'border-white/12 bg-white/[0.03] text-white/62',
  },
};

const FINDING_SEVERITY_TONE = {
  blocker: 'border-warn/40 bg-warn/8 text-warn',
  high: 'border-[#ff9d66]/30 bg-[#ff9d66]/[0.06] text-[#ffb185]',
  medium: 'border-cipher/30 bg-cipher/5 text-cipher-light',
  low: 'border-white/12 bg-white/[0.03] text-white/52',
};

const CONTENT = {
  en: {
    language: 'Language',
    english: 'EN',
    chinese: '中文',
    restricted: 'Partner build brief',
    restrictedDetail: 'Unlisted link · public-safe delivery information',
    heroTitle: 'A clear view of what AeroNyx can do today.',
    heroBody: 'A source-reviewed delivery brief for partners: client capabilities, Rust protocol infrastructure, current dependencies, and the milestones that move AeroNyx toward a fully open privacy coordination network.',
    verified: `Verified ${VERIFIED_DATE}`,
    revision: `Brief v${REVIEW_REVISION}`,
    noTraffic: 'No customer traffic, node identities, private endpoints, keys, or payload data are included.',
    accessTitle: 'Unlisted partner review',
    accessBody: 'This fixed route token is a convenience link, not an authentication boundary. Anyone with the URL or public source can open it, so the brief intentionally contains public-safe information only.',
    copyLink: 'Copy review link',
    copiedLink: 'Link copied',
    copyFailed: 'Copy unavailable',
    exportJson: 'Export JSON',
    exportedJson: 'JSON downloaded',
    exportFailed: 'Export unavailable',
    printBrief: 'Print / Save PDF',
    contactTeam: 'Contact AeroNyx',
    reviewDepthTitle: 'Review depth',
    reviewDepthBody: 'Executive keeps the decision path concise. Technical reveals the complete capability and validation record.',
    reviewDepthLabels: {
      executive: 'Executive',
      technical: 'Technical',
    },
    reviewDepthDescriptions: {
      executive: 'Decision, pilot, dependencies, boundaries, and roadmap',
      technical: 'Full client and Rust capability evidence',
    },
    quickLinksEyebrow: 'Start with the decision-critical facts',
    quickLinksTitle: 'Open the evidence that matters first.',
    quickLinksAction: 'View section',
    quickLinks: [
      {
        href: '#decision',
        label: 'Pilot position',
        value: 'Ready for scoped evaluation',
        detail: 'See what can be piloted now, what remains controlled beta, and what is not a default.',
      },
      {
        href: '#artifacts',
        label: 'Release integrity',
        value: `Client ${CLIENT_BUILD}`,
        detail: 'Verify immutable installers, platform assurance, and published SHA-256 evidence.',
      },
      {
        href: '#boundaries',
        label: 'Trust boundary',
        value: 'Declared, not hidden',
        detail: 'Review present dependencies, metadata limits, and capabilities that still need hardening.',
      },
      {
        href: '#pilot',
        label: 'Recommended next step',
        value: 'Four-step partner pilot',
        detail: 'Move from scope and trust review to acceptance evidence and a reversible rollout decision.',
      },
    ],
    capabilitySearchLabel: 'Search capability evidence',
    capabilitySearchPlaceholder: 'Search relay, memory, recovery, witness…',
    statusOverview: {
      available: 'Available capabilities',
      beta: 'Beta capabilities',
      hardening: 'Hardening tracks',
      boundaries: 'Declared boundaries',
    },
    jumpLabel: 'Brief sections',
    jumpItems: [
      ['#overview', 'Overview', false],
      ['#artifacts', 'Release integrity', false],
      ['#pilot', 'Pilot path', false],
      ['#workspace', 'Review workspace', false],
      ['#client', 'Client product', true],
      ['#rust', 'Rust infrastructure', true],
      ['#dependencies', 'Dependencies', false],
      ['#boundaries', 'Current boundaries', false],
      ['#roadmap', 'Next milestones', false],
    ],
    snapshotEyebrow: 'Current baseline',
    snapshotTitle: 'Shipping product, hardened protocol core.',
    snapshotBody: 'These identifiers anchor the brief to a concrete client release and reviewed Rust main commit. Status is based on source and test evidence, not roadmap percentages.',
    snapshot: [
      { label: 'Client build', value: CLIENT_BUILD, detail: 'Current cross-platform release baseline' },
      { label: 'Rust node head', value: RUST_NODE_HEAD, detail: 'GitHub main · verified witness latency milestone' },
      { label: 'Distribution', value: '4 platforms', detail: 'iOS · Android ARM64 · macOS · Windows' },
      { label: 'Default service path', value: 'Managed relay', detail: 'Stable by default; decentralized paths remain selectable work' },
    ],
    revisionDeltaEyebrow: 'Since the previous brief',
    revisionDeltaTitle: 'Decision-critical evidence now leads the review.',
    revisionDeltaBody: 'The first screen is now a static diligence surface with direct paths to pilot readiness, release integrity, trust boundaries, and the recommended review sequence. The unlisted route remains fixed, noindex, and public-safe.',
    revisionDeltaItems: [
      'Remove decorative protocol animation from the evidence-review experience.',
      'Move decision-critical status and section links into the first screen.',
      'Preserve the complete technical record, local workspace, exports, and response security headers.',
    ],
    artifactEyebrow: 'Release integrity',
    artifactTitle: 'Verify the client before evaluating the protocol.',
    artifactBody: 'Every direct installer below comes from the same immutable release contract used by the public download flow. Digests apply only to the exact filename and version shown.',
    artifactReleaseLabel: `Release ${RELEASE_VERSION}-${RELEASE_BUILD}`,
    artifactFileLabel: 'Artifact',
    artifactAssuranceLabel: 'Distribution assurance',
    artifactHashLabel: 'SHA-256',
    artifactIntegrityPathLabel: 'Integrity path',
    artifactDownload: 'Open immutable download',
    artifactCopyHash: 'Copy SHA-256',
    artifactHashCopied: 'SHA-256 copied',
    artifactHashCopyFailed: 'Copy unavailable',
    artifactAppStore: 'Open App Store listing',
    artifactAppStoreArtifact: 'AeroNyx App Store listing',
    artifactAppStoreIntegrity: 'Verified through the Apple App Store trust chain',
    artifactAssurance: {
      macOS: 'Notarized Developer ID · stapled ticket · Apple Silicon',
      Windows: 'x64 installer · published SHA-256 digest',
      Android: 'Signed APK · ARM64-only distribution',
      iOS: 'Apple App Store distribution',
    },
    statusLabels: {
      available: 'Available',
      beta: 'Beta',
      hardening: 'Hardening',
      progress: 'In progress',
    },
    statusDefinitionsTitle: 'How delivery status is assigned',
    statusDefinitionsBody: 'Every status describes the current implementation and validation boundary. It is not a schedule estimate or a marketing percentage.',
    statusDefinitions: {
      available: 'Usable in the current product or production node workflow.',
      beta: 'Implemented and exercised, with staged rollout or remaining product validation.',
      hardening: 'Core path exists and is undergoing reliability, security, or multi-node verification.',
      progress: 'Active development; not represented as currently available.',
    },
    filterLabel: 'Filter capabilities by delivery status',
    filters: {
      all: 'All',
      available: 'Available',
      active: 'Active work',
    },
    showingLabel: 'Showing',
    capabilityLabel: 'capabilities',
    evidenceLabel: 'Verification note',
    evidenceLevelLabel: 'Evidence level',
    evidenceSourcesLabel: 'Evidence sources',
    evidenceReferenceLabel: 'Evidence reference',
    copyEvidenceReference: 'Copy reference',
    evidenceReferenceCopied: 'Reference copied',
    evidenceReferenceCopyFailed: 'Copy unavailable',
    addEvidenceFinding: 'Add to findings',
    evidenceFindingAdded: 'In review findings',
    nextGateLabel: 'Next validation gate',
    noCapabilitiesFound: 'No capability evidence matches this search and status filter.',
    decisionEyebrow: 'Decision view',
    decisionTitle: 'What a partner can evaluate now.',
    decisionBody: 'A compact view of the present pilot boundary. This separates usable paths from controlled beta work and capabilities that are intentionally not yet defaults.',
    decisionLanes: [
      {
        status: 'available',
        label: 'Pilot now',
        detail: 'Current product and node paths with an operational baseline.',
        items: ['Privacy Network', 'End-to-end encrypted chat', 'Identity and wallet', 'Signed releases', 'Production node lifecycle', 'Signed peer discovery'],
      },
      {
        status: 'beta',
        label: 'Controlled beta',
        detail: 'Implemented paths that should be evaluated with explicit rollout conditions.',
        items: ['Calls and meetings through LiveKit', 'MemChain private memory', 'Blind relay', 'Node-blind storage', 'Verifiable coordination ledger'],
      },
      {
        status: 'hardening',
        label: 'Not a default yet',
        detail: 'Real engineering paths that still require broader multi-node evidence.',
        items: ['Default multi-hop routing', 'Fully decentralized message continuity', 'Fleet-wide strict custody witness gates'],
      },
    ],
    pilotEyebrow: 'Partner pilot path',
    pilotTitle: 'A review can move from interest to evidence in four steps.',
    pilotBody: 'This is the recommended diligence sequence. It keeps product scope, privacy boundaries, acceptance evidence, and rollback ownership explicit before any broader rollout.',
    pilotOutputLabel: 'Review output',
    pilotSteps: [
      {
        step: '01',
        title: 'Define the evaluation scope',
        detail: 'Choose the product path, platforms, regions, user cohort, and success criteria that are actually under review.',
        output: 'Named scope with measurable acceptance criteria.',
      },
      {
        step: '02',
        title: 'Approve the trust boundary',
        detail: 'Review encryption ownership, current relay or media dependencies, metadata limits, and capabilities that are not defaults.',
        output: 'Recorded data-handling boundary and explicit exclusions.',
      },
      {
        step: '03',
        title: 'Exercise the acceptance matrix',
        detail: 'Test normal, offline, reconnect, failover, recovery, update, and rollback behavior on the agreed path.',
        output: 'Reproducible evidence, failures, and owners for every open item.',
      },
      {
        step: '04',
        title: 'Make a reversible rollout decision',
        detail: 'Agree ownership, monitoring, support escalation, rollback triggers, and the next expansion gate.',
        output: 'A documented go, controlled beta, or no-go decision.',
      },
    ],
    workspaceEyebrow: 'Private review workspace',
    workspaceTitle: 'Keep diligence progress without sending us your notes.',
    workspaceBody: 'Checklist state, findings, decisions, and notes are stored only in this browser. AeroNyx does not receive them. Export a handoff file only when you choose to share the review.',
    workspaceProgressLabel: 'Review progress',
    workspaceCompleteLabel: 'complete',
    workspaceReadinessLabel: 'Handoff readiness',
    workspaceReady: 'Ready to hand off',
    workspaceReadyBody: 'All diligence checks are complete and a recommendation is recorded.',
    workspaceNeedsAttention: 'Needs review',
    workspacePendingChecksLabel: 'checklist items remain before this review is ready to hand off.',
    workspaceDecisionPending: 'A recommendation still needs to be recorded.',
    workspaceChecklistLabel: 'Diligence checklist',
    workspaceDecisionMemoLabel: 'Decision memo',
    workspaceDecisionLabel: 'Current recommendation',
    workspaceDecisionOptions: {
      undecided: 'Not decided',
      pilot: 'Proceed to pilot',
      conditional: 'Proceed with conditions',
      hold: 'Hold for more evidence',
      no_go: 'Do not proceed',
    },
    workspaceOrganizationLabel: 'Reviewer / organization',
    workspaceOrganizationPlaceholder: 'Optional local label',
    workspaceNextReviewLabel: 'Next review date',
    workspaceNotesLabel: 'Reviewer notes',
    workspaceNotesPlaceholder: 'Capture open questions, evidence requests, owners, or rollout conditions…',
    workspaceNotesHelp: `Stored locally · maximum ${REVIEW_NOTES_MAX_LENGTH} characters`,
    workspaceFindingsLabel: 'Review findings',
    workspaceFindingsBody: 'Track concrete diligence issues separately from free-form notes. Open blockers prevent the workspace from being marked ready for handoff.',
    workspaceFindingTitleLabel: 'Finding',
    workspaceFindingTitlePlaceholder: 'Describe one verifiable issue or evidence gap',
    workspaceFindingSeverityLabel: 'Severity',
    workspaceFindingOwnerLabel: 'Owner',
    workspaceFindingOwnerPlaceholder: 'Optional owner',
    workspaceFindingDueLabel: 'Due date',
    workspaceFindingReferenceLabel: 'Evidence reference',
    workspaceFindingOpenEvidence: 'Open evidence',
    workspaceFindingFromEvidence: 'Validate {reference}: {title}',
    workspaceFindingAdd: 'Add finding',
    workspaceFindingLimit: `Maximum ${REVIEW_FINDINGS_MAX} findings per local workspace`,
    workspaceFindingEmpty: 'No structured findings recorded.',
    workspaceFindingOpen: 'Open',
    workspaceFindingResolved: 'Resolved',
    workspaceFindingResolve: 'Mark resolved',
    workspaceFindingReopen: 'Reopen',
    workspaceFindingRemove: 'Remove',
    workspaceFindingCountLabel: 'findings',
    workspaceFindingOpenLabel: 'open',
    workspaceFindingBlockerLabel: 'blockers',
    workspaceFindingSeverities: {
      blocker: 'Blocker',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    workspaceOpenBlockersPending: 'Open blocker findings must be resolved or explicitly removed before handoff.',
    workspaceExport: 'Export review handoff',
    workspaceExported: 'Handoff downloaded',
    workspaceExportFailed: 'Handoff unavailable',
    workspaceMemoExport: 'Download decision memo',
    workspaceMemoExported: 'Decision memo downloaded',
    workspaceMemoExportFailed: 'Decision memo unavailable',
    workspaceImport: 'Import handoff',
    workspaceImported: 'Handoff imported',
    workspaceImportFailed: 'Invalid handoff file',
    workspaceHandoffHelp: 'Import accepts only an AeroNyx review handoff. Existing local workspace data will be replaced after validation.',
    workspaceClear: 'Clear local workspace',
    workspaceConfirmClear: 'Confirm clear',
    workspaceLocalOnly: 'Local-only workspace · no server synchronization',
    memoLabels: {
      title: 'AeroNyx Partner Review Decision Memo',
      generated: 'Generated',
      baseline: 'Verified baseline',
      decision: 'Decision',
      recommendation: 'Recommendation',
      reviewer: 'Reviewer / organization',
      nextReview: 'Next review',
      readiness: 'Review readiness',
      progress: 'Checklist progress',
      checklist: 'Diligence checklist',
      findings: 'Review findings',
      findingOwner: 'Owner',
      findingDue: 'Due',
      findingStatus: 'Status',
      findingReference: 'Evidence reference',
      notes: 'Reviewer notes',
      boundaries: 'Current declared boundaries',
      capabilities: 'Capability evidence index',
      client: 'Client product',
      node: 'Rust protocol infrastructure',
      evidence: 'Verification',
      sources: 'Evidence sources',
      nextGate: 'Next validation gate',
      links: 'Public review links',
      artifacts: 'Release integrity',
      file: 'Artifact',
      assurance: 'Distribution assurance',
      sha256: 'SHA-256',
      integrityPath: 'Integrity path',
      privacy: 'Privacy boundary',
    },
    reviewChecklist: [
      { id: 'scope', title: 'Scope understood', detail: 'Product path, platforms, regions, cohort, and success criteria are explicit.' },
      { id: 'privacy', title: 'Privacy boundary reviewed', detail: 'Encryption ownership, metadata limits, current dependencies, and exclusions are understood.' },
      { id: 'evidence', title: 'Evidence and gates reviewed', detail: 'Current status, evidence source, verification note, and next validation gate have been checked.' },
      { id: 'operations', title: 'Operational path reviewed', detail: 'Monitoring, support escalation, failure handling, recovery, and rollback ownership are defined.' },
      { id: 'decision', title: 'Decision recorded', detail: 'The outcome is documented as go, controlled beta, or no-go with the next review trigger.' },
    ],
    clientEyebrow: 'Client product',
    clientTitle: 'One app for private connection, communication, and memory.',
    clientBody: 'The current app is not a concept shell. It contains working privacy-network, encrypted communication, meeting, memory, identity, wallet, and release-management surfaces across mobile and desktop.',
    clientItems: [
      {
        status: 'available',
        title: 'Privacy Network',
        summary: 'Cross-platform connect flow, region and node selection, reconnect policy, quota gates, session statistics, and native VPN lifecycle integration.',
        evidence: 'Shipping on iOS, Android ARM64, macOS, and Windows.',
        evidenceLevel: 'Released product path',
        evidenceSources: ['Release artifact', 'Client source'],
        nextGate: 'Partner acceptance across agreed platforms, regions, reconnect, and failure cases.',
      },
      {
        status: 'available',
        title: 'End-to-end encrypted chat',
        summary: 'One-to-one and group messaging with offline delivery, replies, editing, revoke, reactions, receipts, typing controls, media, files, and voice notes.',
        evidence: 'Relay routes ciphertext; message content remains client-encrypted.',
        evidenceLevel: 'Implemented product path',
        evidenceSources: ['Client source', 'Protocol contract'],
        nextGate: 'Partner run for offline delivery, media, receipts, duplicate handling, and multi-device recovery.',
      },
      {
        status: 'beta',
        title: 'Calls and meetings',
        summary: 'Voice/video calling, native incoming-call lifecycle, meeting green room, roster, in-meeting chat, and screen or window presentation.',
        evidence: 'LiveKit is the recommended media path today; P2P remains an optional route.',
        evidenceLevel: 'Controlled beta path',
        evidenceSources: ['Client source', 'Integration path'],
        nextGate: 'End-to-end grant, waiting-room, role, reconnect, and media-failure acceptance.',
      },
      {
        status: 'beta',
        title: 'MemChain private memory',
        summary: 'Opt-in consent, local memory formation, local-first recall, encrypted synchronization, and node-blind storage boundaries.',
        evidence: 'Storage nodes receive encrypted records and blind indexes, not memory plaintext.',
        evidenceLevel: 'Controlled beta path',
        evidenceSources: ['Client source', 'Node contract'],
        nextGate: 'Cross-device restore, retention, deletion, and external-model disclosure review.',
      },
      {
        status: 'available',
        title: 'Identity and wallet',
        summary: 'Self-custody identity, biometric/secure-storage protections, Solana and EVM wallet surfaces, switching, portfolio, send, and payment request flows.',
        evidence: 'Private-key ownership stays on the client side.',
        evidenceLevel: 'Released product path',
        evidenceSources: ['Client source', 'Platform security'],
        nextGate: 'Recovery, secure-storage, and transaction-failure acceptance on selected platforms.',
      },
      {
        status: 'available',
        title: 'Release and recovery',
        summary: 'Signed platform installers, staged update checks, foreground refresh, defer windows, platform-specific verification, and desktop/mobile recovery handling.',
        evidence: `Current published baseline: ${CLIENT_BUILD}.`,
        evidenceLevel: 'Published delivery path',
        evidenceSources: ['Release artifact', 'Update contract'],
        nextGate: 'Installer, update, defer, and rollback verification on partner-managed test devices.',
      },
    ],
    rustEyebrow: 'Rust protocol infrastructure',
    rustTitle: 'Open nodes that coordinate without reading user content.',
    rustBody: 'The Rust node has progressed beyond a VPN endpoint. It now combines transport, signed discovery, blind relay, encrypted custody, private memory primitives, and a verifiable coordination ledger designed for privacy-network operations.',
    rustItems: [
      {
        status: 'available',
        title: 'Production node lifecycle',
        summary: 'Interactive installation, registration, upgrade, rollback, health checks, capacity controls, admission validation, and systemd supervision.',
        evidence: 'Operational paths are bounded and preserve active-session safety gates.',
        evidenceLevel: 'Production operator path',
        evidenceSources: ['Rust source', 'Operator workflow'],
        nextGate: 'Repeat install, upgrade, rollback, and health acceptance on an independently operated node.',
      },
      {
        status: 'available',
        title: 'Signed peer discovery',
        summary: 'Signed descriptors, persistent peer store, bootstrap and gossip exchange, capability negotiation, endpoint validation, and routeability probes.',
        evidence: 'New reviewed nodes can become discoverable without becoming trusted authority.',
        evidenceLevel: 'Implemented and node-tested',
        evidenceSources: ['Rust source', 'Node tests'],
        nextGate: 'Multi-operator discovery, restart recovery, stale-peer, and route-diversity testing.',
      },
      {
        status: 'beta',
        title: 'Blind encrypted message relay',
        summary: 'Authenticated relay frames, offline custody, idempotency, bounded abuse controls, encrypted media transport foundations, and terminal pending storage.',
        evidence: 'Nodes route opaque payloads and cannot interpret message content.',
        evidenceLevel: 'Controlled beta path',
        evidenceSources: ['Rust source', 'Protocol tests'],
        nextGate: 'Client-to-terminal encrypted delivery under offline, duplicate, abuse, and failure cases.',
      },
      {
        status: 'hardening',
        title: 'Multi-hop relay paths',
        summary: 'Onion-middle capability, candidate filtering, reachability probes, TTL boundaries, path proof, terminal delivery, and middle-forward counters.',
        evidence: 'Real node-network tests exist; this is not yet the default route for all client traffic.',
        evidenceLevel: 'Real-network hardening',
        evidenceSources: ['Rust source', 'Live node test'],
        nextGate: 'Multi-region route selection, hop failure, path-proof, metadata, and soak evidence.',
      },
      {
        status: 'beta',
        title: 'Node-blind encrypted storage',
        summary: 'Encrypted Memory Chain records, blind indexes, owner-authorized synchronization, backup/restore planning, and bounded retention maintenance.',
        evidence: 'Nodes retain ciphertext and integrity metadata, never memory plaintext.',
        evidenceLevel: 'Controlled beta path',
        evidenceSources: ['Rust source', 'Protocol tests'],
        nextGate: 'Owner-authorized sync, restore, deletion, retention, and quota conformance.',
      },
      {
        status: 'beta',
        title: 'Verifiable coordination ledger',
        summary: 'Signed record-commitment blocks, follower synchronization, full-node mirror mode, external witness evidence, rollback protection, and authority handover proofs.',
        evidence: 'Purpose-built coordination evidence; no smart contracts or global-consensus claim.',
        evidenceLevel: 'Implemented and node-tested',
        evidenceSources: ['Rust source', 'Multi-node tests'],
        nextGate: 'Third-party mirror recovery and witness verification while the producer is unavailable.',
      },
      {
        status: 'hardening',
        title: 'Custody witness safety',
        summary: 'Independent signed receipts, durable vault audit, startup/runtime gates, quorum expiry warning, recovery lifecycle, and bounded concurrent witness collection.',
        evidence: `Latest reviewed milestone ${RUST_NODE_HEAD}: up to 16 exact pins in one timeout window.`,
        evidenceLevel: 'Reviewed Rust milestone',
        evidenceSources: ['Rust source', 'Adverse-path tests'],
        nextGate: 'Deploy to independent nodes and exercise expiry, refresh, restart, and strict-gate rollback.',
      },
    ],
    dependencyEyebrow: 'Dependency boundary',
    dependencyTitle: 'Who operates each path today, and how it can evolve.',
    dependencyBody: 'AeroNyx separates protocol ownership from current service dependencies. This table makes temporary infrastructure choices explicit instead of hiding them inside product claims.',
    dependencyLabels: {
      component: 'Path',
      operator: 'Current operator',
      state: 'Current role',
      transition: 'Evolution path',
    },
    dependencies: [
      {
        component: 'Default message relay',
        operator: 'AeroNyx managed infrastructure',
        state: 'Stable client default',
        transition: 'Add reviewed decentralized relay choices without silently changing user behavior.',
      },
      {
        component: 'Meeting media transport',
        operator: 'LiveKit deployment',
        state: 'Recommended beta path',
        transition: 'Keep authorization and product control in AeroNyx behind a replaceable media interface.',
      },
      {
        component: 'Privacy and coordination nodes',
        operator: 'Independent operators running the open Rust protocol',
        state: 'Production transport plus staged decentralized services',
        transition: 'Expand permissionless participation with stronger diversity, reputation, and route evidence.',
      },
      {
        component: 'Client distribution',
        operator: 'App stores and AeroNyx signed direct releases',
        state: 'Platform-specific signed delivery',
        transition: 'Preserve independently verifiable installers and platform-native trust checks.',
      },
    ],
    milestoneEyebrow: 'Recent evidence',
    milestoneTitle: 'What changed most recently.',
    milestones: [
      {
        date: '2026-08-19',
        title: 'Witness collection latency bounded',
        detail: 'Rust custody witness requests now run concurrently under the existing 16-pin ceiling while preserving durable-before-counting and adverse-evidence fail-closed behavior.',
      },
      {
        date: '2026-08',
        title: 'Meetings became a real product surface',
        detail: 'Green room, participant state, meeting chat, call lifecycle, and screen/window presentation are represented in the client implementation.',
      },
      {
        date: '2026-07',
        title: `Client ${CLIENT_BUILD} released`,
        detail: 'Current Android ARM64, macOS, and Windows artifacts were published alongside the maintained iOS distribution path.',
      },
      {
        date: '2026-07',
        title: 'Coordination ledger moved beyond local blocks',
        detail: 'Mirror synchronization, independently signed witness evidence, carrier recovery, and policy-safe authority handover were added to the Rust node.',
      },
    ],
    boundaryEyebrow: 'Current boundaries',
    boundaryTitle: 'What AeroNyx does not overclaim.',
    boundaryBody: 'Partners should evaluate the product against the system that exists, not a future whitepaper. These constraints are deliberate and visible.',
    boundaries: [
      {
        title: 'Managed relay remains the default',
        detail: 'The client keeps the stable managed relay path by default. Decentralized routing is being exposed as an explicit user choice rather than silently changing behavior.',
      },
      {
        title: 'LiveKit carries recommended calls today',
        detail: 'Meeting authorization and UI are AeroNyx-controlled, while the short-term media plane uses LiveKit. The interface remains replaceable by a future Rust media path.',
      },
      {
        title: 'The ledger is purpose-built, not a general blockchain',
        detail: 'It records signed, aggregate coordination evidence. It does not publish user messages, social relationships, browsing activity, smart contracts, or token execution.',
      },
      {
        title: 'Protocol nodes are blind to payloads, not invisible to all metadata',
        detail: 'Nodes need bounded routing and timing metadata to deliver traffic. AeroNyx minimizes and separates that metadata; it does not claim traffic-analysis immunity is finished.',
      },
    ],
    roadmapEyebrow: 'Next milestones',
    roadmapTitle: 'The shortest path to partner-grade deployment.',
    roadmapBody: 'The roadmap prioritizes end-to-end proof and operational repeatability before adding another visible feature surface.',
    roadmap: [
      {
        step: '01',
        title: 'Close the meeting authorization loop',
        detail: 'Finish grant, waiting-room, role, and failure-state validation across mobile and desktop while preserving the replaceable media boundary.',
      },
      {
        step: '02',
        title: 'Deploy custody witness hardening',
        detail: 'Roll the latest Rust witness lifecycle to reviewed nodes, exercise real expiry/refresh behavior, and collect operator evidence before enabling strict gates fleet-wide.',
      },
      {
        step: '03',
        title: 'Expose transport choice safely',
        detail: 'Keep managed relay as default while giving advanced users a comprehensible, reversible choice of reviewed decentralized relay paths.',
      },
      {
        step: '04',
        title: 'Prove decentralized message continuity',
        detail: 'Run multi-region failure tests for discovery, store-and-forward, multi-hop delivery, mirror recovery, and node replacement without relying on one coordination host.',
      },
    ],
    linksTitle: 'Review and verification links',
    links: [
      ['Protocol website', 'https://aeronyx.network/'],
      ['Technical documentation', 'https://docs.aeronyx.network/'],
      ['Node operator app', 'https://app.aeronyx.network/'],
      ['Reviewed Rust commit', `https://github.com/AeroNyxNetwork/AeroNyx/commit/${RUST_NODE_HEAD}`],
      ['Open-source organization', 'https://github.com/AeroNyxNetwork'],
    ],
    footer: 'AeroNyx partner build brief',
    footerNote: `Source-reviewed on ${VERIFIED_DATE}. Product status changes only after implementation and verification.`,
  },
  zh: {
    language: '語言',
    english: 'EN',
    chinese: '中文',
    restricted: '合作方開發簡報',
    restrictedDetail: '未列出連結 · 僅含可公開的交付資訊',
    heroTitle: '清楚了解 AeroNyx 今天真正能做什麼。',
    heroBody: '給合作方的源碼核對版進度：客戶端能力、Rust 協議基礎設施、目前依賴與下一個里程碑。AeroNyx 正在走向完全開放的隱私協調網絡，但不把未完成的能力包裝成已交付。',
    verified: `核對日期 ${VERIFIED_DATE}`,
    revision: `簡報 v${REVIEW_REVISION}`,
    noTraffic: '本頁不包含客戶流量、節點身份、私有端點、密鑰或任何 payload 資料。',
    accessTitle: '未列出的合作方審閱頁',
    accessBody: '固定路由 token 只是方便分享的入口，不是身份驗證邊界。任何取得網址或查看公開源碼的人都能開啟，因此本頁刻意只包含可公開資訊。',
    copyLink: '複製審閱連結',
    copiedLink: '連結已複製',
    copyFailed: '無法複製',
    exportJson: '匯出 JSON',
    exportedJson: 'JSON 已下載',
    exportFailed: '無法匯出',
    printBrief: '列印 / 儲存 PDF',
    contactTeam: '聯絡 AeroNyx',
    reviewDepthTitle: '審閱深度',
    reviewDepthBody: '高層視圖保留決策主線；技術視圖展開完整能力、證據與驗收記錄。',
    reviewDepthLabels: {
      executive: '高層視圖',
      technical: '技術視圖',
    },
    reviewDepthDescriptions: {
      executive: '決策、Pilot、依賴、邊界與路線圖',
      technical: '完整客戶端與 Rust 能力證據',
    },
    quickLinksEyebrow: '先看影響決策的關鍵資訊',
    quickLinksTitle: '重要狀態與證據，一次直達。',
    quickLinksAction: '查看章節',
    quickLinks: [
      {
        href: '#decision',
        label: 'Pilot 定位',
        value: '可開始範圍化評估',
        detail: '快速區分現在可 Pilot、受控 Beta，以及尚未設為默認的能力。',
      },
      {
        href: '#artifacts',
        label: '發布完整性',
        value: `客戶端 ${CLIENT_BUILD}`,
        detail: '核對不可變安裝包、平台分發保證與已發布的 SHA-256 證據。',
      },
      {
        href: '#boundaries',
        label: '信任邊界',
        value: '明確聲明，不隱藏',
        detail: '查看現有依賴、元資料限制，以及仍需加固的能力。',
      },
      {
        href: '#pilot',
        label: '建議下一步',
        value: '四步合作方 Pilot',
        detail: '從範圍與信任審閱，走到驗收證據及可回滾的發布決策。',
      },
    ],
    capabilitySearchLabel: '搜尋能力證據',
    capabilitySearchPlaceholder: '搜尋 Relay、記憶、恢復、witness…',
    statusOverview: {
      available: '已可用能力',
      beta: 'Beta 能力',
      hardening: '加固中項目',
      boundaries: '已聲明邊界',
    },
    jumpLabel: '簡報目錄',
    jumpItems: [
      ['#overview', '總覽', false],
      ['#artifacts', '發布完整性', false],
      ['#pilot', 'Pilot 路徑', false],
      ['#workspace', '審閱工作區', false],
      ['#client', '客戶端產品', true],
      ['#rust', 'Rust 基礎設施', true],
      ['#dependencies', '依賴邊界', false],
      ['#boundaries', '目前邊界', false],
      ['#roadmap', '下一里程碑', false],
    ],
    snapshotEyebrow: '目前基線',
    snapshotTitle: '產品已交付，協議核心持續加固。',
    snapshotBody: '以下版本把頁面錨定到真實客戶端發布與已審核的 Rust main commit。狀態來自源碼與測試證據，不使用虛假的完成百分比。',
    snapshot: [
      { label: '客戶端版本', value: CLIENT_BUILD, detail: '目前跨平台正式發布基線' },
      { label: 'Rust 節點版本', value: RUST_NODE_HEAD, detail: 'GitHub main · witness 延遲加固里程碑' },
      { label: '發布平台', value: '4 個平台', detail: 'iOS · Android ARM64 · macOS · Windows' },
      { label: '默認服務路徑', value: 'Managed relay', detail: '默認保持穩定；去中心化路徑由用戶選擇' },
    ],
    revisionDeltaEyebrow: '相較上一版簡報',
    revisionDeltaTitle: '影響決策的證據，現在優先呈現。',
    revisionDeltaBody: '首屏改為靜態的專業盡調介面，可直接進入 Pilot 準備度、發布完整性、信任邊界與建議審閱流程。未列出路由仍保持固定、noindex 與 public-safe。',
    revisionDeltaItems: [
      '移除證據審閱頁中的裝飾性協議背景動畫。',
      '把關鍵狀態與章節入口移到首屏。',
      '保留完整技術記錄、本地工作區、匯出能力與回應安全標頭。',
    ],
    artifactEyebrow: '發布完整性',
    artifactTitle: '評估協議之前，先驗證客戶端。',
    artifactBody: '以下直接安裝包與官網下載流程使用同一份不可變發布契約。雜湊只適用於此處顯示的精確檔名與版本。',
    artifactReleaseLabel: `版本 ${RELEASE_VERSION}-${RELEASE_BUILD}`,
    artifactFileLabel: '交付物',
    artifactAssuranceLabel: '分發保證',
    artifactHashLabel: 'SHA-256',
    artifactIntegrityPathLabel: '完整性路徑',
    artifactDownload: '開啟不可變下載',
    artifactCopyHash: '複製 SHA-256',
    artifactHashCopied: 'SHA-256 已複製',
    artifactHashCopyFailed: '無法複製',
    artifactAppStore: '開啟 App Store',
    artifactAppStoreArtifact: 'AeroNyx App Store 上架版本',
    artifactAppStoreIntegrity: '由 Apple App Store 信任鏈驗證',
    artifactAssurance: {
      macOS: 'Developer ID 公證 · staple 完成 · Apple Silicon',
      Windows: 'x64 安裝器 · 已發布 SHA-256 雜湊',
      Android: '正式簽名 APK · 僅支援 ARM64',
      iOS: 'Apple App Store 分發',
    },
    statusLabels: {
      available: '已可用',
      beta: 'Beta',
      hardening: '加固中',
      progress: '開發中',
    },
    statusDefinitionsTitle: '交付狀態如何判定',
    statusDefinitionsBody: '每個狀態都描述當前實現與驗證邊界，不是排期估算，也不是行銷百分比。',
    statusDefinitions: {
      available: '目前產品或正式節點運維流程中已可使用。',
      beta: '功能已實現並經過測試，仍採分階段發布或等待產品驗證。',
      hardening: '核心路徑已存在，正在進行可靠性、安全性或多節點驗證。',
      progress: '正在開發，不會被描述成當前已可用能力。',
    },
    filterLabel: '依交付狀態篩選能力',
    filters: {
      all: '全部',
      available: '已可用',
      active: '進行中',
    },
    showingLabel: '目前顯示',
    capabilityLabel: '項能力',
    evidenceLabel: '驗證說明',
    evidenceLevelLabel: '證據層級',
    evidenceSourcesLabel: '證據來源',
    evidenceReferenceLabel: '證據編號',
    copyEvidenceReference: '複製編號',
    evidenceReferenceCopied: '編號已複製',
    evidenceReferenceCopyFailed: '無法複製',
    addEvidenceFinding: '加入審閱問題',
    evidenceFindingAdded: '已在審閱問題中',
    nextGateLabel: '下一驗收門檻',
    noCapabilitiesFound: '沒有能力證據符合目前的搜尋與狀態篩選。',
    decisionEyebrow: '決策視圖',
    decisionTitle: '合作方現在可以評估什麼。',
    decisionBody: '用最短時間看清目前 pilot 邊界，區分已可使用、受控 Beta，以及刻意尚未設為默認的能力。',
    decisionLanes: [
      {
        status: 'available',
        label: '現在可 Pilot',
        detail: '已有運維基線的客戶端與節點路徑。',
        items: ['隱私網絡', '端到端加密聊天', '身份與錢包', '簽名發布', '正式節點生命週期', '簽名節點發現'],
      },
      {
        status: 'beta',
        label: '受控 Beta',
        detail: '功能已實現，應在明確發布條件下評估。',
        items: ['LiveKit 通話與會議', 'MemChain 私有記憶', '盲中繼', '節點盲存儲', '可驗證協調帳本'],
      },
      {
        status: 'hardening',
        label: '尚未設為默認',
        detail: '已有真實工程路徑，仍需要更廣泛的多節點證據。',
        items: ['默認多跳路由', '完全去中心化訊息連續性', '全節點 strict custody witness gate'],
      },
    ],
    pilotEyebrow: '合作方 Pilot 路徑',
    pilotTitle: '四個步驟，把合作興趣轉成可驗證證據。',
    pilotBody: '這是建議的盡調順序。在擴大發布前，先明確產品範圍、隱私邊界、驗收證據與回滾責任。',
    pilotOutputLabel: '審閱產出',
    pilotSteps: [
      {
        step: '01',
        title: '定義評估範圍',
        detail: '選定真正要評估的產品路徑、平台、地區、用戶群與成功標準。',
        output: '具名範圍與可量測的驗收條件。',
      },
      {
        step: '02',
        title: '確認信任邊界',
        detail: '審閱加密所有權、現有 Relay 或媒體依賴、元資料限制，以及尚未設為默認的能力。',
        output: '留下資料處理邊界與明確排除項。',
      },
      {
        step: '03',
        title: '執行驗收矩陣',
        detail: '在約定路徑上測試正常、離線、重連、故障切換、恢復、更新與回滾行為。',
        output: '可重現證據、失敗記錄與每個未決項的負責人。',
      },
      {
        step: '04',
        title: '作出可逆的發布決策',
        detail: '確認運營責任、監控、支援升級、回滾觸發條件與下一個擴大門檻。',
        output: '形成 go、受控 Beta 或 no-go 的書面決策。',
      },
    ],
    workspaceEyebrow: '私密審閱工作區',
    workspaceTitle: '保存盡調進度，不必把你的筆記傳給我們。',
    workspaceBody: '核對進度、審閱問題、決策與筆記只保存在這個瀏覽器，AeroNyx 不會收到。只有審閱者主動匯出交接檔案時，資料才會離開設備。',
    workspaceProgressLabel: '審閱進度',
    workspaceCompleteLabel: '已完成',
    workspaceReadinessLabel: '交接就緒狀態',
    workspaceReady: '可以交接',
    workspaceReadyBody: '盡調核對已完成，並且已記錄目前建議。',
    workspaceNeedsAttention: '仍需審閱',
    workspacePendingChecksLabel: '個核對項尚未完成，完成後才能形成完整交接。',
    workspaceDecisionPending: '仍需記錄目前建議。',
    workspaceChecklistLabel: '盡調核對清單',
    workspaceDecisionMemoLabel: '決策備忘',
    workspaceDecisionLabel: '目前建議',
    workspaceDecisionOptions: {
      undecided: '尚未決定',
      pilot: '進入 Pilot',
      conditional: '附條件推進',
      hold: '等待更多證據',
      no_go: '不推進',
    },
    workspaceOrganizationLabel: '審閱者 / 組織',
    workspaceOrganizationPlaceholder: '選填的本機標籤',
    workspaceNextReviewLabel: '下一次審閱日期',
    workspaceNotesLabel: '審閱者筆記',
    workspaceNotesPlaceholder: '記錄未決問題、證據要求、負責人或發布條件…',
    workspaceNotesHelp: `僅本機保存 · 最多 ${REVIEW_NOTES_MAX_LENGTH} 個字元`,
    workspaceFindingsLabel: '審閱問題',
    workspaceFindingsBody: '把具體盡調問題和自由筆記分開管理。仍未關閉的阻塞項會讓工作區保持在「仍需審閱」狀態。',
    workspaceFindingTitleLabel: '問題',
    workspaceFindingTitlePlaceholder: '描述一個可驗證的問題或證據缺口',
    workspaceFindingSeverityLabel: '嚴重度',
    workspaceFindingOwnerLabel: '負責人',
    workspaceFindingOwnerPlaceholder: '選填負責人',
    workspaceFindingDueLabel: '到期日',
    workspaceFindingReferenceLabel: '證據引用',
    workspaceFindingOpenEvidence: '查看證據',
    workspaceFindingFromEvidence: '驗證 {reference}：{title}',
    workspaceFindingAdd: '新增問題',
    workspaceFindingLimit: `每個本機工作區最多 ${REVIEW_FINDINGS_MAX} 個問題`,
    workspaceFindingEmpty: '目前沒有結構化審閱問題。',
    workspaceFindingOpen: '未關閉',
    workspaceFindingResolved: '已解決',
    workspaceFindingResolve: '標記已解決',
    workspaceFindingReopen: '重新開啟',
    workspaceFindingRemove: '移除',
    workspaceFindingCountLabel: '個問題',
    workspaceFindingOpenLabel: '個未關閉',
    workspaceFindingBlockerLabel: '個阻塞項',
    workspaceFindingSeverities: {
      blocker: '阻塞',
      high: '高',
      medium: '中',
      low: '低',
    },
    workspaceOpenBlockersPending: '仍未關閉的阻塞問題必須先解決或明確移除，才能形成可交接狀態。',
    workspaceExport: '匯出審閱交接檔',
    workspaceExported: '交接檔已下載',
    workspaceExportFailed: '無法匯出交接檔',
    workspaceMemoExport: '下載決策備忘',
    workspaceMemoExported: '決策備忘已下載',
    workspaceMemoExportFailed: '無法產生決策備忘',
    workspaceImport: '匯入交接檔',
    workspaceImported: '交接檔已匯入',
    workspaceImportFailed: '交接檔格式不正確',
    workspaceHandoffHelp: '只接受 AeroNyx 審閱交接檔。驗證通過後，會取代目前瀏覽器中的工作區資料。',
    workspaceClear: '清除本機工作區',
    workspaceConfirmClear: '確認清除',
    workspaceLocalOnly: '僅本機工作區 · 不與伺服器同步',
    memoLabels: {
      title: 'AeroNyx 合作方審閱決策備忘',
      generated: '產生時間',
      baseline: '已核對基線',
      decision: '決策',
      recommendation: '目前建議',
      reviewer: '審閱者 / 組織',
      nextReview: '下一次審閱',
      readiness: '審閱就緒狀態',
      progress: '核對進度',
      checklist: '盡調核對清單',
      findings: '審閱問題',
      findingOwner: '負責人',
      findingDue: '到期日',
      findingStatus: '狀態',
      findingReference: '證據引用',
      notes: '審閱者筆記',
      boundaries: '目前已聲明邊界',
      capabilities: '能力證據索引',
      client: '客戶端產品',
      node: 'Rust 協議基礎設施',
      evidence: '驗證說明',
      sources: '證據來源',
      nextGate: '下一驗收門檻',
      links: '公開核對入口',
      artifacts: '發布完整性',
      file: '交付物',
      assurance: '分發保證',
      sha256: 'SHA-256',
      integrityPath: '完整性路徑',
      privacy: '隱私邊界',
    },
    reviewChecklist: [
      { id: 'scope', title: '已理解評估範圍', detail: '產品路徑、平台、地區、用戶群與成功條件都已明確。' },
      { id: 'privacy', title: '已審閱隱私邊界', detail: '已理解加密所有權、元資料限制、當前依賴與排除項。' },
      { id: 'evidence', title: '已審閱證據與門檻', detail: '已核對當前狀態、證據來源、驗證說明與下一驗收門檻。' },
      { id: 'operations', title: '已審閱運營路徑', detail: '監控、支援升級、故障處理、恢復與回滾責任已明確。' },
      { id: 'decision', title: '已記錄決策', detail: '已形成 go、受控 Beta 或 no-go 結論，並記錄下一次審閱觸發條件。' },
    ],
    clientEyebrow: '客戶端產品',
    clientTitle: '一個 App，完成私密連接、溝通與記憶。',
    clientBody: '目前客戶端不是概念介面。它已包含移動端與桌面端的隱私網絡、加密通信、會議、記憶、身份、錢包與更新管理。',
    clientItems: [
      {
        status: 'available',
        title: '隱私網絡',
        summary: '跨平台連接、區域與節點選擇、重連策略、配額門控、會話統計及原生 VPN 生命週期整合。',
        evidence: '已發布於 iOS、Android ARM64、macOS 與 Windows。',
        evidenceLevel: '已發布產品路徑',
        evidenceSources: ['發布成品', '客戶端源碼'],
        nextGate: '在約定平台、地區、重連與故障情境完成合作方驗收。',
      },
      {
        status: 'available',
        title: '端到端加密聊天',
        summary: '單聊與群聊、離線投遞、引用、編輯、撤回、表情回應、回執、輸入狀態隱私控制、媒體、文件與語音訊息。',
        evidence: 'Relay 只路由密文，訊息內容保持客戶端加密。',
        evidenceLevel: '已實現產品路徑',
        evidenceSources: ['客戶端源碼', '協議契約'],
        nextGate: '完成離線投遞、媒體、回執、重複處理與多設備恢復驗收。',
      },
      {
        status: 'beta',
        title: '通話與會議',
        summary: '語音與視訊通話、原生來電生命週期、會議等候區、成員狀態、會議聊天，以及螢幕或視窗分享。',
        evidence: '目前建議使用 LiveKit 媒體路徑；P2P 仍是可選路由。',
        evidenceLevel: '受控 Beta 路徑',
        evidenceSources: ['客戶端源碼', '整合路徑'],
        nextGate: '完成 grant、等候區、角色、重連與媒體故障的端到端驗收。',
      },
      {
        status: 'beta',
        title: 'MemChain 私有記憶',
        summary: '明確同意、本地記憶形成、本地優先召回、加密同步與節點盲存儲邊界。',
        evidence: '存儲節點拿到的是加密記錄與盲索引，不是記憶明文。',
        evidenceLevel: '受控 Beta 路徑',
        evidenceSources: ['客戶端源碼', '節點契約'],
        nextGate: '完成跨設備恢復、保留、刪除與外部模型披露審閱。',
      },
      {
        status: 'available',
        title: '身份與錢包',
        summary: '自託管身份、生物識別與安全存儲保護、Solana/EVM 錢包、切換、資產組合、發送與支付請求。',
        evidence: '私鑰所有權保留在客戶端。',
        evidenceLevel: '已發布產品路徑',
        evidenceSources: ['客戶端源碼', '平台安全'],
        nextGate: '在選定平台完成恢復、安全存儲與交易失敗驗收。',
      },
      {
        status: 'available',
        title: '發布與恢復',
        summary: '簽名安裝包、分階段更新檢查、回到前台刷新、稍後提醒、平台驗證及桌面/移動端恢復處理。',
        evidence: `目前發布基線：${CLIENT_BUILD}。`,
        evidenceLevel: '已發布交付路徑',
        evidenceSources: ['發布成品', '更新契約'],
        nextGate: '在合作方管理的測試設備驗證安裝、更新、延後與回滾。',
      },
    ],
    rustEyebrow: 'Rust 協議基礎設施',
    rustTitle: '開放節點負責協調，但不能讀取用戶內容。',
    rustBody: 'Rust 節點早已不只是 VPN endpoint。它整合傳輸、簽名發現、盲中繼、加密託管、私有記憶原語與專門為隱私網絡設計的可驗證協調帳本。',
    rustItems: [
      {
        status: 'available',
        title: '生產節點生命週期',
        summary: '交互式安裝、註冊、升級、回滾、健康檢查、容量控制、准入驗證與 systemd 監督。',
        evidence: '運維流程有明確上限，並保留 active session 安全門控。',
        evidenceLevel: '正式節點運維路徑',
        evidenceSources: ['Rust 源碼', '運營流程'],
        nextGate: '在獨立運營節點重複驗證安裝、升級、回滾與健康狀態。',
      },
      {
        status: 'available',
        title: '簽名節點發現',
        summary: '簽名 descriptor、持久 peer store、bootstrap/gossip、能力協商、端點驗證與可路由探測。',
        evidence: '新節點可以被自動發現，但不會因此自動成為可信權威。',
        evidenceLevel: '已實現並經節點測試',
        evidenceSources: ['Rust 源碼', '節點測試'],
        nextGate: '完成多運營方發現、重啟恢復、過期 peer 與路由多樣性測試。',
      },
      {
        status: 'beta',
        title: '盲加密訊息中繼',
        summary: '認證 relay frame、離線託管、冪等、防濫用上限、加密媒體傳輸基礎及 terminal pending store。',
        evidence: '節點路由不透明 payload，不能理解訊息內容。',
        evidenceLevel: '受控 Beta 路徑',
        evidenceSources: ['Rust 源碼', '協議測試'],
        nextGate: '驗證客戶端到終端在離線、重複、濫用與故障情境下的密文投遞。',
      },
      {
        status: 'hardening',
        title: '多跳加密路徑',
        summary: 'Onion-middle 能力、候選篩選、可達性探測、TTL、path proof、terminal delivery 與 middle-forward 計數。',
        evidence: '已有真節點網絡測試，但尚未成為所有客戶端流量的默認路徑。',
        evidenceLevel: '真實網絡加固中',
        evidenceSources: ['Rust 源碼', '線上節點測試'],
        nextGate: '取得多地區選路、hop 故障、path proof、元資料與 soak 測試證據。',
      },
      {
        status: 'beta',
        title: '節點盲加密存儲',
        summary: '加密 Memory Chain 記錄、盲索引、owner 授權同步、備份/恢復計劃與有界保留策略。',
        evidence: '節點保留密文與完整性元資料，永遠不保留記憶明文。',
        evidenceLevel: '受控 Beta 路徑',
        evidenceSources: ['Rust 源碼', '協議測試'],
        nextGate: '完成 owner 授權同步、恢復、刪除、保留與配額一致性驗收。',
      },
      {
        status: 'beta',
        title: '可驗證協調帳本',
        summary: '簽名 record-commitment block、follower 同步、full-node mirror、外部 witness 證據、回滾保護與 authority handover proof。',
        evidence: '它只服務協調證據，不宣稱智能合約或全球共識。',
        evidenceLevel: '已實現並經節點測試',
        evidenceSources: ['Rust 源碼', '多節點測試'],
        nextGate: '在 producer 離線時完成第三方 mirror 恢復與 witness 驗證。',
      },
      {
        status: 'hardening',
        title: 'Custody witness 安全',
        summary: '獨立簽名 receipt、持久 vault audit、啟動/runtime gate、quorum 到期提醒、恢復生命週期與有界並行收集。',
        evidence: `最新里程碑 ${RUST_NODE_HEAD}：最多 16 個精確 pin，共用一個 timeout window。`,
        evidenceLevel: '已審核 Rust 里程碑',
        evidenceSources: ['Rust 源碼', '逆向情境測試'],
        nextGate: '部署到獨立節點並驗證到期、刷新、重啟與 strict gate 回滾。',
      },
    ],
    dependencyEyebrow: '依賴邊界',
    dependencyTitle: '今天由誰運行，以及未來如何演進。',
    dependencyBody: 'AeroNyx 把協議所有權與當前服務依賴分開。暫時性的基礎設施選擇會被明確展示，而不是藏在產品宣稱裡。',
    dependencyLabels: {
      component: '路徑',
      operator: '目前運營方',
      state: '當前角色',
      transition: '演進方向',
    },
    dependencies: [
      {
        component: '默認訊息 Relay',
        operator: 'AeroNyx Managed Infrastructure',
        state: '穩定的客戶端默認路徑',
        transition: '增加經審核的去中心化 Relay 選擇，不暗中改變用戶行為。',
      },
      {
        component: '會議媒體傳輸',
        operator: 'LiveKit Deployment',
        state: '目前推薦的 Beta 路徑',
        transition: 'AeroNyx 保留授權與產品控制，媒體接口可以被替換。',
      },
      {
        component: '隱私與協調節點',
        operator: '運行開放 Rust 協議的獨立節點運營者',
        state: '正式傳輸與分階段去中心化服務',
        transition: '透過更多樣的運營方、信譽與路徑證據擴大無許可參與。',
      },
      {
        component: '客戶端分發',
        operator: 'App Store 與 AeroNyx 簽名直發版本',
        state: '按平台簽名發布',
        transition: '保留可獨立驗證的安裝包與平台原生信任檢查。',
      },
    ],
    milestoneEyebrow: '近期證據',
    milestoneTitle: '最近真正完成了什麼。',
    milestones: [
      {
        date: '2026-08-19',
        title: 'Witness 收集延遲有界化',
        detail: 'Rust custody witness 在既有 16-pin 上限內並行請求，同時保持落盤後才計數，以及 adverse evidence fail-closed。',
      },
      {
        date: '2026-08',
        title: '會議成為真實產品模塊',
        detail: '客戶端已存在等候區、成員狀態、會議聊天、通話生命週期與螢幕/視窗分享實現。',
      },
      {
        date: '2026-07',
        title: `客戶端 ${CLIENT_BUILD} 發布`,
        detail: '目前 Android ARM64、macOS 與 Windows 安裝包已發布，並保留 iOS 正式分發路徑。',
      },
      {
        date: '2026-07',
        title: '協調帳本走出本地 block',
        detail: 'Rust 節點增加 mirror 同步、獨立簽名 witness、carrier recovery 與 policy-safe authority handover。',
      },
    ],
    boundaryEyebrow: '目前邊界',
    boundaryTitle: 'AeroNyx 不誇大什麼。',
    boundaryBody: '合作方應該評估今天存在的系統，而不是未來白皮書。以下限制是刻意且透明的。',
    boundaries: [
      {
        title: 'Managed relay 仍是默認路徑',
        detail: '客戶端默認保留穩定的 managed relay。去中心化路由將以清楚、可逆的用戶選擇呈現，而不是偷偷改變行為。',
      },
      {
        title: '目前推薦通話由 LiveKit 承載',
        detail: '會議授權與交互由 AeroNyx 控制，短期媒體層使用 LiveKit；接口保留未來替換成 Rust 媒體路徑的能力。',
      },
      {
        title: '帳本是專用協議，不是通用公鏈',
        detail: '它記錄簽名後的聚合協調證據，不公開用戶訊息、社交關係、瀏覽活動、智能合約或代幣執行。',
      },
      {
        title: '節點看不到 payload，但不是所有元資料都不存在',
        detail: '節點投遞流量仍需要有限的路由與時間元資料。AeroNyx 會最小化、隔離這些資料，但不宣稱已完全解決流量分析。',
      },
    ],
    roadmapEyebrow: '下一里程碑',
    roadmapTitle: '走向合作方級交付的最短路徑。',
    roadmapBody: '下一階段先證明端到端閉環與可重複運維，再增加新的可見功能。',
    roadmap: [
      {
        step: '01',
        title: '完成會議授權閉環',
        detail: '完成 grant、waiting room、角色與錯誤狀態在移動端/桌面端的驗證，同時保留可替換媒體層。',
      },
      {
        step: '02',
        title: '部署 custody witness 加固',
        detail: '把最新 Rust witness 生命週期部署到已審核節點，驗證真實到期/刷新，再逐步開啟全網 strict gate。',
      },
      {
        step: '03',
        title: '安全展示傳輸選擇',
        detail: '保持 managed relay 為默認，同時讓進階用戶能理解並可逆地選擇已審核去中心化 relay 路徑。',
      },
      {
        step: '04',
        title: '證明去中心化訊息連續性',
        detail: '進行跨區域故障測試，覆蓋發現、離線投遞、多跳、mirror recovery 與節點替換，不依賴單一協調主機。',
      },
    ],
    linksTitle: '審閱與核對入口',
    links: [
      ['協議官網', 'https://aeronyx.network/'],
      ['技術文檔', 'https://docs.aeronyx.network/'],
      ['節點運營 App', 'https://app.aeronyx.network/'],
      ['已審核 Rust commit', `https://github.com/AeroNyxNetwork/AeroNyx/commit/${RUST_NODE_HEAD}`],
      ['開源組織', 'https://github.com/AeroNyxNetwork'],
    ],
    footer: 'AeroNyx 合作方開發簡報',
    footerNote: `源碼核對日期 ${VERIFIED_DATE}。只有完成實現與驗證後，產品狀態才會更新。`,
  },
};

function StatusBadge({ status, labels }) {
  const tone = STATUS_TONE[status] || STATUS_TONE.progress;

  return (
    <span className={`inline-flex min-h-[28px] items-center gap-2 rounded-pill border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] ${tone.badge}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
      {labels[status] || status}
    </span>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand-light">{eyebrow}</p>
      <h2 className="mt-4 max-w-2xl font-display text-display-md font-medium text-white sm:text-display-lg">
        {title}
      </h2>
      {body ? <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg sm:leading-8">{body}</p> : null}
    </div>
  );
}

// [PARTNER-EXECUTIVE-SUMMARY 2026-08-21 by Codex] These are navigation-first
// decision cards, not duplicate status claims. Each card points to the section
// that contains the complete context, evidence, and current limitations.
function ExecutiveQuickLinks({ copy }) {
  return (
    <section className="partner-no-print mt-8 border-y border-white/12 py-6" aria-labelledby="partner-quick-links">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light/82">
            {copy.quickLinksEyebrow}
          </p>
          <h2 id="partner-quick-links" className="mt-3 text-xl font-medium leading-7 text-white sm:text-2xl">
            {copy.quickLinksTitle}
          </h2>
        </div>
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-white/28 sm:block">
          04 / {copy.jumpLabel}
        </p>
      </div>
      <div className="mt-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-0">
        <div className="flex w-max snap-x snap-mandatory border-l border-t border-white/10 lg:grid lg:w-auto lg:grid-cols-4">
          {copy.quickLinks.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex min-h-[176px] w-[82vw] max-w-[310px] shrink-0 snap-start flex-col border-b border-r border-white/10 bg-white/[0.012] p-5 transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light sm:w-[320px] sm:p-6 lg:w-auto lg:max-w-none"
              aria-label={`${item.label}: ${item.value}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] text-brand-light/68">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="text-sm text-white/26 transition-colors group-hover:text-brand-light">
                  →
                </span>
              </div>
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-eyebrow text-white/34">{item.label}</p>
              <p className="mt-2 text-lg font-medium leading-6 text-white sm:text-xl">{item.value}</p>
              <p className="mt-3 text-xs leading-5 text-white/44">{item.detail}</p>
              <span className="mt-auto pt-5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/38 transition-colors group-hover:text-white/72">
                {copy.quickLinksAction}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// [PARTNER-REVIEW-SYSTEM 2026-08-19 by Codex] Keep diligence controls and
// maturity definitions in this route so the public site stays unaware of it.
function DeliveryOverview({ clientItems, rustItems, boundaries, copy }) {
  const capabilities = [...clientItems, ...rustItems];
  const overview = [
    ['available', capabilities.filter((item) => item.status === 'available').length],
    ['beta', capabilities.filter((item) => item.status === 'beta').length],
    ['hardening', capabilities.filter((item) => item.status === 'hardening').length],
    ['boundaries', boundaries.length],
  ];

  return (
    <dl className="mt-10 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
      {overview.map(([key, value]) => (
        <div key={key} className="min-w-0 bg-surface-1 px-5 py-5 sm:px-6 sm:py-6">
          <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/36">
            {copy.statusOverview[key]}
          </dt>
          <dd className="mt-3 font-display text-3xl font-medium text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StatusDefinitions({ copy }) {
  return (
    <aside className="mt-8 border-y border-white/10 py-7 sm:py-8" aria-labelledby="partner-status-definitions">
      <div className="grid gap-7 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,2fr)] lg:gap-12">
        <div>
          <h3 id="partner-status-definitions" className="text-base font-medium text-white">
            {copy.statusDefinitionsTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/46">{copy.statusDefinitionsBody}</p>
        </div>
        <dl className="grid gap-5 sm:grid-cols-2">
          {Object.entries(copy.statusDefinitions).map(([status, description]) => (
            <div key={status} className="min-w-0">
              <dt><StatusBadge status={status} labels={copy.statusLabels} /></dt>
              <dd className="mt-3 text-xs leading-5 text-white/44">{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}

// [PARTNER-REVISION-DELTA 2026-08-19 by Codex] Keep review-system changes
// separate from product delivery claims so presentation work cannot be
// mistaken for a newly shipped client or Rust capability.
function RevisionDelta({ copy }) {
  return (
    <aside className="mt-8 border-y border-white/10 py-7 sm:py-8" aria-labelledby="partner-revision-delta">
      <div className="grid gap-7 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.6fr)] lg:gap-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light/78">
            {copy.revisionDeltaEyebrow}
          </p>
          <h3 id="partner-revision-delta" className="mt-3 text-lg font-medium leading-6 text-white">
            {copy.revisionDeltaTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/46">{copy.revisionDeltaBody}</p>
        </div>
        <ol className="border-t border-white/10 lg:border-t-0">
          {copy.revisionDeltaItems.map((item, index) => (
            <li key={item} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4 border-b border-white/10 py-4 last:border-b-0 lg:first:pt-0">
              <span className="font-mono text-[10px] text-brand-light/58">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-sm leading-6 text-white/58">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

// [PARTNER-RELEASE-EVIDENCE 2026-08-19 by Codex] This view renders the exact
// immutable contract used by DownloadsModal. It does not maintain a second
// version table, and App Store distribution is never presented with a digest.
function ArtifactVerification({ copy }) {
  const [hashCopyState, setHashCopyState] = useState({ platform: '', status: 'idle' });
  const artifacts = Object.entries(RELEASE_CHANNELS);

  useEffect(() => {
    if (hashCopyState.status === 'idle') return undefined;
    const timeout = window.setTimeout(
      () => setHashCopyState({ platform: '', status: 'idle' }),
      2500
    );
    return () => window.clearTimeout(timeout);
  }, [hashCopyState]);

  async function handleCopyHash(platform, sha256) {
    if (!sha256 || !navigator.clipboard?.writeText) {
      setHashCopyState({ platform, status: 'failed' });
      return;
    }

    try {
      await navigator.clipboard.writeText(sha256);
      setHashCopyState({ platform, status: 'copied' });
    } catch {
      setHashCopyState({ platform, status: 'failed' });
    }
  }

  return (
    <div className="mt-10 border-y border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-5">
        <p className="font-mono text-xs text-brand-light">{copy.artifactReleaseLabel}</p>
        <p className="text-[10px] uppercase tracking-eyebrow text-white/30">{CLIENT_BUILD}</p>
      </div>
      <div className="divide-y divide-white/10">
        {artifacts.map(([platform, artifact]) => {
          const copyState = hashCopyState.platform === platform ? hashCopyState.status : 'idle';
          const hasDigest = Boolean(artifact.sha256 && artifact.filename);

          return (
            <article
              key={platform}
              className="grid min-w-0 gap-5 py-7 md:grid-cols-[140px_minmax(0,1fr)] md:gap-8 xl:grid-cols-[140px_minmax(240px,0.8fr)_minmax(0,1.2fr)_auto] xl:items-center"
            >
              <div>
                <h3 className="text-lg font-medium text-white">{platform}</h3>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-eyebrow text-white/28">{copy.artifactAssuranceLabel}</p>
                <p className="mt-1 text-xs leading-5 text-white/42">{copy.artifactAssurance[platform]}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.artifactFileLabel}</p>
                <p className="mt-2 break-all font-mono text-xs leading-5 text-white/62">
                  {artifact.filename || copy.artifactAppStoreArtifact}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">
                  {hasDigest ? copy.artifactHashLabel : copy.artifactIntegrityPathLabel}
                </p>
                <p className={`mt-2 break-all font-mono text-[11px] leading-5 ${hasDigest ? 'text-white/50' : 'text-white/30'}`}>
                  {artifact.sha256 || copy.artifactAppStoreIntegrity}
                </p>
              </div>
              <div className="partner-no-print grid min-w-[176px] gap-2 sm:grid-cols-2 xl:grid-cols-1">
                <a
                  href={artifact.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-center text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  {hasDigest ? copy.artifactDownload : copy.artifactAppStore}
                </a>
                {hasDigest ? (
                  <button
                    type="button"
                    onClick={() => handleCopyHash(platform, artifact.sha256)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/52 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {copyState === 'copied'
                      ? copy.artifactHashCopied
                      : copyState === 'failed'
                        ? copy.artifactHashCopyFailed
                        : copy.artifactCopyHash}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// [PARTNER-REVIEW-DEPTH 2026-08-19 by Codex] Review depth is a presentation
// choice only. Hidden technical sections remain available to print and export.
function ReviewDepthControl({ copy, mode, onChange, query, onQueryChange }) {
  return (
    <div className="partner-no-print border-t border-white/10 pt-6">
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/72">{copy.reviewDepthTitle}</p>
          <p id="partner-review-depth-description" className="mt-2 max-w-2xl text-xs leading-5 text-white/40">
            {copy.reviewDepthBody}
          </p>
        </div>
        <div className="mt-4 shrink-0 sm:mt-0">
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10"
            role="group"
            aria-label={copy.reviewDepthTitle}
            aria-describedby="partner-review-depth-description"
          >
            {Object.entries(copy.reviewDepthLabels).map(([key, label]) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange(key)}
                  className={`min-h-[44px] min-w-[118px] bg-surface-1 px-4 text-xs font-semibold transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light ${
                    active ? 'bg-brand-faint text-brand-light' : 'text-white/46 hover:bg-surface-2 hover:text-white/72'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 max-w-[280px] text-left text-[10px] leading-4 text-white/32 sm:text-right">
            {copy.reviewDepthDescriptions[mode]}
          </p>
        </div>
      </div>
      {mode === 'technical' ? (
        <label className="mt-5 block max-w-xl" htmlFor="partner-capability-search">
          <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/34">{copy.capabilitySearchLabel}</span>
          <input
            id="partner-capability-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={copy.capabilitySearchPlaceholder}
            autoComplete="off"
            className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-4 text-sm text-white outline-none placeholder:text-white/26 focus:border-brand-line focus:ring-2 focus:ring-brand/20"
          />
        </label>
      ) : null}
    </div>
  );
}

function DecisionSummary({ copy }) {
  return (
    <div className="mt-10 grid border-y border-white/10 lg:grid-cols-3">
      {copy.decisionLanes.map((lane, index) => (
        <article
          key={lane.label}
          className="min-w-0 border-t border-white/10 py-7 first:border-t-0 lg:border-l lg:border-t-0 lg:px-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusBadge status={lane.status} labels={copy.statusLabels} />
            <span className="font-mono text-[10px] text-white/24">0{index + 1}</span>
          </div>
          <h3 className="mt-5 text-xl font-medium text-white">{lane.label}</h3>
          <p className="mt-3 text-sm leading-6 text-white/46">{lane.detail}</p>
          <ul className="mt-6 border-t border-white/10 pt-3">
            {lane.items.map((item) => (
              <li key={item} className="flex min-w-0 gap-3 border-b border-white/8 py-3 text-sm leading-5 text-white/62 last:border-b-0">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-light" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function PilotReviewPath({ copy }) {
  return (
    <ol className="mt-10 border-y border-white/10">
      {copy.pilotSteps.map((item) => (
        <li
          key={item.step}
          className="grid min-w-0 gap-4 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[52px_minmax(220px,0.8fr)_minmax(0,1.2fr)_minmax(220px,0.8fr)] lg:gap-8"
        >
          <span className="font-mono text-[10px] text-brand-light/70 sm:pt-1">{item.step}</span>
          <h3 className="text-lg font-medium leading-6 text-white">{item.title}</h3>
          <p className="text-sm leading-6 text-white/52">{item.detail}</p>
          <div className="border-l border-brand-line pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.pilotOutputLabel}</p>
            <p className="mt-2 text-xs leading-5 text-white/52">{item.output}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// [PARTNER-LOCAL-WORKSPACE 2026-08-19 by Codex] This workspace is deliberately
// browser-local. It has no API call, analytics hook, route-key storage, or sync.
function ReviewerWorkspace({
  copy,
  checks,
  notes,
  findings,
  decision,
  organization,
  nextReviewDate,
  onToggle,
  onNotesChange,
  onAddFinding,
  onUpdateFinding,
  onRemoveFinding,
  onOpenEvidence,
  onDecisionChange,
  onOrganizationChange,
  onNextReviewDateChange,
  onExport,
  exportStatus,
  onExportMemo,
  memoExportStatus,
  onImport,
  importStatus,
  onClear,
  clearArmed,
}) {
  const [findingTitle, setFindingTitle] = useState('');
  const [findingSeverity, setFindingSeverity] = useState('medium');
  const [findingOwner, setFindingOwner] = useState('');
  const [findingDueDate, setFindingDueDate] = useState('');
  const completed = copy.reviewChecklist.filter((item) => checks[item.id]).length;
  const total = copy.reviewChecklist.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingChecks = total - completed;
  const openFindings = findings.filter((finding) => finding.status === 'open');
  const openBlockers = openFindings.filter((finding) => finding.severity === 'blocker');
  const readyForHandoff = pendingChecks === 0 && decision !== 'undecided' && openBlockers.length === 0;
  const readinessReasons = [
    pendingChecks > 0 ? `${pendingChecks} ${copy.workspacePendingChecksLabel}` : '',
    decision === 'undecided' ? copy.workspaceDecisionPending : '',
    openBlockers.length > 0 ? copy.workspaceOpenBlockersPending : '',
  ].filter(Boolean).join(' ');
  const findingLimitReached = findings.length >= REVIEW_FINDINGS_MAX;

  function handleFindingSubmit(event) {
    event.preventDefault();
    const title = findingTitle.trim();
    if (!title || findingLimitReached) return;

    onAddFinding({
      title: title.slice(0, REVIEW_FINDING_TITLE_MAX_LENGTH),
      severity: findingSeverity,
      owner: findingOwner.trim().slice(0, REVIEW_FINDING_OWNER_MAX_LENGTH),
      due_date: findingDueDate,
    });
    setFindingTitle('');
    setFindingSeverity('medium');
    setFindingOwner('');
    setFindingDueDate('');
  }

  return (
    <div className="mt-10 border-y border-white/10">
      <div className="grid gap-6 border-b border-white/10 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-sm font-medium text-white/72">{copy.workspaceProgressLabel}</p>
            <p className="font-mono text-xs text-brand-light" aria-live="polite">
              {completed} / {total} · {progress}% {copy.workspaceCompleteLabel}
            </p>
          </div>
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
            aria-label={copy.workspaceProgressLabel}
          >
            <div className="h-full rounded-full bg-brand-light transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-[10px] leading-4 text-white/30">{copy.workspaceLocalOnly}</p>
        </div>
        <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0" aria-live="polite">
          <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.workspaceReadinessLabel}</p>
          <p className={`mt-2 text-sm font-medium ${readyForHandoff ? 'text-brand-light' : 'text-warn'}`}>
            {readyForHandoff ? copy.workspaceReady : copy.workspaceNeedsAttention}
          </p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-white/40">
            {readyForHandoff ? copy.workspaceReadyBody : readinessReasons}
          </p>
        </div>
      </div>

      <div className="border-b border-white/10 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-sm font-medium text-white/76">{copy.workspaceFindingsLabel}</h3>
            <p className="mt-2 text-xs leading-5 text-white/40">{copy.workspaceFindingsBody}</p>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] text-white/40" aria-live="polite">
            <span className="rounded border border-white/10 px-2 py-1">{findings.length} {copy.workspaceFindingCountLabel}</span>
            <span className="rounded border border-white/10 px-2 py-1">{openFindings.length} {copy.workspaceFindingOpenLabel}</span>
            <span className={`rounded border px-2 py-1 ${openBlockers.length > 0 ? FINDING_SEVERITY_TONE.blocker : 'border-white/10 text-white/40'}`}>
              {openBlockers.length} {copy.workspaceFindingBlockerLabel}
            </span>
          </div>
        </div>

        <form onSubmit={handleFindingSubmit} className="partner-no-print mt-6 grid gap-4 lg:grid-cols-[minmax(220px,1.5fr)_minmax(120px,0.55fr)_minmax(160px,0.7fr)_minmax(148px,0.65fr)_auto] lg:items-end">
          <label className="min-w-0" htmlFor="partner-finding-title">
            <span className="text-xs font-medium text-white/52">{copy.workspaceFindingTitleLabel}</span>
            <input
              id="partner-finding-title"
              type="text"
              value={findingTitle}
              maxLength={REVIEW_FINDING_TITLE_MAX_LENGTH}
              onChange={(event) => setFindingTitle(event.target.value)}
              placeholder={copy.workspaceFindingTitlePlaceholder}
              className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-brand-line focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="min-w-0" htmlFor="partner-finding-severity">
            <span className="text-xs font-medium text-white/52">{copy.workspaceFindingSeverityLabel}</span>
            <select
              id="partner-finding-severity"
              value={findingSeverity}
              onChange={(event) => setFindingSeverity(event.target.value)}
              className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none focus:border-brand-line focus:ring-2 focus:ring-brand/20"
            >
              {REVIEW_FINDING_SEVERITIES.map((severity) => (
                <option key={severity} value={severity}>{copy.workspaceFindingSeverities[severity]}</option>
              ))}
            </select>
          </label>
          <label className="min-w-0" htmlFor="partner-finding-owner">
            <span className="text-xs font-medium text-white/52">{copy.workspaceFindingOwnerLabel}</span>
            <input
              id="partner-finding-owner"
              type="text"
              value={findingOwner}
              maxLength={REVIEW_FINDING_OWNER_MAX_LENGTH}
              onChange={(event) => setFindingOwner(event.target.value)}
              placeholder={copy.workspaceFindingOwnerPlaceholder}
              autoComplete="off"
              className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-brand-line focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="min-w-0" htmlFor="partner-finding-due-date">
            <span className="text-xs font-medium text-white/52">{copy.workspaceFindingDueLabel}</span>
            <input
              id="partner-finding-due-date"
              type="date"
              value={findingDueDate}
              onChange={(event) => setFindingDueDate(event.target.value)}
              className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none [color-scheme:dark] focus:border-brand-line focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <button
            type="submit"
            disabled={!findingTitle.trim() || findingLimitReached}
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light disabled:cursor-not-allowed disabled:border-white/8 disabled:bg-transparent disabled:text-white/24"
          >
            {copy.workspaceFindingAdd}
          </button>
        </form>
        <p className="partner-no-print mt-2 text-[10px] leading-4 text-white/30">{copy.workspaceFindingLimit}</p>

        <div className="mt-6 border-t border-white/10">
          {findings.length === 0 ? (
            <p className="py-6 text-sm text-white/34">{copy.workspaceFindingEmpty}</p>
          ) : findings.map((finding) => (
            <article key={finding.id} className={`border-b border-white/10 py-5 ${finding.status === 'resolved' ? 'opacity-55' : ''}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded border px-2 py-1 text-[10px] font-semibold uppercase ${FINDING_SEVERITY_TONE[finding.severity]}`}>
                      {copy.workspaceFindingSeverities[finding.severity]}
                    </span>
                    <span className={`rounded border px-2 py-1 text-[10px] font-semibold ${finding.status === 'resolved' ? 'border-brand-line bg-brand-faint text-brand-light' : 'border-white/12 text-white/48'}`}>
                      {finding.status === 'resolved' ? copy.workspaceFindingResolved : copy.workspaceFindingOpen}
                    </span>
                  </div>
                  <h4 className={`mt-3 break-words text-sm font-medium leading-6 text-white/78 ${finding.status === 'resolved' ? 'line-through' : ''}`}>
                    {finding.title}
                  </h4>
                  <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[10px] leading-4 text-white/34">
                    {finding.evidence_reference ? (
                      <div>
                        <dt className="inline font-semibold">{copy.workspaceFindingReferenceLabel}: </dt>
                        <dd className="inline">
                          <span className="font-mono text-brand-light/72">{finding.evidence_reference}</span>
                          <button
                            type="button"
                            onClick={() => onOpenEvidence(finding.evidence_reference)}
                            className="partner-no-print ml-2 rounded text-white/42 underline decoration-white/20 underline-offset-2 transition-colors hover:text-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                          >
                            {copy.workspaceFindingOpenEvidence}
                          </button>
                        </dd>
                      </div>
                    ) : null}
                    {finding.owner ? <div><dt className="inline font-semibold">{copy.workspaceFindingOwnerLabel}: </dt><dd className="inline">{finding.owner}</dd></div> : null}
                    {finding.due_date ? <div><dt className="inline font-semibold">{copy.workspaceFindingDueLabel}: </dt><dd className="inline"><time dateTime={finding.due_date}>{finding.due_date}</time></dd></div> : null}
                  </dl>
                </div>
                <div className="partner-no-print flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateFinding(finding.id, { status: finding.status === 'resolved' ? 'open' : 'resolved' })}
                    className="inline-flex min-h-[40px] items-center rounded border border-white/12 px-3 text-[10px] font-semibold text-white/56 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {finding.status === 'resolved' ? copy.workspaceFindingReopen : copy.workspaceFindingResolve}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFinding(finding.id)}
                    className="inline-flex min-h-[40px] items-center rounded border border-white/8 px-3 text-[10px] font-semibold text-white/34 transition-colors hover:border-warn/30 hover:text-warn focus:outline-none focus-visible:ring-2 focus-visible:ring-warn"
                  >
                    {copy.workspaceFindingRemove}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:gap-14">
        <fieldset className="min-w-0">
          <legend className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/34">
            {copy.workspaceChecklistLabel}
          </legend>
          <div className="mt-4 border-t border-white/10">
            {copy.reviewChecklist.map((item) => (
              <label key={item.id} className="flex cursor-pointer gap-4 border-b border-white/10 py-5">
                <input
                  type="checkbox"
                  checked={Boolean(checks[item.id])}
                  onChange={() => onToggle(item.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#8b7cff]"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-white/76">{item.title}</span>
                  <span className="mt-2 block text-xs leading-5 text-white/40">{item.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="min-w-0">
          <fieldset className="partner-no-print">
            <legend className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/34">
              {copy.workspaceDecisionMemoLabel}
            </legend>
            <label className="mt-4 block" htmlFor="partner-review-decision">
              <span className="text-xs font-medium text-white/52">{copy.workspaceDecisionLabel}</span>
              <select
                id="partner-review-decision"
                value={decision}
                onChange={(event) => onDecisionChange(event.target.value)}
                className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none focus:border-brand-line focus:ring-2 focus:ring-brand/20"
              >
                {REVIEW_DECISIONS.map((value) => (
                  <option key={value} value={value}>{copy.workspaceDecisionOptions[value]}</option>
                ))}
              </select>
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block" htmlFor="partner-review-organization">
                <span className="text-xs font-medium text-white/52">{copy.workspaceOrganizationLabel}</span>
                <input
                  id="partner-review-organization"
                  type="text"
                  value={organization}
                  maxLength={REVIEW_ORGANIZATION_MAX_LENGTH}
                  onChange={(event) => onOrganizationChange(event.target.value)}
                  placeholder={copy.workspaceOrganizationPlaceholder}
                  autoComplete="off"
                  className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-brand-line focus:ring-2 focus:ring-brand/20"
                />
              </label>
              <label className="block" htmlFor="partner-review-next-date">
                <span className="text-xs font-medium text-white/52">{copy.workspaceNextReviewLabel}</span>
                <input
                  id="partner-review-next-date"
                  type="date"
                  value={nextReviewDate}
                  onChange={(event) => onNextReviewDateChange(event.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded border border-white/12 bg-surface-1 px-3 text-sm text-white outline-none [color-scheme:dark] focus:border-brand-line focus:ring-2 focus:ring-brand/20"
                />
              </label>
            </div>
            <label className="mt-5 block" htmlFor="partner-reviewer-notes">
              <span className="text-xs font-medium text-white/52">{copy.workspaceNotesLabel}</span>
              <textarea
                id="partner-reviewer-notes"
                value={notes}
                maxLength={REVIEW_NOTES_MAX_LENGTH}
                onChange={(event) => onNotesChange(event.target.value)}
                placeholder={copy.workspaceNotesPlaceholder}
                rows={7}
                className="mt-2 w-full resize-y rounded border border-white/12 bg-surface-1 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/24 focus:border-brand-line focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <div className="mt-2 flex items-center justify-between gap-4 text-[10px] leading-4 text-white/30">
              <span>{copy.workspaceNotesHelp}</span>
              <span className="shrink-0 font-mono">{notes.length} / {REVIEW_NOTES_MAX_LENGTH}</span>
            </div>
          </fieldset>

          <dl className="mt-4 hidden gap-4 text-sm print:grid">
            <div>
              <dt className="font-semibold text-black">{copy.workspaceDecisionLabel}</dt>
              <dd>{copy.workspaceDecisionOptions[decision]}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">{copy.workspaceOrganizationLabel}</dt>
              <dd>{organization || '—'}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">{copy.workspaceNextReviewLabel}</dt>
              <dd>{nextReviewDate || '—'}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">{copy.workspaceNotesLabel}</dt>
              <dd className="whitespace-pre-wrap">{notes || '—'}</dd>
            </div>
          </dl>

          <div className="partner-no-print mt-6 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onExport}
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              {exportStatus === 'exported'
                ? copy.workspaceExported
                : exportStatus === 'failed'
                  ? copy.workspaceExportFailed
                  : copy.workspaceExport}
            </button>
            <button
              type="button"
              onClick={onExportMemo}
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              {memoExportStatus === 'exported'
                ? copy.workspaceMemoExported
                : memoExportStatus === 'failed'
                  ? copy.workspaceMemoExportFailed
                  : copy.workspaceMemoExport}
            </button>
            <label className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded border border-white/12 px-4 text-center text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus-within:ring-2 focus-within:ring-brand-light">
              <span>{copy.workspaceImport}</span>
              <input type="file" accept="application/json,.json" onChange={onImport} className="sr-only" />
            </label>
            <button
              type="button"
              onClick={onClear}
              className={`inline-flex min-h-[44px] items-center justify-center rounded border px-4 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                clearArmed
                  ? 'border-warn/35 bg-warn/5 text-warn'
                  : 'border-white/12 text-white/48 hover:border-white/24 hover:text-white/72'
              }`}
            >
              {clearArmed ? copy.workspaceConfirmClear : copy.workspaceClear}
            </button>
          </div>
          <p className="partner-no-print mt-3 text-[10px] leading-4 text-white/30">{copy.workspaceHandoffHelp}</p>
          {importStatus !== 'idle' ? (
            <p className={`partner-no-print mt-2 text-xs ${importStatus === 'imported' ? 'text-brand-light' : 'text-warn'}`} role="status">
              {importStatus === 'imported' ? copy.workspaceImported : copy.workspaceImportFailed}
            </p>
          ) : null}
          <p className="sr-only" aria-live="polite">
            {exportStatus === 'exported' ? copy.workspaceExported : exportStatus === 'failed' ? copy.workspaceExportFailed : ''}
            {' '}
            {memoExportStatus === 'exported' ? copy.workspaceMemoExported : memoExportStatus === 'failed' ? copy.workspaceMemoExportFailed : ''}
            {' '}
            {importStatus === 'imported' ? copy.workspaceImported : importStatus === 'failed' ? copy.workspaceImportFailed : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

function DependencyMatrix({ copy }) {
  const labels = copy.dependencyLabels;

  return (
    <div className="mt-10 border-y border-white/10" role="table" aria-label={copy.dependencyTitle}>
      <div className="hidden grid-cols-[0.8fr_1fr_0.9fr_1.35fr] gap-8 border-b border-white/10 py-4 lg:grid" role="row">
        {[labels.component, labels.operator, labels.state, labels.transition].map((label) => (
          <span key={label} className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30" role="columnheader">
            {label}
          </span>
        ))}
      </div>
      <div role="rowgroup">
        {copy.dependencies.map((item) => (
          <div
            key={item.component}
            className="grid min-w-0 gap-5 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[0.8fr_1fr_0.9fr_1.35fr] lg:gap-8"
            role="row"
          >
            {[
              [labels.component, item.component],
              [labels.operator, item.operator],
              [labels.state, item.state],
              [labels.transition, item.transition],
            ].map(([label, value], index) => (
              <div key={label} className="min-w-0" role="cell">
                <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/28 lg:hidden">{label}</span>
                <p className={`mt-2 text-sm leading-6 lg:mt-0 ${index === 0 ? 'font-medium text-white/78' : 'text-white/50'}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// [PARTNER-REVIEW-EXPORT 2026-08-19 by Codex] This export intentionally omits
// the current URL and all access, node, customer, endpoint, and payload data.
function capabilityReference(group, index) {
  return `${group === 'client' ? 'APP' : 'NODE'}-${String(index + 1).padStart(2, '0')}`;
}

function isKnownEvidenceReference(reference) {
  if (!REVIEW_FINDING_REFERENCE_PATTERN.test(reference)) return false;
  const [prefix, itemNumber] = reference.split('-');
  const itemIndex = Number(itemNumber);
  const itemCount = prefix === 'APP' ? CONTENT.en.clientItems.length : CONTENT.en.rustItems.length;
  return itemIndex >= 1 && itemIndex <= itemCount;
}

function evidenceIdForReference(reference) {
  if (!isKnownEvidenceReference(reference)) return null;
  const [prefix, itemNumber] = reference.split('-');
  return `partner-evidence-${prefix === 'APP' ? 'client' : 'node'}-${itemNumber}`;
}

function findingTitleForEvidence(copy, reference, title) {
  return copy.workspaceFindingFromEvidence
    .replace('{reference}', reference)
    .replace('{title}', title);
}

function releaseArtifactsForReview(copy) {
  return Object.entries(RELEASE_CHANNELS).map(([platform, artifact]) => ({
    platform,
    version: RELEASE_VERSION,
    build: RELEASE_BUILD,
    filename: artifact.filename || null,
    download_url: artifact.downloadUrl,
    sha256: artifact.sha256 || null,
    assurance: copy.artifactAssurance[platform],
  }));
}

function withEvidenceReferences(items, group) {
  return items.map((item, index) => ({
    reference: capabilityReference(group, index),
    ...item,
  }));
}

function buildReviewSnapshot(copy, language) {
  return {
    schema: 'aeronyx.partner.review.v3',
    generated_at: new Date().toISOString(),
    verified_date: VERIFIED_DATE,
    review_revision: REVIEW_REVISION,
    language,
    client_build: CLIENT_BUILD,
    rust_node_head: RUST_NODE_HEAD,
    status_definitions: copy.statusDefinitions,
    revision_delta: {
      title: copy.revisionDeltaTitle,
      detail: copy.revisionDeltaBody,
      changes: copy.revisionDeltaItems,
    },
    decision_summary: copy.decisionLanes,
    partner_pilot_path: copy.pilotSteps,
    release_artifacts: releaseArtifactsForReview(copy),
    client_capabilities: withEvidenceReferences(copy.clientItems, 'client'),
    rust_capabilities: withEvidenceReferences(copy.rustItems, 'node'),
    dependency_boundary: copy.dependencies,
    current_boundaries: copy.boundaries,
    recent_milestones: copy.milestones,
    next_milestones: copy.roadmap,
    public_review_links: copy.links.map(([label, href]) => ({ label, href })),
    privacy_boundary: 'Public-safe delivery information only. No access URL, route key, customer traffic, node identity, private endpoint, encryption key, or payload data.',
  };
}

function sanitizeReviewField(value, maxLength) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .slice(0, maxLength)
    .trim();
}

// [PARTNER-FINDINGS-REGISTER 2026-08-19 by Codex] Findings never leave the
// browser unless the reviewer exports them. IDs are local correlation handles,
// not security tokens, customer identifiers, or server-side object keys.
function createReviewFinding(input) {
  const randomPart = globalThis.crypto?.randomUUID?.()
    || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const dueDate = typeof input?.due_date === 'string' && isValidReviewDate(input.due_date)
    ? input.due_date
    : '';
  const candidateReference = sanitizeReviewField(
    input?.evidence_reference,
    REVIEW_FINDING_REFERENCE_MAX_LENGTH
  );

  return {
    id: `finding-${randomPart}`.slice(0, 80),
    title: sanitizeReviewField(input?.title, REVIEW_FINDING_TITLE_MAX_LENGTH),
    severity: REVIEW_FINDING_SEVERITIES.includes(input?.severity) ? input.severity : 'medium',
    status: 'open',
    owner: sanitizeReviewField(input?.owner, REVIEW_FINDING_OWNER_MAX_LENGTH),
    due_date: dueDate,
    evidence_reference: isKnownEvidenceReference(candidateReference)
      ? candidateReference
      : '',
    created_at: new Date().toISOString(),
  };
}

// [PARTNER-FINDINGS-IMPORT 2026-08-19 by Codex] Imported findings are treated
// as untrusted JSON. Every field is allowlisted and bounded before React state,
// local storage, JSON handoff, or Markdown rendering can observe it.
function normalizeReviewFindings(value) {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > REVIEW_FINDINGS_MAX) {
    throw new Error('invalid findings');
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error('invalid finding');
    }
    const id = sanitizeReviewField(item.id, 80);
    const title = sanitizeReviewField(item.title, REVIEW_FINDING_TITLE_MAX_LENGTH);
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(id) || !title) {
      throw new Error('invalid finding identity');
    }
    if (!REVIEW_FINDING_SEVERITIES.includes(item.severity) || !REVIEW_FINDING_STATUSES.includes(item.status)) {
      throw new Error('invalid finding state');
    }
    const dueDate = item.due_date == null || item.due_date === ''
      ? ''
      : item.due_date;
    if (dueDate && (typeof dueDate !== 'string' || !isValidReviewDate(dueDate))) {
      throw new Error('invalid finding due date');
    }
    const evidenceReference = item.evidence_reference == null
      ? ''
      : sanitizeReviewField(item.evidence_reference, REVIEW_FINDING_REFERENCE_MAX_LENGTH);
    if (evidenceReference && !isKnownEvidenceReference(evidenceReference)) {
      throw new Error('invalid finding evidence reference');
    }
    const createdAt = typeof item.created_at === 'string' && !Number.isNaN(Date.parse(item.created_at))
      ? new Date(item.created_at).toISOString()
      : null;

    return {
      id,
      title,
      severity: item.severity,
      status: item.status,
      owner: sanitizeReviewField(item.owner, REVIEW_FINDING_OWNER_MAX_LENGTH),
      due_date: dueDate,
      evidence_reference: evidenceReference,
      created_at: createdAt,
    };
  });
}

function buildReviewHandoff(copy, language, checks, notes, findings, decision, organization, nextReviewDate) {
  const checklist = copy.reviewChecklist.map((item) => ({
    id: item.id,
    title: item.title,
    checked: Boolean(checks[item.id]),
  }));
  const completed = checklist.filter((item) => item.checked).length;
  const openFindings = findings.filter((finding) => finding.status === 'open');
  const openBlockers = openFindings.filter((finding) => finding.severity === 'blocker');

  return {
    schema: REVIEW_HANDOFF_SCHEMA,
    generated_at: new Date().toISOString(),
    verified_date: VERIFIED_DATE,
    review_revision: REVIEW_REVISION,
    language,
    client_build: CLIENT_BUILD,
    rust_node_head: RUST_NODE_HEAD,
    review_progress: {
      completed,
      total: checklist.length,
      findings_total: findings.length,
      findings_open: openFindings.length,
      blockers_open: openBlockers.length,
      ready_for_handoff: completed === checklist.length
        && decision !== 'undecided'
        && openBlockers.length === 0,
    },
    checklist,
    findings,
    review_outcome: {
      recommendation: decision,
      recommendation_label: copy.workspaceDecisionOptions[decision],
      reviewer_organization: organization,
      next_review_date: nextReviewDate || null,
    },
    reviewer_notes: notes,
    privacy_boundary: 'Reviewer-authored local handoff. No access URL, route key, customer traffic, node identity, private endpoint, encryption key, or payload data.',
  };
}

// [PARTNER-HANDOFF-IMPORT 2026-08-19 by Codex] Handoff files are untrusted
// browser input. Support handoff schemas v1-v3 for continuity, but normalize
// every accepted field through fixed allowlists and bounded string lengths.
function normalizeReviewHandoff(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('invalid handoff');
  }
  if (![REVIEW_HANDOFF_SCHEMA, 'aeronyx.partner.review.handoff.v3', 'aeronyx.partner.review.handoff.v2', 'aeronyx.partner.review.handoff.v1'].includes(payload.schema)) {
    throw new Error('unsupported handoff');
  }
  if (!Array.isArray(payload.checklist) || payload.checklist.length > 20) {
    throw new Error('invalid checklist');
  }

  const checks = { ...EMPTY_REVIEW_CHECKS };
  payload.checklist.forEach((item) => {
    if (item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(checks, item.id)) {
      checks[item.id] = item.checked === true;
    }
  });

  const outcome = payload.review_outcome && typeof payload.review_outcome === 'object'
    ? payload.review_outcome
    : {};
  const decision = REVIEW_DECISIONS.includes(outcome.recommendation)
    ? outcome.recommendation
    : 'undecided';
  const organization = typeof outcome.reviewer_organization === 'string'
    ? outcome.reviewer_organization.slice(0, REVIEW_ORGANIZATION_MAX_LENGTH)
    : '';
  const nextReviewDate = typeof outcome.next_review_date === 'string'
    && isValidReviewDate(outcome.next_review_date)
    ? outcome.next_review_date
    : '';
  const notes = typeof payload.reviewer_notes === 'string'
    ? payload.reviewer_notes.slice(0, REVIEW_NOTES_MAX_LENGTH)
    : '';
  const findings = normalizeReviewFindings(payload.findings);

  return { checks, decision, organization, nextReviewDate, notes, findings };
}

function isValidReviewDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year
    && parsed.getUTCMonth() === month - 1
    && parsed.getUTCDate() === day;
}

function escapeMarkdownText(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/([\\`*_{}\[\]()#+.!|>~-])/g, '\\$1');
}

// [PARTNER-DECISION-MEMO 2026-08-19 by Codex] The human-readable memo is a
// portable review artifact, not a secret-bearing deep link. Reviewer-authored
// fields are escaped before entering Markdown so imported text stays inert.
function buildReviewMemo(copy, checks, notes, findings, decision, organization, nextReviewDate) {
  const labels = copy.memoLabels;
  const checklist = copy.reviewChecklist.map((item) => ({
    ...item,
    checked: Boolean(checks[item.id]),
  }));
  const completed = checklist.filter((item) => item.checked).length;
  const openBlockers = findings.filter((finding) => finding.status === 'open' && finding.severity === 'blocker');
  const ready = completed === checklist.length && decision !== 'undecided' && openBlockers.length === 0;
  const capabilities = [
    [labels.client, withEvidenceReferences(copy.clientItems, 'client')],
    [labels.node, withEvidenceReferences(copy.rustItems, 'node')],
  ];
  const releaseArtifacts = releaseArtifactsForReview(copy);
  const clean = (value) => escapeMarkdownText(value).trim() || '—';
  const lines = [
    `# ${labels.title}`,
    '',
    `- **${labels.generated}:** ${new Date().toISOString()}`,
    `- **${labels.baseline}:** ${VERIFIED_DATE} · Client ${CLIENT_BUILD} · Rust ${RUST_NODE_HEAD} · Brief v${REVIEW_REVISION}`,
    '',
    `## ${labels.decision}`,
    '',
    `- **${labels.recommendation}:** ${clean(copy.workspaceDecisionOptions[decision])}`,
    `- **${labels.reviewer}:** ${clean(organization)}`,
    `- **${labels.nextReview}:** ${clean(nextReviewDate)}`,
    '',
    `## ${labels.readiness}`,
    '',
    `- **${labels.readiness}:** ${ready ? clean(copy.workspaceReady) : clean(copy.workspaceNeedsAttention)}`,
    `- **${labels.progress}:** ${completed} / ${checklist.length}`,
    '',
    `## ${labels.checklist}`,
    '',
    ...checklist.map((item) => `- [${item.checked ? 'x' : ' '}] ${clean(item.title)}`),
    '',
    `## ${labels.findings}`,
    '',
    ...(findings.length > 0
      ? findings.map((finding) => [
        `- **${clean(copy.workspaceFindingSeverities[finding.severity])} · ${clean(finding.title)}**`,
        `  - **${labels.findingStatus}:** ${clean(finding.status === 'resolved' ? copy.workspaceFindingResolved : copy.workspaceFindingOpen)}`,
        `  - **${labels.findingReference}:** ${clean(finding.evidence_reference)}`,
        `  - **${labels.findingOwner}:** ${clean(finding.owner)}`,
        `  - **${labels.findingDue}:** ${clean(finding.due_date)}`,
      ].join('\n'))
      : [`- ${clean(copy.workspaceFindingEmpty)}`]),
    '',
    `## ${labels.notes}`,
    '',
    clean(notes),
    '',
    `## ${labels.boundaries}`,
    '',
    ...copy.boundaries.map((item) => `- **${clean(item.title)}:** ${clean(item.detail)}`),
    '',
    `## ${labels.artifacts}`,
    '',
    ...releaseArtifacts.map((artifact) => [
      `- **${clean(artifact.platform)} · ${clean(artifact.filename || copy.artifactAppStoreArtifact)}**`,
      `  - **${labels.assurance}:** ${clean(artifact.assurance)}`,
      `  - **${artifact.sha256 ? labels.sha256 : labels.integrityPath}:** ${clean(artifact.sha256 || copy.artifactAppStoreIntegrity)}`,
      `  - [${clean(artifact.filename ? copy.artifactDownload : copy.artifactAppStore)}](${artifact.download_url})`,
    ].join('\n')),
    '',
    `## ${labels.capabilities}`,
    '',
  ];

  capabilities.forEach(([sectionLabel, items]) => {
    lines.push(`### ${sectionLabel}`, '');
    items.forEach((item) => {
      lines.push(
        `- **${item.reference} · ${clean(item.title)}** · ${clean(copy.statusLabels[item.status])}`,
        `  - **${labels.evidence}:** ${clean(item.evidence)}`,
        `  - **${labels.sources}:** ${item.evidenceSources.map(clean).join(' · ')}`,
        `  - **${labels.nextGate}:** ${clean(item.nextGate)}`
      );
    });
    lines.push('');
  });

  lines.push(
    `## ${labels.links}`,
    '',
    ...copy.links.map(([label, href]) => `- [${clean(label)}](${href})`),
    '',
    `## ${labels.privacy}`,
    '',
    '> Public-safe review information only. No access URL, route key, customer traffic, node identity, private endpoint, encryption key, or payload data.',
    ''
  );

  return `${lines.join('\n')}\n`;
}

function downloadTextFile(contents, filename, type) {
  const blob = new Blob([contents], { type });
  const objectUrl = URL.createObjectURL(blob);
  const download = document.createElement('a');
  download.href = objectUrl;
  download.download = filename;
  download.style.display = 'none';
  document.body.appendChild(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function downloadJsonFile(payload, filename) {
  downloadTextFile(`${JSON.stringify(payload, null, 2)}\n`, filename, 'application/json');
}

function CapabilityReviewList({
  items,
  copy,
  query,
  group,
  flaggedReferences,
  onFlagForReview,
}) {
  const [filter, setFilter] = useState('all');
  const [referenceCopyState, setReferenceCopyState] = useState({ reference: '', status: 'idle' });
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredItems = items.filter((item, itemIndex) => {
    const matchesStatus = filter === 'available'
      ? item.status === 'available'
      : filter === 'active'
        ? item.status !== 'available'
        : true;
    if (!matchesStatus || !normalizedQuery) return matchesStatus;

    const searchable = [
      capabilityReference(group, itemIndex),
      item.title,
      item.summary,
      item.evidence,
      item.evidenceLevel,
      item.nextGate,
      ...item.evidenceSources,
    ].join(' ').toLocaleLowerCase();
    return searchable.includes(normalizedQuery);
  });

  useEffect(() => {
    if (referenceCopyState.status === 'idle') return undefined;
    const timeout = window.setTimeout(
      () => setReferenceCopyState({ reference: '', status: 'idle' }),
      2500
    );
    return () => window.clearTimeout(timeout);
  }, [referenceCopyState]);

  async function handleCopyEvidenceReference(reference, title) {
    if (!navigator.clipboard?.writeText) {
      setReferenceCopyState({ reference, status: 'failed' });
      return;
    }

    try {
      await navigator.clipboard.writeText(`AeroNyx Partner Brief v${REVIEW_REVISION} · ${reference} · ${title}`);
      setReferenceCopyState({ reference, status: 'copied' });
    } catch {
      setReferenceCopyState({ reference, status: 'failed' });
    }
  }

  return (
    <div className="mt-10">
      <div className="partner-no-print flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="inline-grid w-full grid-cols-3 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:w-auto"
          role="group"
          aria-label={copy.filterLabel}
        >
          {Object.entries(copy.filters).map(([key, label]) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={`min-h-[44px] min-w-0 bg-surface-1 px-4 text-xs font-semibold transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light ${
                  active ? 'bg-brand-faint text-brand-light' : 'text-white/46 hover:bg-surface-2 hover:text-white/72'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/34" aria-live="polite">
          {copy.showingLabel} {filteredItems.length} / {items.length} {copy.capabilityLabel}
        </p>
      </div>

      <div className="border-b border-white/10">
        {filteredItems.map((item) => {
          const sourceIndex = items.indexOf(item);
          const reference = capabilityReference(group, sourceIndex);
          const evidenceId = `partner-evidence-${group}-${String(sourceIndex + 1).padStart(2, '0')}`;
          const copyState = referenceCopyState.reference === reference ? referenceCopyState.status : 'idle';
          const isFlagged = flaggedReferences.includes(reference);

          return (
          <article
            key={item.title}
            id={evidenceId}
            className="scroll-mt-32 grid min-w-0 gap-4 border-t border-white/10 py-6 first:border-t-0 md:grid-cols-[64px_180px_minmax(0,1fr)] md:gap-6 md:py-7 xl:grid-cols-[64px_210px_minmax(0,1.2fr)_minmax(220px,0.8fr)] xl:gap-8"
          >
            <span
              className="font-mono text-[10px] text-brand-light/64 md:pt-2"
              aria-label={`${copy.evidenceReferenceLabel}: ${reference}`}
            >
              {reference}
            </span>
            <div className="min-w-0">
              <StatusBadge status={item.status} labels={copy.statusLabels} />
              <h3 className="mt-4 text-lg font-medium text-white sm:text-xl">{item.title}</h3>
              <div className="partner-no-print mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                <button
                  type="button"
                  onClick={() => handleCopyEvidenceReference(reference, item.title)}
                  className="min-h-[32px] rounded text-left font-mono text-[10px] text-white/34 transition-colors hover:text-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  {copyState === 'copied'
                    ? copy.evidenceReferenceCopied
                    : copyState === 'failed'
                      ? copy.evidenceReferenceCopyFailed
                      : copy.copyEvidenceReference}
                </button>
                <button
                  type="button"
                  disabled={isFlagged}
                  onClick={() => onFlagForReview(reference, item.title)}
                  className="min-h-[32px] rounded text-left text-[10px] font-semibold text-white/42 transition-colors hover:text-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light disabled:cursor-default disabled:text-brand-light/72"
                >
                  {isFlagged ? copy.evidenceFindingAdded : copy.addEvidenceFinding}
                </button>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/56 sm:text-[15px] sm:leading-7 md:pt-1">{item.summary}</p>
            <dl className="grid min-w-0 gap-4 border-l border-white/10 pl-4 md:col-start-3 sm:grid-cols-2 xl:col-start-auto xl:grid-cols-1">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.evidenceLevelLabel}</dt>
                <dd className="mt-2 text-xs font-medium leading-5 text-brand-light/82">{item.evidenceLevel}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.evidenceSourcesLabel}</dt>
                <dd className="mt-2 text-xs leading-5 text-white/48">{item.evidenceSources.join(' · ')}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.evidenceLabel}</dt>
                <dd className="mt-2 text-xs leading-5 text-white/42">{item.evidence}</dd>
              </div>
              <div className="sm:col-span-2 xl:col-span-1">
                <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.nextGateLabel}</dt>
                <dd className="mt-2 text-xs leading-5 text-white/52">{item.nextGate}</dd>
              </div>
            </dl>
          </article>
          );
        })}
        {filteredItems.length === 0 ? (
          <p className="border-t border-white/10 py-10 text-sm leading-6 text-white/42" role="status">
            {copy.noCapabilitiesFound}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function PartnerProgressPage() {
  const router = useRouter();
  const [copyStatus, setCopyStatus] = useState('idle');
  const [exportStatus, setExportStatus] = useState('idle');
  const [reviewMode, setReviewMode] = useState('executive');
  const [activeSection, setActiveSection] = useState('overview');
  const [capabilityQuery, setCapabilityQuery] = useState('');
  const [reviewChecks, setReviewChecks] = useState(() => ({ ...EMPTY_REVIEW_CHECKS }));
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewFindings, setReviewFindings] = useState([]);
  const [reviewDecision, setReviewDecision] = useState('undecided');
  const [reviewOrganization, setReviewOrganization] = useState('');
  const [reviewNextReviewDate, setReviewNextReviewDate] = useState('');
  const [workspaceLoaded, setWorkspaceLoaded] = useState(false);
  const [handoffExportStatus, setHandoffExportStatus] = useState('idle');
  const [memoExportStatus, setMemoExportStatus] = useState('idle');
  const [handoffImportStatus, setHandoffImportStatus] = useState('idle');
  const [clearWorkspaceArmed, setClearWorkspaceArmed] = useState(false);
  const language = router.locale === 'zh-Hans' || router.locale === 'zh-Hant' ? 'zh' : 'en';
  const copy = CONTENT[language];
  const alternateLocale = language === 'zh' ? 'en' : 'zh-Hans';
  const alternateLabel = language === 'zh' ? copy.english : copy.chinese;
  const visibleJumpItems = copy.jumpItems.filter(([, , technicalOnly]) => !technicalOnly || reviewMode === 'technical');
  const flaggedEvidenceReferences = reviewFindings
    .map((finding) => finding.evidence_reference)
    .filter(Boolean);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-partner-section]'))
      .filter((section) => window.getComputedStyle(section).display !== 'none');

    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-118px 0px -62% 0px', threshold: [0, 0.08, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reviewMode]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(REVIEW_WORKSPACE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedChecks = parsed?.checks && typeof parsed.checks === 'object' ? parsed.checks : {};
        const normalizedChecks = Object.keys(EMPTY_REVIEW_CHECKS).reduce((result, key) => ({
          ...result,
          [key]: storedChecks[key] === true,
        }), {});
        setReviewChecks(normalizedChecks);
        if (typeof parsed?.notes === 'string') {
          setReviewNotes(parsed.notes.slice(0, REVIEW_NOTES_MAX_LENGTH));
        }
        setReviewFindings(normalizeReviewFindings(parsed?.findings));
        if (REVIEW_DECISIONS.includes(parsed?.decision)) {
          setReviewDecision(parsed.decision);
        }
        if (typeof parsed?.organization === 'string') {
          setReviewOrganization(parsed.organization.slice(0, REVIEW_ORGANIZATION_MAX_LENGTH));
        }
        if (typeof parsed?.next_review_date === 'string' && isValidReviewDate(parsed.next_review_date)) {
          setReviewNextReviewDate(parsed.next_review_date);
        }
      }
    } catch {
      // Browser privacy settings or malformed local data must not block access.
    } finally {
      setWorkspaceLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!workspaceLoaded) return;
    try {
      window.localStorage.setItem(REVIEW_WORKSPACE_STORAGE_KEY, JSON.stringify({
        checks: reviewChecks,
        notes: reviewNotes,
        findings: reviewFindings,
        decision: reviewDecision,
        organization: reviewOrganization,
        next_review_date: reviewNextReviewDate,
        updated_at: new Date().toISOString(),
      }));
    } catch {
      // The workspace remains session-usable when local storage is unavailable.
    }
  }, [reviewChecks, reviewNotes, reviewFindings, reviewDecision, reviewOrganization, reviewNextReviewDate, workspaceLoaded]);

  useEffect(() => {
    if (!clearWorkspaceArmed) return undefined;
    const timeout = window.setTimeout(() => setClearWorkspaceArmed(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [clearWorkspaceArmed]);

  async function handleCopyReviewLink() {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus('failed');
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  function handlePrintBrief() {
    window.print();
  }

  function handleExportReview() {
    try {
      downloadJsonFile(
        buildReviewSnapshot(copy, language),
        `aeronyx-partner-review-${VERIFIED_DATE}.json`
      );
      setExportStatus('exported');
    } catch {
      setExportStatus('failed');
    }
  }

  function handleToggleReviewCheck(id) {
    if (!Object.prototype.hasOwnProperty.call(EMPTY_REVIEW_CHECKS, id)) return;
    setReviewChecks((current) => ({ ...current, [id]: !current[id] }));
    resetWorkspaceActionState();
  }

  function resetWorkspaceActionState() {
    setHandoffExportStatus('idle');
    setMemoExportStatus('idle');
    setHandoffImportStatus('idle');
    setClearWorkspaceArmed(false);
  }

  function handleReviewNotesChange(value) {
    setReviewNotes(value.slice(0, REVIEW_NOTES_MAX_LENGTH));
    resetWorkspaceActionState();
  }

  function handleAddReviewFinding(input) {
    const finding = createReviewFinding(input);
    if (!finding.title) return;
    setReviewFindings((current) => current.length >= REVIEW_FINDINGS_MAX
      ? current
      : [...current, finding]);
    resetWorkspaceActionState();
  }

  function handleUpdateReviewFinding(id, patch) {
    setReviewFindings((current) => current.map((finding) => {
      if (finding.id !== id) return finding;
      const status = REVIEW_FINDING_STATUSES.includes(patch?.status)
        ? patch.status
        : finding.status;
      return { ...finding, status };
    }));
    resetWorkspaceActionState();
  }

  function handleRemoveReviewFinding(id) {
    setReviewFindings((current) => current.filter((finding) => finding.id !== id));
    resetWorkspaceActionState();
  }

  function handleFlagEvidenceFinding(reference, title) {
    if (!isKnownEvidenceReference(reference)) return;
    setReviewFindings((current) => {
      if (current.length >= REVIEW_FINDINGS_MAX) return current;
      if (current.some((finding) => finding.evidence_reference === reference)) return current;
      return [...current, createReviewFinding({
        title: findingTitleForEvidence(copy, reference, title),
        severity: 'medium',
        evidence_reference: reference,
      })];
    });
    resetWorkspaceActionState();
  }

  function handleOpenFindingEvidence(reference) {
    const evidenceId = evidenceIdForReference(reference);
    if (!evidenceId) return;
    setReviewMode('technical');
    setCapabilityQuery(reference);
    setActiveSection(reference.startsWith('APP-') ? 'client' : 'rust');
    window.setTimeout(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
      document.getElementById(evidenceId)?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }, 50);
  }

  function handleReviewDecisionChange(value) {
    if (!REVIEW_DECISIONS.includes(value)) return;
    setReviewDecision(value);
    resetWorkspaceActionState();
  }

  function handleReviewOrganizationChange(value) {
    setReviewOrganization(value.slice(0, REVIEW_ORGANIZATION_MAX_LENGTH));
    resetWorkspaceActionState();
  }

  function handleReviewNextReviewDateChange(value) {
    if (value && !isValidReviewDate(value)) return;
    setReviewNextReviewDate(value);
    resetWorkspaceActionState();
  }

  function handleExportHandoff() {
    try {
      downloadJsonFile(
        buildReviewHandoff(
          copy,
          language,
          reviewChecks,
          reviewNotes,
          reviewFindings,
          reviewDecision,
          reviewOrganization,
          reviewNextReviewDate
        ),
        `aeronyx-partner-review-handoff-${VERIFIED_DATE}.json`
      );
      setHandoffExportStatus('exported');
      setHandoffImportStatus('idle');
    } catch {
      setHandoffExportStatus('failed');
    }
  }

  function handleExportDecisionMemo() {
    try {
      downloadTextFile(
        buildReviewMemo(
          copy,
          reviewChecks,
          reviewNotes,
          reviewFindings,
          reviewDecision,
          reviewOrganization,
          reviewNextReviewDate
        ),
        `aeronyx-partner-decision-memo-${VERIFIED_DATE}.md`,
        'text/markdown;charset=utf-8'
      );
      setMemoExportStatus('exported');
      setHandoffImportStatus('idle');
    } catch {
      setMemoExportStatus('failed');
    }
  }

  async function handleImportHandoff(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || file.size <= 0 || file.size > REVIEW_HANDOFF_MAX_BYTES) {
      setHandoffImportStatus('failed');
      return;
    }

    try {
      const normalized = normalizeReviewHandoff(JSON.parse(await file.text()));
      setReviewChecks(normalized.checks);
      setReviewNotes(normalized.notes);
      setReviewFindings(normalized.findings);
      setReviewDecision(normalized.decision);
      setReviewOrganization(normalized.organization);
      setReviewNextReviewDate(normalized.nextReviewDate);
      setHandoffExportStatus('idle');
      setMemoExportStatus('idle');
      setHandoffImportStatus('imported');
      setClearWorkspaceArmed(false);
    } catch {
      setHandoffImportStatus('failed');
    }
  }

  function handleClearWorkspace() {
    if (!clearWorkspaceArmed) {
      setClearWorkspaceArmed(true);
      return;
    }

    setReviewChecks({ ...EMPTY_REVIEW_CHECKS });
    setReviewNotes('');
    setReviewFindings([]);
    setReviewDecision('undecided');
    setReviewOrganization('');
    setReviewNextReviewDate('');
    setHandoffExportStatus('idle');
    setMemoExportStatus('idle');
    setHandoffImportStatus('idle');
    setClearWorkspaceArmed(false);
  }

  return (
    <>
      <Head>
        <title>AeroNyx Partner Build Brief</title>
        <meta name="description" content="Unlisted AeroNyx partner delivery brief." />
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex" />
        <meta name="googlebot" content="noindex,nofollow,noarchive,nosnippet,noimageindex" />
        <meta name="referrer" content="no-referrer" />
      </Head>

      <div className="partner-report relative min-h-screen overflow-x-hidden bg-[#08090c] text-white">
        <header className="partner-no-print sticky top-0 z-50 border-b border-white/8 bg-surface-0/90 backdrop-blur-xl">
          <Container>
            <div className="flex min-h-[68px] items-center justify-between gap-4 py-2">
              <Link
                href="/"
                aria-label="AeroNyx"
                className="inline-flex min-h-[44px] min-w-0 items-center gap-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                <AeroNyxLogo width={32} height={32} className="shrink-0" />
                <span className="truncate font-display text-lg font-semibold text-white">AeroNyx</span>
              </Link>
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <span className="hidden text-right text-[10px] uppercase tracking-eyebrow text-white/32 sm:block">
                  {copy.restricted}
                </span>
                <Link
                  href={router.asPath}
                  locale={alternateLocale}
                  className="inline-flex min-h-[44px] items-center rounded border border-white/12 px-3 text-xs font-semibold text-white/64 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  aria-label={`${copy.language}: ${alternateLabel}`}
                >
                  {alternateLabel}
                </Link>
              </div>
            </div>
          </Container>
        </header>

        <main>
          <section className="relative border-b border-white/10 pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-16">
            <Container>
              <div className="max-w-5xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-[30px] items-center rounded-pill border border-brand-line bg-brand-faint px-3 text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light">
                    {copy.restricted}
                  </span>
                  <span className="text-xs text-white/34">{copy.verified} · {copy.revision}</span>
                </div>
                <h1
                  className="mt-6 max-w-4xl font-display text-[2.35rem] font-medium leading-[1.06] text-white sm:text-[3.35rem] sm:leading-[1.03] lg:text-[4rem]"
                >
                  {copy.heroTitle}
                </h1>
                <ExecutiveQuickLinks copy={copy} />
                <p className="mt-8 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                  {copy.heroBody}
                </p>
                <div className="mt-8 border-l-2 border-brand-light/60 pl-4 text-sm leading-6 text-white/42">
                  <p>{copy.restrictedDetail}</p>
                  <p className="mt-1">{copy.noTraffic}</p>
                </div>

                <div className="mt-8 grid gap-5 border-y border-white/10 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/72">{copy.accessTitle}</p>
                    <p className="mt-2 max-w-2xl text-xs leading-5 text-white/40">{copy.accessBody}</p>
                  </div>
                  <div className="partner-no-print grid gap-2 sm:grid-cols-2 xl:flex" aria-label={copy.accessTitle}>
                    <button
                      type="button"
                      onClick={handleCopyReviewLink}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copyStatus === 'copied' ? copy.copiedLink : copyStatus === 'failed' ? copy.copyFailed : copy.copyLink}
                    </button>
                    <button
                      type="button"
                      onClick={handleExportReview}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {exportStatus === 'exported' ? copy.exportedJson : exportStatus === 'failed' ? copy.exportFailed : copy.exportJson}
                    </button>
                    <button
                      type="button"
                      onClick={handlePrintBrief}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copy.printBrief}
                    </button>
                    <a
                      href="mailto:hi@aeronyx.network?subject=AeroNyx%20partner%20review"
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copy.contactTeam}
                    </a>
                  </div>
                  <p className="sr-only" aria-live="polite">
                    {copyStatus === 'copied' ? copy.copiedLink : copyStatus === 'failed' ? copy.copyFailed : ''}
                    {' '}
                    {exportStatus === 'exported' ? copy.exportedJson : exportStatus === 'failed' ? copy.exportFailed : ''}
                  </p>
                </div>
                <ReviewDepthControl
                  copy={copy}
                  mode={reviewMode}
                  onChange={setReviewMode}
                  query={capabilityQuery}
                  onQueryChange={setCapabilityQuery}
                />
              </div>

            </Container>
          </section>

          <nav
            aria-label={copy.jumpLabel}
            className="partner-no-print sticky top-[68px] z-40 border-b border-white/10 bg-surface-0/94 backdrop-blur-xl"
          >
            <Container>
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max items-stretch lg:w-full lg:min-w-0">
                  {visibleJumpItems.map(([href, label], index) => {
                    const sectionId = href.slice(1);
                    const active = activeSection === sectionId;
                    return (
                    <a
                      key={href}
                      href={href}
                      aria-current={active ? 'location' : undefined}
                      onClick={() => setActiveSection(sectionId)}
                      className={`group relative flex min-h-[48px] min-w-[132px] items-center gap-2 border-r border-white/8 px-4 transition-colors first:border-l hover:bg-white/[0.035] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light lg:min-w-0 lg:flex-1 lg:justify-center ${
                        active ? 'bg-white/[0.035]' : ''
                      }`}
                    >
                      <span className={`font-mono text-[9px] ${active ? 'text-brand-light' : 'text-brand-light/60'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] group-hover:text-white/76 ${active ? 'text-white/82' : 'text-white/44'}`}>
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 bottom-0 h-px bg-brand-light transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </a>
                    );
                  })}
                </div>
              </div>
            </Container>
          </nav>

          <section id="overview" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-16 sm:py-20">
            <Container>
              <SectionHeading eyebrow={copy.snapshotEyebrow} title={copy.snapshotTitle} body={copy.snapshotBody} />
              <dl className="mt-10 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
                {copy.snapshot.map((item) => (
                  <div key={item.label} className="min-w-0 bg-surface-1 px-5 py-6 sm:px-6">
                    <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/34">{item.label}</dt>
                    <dd className="mt-4 break-words font-display text-2xl font-medium text-white">{item.value}</dd>
                    <p className="mt-3 text-xs leading-5 text-white/40">{item.detail}</p>
                  </div>
                ))}
              </dl>
              <DeliveryOverview
                clientItems={copy.clientItems}
                rustItems={copy.rustItems}
                boundaries={copy.boundaries}
                copy={copy}
              />
              <StatusDefinitions copy={copy} />
              <RevisionDelta copy={copy} />
            </Container>
          </section>

          <section id="artifacts" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-1/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.artifactEyebrow} title={copy.artifactTitle} body={copy.artifactBody} />
              <ArtifactVerification copy={copy} />
            </Container>
          </section>

          <section id="decision" className="scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.decisionEyebrow} title={copy.decisionTitle} body={copy.decisionBody} />
              <DecisionSummary copy={copy} />
            </Container>
          </section>

          <section id="pilot" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-1/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.pilotEyebrow} title={copy.pilotTitle} body={copy.pilotBody} />
              <PilotReviewPath copy={copy} />
            </Container>
          </section>

          <section id="workspace" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.workspaceEyebrow} title={copy.workspaceTitle} body={copy.workspaceBody} />
              <ReviewerWorkspace
                copy={copy}
                checks={reviewChecks}
                notes={reviewNotes}
                findings={reviewFindings}
                decision={reviewDecision}
                organization={reviewOrganization}
                nextReviewDate={reviewNextReviewDate}
                onToggle={handleToggleReviewCheck}
                onNotesChange={handleReviewNotesChange}
                onAddFinding={handleAddReviewFinding}
                onUpdateFinding={handleUpdateReviewFinding}
                onRemoveFinding={handleRemoveReviewFinding}
                onOpenEvidence={handleOpenFindingEvidence}
                onDecisionChange={handleReviewDecisionChange}
                onOrganizationChange={handleReviewOrganizationChange}
                onNextReviewDateChange={handleReviewNextReviewDateChange}
                onExport={handleExportHandoff}
                exportStatus={handoffExportStatus}
                onExportMemo={handleExportDecisionMemo}
                memoExportStatus={memoExportStatus}
                onImport={handleImportHandoff}
                importStatus={handoffImportStatus}
                onClear={handleClearWorkspace}
                clearArmed={clearWorkspaceArmed}
              />
            </Container>
          </section>

          <section
            id="client"
            data-partner-section
            className={`partner-technical-section scroll-mt-32 border-b border-white/10 bg-surface-1/78 py-16 sm:py-24 ${reviewMode === 'technical' ? '' : 'hidden'}`}
          >
            <Container>
              <SectionHeading eyebrow={copy.clientEyebrow} title={copy.clientTitle} body={copy.clientBody} />
              <CapabilityReviewList
                items={copy.clientItems}
                copy={copy}
                query={capabilityQuery}
                group="client"
                flaggedReferences={flaggedEvidenceReferences}
                onFlagForReview={handleFlagEvidenceFinding}
              />
            </Container>
          </section>

          <section
            id="rust"
            data-partner-section
            className={`partner-technical-section scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-16 sm:py-24 ${reviewMode === 'technical' ? '' : 'hidden'}`}
          >
            <Container>
              <SectionHeading eyebrow={copy.rustEyebrow} title={copy.rustTitle} body={copy.rustBody} />
              <CapabilityReviewList
                items={copy.rustItems}
                copy={copy}
                query={capabilityQuery}
                group="node"
                flaggedReferences={flaggedEvidenceReferences}
                onFlagForReview={handleFlagEvidenceFinding}
              />
            </Container>
          </section>

          <section id="dependencies" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-1/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.dependencyEyebrow} title={copy.dependencyTitle} body={copy.dependencyBody} />
              <DependencyMatrix copy={copy} />
            </Container>
          </section>

          <section className="border-b border-white/10 bg-surface-0/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.milestoneEyebrow} title={copy.milestoneTitle} />
              <ol className="mt-10 border-t border-white/10">
                {copy.milestones.map((item, index) => (
                  <li key={`${item.date}-${item.title}`} className="grid min-w-0 gap-4 border-b border-white/10 py-7 sm:grid-cols-[120px_1fr] sm:gap-8 sm:py-9">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="font-mono text-[10px] text-brand-light/70">{String(index + 1).padStart(2, '0')}</span>
                      <time className="font-mono text-xs text-white/34 sm:mt-3 sm:block">{item.date}</time>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-white sm:text-xl">{item.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/52 sm:text-[15px] sm:leading-7">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Container>
          </section>

          <section id="boundaries" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-1/82 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.boundaryEyebrow} title={copy.boundaryTitle} body={copy.boundaryBody} />
              <div className="mt-10 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 lg:grid-cols-2">
                {copy.boundaries.map((item, index) => (
                  <article key={item.title} className="min-w-0 bg-surface-1 px-5 py-7 sm:px-7 sm:py-9">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-warn/30 font-mono text-[10px] text-warn">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="min-w-0 text-lg font-medium text-white">{item.title}</h3>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-white/54 sm:text-[15px] sm:leading-7">{item.detail}</p>
                  </article>
                ))}
              </div>
            </Container>
          </section>

          <section id="roadmap" data-partner-section className="scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-16 sm:py-24">
            <Container>
              <SectionHeading eyebrow={copy.roadmapEyebrow} title={copy.roadmapTitle} body={copy.roadmapBody} />
              <div className="relative mt-12 grid gap-8 lg:grid-cols-4 lg:gap-0">
                <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-4 hidden h-px bg-white/12 lg:block" />
                {copy.roadmap.map((item) => (
                  <article key={item.step} className="relative min-w-0 lg:px-5 first:lg:pl-0 last:lg:pr-0">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-line bg-surface-1 font-mono text-[10px] text-brand-light">
                      {item.step}
                    </span>
                    <h3 className="mt-6 text-lg font-medium text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/50">{item.detail}</p>
                  </article>
                ))}
              </div>
            </Container>
          </section>

          <section className="bg-surface-1/86 py-16 sm:py-20">
            <Container>
              <div className="flex flex-col gap-8 border-y border-white/10 py-9 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-medium text-white">{copy.linksTitle}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/42">{copy.footerNote}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {copy.links.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-between gap-4 rounded border border-white/10 px-4 text-sm text-white/58 transition-colors hover:border-white/22 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {label}
                      <span aria-hidden="true" className="text-white/28">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        </main>

        <footer className="border-t border-white/8 bg-surface-0 py-8">
          <Container>
            <div className="flex flex-col gap-3 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
              <span>{copy.footer}</span>
              <span>{copy.verified} · {copy.revision}</span>
            </div>
          </Container>
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 14mm;
          }

          html,
          body,
          .partner-report,
          .partner-report section,
          .partner-report article,
          .partner-report footer,
          .partner-report dl > div {
            background: #ffffff !important;
            box-shadow: none !important;
          }

          .partner-no-print {
            display: none !important;
          }

          .partner-technical-section {
            display: block !important;
          }

          .partner-technical-section article {
            opacity: 1 !important;
            transform: none !important;
          }

          .partner-report * {
            border-color: rgba(10, 10, 18, 0.16) !important;
            color: #16161f !important;
            text-shadow: none !important;
          }

          .partner-report main > section {
            padding-bottom: 28px !important;
            padding-top: 28px !important;
          }

          .partner-report article,
          .partner-report dl > div,
          .partner-report aside {
            break-inside: avoid;
          }

          .partner-report a {
            text-decoration: none !important;
          }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  context.res.setHeader('Pragma', 'no-cache');
  context.res.setHeader('Expires', '0');
  context.res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  context.res.setHeader('Referrer-Policy', 'no-referrer');

  const providedKey = String(context.params?.accessKey || '').trim();
  const authorized = ACCESS_KEY_PATTERN.test(providedKey)
    && providedKey === PARTNER_PROGRESS_ACCESS_KEY;

  if (!authorized) {
    return { notFound: true };
  }

  return { props: {} };
}

export default PartnerProgressPage;
