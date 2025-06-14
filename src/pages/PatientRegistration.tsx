
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hospital, ArrowLeft } from "lucide-react";
import PatientRegistrationForm from "@/components/patient/PatientRegistrationForm";

const PatientRegistration = () => {
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
              <Badge variant="secondary">Patient Registration</Badge>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Patient Registration</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to MediFlow HMS. Please complete your registration to access our comprehensive healthcare services.
            </p>
          </div>

          {/* Registration Form */}
          <PatientRegistrationForm />

          {/* Help Section */}
          <div className="mt-12 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-700 mb-4">
                Our registration team is available to assist you with any questions.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                  Call: +91 1800-123-4567
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                  Email: registration@mediflow.com
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
