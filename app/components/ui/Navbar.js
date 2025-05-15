"use client"
import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, MapPin, Compass, UserCircle } from 'lucide-react';
import Button from '../hero/Button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  
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

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
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
      hasDropdown: true,
      icon: <MapPin size={18} />,
      dropdownItems: [
        { name: 'Shimla', path: '/place?district=shimla' },
        { name: 'Manali', path: '/place?district=manali' },
        { name: 'Dharamshala', path: '/place?district=dharamshala' },
        { name: 'Mandi', path: '/place?district=mandi' },
        { name: 'Kullu', path: '/place?district=kullu' },
        { name: 'Spiti Valley', path: '/place?district=spiti' },
        { name: 'View All Districts', path: '/districts', isBold: true }
      ]
    },
    { 
      name: 'Hidden Gems', 
      path: '/hidden-gems', 
      hasDropdown: false,
      icon: <Compass size={18} />
    },
    { 
      name: 'Popular Treks', 
      path: '/treks', 
      hasDropdown: false,
      icon: <Compass size={18} />
    },
    { 
      name: 'About Us', 
      path: '/about', 
      hasDropdown: false,
      icon: <UserCircle size={18} />
    },
  ];
  
  return (
    <div className="relative">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white py-2 shadow-md' 
          : 'bg-gradient-to-b from-black/70 to-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <span className="text-2xl font-bold flex items-center">
                <span className="mr-2">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    T
                  </div>
                </span>
                <span className="text-green-600">Trek</span>
                <span className={scrolled ? "text-gray-800" : "text-white"}>Advisor</span>
              </span>
            </Link>
            
            {/* Desktop Navigation with dropdown and animations */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  {link.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center space-x-2 font-medium transition-all duration-300 rounded-full px-4 py-2 ${
                          scrolled 
                            ? 'text-gray-800 hover:text-green-600 hover:bg-green-50' 
                            : 'text-white hover:text-green-400 hover:bg-white/10'
                        } ${activeDropdown === index ? (scrolled ? 'bg-green-50 text-green-600' : 'bg-white/10 text-green-400') : ''}`}
                      >
                        {link.icon && <span className={scrolled ? 'text-green-600' : 'text-green-400'}>{link.icon}</span>}
                        <span>{link.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {/* Dropdown menu with animation */}
                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn">
                          <div className="py-2">
                            {link.dropdownItems.map((item, i) => (
                              <Link
                                key={i}
                                href={item.path}
                                className={`block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
                                  item.isBold ? 'font-semibold border-t border-gray-100 mt-1 pt-2 text-green-600' : ''
                                }`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center space-x-2 font-medium transition-all duration-300 rounded-full px-4 py-2 group relative
                        ${
                          scrolled 
                            ? 'text-gray-800 hover:text-green-600 hover:bg-green-50' 
                            : 'text-white hover:text-green-400 hover:bg-white/10'
                        }
                        ${pathname === link.path ? (scrolled ? 'bg-green-50 text-green-600' : 'bg-white/10 text-green-400') : ''}
                      `}
                    >
                      {link.icon && <span className={scrolled ? 'text-green-600' : 'text-green-400'}>{link.icon}</span>}
                      <span>{link.name}</span>
                      <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-green-500 transition-all duration-300 w-0 group-hover:w-1/2 ${
                        pathname === link.path ? 'w-1/2' : ''
                      }`}></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Call to action button */}
            <div className="hidden lg:block">
              <button className="bg-green-600 text-white rounded-full px-6 py-2 font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg">
                Plan Your Trip
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                className={`p-2 rounded-full transition duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-green-50 hover:text-green-600' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Search size={20} />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-green-50 hover:text-green-600' 
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
          
        {/* Mobile Navigation with slide-in animation from right to left */}
        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-black/50 transition-opacity duration-300 z-40 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold flex items-center">
                <span className="mr-2">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    T
                  </div>
                </span>
                <span className="text-green-600">Trek</span>
                <span className="text-gray-800">Advisor</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col w-full py-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center justify-between w-full text-gray-800 hover:text-green-600 font-medium py-3 px-4 border-b border-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          {link.icon && <span className="text-green-500">{link.icon}</span>}
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      {activeDropdown === index && (
                        <div className="bg-gray-50 py-2">
                          {link.dropdownItems.map((item, i) => (
                            <Link
                              key={i}
                              href={item.path}
                              className={`block py-2 px-8 text-gray-700 hover:text-green-600 ${
                                item.isBold ? 'font-semibold border-t border-gray-200 mt-1 pt-2 text-green-600' : ''
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className={`flex items-center w-full font-medium py-3 px-4 border-b border-gray-100 relative
                        ${pathname === link.path 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-gray-800 hover:text-green-600 hover:bg-green-50'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon && <span className="text-green-500">{link.icon}</span>}
                        <span>{link.name}</span>
                      </div>
                      {pathname === link.path && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="mt-6 px-4">
                <button className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition-colors shadow-md">
                  Plan Your Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;