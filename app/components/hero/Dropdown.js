"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from './Button';

export default function Dropdown({ 
  icon, 
  placeholder, 
  options, 
  value, 
  onChange,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="secondary"
        className="flex items-start gap-3 border border-gray-200 rounded-lg p-4 bg-white hover:border-green-500 hover:shadow-md transition-all w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && (
          <Image
            src={icon}
            alt="Dropdown icon"
            width={20}
            height={20}
            className="text-green-600"
          />
        )}
        <span className="text-gray-700 text-base flex-1 text-left">
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="text"
              className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 transition-colors ${
                value === option ? "bg-green-50 text-green-600" : ""
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
} 