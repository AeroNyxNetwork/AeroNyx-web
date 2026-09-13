/**
 * ============================================================================
 * File: components/ui/RouteDiagram.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] The mechanism, drawn: a sealed
 * envelope leaves your phone, is handed along by two nodes that cannot open
 * it, and is opened by the person it was meant for. Used by HowItWorks (and
 * as the quiet backdrop of RunANode).
 *
 * Why SMIL and not a JS animation loop:
 *   The old JoinNetwork visuals were framer-motion loops (orbiting dots, a
 *   60-second rotating ring, random background lines regenerated per mount).
 *   They looked generic, jittered on step changes, and depended on the JS
 *   bundle. <animateMotion> is native SVG, runs without JavaScript, is
 *   supported by every browser this site targets, and pauses at each stop so
 *   the eye can read the labels. With prefers-reduced-motion the envelope is
 *   drawn at rest between the two nodes and nothing moves.
 *
 * Everything scales with the viewBox; labels come from copy so every locale
 * reads its own words.
 * ============================================================================
 */

const NYX = '#7462F7';
const NYX_LT = '#A594FF';
const CYAN = '#00C2E0';
const SIGNAL = '#14F195';

// Stops along the route, in viewBox units.
const STOPS = { you: 70, nodeA: 250, nodeB: 410, them: 590 };
const Y = 74;
const DUR = '7.5s';

function Envelope({ x, y }) {
  return (
    <g transform={`translate(${x - 15}, ${y - 11})`}>
      <rect width="30" height="22" rx="6" fill={NYX} />
      <rect x="10.5" y="9" width="9" height="7" rx="1.6" fill="none" stroke="#fff" strokeWidth="1.4" />
      <path d="M12.3 9V7.4a2.7 2.7 0 0 1 5.4 0V9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

export default function RouteDiagram({ labels, reduced = false, compact = false, className = '' }) {
  const l = {
    you: 'You', node: 'Node', them: 'Them', sealed: 'sealed', carried: 'carried', opened: 'opened',
    ...(labels || {}),
  };
  const nodeStroke = 'rgba(165,148,255,0.45)';

  return (
    <svg
      viewBox="0 0 660 150"
      className={`block w-full ${className}`}
      role="img"
      aria-label={`${l.you} → ${l.node} → ${l.node} → ${l.them}`}
      style={{ maxHeight: compact ? 120 : 190 }}
    >
      <defs>
        <linearGradient id="ng-route-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="0.5" stopColor="rgba(165,148,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>

      {/* The route itself */}
      <line x1={STOPS.you} y1={Y} x2={STOPS.them} y2={Y} stroke="url(#ng-route-line)" strokeWidth="1.5" />

      {/* You — a phone */}
      <g transform={`translate(${STOPS.you}, ${Y})`}>
        <rect x="-14" y="-24" width="28" height="48" rx="8" fill="#0D0D1C" stroke={nodeStroke} strokeWidth="1.25" />
        <rect x="-6" y="-19" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
        <circle cx="0" cy="16" r="2.5" fill={SIGNAL} />
      </g>

      {/* Two nodes — they light up as the envelope passes */}
      {[STOPS.nodeA, STOPS.nodeB].map((x, i) => (
        <g key={x} transform={`translate(${x}, ${Y})`}>
          <circle r="17" fill="#0D0D1C" stroke={nodeStroke} strokeWidth="1.25" />
          <circle r="4" fill={NYX_LT}>
            {!reduced && (
              <animate
                attributeName="opacity"
                values="0.35;0.35;1;1;0.35;0.35"
                keyTimes={i === 0 ? '0;0.24;0.3;0.38;0.44;1' : '0;0.52;0.58;0.66;0.72;1'}
                dur={DUR}
                repeatCount="indefinite"
              />
            )}
          </circle>
          {/* a node keeps a size + next hop, never a name: a mono-ish tick */}
          <path d="M-6 9h12" stroke="rgba(0,194,224,0.5)" strokeWidth="1.25" strokeLinecap="round" />
        </g>
      ))}

      {/* Them — a person */}
      <g transform={`translate(${STOPS.them}, ${Y})`}>
        <circle r="17" fill="#0D0D1C" stroke={nodeStroke} strokeWidth="1.25" />
        <circle cy="-4" r="4.5" fill="none" stroke={NYX_LT} strokeWidth="1.5" />
        <path d="M-8 11c0-4.5 3.6-7 8-7s8 2.5 8 7" fill="none" stroke={NYX_LT} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* The envelope. Pauses on each node, opens at the end (fill fades to cyan). */}
      {reduced ? (
        <Envelope x={(STOPS.nodeA + STOPS.nodeB) / 2} y={Y - 30} />
      ) : (
        <g>
          <animateMotion
            dur={DUR}
            repeatCount="indefinite"
            calcMode="linear"
            keyPoints="0;0.34;0.34;0.65;0.65;1;1"
            keyTimes="0;0.24;0.38;0.52;0.66;0.9;1"
            path={`M${STOPS.you},${Y - 30} L${STOPS.them},${Y - 30}`}
          />
          <g transform="translate(-15, -11)">
            <rect width="30" height="22" rx="6" fill={NYX}>
              <animate attributeName="fill" values={`${NYX};${NYX};${NYX};${CYAN};${NYX}`} keyTimes="0;0.86;0.9;0.97;1" dur={DUR} repeatCount="indefinite" />
            </rect>
            <rect x="10.5" y="9" width="9" height="7" rx="1.6" fill="none" stroke="#fff" strokeWidth="1.4" />
            <path d="M12.3 9V7.4a2.7 2.7 0 0 1 5.4 0V9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
              <animate attributeName="opacity" values="1;1;0.2;1" keyTimes="0;0.9;0.96;1" dur={DUR} repeatCount="indefinite" />
            </path>
          </g>
        </g>
      )}

      {/* Labels */}
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
