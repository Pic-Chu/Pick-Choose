import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Erreur de connexion : " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Connexion</h2>
      <input type="email" placeholder="Email" className="border p-2 w-full"
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white p-2">Se connecter</button>
    </form>
  );
}
