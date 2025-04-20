"use client";

import { X, Globe, Heart, Calendar, Landmark, Map, Clock, Banknote, Languages, Bus, Home } from 'lucide-react';
import Button from '../ui/Button';
import Rating from './Rating';
import Tag from './Tag';
import useOutsideClick from '../../ref/useOutsideClick';

const DestinationModal = ({ destination, onClose, savedDestinations, onToggleSave }) => {
  const modalRef = useOutsideClick(onClose);

  if (!destination) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl"
      >
        <div className="relative h-80 sm:h-96 bg-emerald-100">
          <img 
            src={`/api/placeholder/1200/800`} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 shadow-lg transition-all"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-bold text-white drop-shadow-md">{destination.name}</h1>
            <p className="text-white flex items-center text-lg mt-2">
              <Globe size={18} className="mr-2" />
              {destination.country}
            </p>
          </div>
          
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 rounded-full py-1 px-3 shadow-md">
              <Rating score={destination.rating} showScore={true} size="lg" />
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              {destination.tags.map(tag => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
            
            <Button 
              variant="primary"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => onToggleSave(destination.id)}  
            >
              <Heart 
                size={20} 
                className={savedDestinations.includes(destination.id) ? "fill-white" : ""} 
              />
              {savedDestinations.includes(destination.id) ? 'Saved to Favorites' : 'Add to Favorites'}
            </Button>
          </div>
          
          <div className="prose max-w-none">
            <div className="bg-emerald-50 p-6 rounded-xl mb-8 border border-emerald-100">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                <Landmark size={24} className="mr-2 text-emerald-600" />
                Overview
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">{destination.description}</p>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Map size={28} className="mr-3 text-emerald-600" />
              Why Visit {destination.name}
            </h3>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{destination.longDescription}</p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock size={28} className="mr-3 text-emerald-600" />
                Essential Travel Tips
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Calendar size={22} className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Best Time to Visit</h4>
                    <p className="text-gray-700">April to October - perfect weather for sightseeing and outdoor activities</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Banknote size={22} className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Local Currency</h4>
                    <p className="text-gray-700">Check local exchange rates before traveling and consider getting some cash beforehand</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Languages size={22} className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Language</h4>
                    <p className="text-gray-700">Learn basic local phrases to enhance your experience and show respect</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Bus size={22} className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Transportation</h4>
                    <p className="text-gray-700">Research local transportation options and consider renting a vehicle if necessary</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Home size={22} className="mt-1 mr-3 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Accommodation</h4>
                    <p className="text-gray-700">Book in advance during peak season to secure the best rates and locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;