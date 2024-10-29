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
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centering the form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md max-w-md w-full"> {/* Added w-full for responsiveness */}
        <h2 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" // Added focus styles
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" // Added focus styles
          required
        />
        <div className="flex justify-center">
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"> {/* Hover effects */}
            {isLogin ? "Login" : "Create User"} {/* Update button text accordingly */}
          </button>
        </div>
        <p className="text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
