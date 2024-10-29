// src/components/Home.js
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ProductList from "./ProductList"; // Import ProductList

export default function Home({ user, userRole }) {
  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} userRole={userRole} />
      <main className="flex-1 p-8">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold">Welcome to NoteBook</h2>
          <p className="text-gray-700 mt-2">Find the best handwritten notes and projects</p>
        </section>
        
        {/* Pass the handleViewDetails function to ProductList */}
        <ProductList onViewDetails={handleViewDetails} />
      </main>
      <Footer />
    </div>
  );
}
