import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/dashboard">PickChoose</Link>
      </div>

      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:underline text-gray-700">🏠 Dashboard</Link>
        <Link to="/modules" className="hover:underline text-gray-700">🧩 Modules</Link>
        <Link to="/provision" className="hover:underline text-gray-700">🛠️ Commander mon site</Link>
        <Link to="/support" className="hover:underline text-gray-700">📞 Contact</Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          Déconnexion
        </button>
      </nav>
    </header>
  );
}
