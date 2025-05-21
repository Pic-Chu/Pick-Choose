import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

// Import dynamique par ID
const moduleComponents = {
  referral: () => import("../modules/referral/index.jsx"),
  ecommerce: () => import("../modules/ecommerce/index.jsx"),
  booking: () => import("../modules/booking/index.jsx"),
};

export default function Dashboard() {
  const [activeModules, setActiveModules] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      const enabledModules = Object.entries(data?.modules || {})
        .filter(([_, isActive]) => isActive)
        .map(([id]) => id);

      setActiveModules(enabledModules);

      // Importation dynamique des composants
      const imports = await Promise.all(
        enabledModules.map((id) => moduleComponents[id]?.().then((mod) => mod.default))
      );
      setComponents(imports);
    };

    fetchModules();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {components.map((Component, i) => (
        <div key={i} className="mb-6 p-4 border rounded shadow bg-white">
          <Component />
        </div>
      ))}
    </div>
  );
}
