// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Header({ user, userRole }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed!");
    }
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">NoteBook</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        
        {/* Show "Admin Panel" link only if the user is an admin */}
        {userRole === "admin" && (
          <Link to="/admin" className="hover:underline">Admin Panel</Link>
        )}

        {/* Show login/logout and user-specific links */}
        {user ? (
          <>
            <span className="font-semibold">{user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-1 rounded hover:bg-green-600">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
