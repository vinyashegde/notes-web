// src/components/ProductList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList({ onViewDetails }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-80"
      />
      <div className="flex flex-wrap gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-md w-60">
            {/* Display the product image */}
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="mb-2 w-full h-32 object-cover rounded"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-500 font-bold">${product.price}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => onViewDetails(product.id)} // Call onViewDetails when clicked
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </button>
              <button
                onClick={() => alert(`Buying ${product.title}`)} // Replace with actual buy functionality
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
