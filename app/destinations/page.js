"use client"
import React, { useState, useEffect } from 'react';
import { Map, Camera, Heart, Search, ArrowRight, Compass, Globe, X, ChevronRight, Filter, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import Button from '../components/hero/Button';
import Footer from '../components/ui/Footer';
import DestinationCard from '../components/destinations/DestinationCard';
import DestinationModal from '../components/destinations/DestinationModal';
import { destinations } from '../components/destinations/data';
import Navbar from '../components/ui/Navbar';

export default function TravelDestinationsPage() {
  const [activeTab, setActiveTab] = useState('hidden');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedDestinations, setSavedDestinations] = useState([]);
  
  // Get all unique tags
  const allTags = [...new Set(destinations.flatMap(dest => dest.tags))].sort();
  
  // Filter destinations by category, search term, and tags
  const filteredDestinations = destinations.filter(dest => {
    const categoryMatch = dest.category === activeTab;
    const searchMatch = searchTerm === '' || 
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const tagsMatch = selectedTags.length === 0 || 
      selectedTags.every(tag => dest.tags.includes(tag));
    
    return categoryMatch && searchMatch && tagsMatch;
  });

  // Handle destination details modal
  const openDestinationDetails = (destId) => {
    setSelectedDestination(destinations.find(d => d.id === destId));
    document.body.style.overflow = 'hidden';
  };

  const closeDestinationDetails = () => {
    setSelectedDestination(null);
    document.body.style.overflow = 'auto';
  };

  // Handle saved destinations
  const toggleSavedDestination = (destId) => {
    if (savedDestinations.includes(destId)) {
      setSavedDestinations(savedDestinations.filter(id => id !== destId));
    } else {
      setSavedDestinations([...savedDestinations, destId]);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex border-b border-gray-200 mb-4 md:mb-0">
              <Button
                onClick={() => setActiveTab('hidden')}
                variant="text"
                className={`px-4 py-2 ${
                  activeTab === 'hidden' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Hidden Gems
              </Button>
              <Button
                onClick={() => setActiveTab('popular')}
                variant="text" 
                className={`px-4 py-2 ${
                  activeTab === 'popular' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Popular Destinations
              </Button>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="secondary" 
                className="flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2" />
                Filters
                {selectedTags.length > 0 && (
                  <span className="ml-2 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {selectedTags.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          {/* Filter Tags */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-fadeIn">
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                    variant={selectedTags.includes(tag) ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    onClick={() => setSelectedTags([])}
                    variant="text"
                    className="text-sm text-red-600"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Title for section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'hidden' 
                ? 'Secluded Escapes: Where Few Travelers Venture' 
                : 'Beloved Destinations Worth the Hype'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
            </p>
          </div>

          {/* Destination Cards Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onOpenDetails={openDestinationDetails}
                  savedDestinations={savedDestinations}
                  onToggleSave={toggleSavedDestination}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                <Search size={64} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={closeDestinationDetails}
        savedDestinations={savedDestinations}
        onToggleSave={toggleSavedDestination}
      />
    </div>
  );
}