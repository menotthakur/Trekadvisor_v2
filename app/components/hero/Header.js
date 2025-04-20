"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="lg:col-span-4 space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
        <span className="text-green-600">Himachal's</span> Mountain
        <span className="relative">
          Paradise
          <svg className="absolute -bottom-1 left-0 w-full h-2 text-green-200" viewBox="0 0 100 15" preserveAspectRatio="none">
            <path d="M0,2 Q50,10 100,2" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span>
      </h1>

      <p className="text-base text-slate-600">
        Explore snow-capped mountains, lush valleys and thrilling adventures in the magical Himalayas.
      </p>

      {/* Minimalist featured destinations */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["Shimla", "Manali", "Dharamshala", "Kasol"].map((place, i) => (
          <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-60"></div>
            <div className="absolute bottom-1 left-1 text-white text-xs font-medium">{place}</div>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className="flex items-center">
        <div className="flex -space-x-3 mr-3">
          <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">VP</div>
          <div className="w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">SK</div>
          <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">RK</div>
          <div className="w-7 h-7 rounded-full bg-green-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">5k+</div>
        </div>
        <p className="text-xs text-slate-600 font-medium">Travelers this season</p>
      </div>
    </div>
  );
} 