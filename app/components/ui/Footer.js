"use client";

import { Globe, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Globe size={24} className="text-teal-400 mr-2" />
              <span className="text-xl font-bold">TravelEase</span>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: hello@travelease.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-teal-400">Privacy</a>
            <a href="#" className="hover:text-teal-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 