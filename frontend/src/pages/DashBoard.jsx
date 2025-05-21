import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { availableModules } from "../modules";
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Bienvenue, {user?.email}</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Modules disponibles</h2>
        <ul className="mt-4 space-y-2">
          {availableModules.map((module) => (
            <li key={module.name} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{module.name}</h3>
              <p>{module.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
