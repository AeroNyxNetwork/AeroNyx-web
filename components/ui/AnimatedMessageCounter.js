/**
 * ============================================
 * File: components/ui/AnimatedMessageCounter.jsx
 * ============================================
 * Modification Reason: v2.0 — Brand + interface pass.
 *   1. FIX (brand): pulse label color was green rgba(134,239,172,·) —
 *      violates the homepage "no green" rule (NarrativeHero header).
 *      Now brand light purple.
 *   2. FIX (interface): pages/index.js passes a `defaultStep` prop that
 *      this component silently ignored. Now formally accepted; used as
 *      the minimum granularity for jittered live increments so byte
 *      counters step in ~KB units instead of single bytes.
 *   3. Pulse animation timing now uses the shared motion tokens.
 *
 * Main Functionality:
 *   - Displays a live-growing formatted metric. Real values sync from
 *     the API (~30s); between syncs the component extrapolates small
 *     jittered increments from the observed growth rate, so the number
 *     feels alive without ever exceeding plausible reality by design
 *     (never decreases below a fresher API value).
 *
 * Dependencies:
 *   - Consumed by pages/index.js (HomeNetworkStats items)
 *   - Props: value, fallback, suffix, pulseLabel, defaultStep
 *
 * Main Logical Flow:
 *   1. New `value` prop → compute delta vs previous sync → rate/sec
 *   2. rAF-free timer loop emits jittered increments scaled by rate
 *   3. Fit-to-container font sizing via hidden measurer + ResizeObserver
 *
 * ⚠️ Important Notes for Next Developer:
 *   - displayValue must never move backwards between syncs except when
 *     a fresher API value is lower (authoritative reset). Keep the
 *     Math.max logic in the value effect.
 *   - Do not reintroduce green for the pulse; ok-state color is purple.
 *
 * Last Modified: v2.0 — Purple pulse, defaultStep support
 * ============================================
 */

import { useEffect, useMemo, useRef, useState } from 'react';

const MAX_VALUE_FONT_SIZE = 44;
const MIN_VALUE_FONT_SIZE = 18;

const normalizeValue = (value) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }
  return Math.max(0, Math.floor(value));
};

const formatFullValue = (value) => (
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value)
);

const formatPulseValue = (value) => {
  if (value <= 0) {
    return null;
  }
  return formatFullValue(value);
};

const randomBetween = (min, max) => (
  min + Math.random() * (max - min)
);

/**
 * Estimate a plausible increment for one pulse window.
 * v2.0: `minStep` (from the defaultStep prop) sets granularity — byte
 * counters pulse in ~KB chunks, packet counters in single packets.
 */
const estimateJitteredStep = (ratePerSecond, delayMs, minStep = 1) => {
  if (ratePerSecond <= 0) {
    return 0;
  }

  const expected = ratePerSecond * (delayMs / 1000) * randomBetween(0.35, 1.75);
  const whole = Math.floor(expected);

  if (whole >= minStep) {
    // Snap to minStep granularity so large-unit metrics look natural.
    return Math.floor(whole / minStep) * minStep;
  }

  // Probabilistic single-minStep pulse for slow rates.
  return Math.random() < expected / minStep ? minStep : 0;
};

const AnimatedMessageCounter = ({
  value,
  fallback = 'Syncing',
  suffix = '',
  pulseLabel = 'last sync',
  defaultStep = 1,
}) => {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(
    normalizeValue(value)
  );
  const [ratePerSecond, setRatePerSecond] = useState(0);
  const [pulseAmount, setPulseAmount] = useState(0);
  const [valueFontSize, setValueFontSize] = useState(MAX_VALUE_FONT_SIZE);
  const [tick, setTick] = useState(0);
  const previousValueRef = useRef(normalizeValue(value));
  const previousSyncAtRef = useRef(Date.now());
  const hasSyncedRef = useRef(false);
  const hasObservedGrowthRef = useRef(false);
  const pulseKeyRef = useRef(0);
  const hasDisplayValue = typeof displayValue === 'number';

  useEffect(() => {
    const normalizedValue = normalizeValue(value);

    if (normalizedValue === null) {
      return;
    }

    const now = Date.now();
    const previousValue = previousValueRef.current;
    const previousSyncAt = previousSyncAtRef.current;
    previousValueRef.current = normalizedValue;
    previousSyncAtRef.current = now;

    if (typeof previousValue === 'number' && hasSyncedRef.current) {
      const delta = normalizedValue - previousValue;
      const elapsedSeconds = Math.max(1, Math.round((now - previousSyncAt) / 1000));

      if (delta > 0) {
        hasObservedGrowthRef.current = true;
        setRatePerSecond(delta / elapsedSeconds);
      } else {
        setRatePerSecond(0);
        setPulseAmount(0);
      }
    } else {
      hasSyncedRef.current = true;
      setRatePerSecond(0);
    }

    setDisplayValue((current) => {
      if (typeof current !== 'number') {
        return normalizedValue;
      }

      if (
        typeof previousValue === 'number'
        && hasSyncedRef.current
        && normalizedValue <= previousValue
      ) {
        return normalizedValue;
      }

      return Math.max(current, normalizedValue);
    });
  }, [value]);

  useEffect(() => {
    if (!hasDisplayValue || ratePerSecond <= 0 || !hasObservedGrowthRef.current) {
      return undefined;
    }

    let stopped = false;
    let timer = null;

    const scheduleNextPulse = () => {
      const delayMs = randomBetween(700, 1900);

      timer = window.setTimeout(() => {
        if (stopped) {
          return;
        }

        const step = estimateJitteredStep(ratePerSecond, delayMs, Math.max(1, defaultStep));

        if (step > 0) {
          pulseKeyRef.current += 1;
          setDisplayValue((current) => (
            typeof current === 'number'
              ? current + step
              : current
          ));
          setPulseAmount(step);
          setTick(pulseKeyRef.current);
        }

        scheduleNextPulse();
      }, delayMs);
    };

    scheduleNextPulse();

    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [hasDisplayValue, ratePerSecond, defaultStep]);

  const displayMeta = useMemo(
    () => {
      const normalizedValue = normalizeValue(displayValue);

      if (normalizedValue === null) {
        return null;
      }

      const unit = suffix ? ` ${suffix}` : '';

      return {
        value: formatFullValue(normalizedValue),
        unit: suffix,
        full: `${formatFullValue(normalizedValue)}${unit}`,
      };
    },
    [displayValue, suffix]
  );
  const pulseValue = formatPulseValue(pulseAmount);

  useEffect(() => {
    if (!displayMeta || !containerRef.current || !measureRef.current) {
      return undefined;
    }

    let animationFrame = null;

    const fitValueToContainer = () => {
      if (!containerRef.current || !measureRef.current) {
        return;
      }

      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const measuredWidth = measureRef.current.scrollWidth;

      if (!containerWidth || !measuredWidth) {
        return;
      }

      const availableWidth = Math.max(120, containerWidth - 2);
      const nextFontSize = Math.max(
        MIN_VALUE_FONT_SIZE,
        Math.min(
          MAX_VALUE_FONT_SIZE,
          Math.floor((availableWidth / measuredWidth) * MAX_VALUE_FONT_SIZE)
        )
      );

      setValueFontSize(nextFontSize);
    };

    const scheduleFit = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(fitValueToContainer);
    };

    scheduleFit();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(scheduleFit)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', scheduleFit);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', scheduleFit);
      }
    };
  }, [displayMeta]);

  if (!displayMeta) {
    return fallback;
  }

  return (
    <span ref={containerRef} className="metric-counter tabular-nums" title={displayMeta.full}>
      <span
        className="metric-line"
        style={{ '--metric-value-size': `${valueFontSize}px` }}
      >
        <span className="metric-value">{displayMeta.value}</span>
        {displayMeta.unit ? (
          <span className="metric-unit">{displayMeta.unit}</span>
        ) : null}
      </span>
      <span ref={measureRef} className="metric-measure" aria-hidden="true">
        <span className="metric-value">{displayMeta.value}</span>
        {displayMeta.unit ? (
          <span className="metric-unit">{displayMeta.unit}</span>
        ) : null}
      </span>
      {pulseValue ? (
        <span
          key={tick}
          className="metric-pulse"
        >
          {pulseLabel} +{pulseValue}{suffix ? ` ${suffix}` : ''}
        </span>
      ) : null}
      <style jsx>{`
        .metric-counter {
          position: relative;
          display: block;
          min-width: 0;
          max-width: 100%;
          line-height: 1;
        }

        .metric-line,
        .metric-measure {
          display: inline-flex;
          max-width: 100%;
          align-items: baseline;
          gap: 0.45rem;
          white-space: nowrap;
        }

        .metric-line {
          min-width: 0;
        }

        .metric-measure {
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
          visibility: hidden;
        }

        .metric-value {
          font-size: var(--metric-value-size, ${MAX_VALUE_FONT_SIZE}px);
          line-height: 0.95;
          white-space: nowrap;
        }

        .metric-unit {
          flex: 0 0 auto;
          color: rgba(255, 255, 255, 0.55);
          font-size: max(0.72rem, calc(var(--metric-value-size, ${MAX_VALUE_FONT_SIZE}px) * 0.3));
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* v2.0: brand light purple — the green pulse violated the
           homepage "no green" brand rule. */
        .metric-pulse {
          display: block;
          margin-top: 0.35rem;
          animation: metricPulse 1.2s var(--ease-out-brand, ease-out);
          color: rgba(151, 136, 247, 0.9);
          font-size: clamp(0.68rem, 1.2vw, 0.82rem);
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        @keyframes metricPulse {
          0% {
            opacity: 0;
            transform: translateY(0.2rem);
          }
          18% {
            opacity: 1;
            transform: translateY(0);
          }
          70% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-0.25rem);
          }
        }
      `}</style>
    </span>
  );
};

export default AnimatedMessageCounter;
