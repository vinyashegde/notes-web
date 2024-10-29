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

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} userRole={userRole} />
      <div className="p-8">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <img src={product.imageUrl} alt={product.title} className="mt-4 max-w-full h-auto" /> {/* Display image */}
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 font-bold text-blue-600">${product.price}</p>
      </div>
      <Footer />
    </div>
  );
}
