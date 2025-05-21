import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const allModules = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Vendez vos produits en ligne, avec Click & Collect ou livraison.",
    price: 15,
  },
  {
    id: "referral",
    name: "Parrainage",
    description: "Récompensez vos clients qui vous recommandent.",
    price: 5,
  },
  {
    id: "booking",
    name: "Prise de rendez-vous",
    description: "Vos clients réservent directement depuis votre site.",
    price: 10,
  },
];

export default function Modules() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchModules = async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, "clients", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setSelected(data.modules || {});
      }
      setLoading(false);
    };
    fetchModules();
  }, [user]);

  const handleToggle = async (id) => {
  const updated = {
    ...selected,
    [id]: !selected[id],
  };
  setSelected(updated);

  const user = auth.currentUser;
  const clientRef = doc(db, "clients", user.uid);
  const clientSnap = await getDoc(clientRef);
  const clientData = clientSnap.exists() ? clientSnap.data() : {};
  const previousActivity = clientData.activity || {};

  await setDoc(clientRef, {
    modules: updated,
    activity: {
      ...previousActivity,
      modules: [
        ...(previousActivity.modules || []),
        {
          id,
          date: new Date().toISOString(),
          action: updated[id] ? "activated" : "deactivated",
        },
      ],
    },
  }, { merge: true });
};


  const total = allModules.reduce((sum, mod) => sum + (selected[mod.id] ? mod.price : 0), 0);

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">🧩 Modules disponibles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allModules.map((mod) => (
          <div key={mod.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{mod.name}</h2>
            <p className="text-sm text-gray-600">{mod.description}</p>
            <p className="mt-1 text-sm font-bold">{mod.price} € / mois</p>
            <button
              onClick={() => handleToggle(mod.id)}
              className={`mt-3 w-full py-2 rounded text-white ${
                selected[mod.id] ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {selected[mod.id] ? "Désactiver" : "Activer"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-bold">
        Total mensuel : {total} €
      </div>
    </div>
  );
}
