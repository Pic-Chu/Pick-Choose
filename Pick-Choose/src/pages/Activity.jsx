import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Activity() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "clients", user.uid));
      if (snap.exists()) {
        setActivity(snap.data().activity || {});
      }
    };

    fetchActivity();
  }, []);

  if (!activity) return <p className="p-6">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📜 Historique & Suivi</h1>

      <h2 className="text-lg font-semibold mt-4">Modules</h2>
      <ul className="list-disc pl-5 text-gray-700">
        {(activity.modules || []).map((m, i) => (
          <li key={i}>
            {m.date} — {m.id} : <strong>{m.status}</strong>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Provisioning</h2>
      <p>
        Statut :{" "}
        <strong>{activity.siteStatus?.status || "non commandé"}</strong>
      </p>
      {activity.siteStatus?.domain && (
        <p>
          Lien :{" "}
          <a href={activity.siteStatus.domain} className="text-blue-600 underline" target="_blank">
            {activity.siteStatus.domain}
          </a>
        </p>
      )}

      <h2 className="text-lg font-semibold mt-4">Contrats</h2>
      <ul className="list-disc pl-5 text-gray-700">
        {(activity.contractHistory || []).map((c, i) => (
          <li key={i}>
            {c.date} —{" "}
            <a href={c.url} target="_blank" className="text-blue-600 underline">
              Voir le PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
