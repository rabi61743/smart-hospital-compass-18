
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorReportsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Reports & Analytics</CardTitle>
        <CardDescription>View patient reports and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Patients Treated</h4>
            <p className="text-3xl font-bold text-blue-600">156</p>
            <p className="text-sm text-blue-700">This Month</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Success Rate</h4>
            <p className="text-3xl font-bold text-green-600">94%</p>
            <p className="text-sm text-green-700">Patient Outcomes</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Avg. Consultation</h4>
            <p className="text-3xl font-bold text-purple-600">28min</p>
            <p className="text-sm text-purple-700">Per Patient</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorReportsTab;
