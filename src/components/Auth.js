import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login functionality
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/");
      } else {
        // Sign-up functionality for regular users
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Store user role as "customer" (or whatever default you want)
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          role: "customer", // Set default role to "customer"
        });

        alert("User created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Authentication failed! Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-center">
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {isLogin ? "Login" : "Create User"} {/* Update button text accordingly */}
        </button>
      </div>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </form>
  );
}
