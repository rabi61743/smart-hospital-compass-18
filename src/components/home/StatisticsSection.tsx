
import React from 'react';

const StatisticsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Commission Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Integrated Modules</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">System Availability</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
