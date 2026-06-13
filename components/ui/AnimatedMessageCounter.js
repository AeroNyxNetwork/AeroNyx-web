import { useEffect, useMemo, useRef, useState } from 'react';

const formatCount = (value) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.floor(value)));
};

const AnimatedMessageCounter = ({ value, fallback = 'Syncing' }) => {
  const [displayValue, setDisplayValue] = useState(
    typeof value === 'number' ? value : null
  );
  const [tick, setTick] = useState(0);
  const previousValueRef = useRef(typeof value === 'number' ? value : null);
  const pulseKeyRef = useRef(0);
  const hasDisplayValue = typeof displayValue === 'number';

  useEffect(() => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return;
    }

    const previousValue = previousValueRef.current;
    previousValueRef.current = value;
    setDisplayValue((current) => {
      if (typeof current !== 'number') {
        return value;
      }

      if (typeof previousValue === 'number' && value < previousValue) {
        return value;
      }

      return Math.max(current, value);
    });
  }, [value]);

  useEffect(() => {
    if (!hasDisplayValue) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      pulseKeyRef.current += 1;
      setDisplayValue((current) => (
        typeof current === 'number'
          ? Math.max(current + 1, (previousValueRef.current || 0) + 1)
          : current
      ));
      setTick(pulseKeyRef.current);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [hasDisplayValue]);

  const formattedValue = useMemo(
    () => formatCount(displayValue),
    [displayValue]
  );

  if (!formattedValue) {
    return fallback;
  }

  return (
    <span className="inline-flex items-baseline gap-2 tabular-nums">
      <span>{formattedValue}</span>
      <span
        key={tick}
        className="translate-y-[-0.1em] animate-[messagePulse_1s_ease-out] text-sm font-normal text-green-300 md:text-base"
      >
        +01
      </span>
      <style jsx>{`
        @keyframes messagePulse {
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
