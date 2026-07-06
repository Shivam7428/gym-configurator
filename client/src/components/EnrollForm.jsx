import { useState } from 'react';

export default function EnrollForm({ selectedPlan, onEnroll, status }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onEnroll({ name: name.trim(), email: email.trim() });
  };

  return (
    <form className="enroll-form" onSubmit={handleSubmit}>
      <h3 className="enroll-form__title">Lock in your plan</h3>

      {selectedPlan ? (
        <p className="enroll-form__selection">
          Enrolling in <strong>{selectedPlan.name}</strong> — ₹
          {selectedPlan.price.toLocaleString('en-IN')} {selectedPlan.billingCycle}
        </p>
      ) : (
        <p className="enroll-form__selection enroll-form__selection--empty">
          Pick a plan above to continue.
        </p>
      )}

      <label className="field">
        <span>Full name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Shivam Singh"
          required
        />
      </label>

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <button type="submit" className="enroll-form__submit" disabled={!selectedPlan || status === 'loading'}>
        {status === 'loading' ? 'Enrolling…' : 'Confirm enrollment'}
      </button>

      {status === 'success' && (
        <p className="enroll-form__message enroll-form__message--success">
          Enrollment confirmed. Welcome to IRONCLAD.
        </p>
      )}
      {status === 'error' && (
        <p className="enroll-form__message enroll-form__message--error">
          Something went wrong. Check the server is running and try again.
        </p>
      )}
    </form>
  );
}
