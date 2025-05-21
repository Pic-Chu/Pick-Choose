import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Provision() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, "clients", user.uid));
      const data = snap.data();
      const st = data?.activity?.siteStatus || null;
      setStatus(st);
      setLoading(false);
    };
    fetchStatus();
  }, [user]);

  const handleProvision = async () => {
    // Simule la création du site (plus tard = appel à backend)
    const fakeDomain = `https://${user.uid}.pickchoose.com`;
    const clientRef = doc(db, "clients", user.uid);
    const snap = await getDoc(clientRef);
    const existing = snap.data();

    await setDoc(clientRef, {
      activity: {
        ...existing.activity,
        siteStatus: {
          status: "provisioning",
          domain: fakeDomain,
        },
      },
    }, { merge: true });

    setStatus({ status: "provisioning", domain: fakeDomain });
  };

  if (loading) return <p className="p-6">Chargement…</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🛠️ Commande de site</h1>

      {status ? (
        <div className="space-y-2">
          <p>
            Statut : <strong>{status.status}</strong>
          </p>
          <p>
            Lien :{" "}
            <a
              href={status.domain}
              target="_blank"
              className="text-blue-600 underline"
            >
              {status.domain}
            </a>
          </p>
        </div>
      ) : (
        <p>Aucun site commandé pour l’instant.</p>
      )}

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleProvision}
      >
        🚀 Lancer la génération du site
      </button>
    </div>
  );
}
