export default function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      className={`plan-card${isSelected ? ' plan-card--selected' : ''}`}
      onClick={() => onSelect(plan.id)}
      aria-pressed={isSelected}
    >
      <div className="plan-card__bar" aria-hidden="true">
        <span className="plan-card__sleeve" />
        {Array.from({ length: plan.plates }).map((_, i) => (
          <span key={i} className="plan-card__plate" />
        ))}
      </div>

      <h3 className="plan-card__name">{plan.name}</h3>

      <p className="plan-card__price">
        ₹{plan.price.toLocaleString('en-IN')}
        <span className="plan-card__cycle"> {plan.billingCycle}</span>
      </p>

      <ul className="plan-card__perks">
        {plan.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>

      <span className="plan-card__cta">
        {isSelected ? 'Selected' : 'Choose plan'}
      </span>
    </button>
  );
}
