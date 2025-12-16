import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  // main variables, count for points
  const [count, setCount] = useState(0);
  // ticking boolean flag to start the game
  const [ticking, setTicking] = useState(false);
  // boosts is the array of objects of boosts
  const [boosts, setBoosts] = useState([
    { id: 'x2', cost: 10, factor: 2, bought: false },
    { id: 'x3', cost: 40, factor: 3, bought: false, requires: 'x2' },
    { id: 'x5', cost: 100, factor: 5, bought: false, requires: 'x3' },
    { id: 'auto', cost: 200, factor: 1, bought: false, requires: 'x3' },
  ]);
  // multiplier is the main changer of points
  const multiplier = boosts.reduce((m, b) => (b.bought ? m * b.factor : m), 1);

  // game start and core game
  useEffect(() => {
    if (!ticking) return;
    const increment = 1 * multiplier;
    const id = setInterval(() => {
      setCount((c) => c + increment);
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

  // wip ui
  return (
    <>
      <h1>Click</h1>
      <div className="card">
        <Button
          onClick={(e) => {
            e.currentTarget.blur();
            setTicking(true);
          }}>
          {count}
        </Button>
      </div>
      {boosts.filter(isUnlocked).map((b) => (
        <button key={b.id} onClick={() => buyBoost(b.id)} disabled={count < b.cost || b.bought}>
          buy {b.id} (cost: {b.cost})
        </button>
      ))}
    </>
  );
}

export default App;
