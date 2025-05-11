"use client"
import { useState, useEffect } from 'react';
import { Map, Navigation, Info, Coffee, Utensils, Music, Star, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import { useSearchParams } from 'next/navigation';

// Main Place component with a green color scheme
export default function Place() {
  const searchParams = useSearchParams();
  const districtId = searchParams.get('district');
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await fetch(`/data/${districtId}.json`);
        if (!response.ok) {
          throw new Error('District data not found');
        }
        const data = await response.json();
        setDistrictData(data);
      } catch (error) {
        console.error('Error loading district data:', error);
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };

    if (districtId) {
      fetchDistrictData();
    }
  }, [districtId]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700">Loading district information...</p>
        </div>
      </div>
    );
  }

  if (!districtData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-center">
          <div className="bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-red-500 w-8 h-8" />
          </div>
          <p className="text-red-700 text-lg">District information not found.</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    coverImage,
    summary,
    locations
  } = districtData;
  
  // Filter locations based on selected category
  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory);
  
  // Get unique categories from locations and sort them alphabetically
  const categories = ['all', ...new Set(locations.map(location => location.category))].sort();

  // Function to get appropriate icon based on category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'bar': return <MapPin className="w-5 h-5" />;
      case 'landmark': return <MapPin className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'museum': return <Info className="w-5 h-5" />;
      case 'park': return <MapPin className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Modernized hero section with parallax effect */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 to-green-900/90 z-10"></div>
        <img 
          src={coverImage} 
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transform scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white p-8 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{name}</h1>
            <div className="w-24 h-1 bg-green-300 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl font-light">{summary}</p>
          </div>
        </div>
      </div>

      {/* Main content with updated design */}
      <div className="container mx-auto px-4 py-12 -mt-16 relative z-30">
        {/* District description card */}
        <div className="mb-10 bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Info className="text-green-600 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">About {name}</h2>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Interactive map section */}
        <div className="mb-10 bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Map className="text-green-600 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">Explore the Area</h2>
          </div>
          <div className="bg-green-50 h-80 rounded-lg overflow-hidden border border-green-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-green-700 flex items-center bg-white py-3 px-6 rounded-full shadow-md">
                <Navigation className="mr-2 text-green-600" />
                Interactive map would be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* Locations section with modern cards */}
        <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-green-900">Places to Discover</h2>
              <p className="text-green-700 mt-2">Find the perfect spots to enjoy in {name}</p>
            </div>
            
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'shadow-md'
                      : 'hover:bg-green-200'
                  }`}
                >
                  {category !== 'all' && (
                    <span className="mr-1.5 inline-flex items-center">
                      {getCategoryIcon(category)}
                    </span>
                  )}
                  <span className="capitalize">{category}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Locations grid with hover effects */}
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location, index) => (
                <LocationCard 
                  key={index} 
                  location={location} 
                  isHovered={hoveredCard === index}
                  onHover={() => setHoveredCard(index)}
                  onLeave={() => setHoveredCard(null)}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-500 w-8 h-8" />
              </div>
              {locations.length === 0 ? (
                <p className="text-green-700 text-lg">No locations available for this district yet.</p>
              ) : (
                <p className="text-green-700 text-lg">No locations found for the selected category.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-100">Discover more amazing places in {name} and plan your perfect day out.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="text" className="text-white hover:text-green-300">About</Button>
            <Button variant="text" className="text-white hover:text-green-300">Contact</Button>
            <Button variant="text" className="text-white hover:text-green-300">Privacy</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Location card component with hover effects
function LocationCard({ location, isHovered, onHover, onLeave, getCategoryIcon }) {
  const {
    name,
    description,
    image,
    category,
    rating,
    address,
    hours,
    phone
  } = location;

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-green-500" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-300" />);
      }
    }
    return stars;
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-green-100"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-56 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="font-semibold text-green-900">{rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-green-600 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full flex items-center w-fit">
            {getCategoryIcon(category)}
            <span className="ml-1">{category}</span>
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-900 mb-3">{name}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
            <span>{address}</span>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
            <span>{hours}</span>
          </div>
          {phone && (
            <div className="flex items-start">
              <Phone className="w-4 h-4 mt-0.5 mr-2 text-green-500" />
              <span>{phone}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-green-100">
          <Button 
            variant="secondary"
            className="w-full text-green-700 hover:bg-green-100 flex items-center justify-center"
          >
            View Details
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}