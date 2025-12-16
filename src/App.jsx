import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [boosts, setBoosts] = useState([
    { id: 'x2', cost: 10, factor: 2, bought: false },
    { id: 'x3', cost: 50, factor: 3, bought: false },
  ]);
  const multiplier = boosts.reduce((m, b) => (b.bought ? m * b.factor : m), 1);

  useEffect(() => {
    if (!ticking) return;
    const increment = 1 * multiplier;
    const id = setInterval(() => {
      setCount((c) => c + increment);
    }, 1000);
    return () => clearInterval(id);
  }, [ticking, multiplier]);

  function buyBoost(boostId) {
    const boost = boosts.find((b) => b.id === boostId);
    if (!boost) return;
    if (boost.bought) return;
    if (count < boost.cost) return;

    setCount((c) => c - boost.cost);

    setBoosts((bs) => bs.map((b) => (b.id === boostId ? { ...b, bought: true } : b)));
  }

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
      <button
        onClick={(e) => {
          e.currentTarget.blur();
          buyBoost('x2');
        }}
        disabled={count < 10 || boosts.find((b) => b.id === 'x2').bought}>
        Comprar x2 (costo: 10)
      </button>
    </>
  );
}

export default App;
