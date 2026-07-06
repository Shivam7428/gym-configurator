import { useEffect, useState } from 'react';
import PlanCard from './PlanCard.jsx';
import EnrollForm from './EnrollForm.jsx';

const API_BASE = '/api';

export default function Configurator() {
  const [plans, setPlans] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    fetch(`${API_BASE}/plans`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load plans');
        return res.json();
      })
      .then((data) => {
        setPlans(data);
        setSelectedId(data[0]?.id ?? null);
      })
      .catch(() => setLoadError(true));
  }, []);

  const selectedPlan = plans.find((p) => p.id === selectedId) ?? null;

  const handleEnroll = async ({ name, email }) => {
    setEnrollStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, planId: selectedId }),
      });
      if (!res.ok) throw new Error('Enrollment failed');
      setEnrollStatus('success');
    } catch {
      setEnrollStatus('error');
    }
  };

  if (loadError) {
    return (
      <p className="load-error">
        Couldn't reach the API. Make sure the Express server is running on port 5000.
      </p>
    );
  }

  return (
    <main className="configurator">
      <section className="plan-grid" aria-label="Membership plans">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={plan.id === selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setEnrollStatus('idle');
            }}
          />
        ))}
      </section>

      <EnrollForm selectedPlan={selectedPlan} onEnroll={handleEnroll} status={enrollStatus} />
    </main>
  );
}
