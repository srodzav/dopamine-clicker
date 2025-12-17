import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import { BOOSTS } from './data/boosts';
import BoostButton from './components/BoostButton';
import DvdLogo from './components/visuals/DvdLogo';

function App() {
  // main variables, count for points
  const [count, setCount] = useState(0);
  // ticking boolean flag to start the game
  const [ticking, setTicking] = useState(false);
  // start boolean flag
  const [start, setStart] = useState(false);
  // boosts is the array of objects of boosts
  const [boosts, setBoosts] = useState(BOOSTS.map((b) => ({ ...b, bought: false })));
  // multiplier is the main changer of points
  const multiplier = Math.max(1, ...boosts.filter((b) => b.bought && b.type === 'multiplier').map((b) => b.factor));
  // +1 ui
  const [messages, setMessages] = useState([]);
  const gain = 1 * multiplier;

  // game start and core game
  useEffect(() => {
    if (!ticking) return;

    const id = setInterval(() => {
      setCount((c) => c + gain);
      spawnGainMessage(gain);
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, multiplier]);

  // buy function
  function buyBoost(boostId) {
    const boost = boosts.find((b) => b.id === boostId);
    if (!boost) return;
    if (boost.bought) return;
    if (count < boost.cost) return;

    setCount((c) => c - boost.cost);

    setBoosts((bs) => bs.map((b) => (b.id === boostId ? { ...b, bought: true } : b)));
  }

  // check if a boost is already unlocked
  function isUnlocked(boost) {
    if (!boost.requires) return true;
    const requiredBoost = boosts.find((b) => b.id === boost.requires);
    return requiredBoost?.bought;
  }

  // +1 ui loop
  function spawnGainMessage(value) {
    const id = crypto.randomUUID();
    const offsetX = Math.random() * 10 - 5;

    setMessages((ms) => [...ms, { id, value, offsetX }]);
    setTimeout(() => {
      setMessages((ms) => ms.filter((m) => m.id !== id));
    }, 900);
  }

  // wip ui
  return (
    <>
      {/* +1 message */}
      <div className="hud">
        {start ? (
          <div className="gain-feed">
            {messages.map((m) => (
              <div key={m.id} className="gain-msg" style={{ left: `${m.offsetX}px` }}>
                <span className="gain-text">+{m.value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* main button */}
      <div className="card">
        <Button
          onClick={(e) => {
            e.currentTarget.blur();
            setTicking(true);
            setStart(true);
            setCount((c) => c + gain);
          }}>
          {count ? count : 'click me'}
        </Button>
      </div>

      {/* list of perks/boosts */}
      {boosts.filter(isUnlocked).map((b) => (
        <BoostButton key={b.id} boost={b} count={count} onBuy={buyBoost} />
      ))}
      {boosts.some((b) => b.id === 'dvd' && b.bought) && <DvdLogo />}
    </>
  );
}

export default App;
