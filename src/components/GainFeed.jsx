import { useEffect, useState } from 'react';
import './gainFeed.css';

export default function GainFeed({ active, gain, ticking }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!ticking || !active) return;

    const id = setInterval(() => {
      spawnMessage(gain);
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, gain, active]);

  function spawnMessage(value) {
    const id = crypto.randomUUID();
    const offsetX = Math.random() * 10 - 5;

    setMessages((ms) => [...ms, { id, value, offsetX }]);

    setTimeout(() => {
      setMessages((ms) => ms.filter((m) => m.id !== id));
    }, 900);
  }

  return (
    <div className="gain-feed">
      {messages.map((m) => (
        <div key={m.id} className="gain-msg" style={{ left: `${m.offsetX}px` }}>
          <span className="gain-text">+{m.value}</span>
        </div>
      ))}
    </div>
  );
}
