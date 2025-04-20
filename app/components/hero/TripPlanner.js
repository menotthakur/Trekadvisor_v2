"use client";

import { useState } from "react";
import Image from "next/image";
import Tabs from "./Tabs";
import FormFields from "./FormFields";
import DestinationPreview from "./DestinationPreview";
import TravelPerks from "./TravelPerks";

export default function TripPlanner() {
  const [activeTab, setActiveTab] = useState("locations");

  return (
    <div className="lg:col-span-8 relative">
      {/* FEATURED TRIP PLANNER CARD - Given more prominence */}
      <div className="bg-white rounded-xl shadow-xl p-6 relative z-20 border-2 border-green-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-800 font-bold text-xl">Plan Your Himachal Adventure</h2>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
            <Image
              src="/images/hero/location.svg"
              alt="Location icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Top Destinations
          </div>
        </div>
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <FormFields />
      </div>
    </div>
  );
} 