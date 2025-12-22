import './BoostButton.css';

export default function BoostButton({ boost, count, onBuy }) {
  const { id, cost, bought, type } = boost;

  const disabled = bought || count < cost;

  return (
    <button onClick={() => onBuy(id)} disabled={disabled} className={`boost-button ${bought ? 'bought' : ''}`}>
      {bought ? (
        <span>
          <span className="boost-button-label">{id}</span>
        </span>
      ) : (
        <span>
          <span className="boost-button-label">{id}</span>
          <span className="boost-button-cost">cost: {cost}</span>
        </span>
      )}
    </button>
  );
}
