// src/components/ProductDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";

export default function ProductDetails({ user, userRole }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleBuyNow = () => {
    alert(`Purchasing ${product.title}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} userRole={userRole} />
      <div className="p-8">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="mt-4 w-64 h-40 overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-4 font-bold text-blue-600">${product.price}</p>
          <button
            onClick={handleBuyNow}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Additional Information</h2>
          <ul className="list-disc list-inside mt-2">
            <li><strong>Category:</strong> {product.category || "N/A"}</li>
            <li><strong>Stock:</strong> {product.stock || "N/A"}</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
