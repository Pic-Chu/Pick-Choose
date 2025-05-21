import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [clientData, setClientData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "clients", user.uid));
      if (snap.exists()) {
        setClientData(snap.data());
      }
    };

    fetchClient();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">🎛️ Tableau de bord</h1>

      {!clientData ? (
        <p>Chargement...</p>
      ) : (
        <>
          <p className="mb-2 text-gray-700">
            <strong>Entreprise :</strong> {clientData.businessName}
          </p>

          <h2 className="text-lg font-semibold mt-4 mb-2">📦 Modules activés</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {Object.entries(clientData.modules || {}).filter(([_, val]) => val).length === 0 ? (
              <li>Aucun module activé</li>
            ) : (
              Object.entries(clientData.modules || {})
                .filter(([_, val]) => val)
                .map(([mod]) => <li key={mod}>{mod}</li>)
            )}
          </ul>

          <div className="flex justify-between mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/modules")}
            >
              Gérer mes modules
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
