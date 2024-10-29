// src/components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300 p-4 mt-8 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 NoteBook. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p className="mt-4">
            Follow us on{" "}
            <a href="#" className="hover:text-white underline">Twitter</a>,{" "}
            <a href="#" className="hover:text-white underline">Facebook</a>, and{" "}
            <a href="#" className="hover:text-white underline">Instagram</a>
          </p>
        </div>
      </footer>
    );
  }
  