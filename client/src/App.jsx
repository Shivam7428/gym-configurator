import Configurator from './components/Configurator.jsx';

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <span className="wordmark">IRONCLAD</span>
        <span className="tagline">Membership Configurator</span>
      </header>
      <Configurator />
      <footer className="site-footer">
        Built with React + Express — sample project, not a real gym.
      </footer>
    </div>
  );
}
