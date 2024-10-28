// src/App.jsx
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Admin from "./components/Admin";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role); // Ensure this line sets the role
        }
      } else {
        setUser(null);
        setUserRole(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home user={user} userRole={userRole} />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin" element={userRole === "admin" ? <Admin /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
