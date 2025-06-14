
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hospital, ArrowLeft, FlaskConical } from "lucide-react";
import LabResultsPortal from "@/components/patient/LabResultsPortal";

const LabResults = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Hospital className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MediFlow HMS</span>
              </Link>
              <Badge variant="secondary">Lab Results</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/patient-portal">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lab Results Portal</h1>
                <p className="text-gray-600">John Doe • Patient ID: PAT001</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-3xl">
              Access your laboratory test results, reports, and health trends. Download reports and track your health metrics over time.
            </p>
          </div>

          {/* Lab Results Portal Component */}
          <LabResultsPortal />
        </div>
      </div>
    </div>
  );
};

export default LabResults;
