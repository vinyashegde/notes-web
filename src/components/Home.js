// src/components/Home.js
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home({ user, userRole }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Handwritten Notes</h1>
          <nav>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 p-2 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 p-2 rounded"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white text-center p-10">
        <h2 className="text-4xl font-bold">Explore Our Collection</h2>
        <p className="mt-4">Quality handwritten notes and projects for your needs.</p>
      </section>

      {/* Products Section */}
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Available Products</h2>
          {userRole === "admin" && (
            <div className="mb-4">
              <button
                onClick={() => navigate("/admin")}
                className="p-2 bg-green-600 text-white rounded"
              >
                Go to Admin Panel
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-blue-600 mt-2">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Handwritten Notes. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
