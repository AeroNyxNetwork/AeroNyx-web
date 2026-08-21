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
 *   - Publishes a hierarchical delivery board, dependency ownership matrix,
 *     reviewer workspace, and public-safe machine-readable JSON snapshot.
 *   - Provides scoped client/protocol evidence, explicit evidence levels, next
 *     validation gates, and a focused partner pilot path.
 *   - Adds capability search, evidence-source provenance, and a browser-local
 *     reviewer workspace with an explicit public-safe handoff export.
 *   - Adds a review decision memo, revision delta, and validated local handoff
 *     import so partner teams can continue diligence across browsers safely.
 *   - Adds stable evidence references, handoff-readiness feedback, and a
 *     human-readable Markdown decision memo that never includes the access URL.
 *   - Reuses the public immutable release contract in portable review exports
 *     while keeping installer controls off the focused browser surface.
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
 *   3. Reviewers filter Completed, In progress, and Next tasks, then open one
 *      item at a time for evidence or switch to the local Review workspace.
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
 *   - Task filters only change presentation. Technical evidence must stay in
 *     the DOM, JSON export, and print output so no review fact is discarded.
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
 *   - [PARTNER-INFORMATION-HIERARCHY 2026-08-21 by Codex] Keep client binary
 *     downloads on the public download surface. This route should foreground
 *     decisions, delivery evidence, dependencies, boundaries, and pilot work.
 *   - [PARTNER-DELIVERY-BOARD 2026-08-21 by Codex] The browser experience uses
 *     a Todoist-style workstream/task/detail hierarchy. Print and portable
 *     exports still contain the complete public-safe review record.
 *
 * Last Modified: v3.1 - Hierarchical delivery board with task-level evidence.
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
const REVIEW_REVISION = '3.1';
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
const REVIEW_VIEWS = Object.freeze(['delivery', 'workspace']);
const DELIVERY_FILTERS = Object.freeze(['all', 'complete', 'active', 'next']);
const EMPTY_REVIEW_CHECKS = Object.freeze({
  scope: false,
  privacy: false,
  evidence: false,
  operations: false,
  decision: false,
});
const ACCESS_KEY_PATTERN = /^[a-f0-9]{64}$/;
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
    reviewActionsLabel: 'Portable review record',
    reviewActionsBody: 'Export the public-safe evidence snapshot or print the complete brief. Neither action includes the route key or browser-local review notes.',
    contactTeam: 'Contact AeroNyx',
    viewLabel: 'Partner review mode',
    viewTabs: [
      { id: 'delivery', label: 'Delivery board', detail: 'Completed, active, and next work' },
      { id: 'workspace', label: 'Review workspace', detail: 'Findings, decision, and handoff' },
    ],
    deliveryEyebrow: 'Delivery board',
    deliveryTitle: 'One clear list of what is done, moving, and next.',
    deliveryBody: 'Work is grouped by product area. Open any item only when you need its implementation evidence, dependency boundary, or next acceptance gate.',
    deliveryFilterLabel: 'Filter delivery tasks',
    deliveryFilters: {
      all: 'All',
      complete: 'Completed',
      active: 'In progress',
      next: 'Next',
    },
    deliveryStageLabels: {
      complete: 'Completed',
      active: 'In progress',
      next: 'Next',
    },
    deliveryGroups: {
      client: { label: 'Client product', detail: 'User-facing privacy, communication, memory, identity, and release paths.' },
      node: { label: 'Open protocol nodes', detail: 'Transport, discovery, blind relay, encrypted custody, and coordination evidence.' },
      next: { label: 'Next milestones', detail: 'The shortest validated path to broader partner deployment.' },
    },
    deliveryItemsLabel: 'items',
    deliveryEmpty: 'No tasks match this view.',
    deliveryOpenDetail: 'Open task detail',
    deliveryPlannedLevel: 'Planned validation milestone',
    deliveryPlannedSources: ['Reviewed roadmap', 'Current system boundary'],
    deliveryPlannedEvidence: 'Scheduled after the current implementation and verification gates close.',
    evidenceScopeLabel: 'Evidence scope',
    evidenceScopeLabels: {
      client: 'Client product',
      node: 'Protocol nodes',
    },
    methodologyEyebrow: 'Review methodology',
    capabilitySearchLabel: 'Search capability evidence',
    capabilitySearchPlaceholder: 'Search relay, memory, recovery, witness…',
    statusOverview: {
      available: 'Available capabilities',
      beta: 'Beta capabilities',
      hardening: 'Hardening tracks',
      boundaries: 'Declared boundaries',
    },
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
    revisionDeltaTitle: 'The long report is now a focused review workbench.',
    revisionDeltaBody: 'A task-based delivery board separates completed, active, and next work. Evidence remains attached to each item while reviewer notes stay in a separate local workspace.',
    revisionDeltaItems: [
      'Group work into client, protocol node, and next-milestone workstreams.',
      'Filter completed, in-progress, and next tasks without losing evidence.',
      'Open implementation proof and acceptance gates only when requested.',
    ],
    artifactDownload: 'Open immutable download',
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
    reviewActionsLabel: '可攜式審閱記錄',
    reviewActionsBody: '可匯出公開安全的證據快照，或列印完整簡報；兩者均不包含路由金鑰或瀏覽器本地審閱筆記。',
    contactTeam: '聯絡 AeroNyx',
    viewLabel: '合作方審閱模式',
    viewTabs: [
      { id: 'delivery', label: '交付清單', detail: '已完成、進行中與下一步' },
      { id: 'workspace', label: '審閱工作區', detail: '問題、決策與交接' },
    ],
    deliveryEyebrow: '交付清單',
    deliveryTitle: '一張清單，看清已完成、進行中與下一步。',
    deliveryBody: '工作按產品大項分組；只有需要查看實現證據、依賴邊界或下一驗收門檻時，才展開單項細節。',
    deliveryFilterLabel: '篩選交付任務',
    deliveryFilters: {
      all: '全部',
      complete: '已完成',
      active: '進行中',
      next: '下一步',
    },
    deliveryStageLabels: {
      complete: '已完成',
      active: '進行中',
      next: '下一步',
    },
    deliveryGroups: {
      client: { label: '客戶端產品', detail: '面向用戶的隱私、通信、記憶、身份與發布路徑。' },
      node: { label: '開放協議節點', detail: '傳輸、發現、盲中繼、加密託管與協調證據。' },
      next: { label: '下一里程碑', detail: '走向更廣泛合作方部署的最短驗證路徑。' },
    },
    deliveryItemsLabel: '項',
    deliveryEmpty: '此視圖沒有符合條件的任務。',
    deliveryOpenDetail: '展開任務細節',
    deliveryPlannedLevel: '計劃中的驗證里程碑',
    deliveryPlannedSources: ['已審閱路線圖', '當前系統邊界'],
    deliveryPlannedEvidence: '在目前實現與驗證門檻完成後排期執行。',
    evidenceScopeLabel: '證據範圍',
    evidenceScopeLabels: {
      client: '客戶端產品',
      node: '協議節點',
    },
    methodologyEyebrow: '審閱方法',
    capabilitySearchLabel: '搜尋能力證據',
    capabilitySearchPlaceholder: '搜尋 Relay、記憶、恢復、witness…',
    statusOverview: {
      available: '已可用能力',
      beta: 'Beta 能力',
      hardening: '加固中項目',
      boundaries: '已聲明邊界',
    },
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
    revisionDeltaTitle: '長報告已收斂為聚焦的審閱工作台。',
    revisionDeltaBody: '任務式交付清單把已完成、進行中與下一步分開；證據附著在每個任務中，審閱筆記則留在獨立的本地工作區。',
    revisionDeltaItems: [
      '按客戶端、協議節點與下一里程碑建立工作大項。',
      '可篩選已完成、進行中與下一步，同時保留完整證據。',
      '只有需要時才展開實現證明與下一驗收門檻。',
    ],
    artifactDownload: '開啟不可變下載',
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

// [PARTNER-REVIEW-WORKBENCH 2026-08-21 by Codex] One navigation model replaces
// the former quick links, depth switch, and long section index. Each tab owns a
// focused review task while print continues to expose the complete brief.
function ReviewViewTabs({ copy, activeView, onChange }) {
  return (
    <nav className="partner-no-print sticky top-16 z-40 border-b border-white/10 bg-surface-0/96 backdrop-blur-xl sm:top-20" aria-label={copy.viewLabel}>
      <Container>
        <div className="grid grid-cols-2" role="tablist" aria-label={copy.viewLabel}>
          {copy.viewTabs.map((item, index) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`partner-tab-${item.id}`}
                aria-selected={active}
                aria-controls={`partner-view-${item.id}`}
                onClick={() => onChange(item.id)}
                className={`relative min-h-[58px] min-w-0 border-x border-white/8 px-2 py-3 text-left transition-colors first:border-r-0 last:border-l-0 hover:bg-white/[0.035] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light sm:px-4 lg:min-h-[66px] ${active ? 'bg-white/[0.035]' : ''}`}
              >
                <span className={`block font-mono text-[9px] ${active ? 'text-brand-light' : 'text-brand-light/48'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`mt-1 block truncate text-[11px] font-semibold sm:text-xs ${active ? 'text-white' : 'text-white/52'}`}>
                  {item.label}
                </span>
                <span className="mt-1 hidden truncate text-[10px] text-white/30 lg:block">{item.detail}</span>
                <span aria-hidden="true" className={`absolute inset-x-2 bottom-0 h-px bg-brand-light sm:inset-x-4 ${active ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}

function PlanDisclosure({ eyebrow, title, body, children }) {
  return (
    <details className="group border-b border-white/10">
      <summary className="partner-no-print flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light/70">{eyebrow}</span>
          <span className="mt-2 block text-lg font-medium leading-6 text-white sm:text-xl">{title}</span>
          {body ? <span className="mt-2 hidden max-w-3xl text-xs leading-5 text-white/38 sm:block">{body}</span> : null}
        </span>
        <span aria-hidden="true" className="font-mono text-sm text-white/34 group-open:hidden">+</span>
        <span aria-hidden="true" className="hidden font-mono text-sm text-brand-light group-open:inline">−</span>
      </summary>
      <div className="border-t border-white/10 pb-10 pt-2">{children}</div>
    </details>
  );
}

function deliveryStageForStatus(status) {
  if (status === 'available') return 'complete';
  if (status === 'progress') return 'next';
  return 'active';
}

// [PARTNER-DELIVERY-BOARD 2026-08-21 by Codex] The partner surface follows a
// task hierarchy: workstream, task, then on-demand evidence. This keeps the
// implementation record complete without turning the default view into a report.
function DeliveryBoard({
  copy,
  filter,
  onFilterChange,
  flaggedReferences,
  highlightedReference,
  onFlagForReview,
}) {
  const [referenceCopyState, setReferenceCopyState] = useState({ reference: '', status: 'idle' });
  const roadmapItems = copy.roadmap.map((item) => ({
    status: 'progress',
    title: item.title,
    summary: item.detail,
    evidence: copy.deliveryPlannedEvidence,
    evidenceLevel: copy.deliveryPlannedLevel,
    evidenceSources: copy.deliveryPlannedSources,
    nextGate: item.detail,
  }));
  const groups = [
    { id: 'client', items: copy.clientItems, referencePrefix: 'APP' },
    { id: 'node', items: copy.rustItems, referencePrefix: 'NODE' },
    { id: 'next', items: roadmapItems, referencePrefix: 'NEXT' },
  ];
  const allTasks = groups.flatMap((group) => group.items.map((item) => ({
    ...item,
    stage: deliveryStageForStatus(item.status),
  })));
  const counts = DELIVERY_FILTERS.reduce((result, key) => ({
    ...result,
    [key]: key === 'all' ? allTasks.length : allTasks.filter((item) => item.stage === key).length,
  }), {});

  useEffect(() => {
    if (referenceCopyState.status === 'idle') return undefined;
    const timeout = window.setTimeout(
      () => setReferenceCopyState({ reference: '', status: 'idle' }),
      2500
    );
    return () => window.clearTimeout(timeout);
  }, [referenceCopyState]);

  async function handleCopyReference(reference, title) {
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
      <div className="partner-no-print grid grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-4" role="group" aria-label={copy.deliveryFilterLabel}>
        {DELIVERY_FILTERS.map((key) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onFilterChange(key)}
              className={`min-h-[56px] min-w-0 bg-surface-1 px-4 py-2 text-left transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light ${active ? 'bg-brand-faint' : 'hover:bg-surface-2'}`}
            >
              <span className={`block text-xs font-semibold ${active ? 'text-brand-light' : 'text-white/52'}`}>{copy.deliveryFilters[key]}</span>
              <span className="mt-1 block font-mono text-[10px] text-white/28">{counts[key]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-8">
        {groups.map((group) => {
          const tasks = group.items.map((item, index) => ({
            ...item,
            sourceIndex: index,
            stage: deliveryStageForStatus(item.status),
            reference: `${group.referencePrefix}-${String(index + 1).padStart(2, '0')}`,
          }));
          const visibleTasks = tasks.filter((item) => filter === 'all' || item.stage === filter);
          const groupCopy = copy.deliveryGroups[group.id];

          return (
            <div key={group.id} className={`partner-delivery-group overflow-hidden rounded border border-white/10 bg-surface-1/58 ${visibleTasks.length === 0 ? 'hidden' : ''}`}>
              <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-white sm:text-xl">{groupCopy.label}</h3>
                  <p className="mt-1 max-w-3xl text-xs leading-5 text-white/38">{groupCopy.detail}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">
                  {visibleTasks.length} {copy.deliveryItemsLabel}
                </span>
              </div>

              <div>
                {tasks.map((item) => {
                  const evidenceId = item.reference.startsWith('NEXT-')
                    ? `partner-next-${String(item.sourceIndex + 1).padStart(2, '0')}`
                    : evidenceIdForReference(item.reference);
                  const isFlagged = flaggedReferences.includes(item.reference);
                  const copyState = referenceCopyState.reference === item.reference ? referenceCopyState.status : 'idle';
                  const highlighted = highlightedReference === item.reference;
                  const visible = filter === 'all' || item.stage === filter;

                  return (
                    <details
                      key={item.reference}
                      id={evidenceId}
                      open={highlighted || undefined}
                      className={`partner-delivery-task group/task scroll-mt-28 border-b border-white/10 last:border-b-0 ${visible ? '' : 'hidden'} ${highlighted ? 'bg-brand/[0.045]' : ''}`}
                    >
                      <summary className="flex min-h-[72px] cursor-pointer list-none items-start gap-4 px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light sm:items-center sm:px-6 [&::-webkit-details-marker]:hidden">
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border sm:mt-0 ${item.stage === 'complete' ? 'border-ok/35 bg-ok/10 text-ok' : item.stage === 'active' ? 'border-brand-line bg-brand-faint text-brand-light' : 'border-white/16 text-white/42'}`}>
                          {item.stage === 'complete' ? <span className="text-xs">✓</span> : item.stage === 'active' ? <span className="h-1.5 w-1.5 rounded-full bg-brand-light" /> : <span className="text-xs">→</span>}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-sm font-medium text-white sm:text-[15px]">{item.title}</span>
                            <span className="font-mono text-[9px] text-white/26">{item.reference}</span>
                          </span>
                          <span className="mt-1.5 block text-xs leading-5 text-white/40 sm:line-clamp-1">{item.summary}</span>
                        </span>
                        <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/34 sm:block">{copy.deliveryStageLabels[item.stage]}</span>
                        <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-sm text-white/28 group-open/task:hidden sm:mt-0">+</span>
                        <span aria-hidden="true" className="mt-1 hidden shrink-0 font-mono text-sm text-brand-light group-open/task:inline sm:mt-0">−</span>
                      </summary>

                      <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-6">
                        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/28">{copy.evidenceLevelLabel}</dt>
                            <dd className="mt-2 text-xs font-medium leading-5 text-brand-light/82">{item.evidenceLevel}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/28">{copy.evidenceSourcesLabel}</dt>
                            <dd className="mt-2 text-xs leading-5 text-white/46">{item.evidenceSources.join(' · ')}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/28">{copy.evidenceLabel}</dt>
                            <dd className="mt-2 text-xs leading-5 text-white/46">{item.evidence}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/28">{copy.nextGateLabel}</dt>
                            <dd className="mt-2 text-xs leading-5 text-white/54">{item.nextGate}</dd>
                          </div>
                        </dl>
                        <div className="partner-no-print mt-5 flex flex-wrap gap-4 border-t border-white/8 pt-4">
                          <button
                            type="button"
                            onClick={() => handleCopyReference(item.reference, item.title)}
                            className="min-h-[32px] rounded font-mono text-[10px] text-white/34 transition-colors hover:text-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                          >
                            {copyState === 'copied' ? copy.evidenceReferenceCopied : copyState === 'failed' ? copy.evidenceReferenceCopyFailed : copy.copyEvidenceReference}
                          </button>
                          {!item.reference.startsWith('NEXT-') ? (
                            <button
                              type="button"
                              disabled={isFlagged}
                              onClick={() => onFlagForReview(item.reference, item.title)}
                              className="min-h-[32px] rounded text-[10px] font-semibold text-white/42 transition-colors hover:text-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light disabled:cursor-default disabled:text-brand-light/72"
                            >
                              {isFlagged ? copy.evidenceFindingAdded : copy.addEvidenceFinding}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {counts[filter] === 0 ? <p className="py-12 text-sm text-white/42">{copy.deliveryEmpty}</p> : null}
    </div>
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

function PartnerProgressPage() {
  const router = useRouter();
  const [copyStatus, setCopyStatus] = useState('idle');
  const [exportStatus, setExportStatus] = useState('idle');
  const [activeView, setActiveView] = useState('delivery');
  const [deliveryFilter, setDeliveryFilter] = useState('active');
  const [highlightedReference, setHighlightedReference] = useState('');
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
  const flaggedEvidenceReferences = reviewFindings
    .map((finding) => finding.evidence_reference)
    .filter(Boolean);

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
    setActiveView('delivery');
    setDeliveryFilter('all');
    setHighlightedReference(reference);
    window.setTimeout(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
      document.getElementById(evidenceId)?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }, 50);
  }

  function handleViewChange(view) {
    if (!REVIEW_VIEWS.includes(view)) return;
    setActiveView(view);
    window.setTimeout(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
      document.getElementById(`partner-view-${view}`)?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 0);
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

      <div className="partner-report relative min-h-screen overflow-x-clip bg-[#08090c] text-white">
        <header className="partner-no-print sticky top-0 z-50 border-b border-white/8 bg-surface-0/90 backdrop-blur-xl">
          <Container>
            <div className="flex min-h-[68px] items-center justify-between gap-4">
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
          <section className="relative border-b border-white/10 py-10 sm:py-14 lg:py-16">
            <Container>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-[30px] items-center rounded-pill border border-brand-line bg-brand-faint px-3 text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light">
                    {copy.restricted}
                  </span>
                  <span className="text-xs text-white/34">{copy.verified} · {copy.revision}</span>
                </div>
                <h1
                  className="mt-5 max-w-3xl font-display text-[2.25rem] font-medium leading-[1.07] text-white sm:text-[3.15rem] sm:leading-[1.04] lg:text-[3.7rem]"
                >
                  {copy.heroTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                  {copy.heroBody}
                </p>
                <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-xs leading-5 text-white/36">{copy.noTraffic}</p>
                  <div className="partner-no-print flex shrink-0 gap-2" aria-label={copy.accessTitle}>
                    <button
                      type="button"
                      onClick={handleCopyReviewLink}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/12 px-4 text-xs font-semibold text-white/58 transition-colors hover:border-white/24 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copyStatus === 'copied' ? copy.copiedLink : copyStatus === 'failed' ? copy.copyFailed : copy.copyLink}
                    </button>
                    <a
                      href="mailto:hi@aeronyx.network?subject=AeroNyx%20partner%20review"
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copy.contactTeam}
                    </a>
                  </div>
                  <p className="sr-only" aria-live="polite">
                    {copyStatus === 'copied' ? copy.copiedLink : copyStatus === 'failed' ? copy.copyFailed : ''}
                  </p>
                </div>
              </div>

            </Container>
          </section>

          <ReviewViewTabs copy={copy} activeView={activeView} onChange={handleViewChange} />

          <section
            id="partner-view-delivery"
            role="tabpanel"
            aria-labelledby="partner-tab-delivery"
            className={`partner-view-panel scroll-mt-32 border-b border-white/10 bg-surface-0/78 py-12 sm:py-16 ${activeView === 'delivery' ? '' : 'hidden'}`}
          >
            <Container>
              <SectionHeading eyebrow={copy.deliveryEyebrow} title={copy.deliveryTitle} body={copy.deliveryBody} />
              <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-y border-white/10 py-4">
                {copy.snapshot.slice(0, 2).map((item) => (
                  <div key={item.label} className="flex min-w-0 items-baseline gap-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{item.label}</dt>
                    <dd className="font-mono text-xs text-white/66">{item.value}</dd>
                  </div>
                ))}
                <div className="flex min-w-0 items-baseline gap-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/30">{copy.snapshot[3].label}</dt>
                  <dd className="font-mono text-xs text-white/66">{copy.snapshot[3].value}</dd>
                </div>
              </dl>
              <DeliveryBoard
                copy={copy}
                filter={deliveryFilter}
                onFilterChange={setDeliveryFilter}
                flaggedReferences={flaggedEvidenceReferences}
                highlightedReference={highlightedReference}
                onFlagForReview={handleFlagEvidenceFinding}
              />
              <div className="mt-12 border-t border-white/10">
                <PlanDisclosure eyebrow={copy.dependencyEyebrow} title={copy.dependencyTitle} body={copy.dependencyBody}>
                  <DependencyMatrix copy={copy} />
                </PlanDisclosure>
                <PlanDisclosure eyebrow={copy.boundaryEyebrow} title={copy.boundaryTitle} body={copy.boundaryBody}>
                  <div className="grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 lg:grid-cols-2">
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
                </PlanDisclosure>
              </div>
            </Container>
          </section>

          <section
            id="partner-view-workspace"
            role="tabpanel"
            aria-labelledby="partner-tab-workspace"
            className={`partner-view-panel scroll-mt-32 border-b border-white/10 bg-surface-1/78 py-12 sm:py-16 ${activeView === 'workspace' ? '' : 'hidden'}`}
          >
            <Container>
              <SectionHeading eyebrow={copy.workspaceEyebrow} title={copy.workspaceTitle} body={copy.workspaceBody} />
              <div className="partner-no-print mt-8 flex flex-col gap-5 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-brand-light/70">{copy.reviewActionsLabel}</p>
                  <p className="mt-2 text-xs leading-5 text-white/38">{copy.reviewActionsBody}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
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
                    className="inline-flex min-h-[44px] items-center justify-center rounded border border-brand-line bg-brand-faint px-4 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {copy.printBrief}
                  </button>
                </div>
              </div>
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

          <section className="bg-surface-1/86 py-8">
            <Container>
              <div className="flex flex-col gap-5 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-xs leading-5 text-white/38">{copy.linksTitle} · {copy.footerNote}</p>
                <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label={copy.linksTitle}>
                  {copy.links.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[36px] items-center gap-2 rounded text-xs text-white/48 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {label}
                      <span aria-hidden="true" className="text-white/28">↗</span>
                    </a>
                  ))}
                </nav>
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

          .partner-view-panel,
          .partner-delivery-group,
          .partner-delivery-task,
          .partner-evidence-scope,
          .partner-technical-section {
            display: block !important;
          }

          .partner-technical-section article {
            opacity: 1 !important;
            transform: none !important;
          }

          .partner-report details > :not(summary) {
            display: block !important;
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
