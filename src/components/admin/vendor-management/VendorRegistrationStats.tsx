
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Vendor {
  id: string;
  status: string;
  complianceStatus: string;
  category: string;
}

interface VendorRegistrationStatsProps {
  vendors: Vendor[];
}

const VendorRegistrationStats = ({ vendors }: VendorRegistrationStatsProps) => {
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;
  const complianceIssues = vendors.filter(v => v.complianceStatus === 'non-compliant' || v.complianceStatus === 'review-required').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Vendors</CardTitle>
          <Building className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">{totalVendors}</div>
          <p className="text-xs text-blue-600 mt-1">Registered partners</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Active Vendors</CardTitle>
          <CheckCircle className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">{activeVendors}</div>
          <p className="text-xs text-green-600 mt-1">Currently operational</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700">Pending Approval</CardTitle>
          <Clock className="h-5 w-5 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-800">{pendingVendors}</div>
          <p className="text-xs text-yellow-600 mt-1">Awaiting verification</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Compliance Issues</CardTitle>
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-800">{complianceIssues}</div>
          <p className="text-xs text-red-600 mt-1">Requires attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorRegistrationStats;
