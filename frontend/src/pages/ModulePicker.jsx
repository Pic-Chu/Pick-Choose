import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Importer tous les configs manuellement
import referral from "../modules/referral/config";
import booking from "../modules/booking/config";
import ecommerce from "../modules/ecommerce/config";

const allModules = [referral, booking, ecommerce];

export default function ModulePicker() {
  const [activeModules, setActiveModules] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    const fetchModules = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setActiveModules(data.modules || {});
      }
    };
    fetchModules();
  }, [user]);

  const toggleModule = async (id) => {
    const updated = {
      ...activeModules,
      [id]: !activeModules[id],
    };
    setActiveModules(updated);
    await setDoc(doc(db, "users", user.uid), { modules: updated }, { merge: true });
  };

  const total = allModules.reduce((acc, mod) => acc + (activeModules[mod.id] ? mod.price : 0), 0);
    const totalPrice = Object.values(activeModules).reduce((acc, isActive) => acc + (isActive ? 1 : 0), 0);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Choisissez vos modules</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allModules.map((mod) => (
            <div key={mod.id} className="border rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{mod.name}</h2>
              <p className="text-gray-600">{mod.description}</p>
              <p className="text-sm mt-1">Prix : {mod.price} €/mois</p>
              <button
                className={`mt-2 px-4 py-2 rounded text-white ${activeModules[mod.id] ? "bg-red-600" : "bg-green-600"}`}
                onClick={() => toggleModule(mod.id)}
              >
                {activeModules[mod.id] ? "Désactiver" : "Activer"}
              </button>
            </div>
      
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Total : {total} €</h2>
        <p className="text-sm text-gray-600">Total d'activation : {totalPrice} modules</p>
      </div>
    </>
  );
}
