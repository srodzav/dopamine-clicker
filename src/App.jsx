import { useState, useEffect } from 'react';
import Button from './components/Button';
import BoostButton from './components/BoostButton';
import GainFeed from './components/GainFeed';
import DvdLogo from './components/visuals/DvdLogo';
import { BOOSTS } from './data/boosts';
import './App.css';

function App() {
  // main variables, count for points
  const [count, setCount] = useState(0);
  // ticking boolean flag to start the game
  const [ticking, setTicking] = useState(false);
  // start boolean flag
  const [started, setStarted] = useState(false);
  // boosts is the array of objects of boosts
  const [boosts, setBoosts] = useState(BOOSTS.map((b) => ({ ...b, bought: false })));
  // multiplier is the main changer of points
  const multiplier = Math.max(1, ...boosts.filter((b) => b.bought && b.type === 'multiplier').map((b) => b.factor));
  // gain formula
  const gain = 1 * multiplier;

  // game start and core game
  useEffect(() => {
    if (!ticking) return;

    const id = setInterval(() => {
      setCount((c) => c + gain);
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, gain]);

  // buy function
  function buyBoost(id) {
    const boost = boosts.find((b) => b.id === id);
    if (!boost || boost.bought || count < boost.cost) return;

    setCount((c) => c - boost.cost);
    setBoosts((bs) => bs.map((b) => (b.id === id ? { ...b, bought: true } : b)));
  }

  // check if a boost is already unlocked
  function isUnlocked(boost) {
    if (!boost.requires) return true;

    return boosts.find((b) => b.id === boost.requires)?.bought;
  }

  // never ending wip ui
  return (
    <>
      {/* main button */}
      <div className="hud">
        <GainFeed active={started} gain={gain} ticking={ticking} />
      </div>
      <div className="card">
        <Button
          onClick={(e) => {
            e.currentTarget.blur();
            setTicking(true);
            setStarted(true);
            setCount((c) => c + gain);
          }}>
          {started ? count : 'click me'}
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
