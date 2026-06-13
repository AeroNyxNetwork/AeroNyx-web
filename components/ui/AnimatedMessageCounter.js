import { useEffect, useMemo, useRef, useState } from 'react';

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

const estimateJitteredStep = (ratePerSecond, delayMs) => {
  if (ratePerSecond <= 0) {
    return 0;
  }

  const expected = ratePerSecond * (delayMs / 1000) * randomBetween(0.35, 1.75);
  const whole = Math.floor(expected);

  if (whole > 0) {
    return whole;
  }

  return Math.random() < expected ? 1 : 0;
};

const AnimatedMessageCounter = ({
  value,
  fallback = 'Syncing',
  suffix = '',
  pulseLabel = 'last sync',
}) => {
  const [displayValue, setDisplayValue] = useState(
    normalizeValue(value)
  );
  const [ratePerSecond, setRatePerSecond] = useState(0);
  const [pulseAmount, setPulseAmount] = useState(0);
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

        const step = estimateJitteredStep(ratePerSecond, delayMs);

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
  }, [hasDisplayValue, ratePerSecond]);

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

  if (!displayMeta) {
    return fallback;
  }

  return (
    <span className="metric-counter tabular-nums" title={displayMeta.full}>
      <span className="metric-value">{displayMeta.value}</span>
      {displayMeta.unit ? (
        <span className="metric-unit">{displayMeta.unit}</span>
      ) : null}
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
          display: flex;
          min-width: 0;
          max-width: 100%;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.2rem 0.45rem;
          line-height: 1;
        }

        .metric-value {
          min-width: 0;
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: clamp(1.35rem, 4.4vw, 2.75rem);
          line-height: 0.95;
          white-space: normal;
        }

        .metric-unit {
          flex: 0 0 auto;
          color: rgba(255, 255, 255, 0.55);
          font-size: clamp(0.68rem, 1.2vw, 0.95rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .metric-pulse {
          flex-basis: 100%;
          animation: metricPulse 1.2s ease-out;
          color: rgba(134, 239, 172, 0.9);
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

        @media (max-width: 420px) {
          .metric-value {
            font-size: clamp(1.1rem, 8vw, 1.65rem);
          }
        }
      `}</style>
    </span>
  );
};

export default AnimatedMessageCounter;
