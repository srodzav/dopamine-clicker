import { useState, useEffect, useRef } from 'react';
import './ProgressBar.css';

export default function ProgressBar({ onGain }) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(null);
  const onGainRef = useRef(onGain);

  // save actual version of onGain
  useEffect(() => {
    onGainRef.current = onGain;
  }, [onGain]);

  // 2 - 6 random minutes of progress bar duration
  const getRandomDuration = () => {
    const minMinutes = 2;
    const maxMinutes = 6;
    const randomMinutes = Math.random() * (maxMinutes - minMinutes) + minMinutes;
    return randomMinutes * 60 * 1000; // ms
  };

  // initialization
  useEffect(() => {
    setDuration(getRandomDuration());
  }, []);

  useEffect(() => {
    if (duration === null) return;

    const startTime = Date.now();
    const interval = 50; // every 50ms to keep it smooth

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        // give +10 to onGain
        onGainRef.current(10);

        // event to GainFeed component
        window.dispatchEvent(
          new CustomEvent('GAIN_MESSAGE', {
            detail: {
              value: 50,
              type: 'progress',
            },
          })
        );

        // restart
        setTimeout(() => {
          setProgress(0);
          setDuration(getRandomDuration());
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  if (duration === null) return null;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-row">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-percentage">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}
