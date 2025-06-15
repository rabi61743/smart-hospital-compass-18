
import React from 'react';
import { Hospital } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Hospital className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">MediFlow HMS</span>
        </div>
        <p className="text-gray-400">
          Empowering healthcare institutions with intelligent management solutions.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
