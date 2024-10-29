// src/components/AddProduct.js
import { useState } from "react";
import { db, storage } from "../firebase"; // Import storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { useNavigate } from "react-router-dom";

export default function AddProduct({ onProductAdded }) { // Accept onProductAdded as prop
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef); // Get the download URL for the uploaded image

      // Add product to Firestore with image URL
      await addDoc(collection(db, "products"), {
        title,
        description,
        price: parseFloat(price),
        imageUrl, // Save the image URL in Firestore
      });

      alert("Product added successfully!");
      onProductAdded(); // Call the passed function to refresh product list
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null); // Reset the image state
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + error.message);
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
      <input
        type="file" // File input for image
        accept="image/*" // Accept only image files
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
        Add Product
      </button>
    </form>
  );
}
