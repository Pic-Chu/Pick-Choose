import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
//import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      //navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Inscription</h2>
      <input type="email" placeholder="Email" className="border p-2 w-full"
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white p-2">S’inscrire</button>
    </form>
  );
}
