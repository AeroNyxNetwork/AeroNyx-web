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
