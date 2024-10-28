// src/components/Admin.js
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/"); // Redirect non-admin users to Home
        }
      }
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    checkAdminRole();
    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newAdminEmail, newAdminPassword);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        role: "admin",
      });
      alert("Admin user created successfully!");
      setNewAdminEmail("");
      setNewAdminPassword("");
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Error creating admin: " + error.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        title: newProductTitle,
        description: newProductDescription,
        price: parseFloat(newProductPrice),
      });
      alert("Product added successfully!");
      setNewProductTitle("");
      setNewProductDescription("");
      setNewProductPrice("");
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })));
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {/* Admin Creation Form */}
      <form onSubmit={handleCreateAdmin} className="mb-6">
        <h2 className="text-xl">Create Admin User</h2>
        <input
          type="email"
          value={newAdminEmail}
          onChange={(e) => setNewAdminEmail(e.target.value)}
          placeholder="Admin Email"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          value={newAdminPassword}
          onChange={(e) => setNewAdminPassword(e.target.value)}
          placeholder="Admin Password"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Create Admin
        </button>
      </form>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6">
        <h2 className="text-xl">Add Product</h2>
        <input
          type="text"
          value={newProductTitle}
          onChange={(e) => setNewProductTitle(e.target.value)}
          placeholder="Product Title"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          placeholder="Product Price"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="p-2 bg-green-600 text-white rounded">
          Add Product
        </button>
      </form>

      {/* Products List */}
      <h2 className="text-xl">Manage Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-2 p-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
