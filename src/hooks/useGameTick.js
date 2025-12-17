import { useEffect } from 'react';

export default function useGameTick({ ticking, gain, onTick }) {
  useEffect(() => {
    if (!ticking) return;

    const id = setInterval(() => {
      onTick(gain);
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, gain, onTick]);
}
