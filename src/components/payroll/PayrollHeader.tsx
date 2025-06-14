
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, Calculator, FileText, Settings } from "lucide-react";

const PayrollHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calculator className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
              <p className="text-gray-600">Manage employee salaries, process payroll, and generate reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollHeader;
