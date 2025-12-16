export default function BoostButton({ boost, count, onBuy }) {
  const { id, cost, bought, type } = boost;

  const disabled = bought || count < cost;

  return (
    <button onClick={() => onBuy(id)} disabled={disabled}>
      {bought ? (
        <span>✓ {id} bought</span>
      ) : (
        <span>
          buy {id} cost: {cost}
        </span>
      )}
    </button>
  );
}
