
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, FileText, DollarSign, AlertCircle, MapPin } from "lucide-react";
import { usePatientLocations } from "@/hooks/usePatientLocations";

interface BillingSummaryCardsProps {
  locationFilter: string;
}

const BillingSummaryCards = ({ locationFilter }: BillingSummaryCardsProps) => {
  const { locations, getLocationById } = usePatientLocations();

  // Mock data - in real implementation, this would filter by location
  const getSummaryData = () => {
    if (locationFilter === 'all') {
      return {
        outstanding: 2450,
        thisMonth: 5200,
        paidThisYear: 42500,
        pendingInvoices: 3
      };
    } else {
      // Location-specific data (mock)
      const location = getLocationById(locationFilter);
      return {
        outstanding: 1200,
        thisMonth: 2800,
        paidThisYear: 18500,
        pendingInvoices: 1
      };
    }
  };

  const data = getSummaryData();
  const selectedLocation = locationFilter !== 'all' ? getLocationById(locationFilter) : null;

  return (
    <div className="space-y-4">
      {selectedLocation && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">
                Billing data for: {selectedLocation.name} - {selectedLocation.address.city}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-600">₹{data.outstanding.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-blue-600">₹{data.thisMonth.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid This Year</p>
                <p className="text-2xl font-bold text-green-600">₹{data.paidThisYear.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Invoices</p>
                <p className="text-2xl font-bold text-orange-600">{data.pendingInvoices}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingSummaryCards;
