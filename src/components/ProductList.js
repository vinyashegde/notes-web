import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList({ onViewDetails }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Predefined categories (should match those used in AddProduct)
  const categories = [
    "Books",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Toys",
    "Sports",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  }, []);

  // Filter products based on selected category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col p-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      {/* Category Filter Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

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
            <p className="text-gray-500 italic">Category: {product.category}</p> {/* Display product category */}
            <button
              onClick={() => onViewDetails(product.id)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </button>
            <button
              onClick={() => alert("Buy now functionality coming soon!")} // Placeholder for buy functionality
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
