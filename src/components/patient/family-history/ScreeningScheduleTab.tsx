
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ScreeningScheduleTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preventive Screening Schedule</CardTitle>
        <CardDescription>Recommended health screenings based on your genetic risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h3 className="font-medium text-red-700">High Priority Screenings</h3>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• HbA1c test - Due in 2 weeks</li>
              <li>• Lipid profile - Due next month</li>
            </ul>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-medium text-yellow-700">Moderate Priority Screenings</h3>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• Annual mammography - Due in 3 months</li>
              <li>• ECG - Due in 6 months</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-green-700">Regular Screenings</h3>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• Annual physical exam - Up to date</li>
              <li>• Blood pressure monitoring - Up to date</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreeningScheduleTab;
