import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul>
              <li>Email: <a href="mailto:support@coolieapp.com" className="text-blue-400 hover:text-blue-300">support@coolieapp.com</a></li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 1234 Coolie St, City, Country</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><a href="/" className="text-blue-400 hover:text-blue-300">About Us</a></li>
              <li><a href="/" className="text-blue-400 hover:text-blue-300">Terms & Conditions</a></li>
              <li><a href="/" className="text-blue-400 hover:text-blue-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Subscribe to Newsletter</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg border border-gray-300 mb-2"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; 2024 FindMyCoolie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
