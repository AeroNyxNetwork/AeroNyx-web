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
        compact: `${formatCompactValue(normalizedValue)}${unit}`,
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
