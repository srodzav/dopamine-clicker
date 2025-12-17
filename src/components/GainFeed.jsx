import { useEffect, useState } from 'react';
import './gainFeed.css';

// +1 UI HUD
export default function GainFeed({ active, gain, ticking }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!ticking || !active) return;

    // every second you get +n
    const id = setInterval(() => {
      spawnMessage({ value: gain, type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, gain, active]);

  // listener of events
  useEffect(() => {
    function handleGain(e) {
      spawnMessage(e.detail);
    }

    window.addEventListener('GAIN_MESSAGE', handleGain);
    return () => window.removeEventListener('GAIN_MESSAGE', handleGain);
  }, []);

  function spawnMessage({ value, type = 'tick' }) {
    const id = crypto.randomUUID();
    // x/y offset to prevent same location
    const offsetX = Math.random() * 20 - 5;
    const offsetY = Math.random() * 20 - 5;

    setMessages((ms) => [...ms, { id, value, type, offsetX, offsetY }]);

    setTimeout(() => {
      setMessages((ms) => ms.filter((m) => m.id !== id));
    }, 900);
  }

  return (
    <div className="gain-feed">
      {messages.map((m) => (
        <div key={m.id} className="gain-msg" style={{ left: `${m.offsetX}px`, top: `${m.offsetY}px` }}>
          <span className={`gain-text gain-${m.type}`}>+{m.value}</span>
        </div>
      ))}
    </div>
  );
}
