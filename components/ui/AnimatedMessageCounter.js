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

const formatCompactValue = (value) => {
  const raw = String(value);

  if (raw.length < 6) {
    return raw;
  }

  return `${raw.slice(0, 3)}...${raw.slice(-2)}`;
};

const formatPulseValue = (value) => {
  if (value <= 0) {
    return null;
  }

  if (value < 10) {
    return `0${value}`;
  }

  if (value < 100000) {
    return String(value);
  }

  return formatCompactValue(value);
};

const AnimatedMessageCounter = ({
  value,
  fallback = 'Syncing',
  suffix = '',
  defaultStep = 1,
}) => {
  const [displayValue, setDisplayValue] = useState(
    normalizeValue(value)
  );
  const [stepPerSecond, setStepPerSecond] = useState(defaultStep);
  const [tick, setTick] = useState(0);
  const previousValueRef = useRef(normalizeValue(value));
  const previousSyncAtRef = useRef(Date.now());
  const hasSyncedRef = useRef(false);
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
        setStepPerSecond(Math.max(1, Math.floor(delta / elapsedSeconds)));
      } else {
        setStepPerSecond(0);
      }
    } else {
      hasSyncedRef.current = true;
      setStepPerSecond(Math.max(0, defaultStep));
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
  }, [defaultStep, value]);

  useEffect(() => {
    if (!hasDisplayValue || stepPerSecond <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      pulseKeyRef.current += 1;
      setDisplayValue((current) => (
        typeof current === 'number'
          ? Math.max(current + stepPerSecond, (previousValueRef.current || 0) + stepPerSecond)
          : current
      ));
      setTick(pulseKeyRef.current);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [hasDisplayValue, stepPerSecond]);

  const displayMeta = useMemo(
    () => {
      const normalizedValue = normalizeValue(displayValue);

      if (normalizedValue === null) {
        return null;
      }

      const unit = suffix ? ` ${suffix}` : '';

      return {
        compact: `${formatCompactValue(normalizedValue)}${unit}`,
        full: `${formatFullValue(normalizedValue)}${unit}`,
      };
    },
    [displayValue, suffix]
  );
  const pulseValue = formatPulseValue(stepPerSecond);

  if (!displayMeta) {
    return fallback;
  }

  return (
    <span className="inline-flex min-w-[9ch] items-baseline gap-2 tabular-nums" title={displayMeta.full}>
      <span>{displayMeta.compact}</span>
      {pulseValue ? (
        <span
          key={tick}
          className="translate-y-[-0.1em] animate-[metricPulse_1s_ease-out] text-sm font-normal text-green-300 md:text-base"
        >
          +{pulseValue}{suffix ? ` ${suffix}` : ''}
        </span>
      ) : null}
      <style jsx>{`
        @keyframes metricPulse {
          0% {
            opacity: 0;
            transform: translateY(0.25rem);
          }
          18% {
            opacity: 1;
            transform: translateY(-0.1rem);
          }
          100% {
            opacity: 0;
            transform: translateY(-0.7rem);
          }
        }
      `}</style>
    </span>
  );
};

export default AnimatedMessageCounter;
