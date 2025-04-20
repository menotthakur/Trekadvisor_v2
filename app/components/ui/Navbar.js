"use client"
import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Search, Globe, ChevronDown, User, Bell } from 'lucide-react';
import Button from '../hero/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
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

  // Array of navigation links with dropdown content
  const navLinks = [
    { 
      name: 'Destinations', 
      path: '/destinations', 
      icon: <MapPin size={16} />,
      hasDropdown: false,
    },
    { 
      name: 'Packages', 
      path: '/packages', 
      icon: <Globe size={16} />,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Family Packages', path: '/packages/family' },
        { name: 'Honeymoon Specials', path: '/packages/honeymoon' },
        { name: 'Adventure Tours', path: '/packages/adventure' },
        { name: 'Luxury Escapes', path: '/packages/luxury' }
      ]
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
            <a href="/" className="flex items-center">
              <span className={`text-2xl font-bold ${scrolled ? 'text-teal-600' : 'text-white'}`}>
                TravelEase
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  <Button
                    onClick={() => link.hasDropdown && toggleDropdown(index)}
                    variant={scrolled ? "text" : "text"}
                    className={`flex items-center space-x-1 font-medium transition duration-300 ${
                      scrolled ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'
                    }`}
                  >
                    {link.icon && <span className="mr-1">{link.icon}</span>}
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {link.hasDropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20">
                      {link.dropdownItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition duration-150"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
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
                  <Button
                    onClick={() => link.hasDropdown && toggleDropdown(index)}
                    variant="text"
                    className="flex items-center justify-between w-full text-gray-800 hover:text-teal-600 font-medium py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      {link.icon && link.icon}
                      <span>{link.name}</span>
                    </div>
                    {link.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </Button>
                  
                  {/* Mobile Dropdown */}
                  {link.hasDropdown && activeDropdown === index && (
                    <div className="bg-gray-50 py-2 pl-8 pr-4 border-b border-gray-100">
                      {link.dropdownItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          className="block py-2 text-gray-700 hover:text-teal-600 transition duration-150"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {!link.hasDropdown && (
                    <a
                      href={link.path}
                      className="border-b border-gray-100 block py-3"
                      onClick={() => setIsOpen(false)}
                    ></a>
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
                
                <a
                  href="/book-now"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium transition duration-300 shadow-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;