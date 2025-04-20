"use client"
import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Search, Globe, ChevronDown, User, Bell } from 'lucide-react';
import Button from '../hero/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  // Array of navigation links with dropdown content
  const navLinks = [
    { 
      name: 'Destinations', 
      path: '/destinations', 
      hasDropdown: false,
    },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <div className="relative">
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-b from-black/40 to-transparent py-4'}`}>
        <div className="flex justify-between w-full px-4">
          <nav className="flex items-center justify-between w-full max-w-7xl">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-bold ${scrolled ? 'text-teal-600' : 'text-white'}`}>
                TravelEase
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  {link.hasDropdown ? (
                    <Button
                      onClick={() => toggleDropdown(index)}
                      variant={scrolled ? "text" : "text"}
                      className={`flex items-center space-x-1 font-medium transition duration-300 ${
                        scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'
                      }`}
                    >
                      {link.icon && <span className="mr-1">{link.icon}</span>}
                      <span>{link.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center space-x-1 font-medium transition duration-300 ${
                        scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'
                      }`}
                    >
                      {link.icon && <span className="mr-1">{link.icon}</span>}
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="h-6 w-px bg-gray-300"></div>
              
              <Button
                variant={scrolled ? "text" : "text"}
                className={`p-2 rounded-full flex items-center space-x-2 transition duration-300 ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
              >
                <User size={20} />
                <span className="font-medium">Account</span>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <Button
                variant={scrolled ? "text" : "text"}
                className={`p-2 rounded-full transition duration-300 ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
              >
                <Search size={20} />
              </Button>
              
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant={scrolled ? "text" : "text"}
                className={`p-2 rounded-full ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </nav>
        </div>
          
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t mt-2 shadow-xl">
            <div className="flex flex-col w-full px-4 py-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <Button
                      onClick={() => toggleDropdown(index)}
                      variant="text"
                      className="flex items-center justify-between w-full text-gray-800 hover:text-teal-600 font-medium py-3 border-b border-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon && link.icon}
                        <span>{link.name}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  ) : (
                    <Link
                      href={link.path}
                      className="flex items-center justify-between w-full text-gray-800 hover:text-teal-600 font-medium py-3 border-b border-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon && link.icon}
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="mt-4 flex flex-col space-y-3">
                <Button
                  variant="text"
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 py-2"
                >
                  <User size={20} />
                  <span className="font-medium">Account</span>
                </Button>
                
                <Link
                  href="/book-now"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium transition duration-300 shadow-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;