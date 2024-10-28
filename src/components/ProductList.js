// src/components/ProductList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow-md w-60">
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-blue-500 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
