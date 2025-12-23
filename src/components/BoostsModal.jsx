import { useState } from 'react';
import BoostButton from './BoostButton';
import './BoostsModal.css';

export default function BoostsModal({ boosts, count, onBuy, isUnlocked }) {
  const [isOpen, setIsOpen] = useState(false);

  const unlockedBoosts = boosts.filter(isUnlocked);

  return (
    <>
      {/* stimulant triggers */}
      <button className="boosts-trigger" onClick={() => setIsOpen(!isOpen)}>
        dopamine
        {unlockedBoosts.some((b) => !b.bought && count >= b.cost) && <span className="boosts-badge" />}
      </button>

      {/* main modal */}
      {isOpen && (
        <>
          <div className="boosts-overlay" onClick={() => setIsOpen(false)} />
          <div className="boosts-drawer">
            <div className="boosts-header">
              <h2>dopamine boosts</h2>
              <button className="boosts-close" onClick={() => setIsOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="boosts-grid">
              {unlockedBoosts.map((b) => (
                <BoostButton key={b.id} boost={b} count={count} onBuy={onBuy} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
