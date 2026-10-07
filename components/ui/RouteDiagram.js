/**
 * ============================================================================
 * File: components/ui/RouteDiagram.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] The mechanism, drawn: a sealed
 * envelope leaves your phone, is handed along by two nodes that cannot open
 * it, and is opened by the person it was meant for. Used by HowItWorks and
 * /privacy-network.
 *
 * Why SMIL and not a JS animation loop:
 *   The old JoinNetwork visuals were framer-motion loops (orbiting dots, a
 *   60-second rotating ring, random background lines regenerated per mount).
 *   <animateMotion> is native SVG, runs without JavaScript, and pauses at each
 *   stop so the eye can read the labels. With prefers-reduced-motion the
 *   envelope is drawn at rest between the two nodes and nothing moves.
 *
 * 2026-10-07 mobile pass — two defects found by auditing the live site under
 * real phone emulation:
 *   1. ILLEGIBLE. One 660-wide viewBox was scaled to a 343 px column, which
 *      turned 12-unit labels into ~6 px text. Phones now get their own
 *      vertical layout (320-wide viewBox, labels at 16/12 units, drawn at
 *      ~1.07×), swapped by CSS at the `sm` breakpoint; both are server-
 *      rendered, so there is no layout jump or JS dependency.
 *   2. THE ROUTE LINE NEVER RENDERED. The connecting <line> used a gradient in
 *      the default objectBoundingBox units, but a perfectly horizontal (or
 *      vertical) line has a zero-height bounding box, and an
 *      objectBoundingBox paint server on a zero-size box paints nothing — in
 *      every browser. The gradients are now userSpaceOnUse.
 * ============================================================================
 */

const NYX = '#7462F7';
const NYX_LT = '#A594FF';
const CYAN = '#00C2E0';
const SIGNAL = '#14F195';
const NODE_STROKE = 'rgba(165,148,255,0.45)';
const DUR = '7.5s';

/* Timeline shared by both layouts (fractions of DUR). */
const PAUSE_KEYPOINTS = '0;0.34;0.34;0.65;0.65;1;1';
const PAUSE_KEYTIMES = '0;0.24;0.38;0.52;0.66;0.9;1';

const PhoneIcon = () => (
  <>
    <rect x="-14" y="-24" width="28" height="48" rx="8" fill="#0D0D1C" stroke={NODE_STROKE} strokeWidth="1.25" />
    <rect x="-6" y="-19" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
    <circle cx="0" cy="16" r="2.5" fill={SIGNAL} />
  </>
);

const NodeIcon = ({ index, reduced }) => (
  <>
    <circle r="17" fill="#0D0D1C" stroke={NODE_STROKE} strokeWidth="1.25" />
    <circle r="4" fill={NYX_LT}>
      {!reduced && (
        <animate
          attributeName="opacity"
          values="0.35;0.35;1;1;0.35;0.35"
          keyTimes={index === 0 ? '0;0.24;0.3;0.38;0.44;1' : '0;0.52;0.58;0.66;0.72;1'}
          dur={DUR}
          repeatCount="indefinite"
        />
      )}
    </circle>
    {/* a node keeps a size + next hop, never a name: a mono-ish tick */}
    <path d="M-6 9h12" stroke="rgba(0,194,224,0.5)" strokeWidth="1.25" strokeLinecap="round" />
  </>
);

const PersonIcon = () => (
  <>
    <circle r="17" fill="#0D0D1C" stroke={NODE_STROKE} strokeWidth="1.25" />
    <circle cy="-4" r="4.5" fill="none" stroke={NYX_LT} strokeWidth="1.5" />
    <path d="M-8 11c0-4.5 3.6-7 8-7s8 2.5 8 7" fill="none" stroke={NYX_LT} strokeWidth="1.5" strokeLinecap="round" />
  </>
);

/* The envelope itself, optionally animated along `path`. */
const Envelope = ({ reduced, path, restAt }) => {
  const body = (
    <>
      <rect width="30" height="22" rx="6" fill={NYX}>
        {!reduced && (
          <animate attributeName="fill" values={`${NYX};${NYX};${NYX};${CYAN};${NYX}`} keyTimes="0;0.86;0.9;0.97;1" dur={DUR} repeatCount="indefinite" />
        )}
      </rect>
      <rect x="10.5" y="9" width="9" height="7" rx="1.6" fill="none" stroke="#fff" strokeWidth="1.4" />
      <path d="M12.3 9V7.4a2.7 2.7 0 0 1 5.4 0V9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
        {!reduced && (
          <animate attributeName="opacity" values="1;1;0.2;1" keyTimes="0;0.9;0.96;1" dur={DUR} repeatCount="indefinite" />
        )}
      </path>
    </>
  );
  if (reduced) return <g transform={`translate(${restAt.x - 15}, ${restAt.y - 11})`}>{body}</g>;
  return (
    <g>
      <animateMotion dur={DUR} repeatCount="indefinite" calcMode="linear" keyPoints={PAUSE_KEYPOINTS} keyTimes={PAUSE_KEYTIMES} path={path} />
      <g transform="translate(-15, -11)">{body}</g>
    </g>
  );
};

/* ---- Wide screens: left → right ------------------------------------------ */
function Horizontal({ l, reduced, compact, className }) {
  const STOPS = { you: 70, nodeA: 250, nodeB: 410, them: 590 };
  const Y = 74;
  return (
    <svg
      viewBox="0 0 660 150"
      className={`hidden w-full sm:block ${className}`}
      role="img"
      aria-label={`${l.you} → ${l.node} → ${l.node} → ${l.them}`}
      style={{ maxHeight: compact ? 120 : 190 }}
    >
      <defs>
        {/* userSpaceOnUse: see the header — objectBoundingBox paints nothing on a zero-height line. */}
        <linearGradient id="ng-route-line-h" gradientUnits="userSpaceOnUse" x1={STOPS.you} y1={Y} x2={STOPS.them} y2={Y}>
          <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="0.5" stopColor="rgba(165,148,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>

      <line x1={STOPS.you} y1={Y} x2={STOPS.them} y2={Y} stroke="url(#ng-route-line-h)" strokeWidth="1.5" />

      <g transform={`translate(${STOPS.you}, ${Y})`}><PhoneIcon /></g>
      <g transform={`translate(${STOPS.nodeA}, ${Y})`}><NodeIcon index={0} reduced={reduced} /></g>
      <g transform={`translate(${STOPS.nodeB}, ${Y})`}><NodeIcon index={1} reduced={reduced} /></g>
      <g transform={`translate(${STOPS.them}, ${Y})`}><PersonIcon /></g>

      <Envelope
        reduced={reduced}
        path={`M${STOPS.you},${Y - 30} L${STOPS.them},${Y - 30}`}
        restAt={{ x: (STOPS.nodeA + STOPS.nodeB) / 2, y: Y - 30 }}
      />

      <g fontFamily="var(--font-sans), sans-serif" fontSize="12" textAnchor="middle" fill="rgba(255,255,255,0.72)">
        <text x={STOPS.you} y={Y + 46}>{l.you}</text>
        <text x={STOPS.nodeA} y={Y + 46}>{l.node}</text>
        <text x={STOPS.nodeB} y={Y + 46}>{l.node}</text>
        <text x={STOPS.them} y={Y + 46}>{l.them}</text>
      </g>
      <g fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.38)">
        <text x={STOPS.you} y={Y + 62}>{l.sealed}</text>
        <text x={STOPS.nodeA} y={Y + 62}>{l.carried}</text>
        <text x={STOPS.nodeB} y={Y + 62}>{l.carried}</text>
        <text x={STOPS.them} y={Y + 62} fill="rgba(0,194,224,0.75)">{l.opened}</text>
      </g>
    </svg>
  );
}

/* ---- Phones: top → bottom, labels beside each stop ------------------------ */
function Vertical({ l, reduced, className }) {
  const X = 64;                 // icon column
  const ENV_X = 114;            // the envelope travels beside the route, left of the labels
  const LABEL_X = 156;
  const STOPS = { you: 44, nodeA: 126, nodeB: 208, them: 290 };
  return (
    <svg
      viewBox="0 0 320 334"
      className={`block w-full sm:hidden ${className}`}
      role="img"
      aria-label={`${l.you} → ${l.node} → ${l.node} → ${l.them}`}
    >
      <defs>
        <linearGradient id="ng-route-line-v" gradientUnits="userSpaceOnUse" x1={X} y1={STOPS.you} x2={X} y2={STOPS.them}>
          <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="0.5" stopColor="rgba(165,148,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>

      <line x1={X} y1={STOPS.you} x2={X} y2={STOPS.them} stroke="url(#ng-route-line-v)" strokeWidth="1.5" />

      <g transform={`translate(${X}, ${STOPS.you})`}><PhoneIcon /></g>
      <g transform={`translate(${X}, ${STOPS.nodeA})`}><NodeIcon index={0} reduced={reduced} /></g>
      <g transform={`translate(${X}, ${STOPS.nodeB})`}><NodeIcon index={1} reduced={reduced} /></g>
      <g transform={`translate(${X}, ${STOPS.them})`}><PersonIcon /></g>

      <Envelope
        reduced={reduced}
        path={`M${ENV_X},${STOPS.you} L${ENV_X},${STOPS.them}`}
        restAt={{ x: ENV_X, y: (STOPS.nodeA + STOPS.nodeB) / 2 }}
      />

      {[
        ['you', l.you, l.sealed, STOPS.you, false],
        ['a', l.node, l.carried, STOPS.nodeA, false],
        ['b', l.node, l.carried, STOPS.nodeB, false],
        ['them', l.them, l.opened, STOPS.them, true],
      ].map(([key, name, state, y, last]) => (
        <g key={key}>
          <text x={LABEL_X} y={y - 1} fontFamily="var(--font-sans), sans-serif" fontSize="16" fontWeight="500" fill="rgba(255,255,255,0.82)">{name}</text>
          <text x={LABEL_X} y={y + 18} fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="12" fill={last ? 'rgba(0,194,224,0.8)' : 'rgba(255,255,255,0.42)'}>{state}</text>
        </g>
      ))}
    </svg>
  );
}

export default function RouteDiagram({ labels, reduced = false, compact = false, className = '' }) {
  const l = {
    you: 'You', node: 'Node', them: 'Them', sealed: 'sealed', carried: 'carried', opened: 'opened',
    ...(labels || {}),
  };
  return (
    <>
      <Horizontal l={l} reduced={reduced} compact={compact} className={className} />
      <Vertical l={l} reduced={reduced} className={className} />
    </>
  );
}
