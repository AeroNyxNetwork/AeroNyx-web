/**
 * ============================================================================
 * File: lib/external-links.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] Every off-site destination the
 * homepage points at, in one place.
 *
 * app.aeronyx.network is one address with two doors, and the homepage has to
 * show both: `/` is the chooser, `/chat` is the browser chat (sign in by
 * scanning with the app), `/dashboard` is the node operator console (browser
 * wallet signature). Linking the precise door matters — an operator reading
 * "Run a node" should land on the dashboard, not on a menu.
 *
 * Keep the doc links pointing at the canonical pages on docs.aeronyx.network;
 * that content lives in the Django docs app, not in this repo.
 * ============================================================================
 */

/** app.aeronyx.network — the chooser: browser chat or node dashboard. */
export const WEB_APP = 'https://app.aeronyx.network/';
/** Browser chat. Unauthenticated it shows the phone-scan sign-in. */
export const WEB_CHAT = 'https://app.aeronyx.network/chat';
/** Node operator console: nodes, traffic, earnings. */
export const NODEBOARD = 'https://app.aeronyx.network/dashboard';

export const DOCS = 'https://docs.aeronyx.network/';
export const NODE_GUIDE = 'https://docs.aeronyx.network/node-operators/rust-node-operations-and-health-checks';
export const ARCHITECTURE_DOCS = 'https://docs.aeronyx.network/intro/aeronyx-app-and-protocol-architecture';

export const CONTACT = 'mailto:hi@aeronyx.network';

/**
 * The canonical privacy policy, also linked from the footer. The download
 * notice points here because that is where jurisdiction and data-handling can
 * be stated precisely and reviewed; a modal gets one sentence, not a policy.
 */
export const PRIVACY_POLICY = 'https://docs.aeronyx.network/articles/aeronyx-privacy-policy';

/**
 * [NYXI-WEB 2026-10-06 by Claude] Nyxi (小霓) — the official character, served
 * from the app's own sticker CDN so the site and the app always show the same
 * bytes. Owner rule: never alter, re-encode or redraw these, and ask before
 * needing anything larger than 512 px. That is also why the site renders them
 * with a plain <img> and not next/image, which would re-encode them.
 *
 * Measured 2026-10-06:
 *   - every file is 512×512 with alpha; the character occupies 340×319 of it,
 *     feet at y≈441, with 122 px of headroom kept for raised arms;
 *   - every pose's clip is 72 frames at 24 fps and loops on itself;
 *   - NYXI_REST and frame 0 of a clip are the same picture (mean difference
 *     0.72/255 when both are composited on the same background), so swapping
 *     the still for a clip, or one clip for another, starts without a jump.
 */
export const NYXI_ASSET_BASE = 'https://binary.aeronyx.network/stickers/fang/v2';
/** The still: 512×512, transparent, ~89 KB. */
export const NYXI_REST = `${NYXI_ASSET_BASE}/idle/00.png`;
/** A pose's looping clip: animated WebP, 512×512, ~650–800 KB. */
export const nyxiClip = (pose) => `${NYXI_ASSET_BASE}/${pose}/anim.webp`;
/** The eight expressive poses, in the order the app's sticker panel shows them. */
export const NYXI_POSES = Object.freeze(['grin', 'laugh', 'wink', 'peek', 'bite', 'hop', 'love', 'pout']);
