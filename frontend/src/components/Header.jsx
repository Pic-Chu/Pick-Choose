import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">SaaS Platform</div>
      <nav className="space-x-4">
        <Link to="/">Accueil</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/register">Inscription</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
