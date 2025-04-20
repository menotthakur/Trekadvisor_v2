"use client";

import Image from 'next/image';

const destinations = [
  {
    name: 'Rohtang Pass',
    location: 'Manali',
    rating: 4.8,
    image: '/destinations/rohtang.jpg',
    reviews: 128
  },
  {
    name: 'McLeod Ganj',
    location: 'Dharamshala',
    rating: 4.6,
    image: '/destinations/mcleod.jpg',
    reviews: 96
  },
  {
    name: 'Mall Road',
    location: 'Shimla',
    rating: 4.5,
    image: '/destinations/mall-road.jpg',
    reviews: 156
  }
];

export default function FeaturedDestinations() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
              <p className="text-gray-600">{destination.location}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(destination.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({destination.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 