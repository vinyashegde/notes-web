// src/components/AddProduct.js
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        title,
        description,
        price: parseFloat(price),
      });
      alert("Product added successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Add Product</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product Price"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
        Add Product
      </button>
    </form>
  );
}
