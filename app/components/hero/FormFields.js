"use client";

import { useState } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Button from "./Button";

export default function FormFields() {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const districts = [
    "Select District",
    "Shimla",
    "Kullu",
    "Kangra",
    "Mandi",
    "Chamba",
    "Solan",
    "Sirmaur",
    "Bilaspur",
    "Hamirpur",
    "Una",
    "Kinnaur",
    "Lahaul and Spiti"
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start">
        <Dropdown
          icon="/images/hero/location.svg"
          placeholder="Select District"
          options={districts}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          className="bg-white z-[30] w-full items-start" 
        />
      </div>

      <Button
        variant="primary"
        icon="/images/hero/search.svg"
        className="w-full"
      >
        Find Destinations
      </Button>
    </div>
  );
}