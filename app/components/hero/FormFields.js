"use client";

import { useState } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Button from "./Button";

export default function FormFields() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const destinations = [
    "Select Destination",
    "Shimla",
    "Manali",
    "Dharamshala",
    "Dalhousie",
    "Kasol"
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          icon="/images/hero/location.svg"
          placeholder="Select Destination"
          options={destinations}
          value={selectedDestination}
          onChange={setSelectedDestination}
          className="bg-white z-[30]" 
        />

        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-4 bg-white hover:border-green-500 hover:shadow-md transition-all">
          <Image
            src="/images/hero/calendar.svg"
            alt="Calendar icon"
            width={20}
            height={20}
            className="text-green-600"
          />
          <input
            type="date"
            className="w-full bg-transparent outline-none text-gray-700 text-base cursor-pointer"
            placeholder="Select Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <Button
        variant="primary"
        icon="/images/hero/search.svg"
        className="w-full"
      >
        Find Packages
      </Button>
    </div>
  );
}