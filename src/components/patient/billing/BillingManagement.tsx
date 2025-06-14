
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import InvoicesTab from "./InvoicesTab";
import PaymentMethodsTab from "./PaymentMethodsTab";
import PaymentHistoryTab from "./PaymentHistoryTab";
import BillingSummaryCards from "./BillingSummaryCards";
import { usePatientLocations } from "@/hooks/usePatientLocations";

const BillingManagement = () => {
  const { locations, selectedLocationId, setSelectedLocationId } = usePatientLocations();
  const [locationFilter, setLocationFilter] = useState<string>('all');

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex-1">
              <Label htmlFor="location-filter" className="text-sm font-medium">
                Filter by Location
              </Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger id="location-filter" className="mt-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} - {location.address.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {locationFilter === 'all' 
                ? `Showing billing data from all ${locations.length} locations`
                : `Filtered by: ${locations.find(loc => loc.id === locationFilter)?.name || 'Unknown'}`
              }
            </div>
          </div>
        </CardContent>
      </Card>

      <BillingSummaryCards locationFilter={locationFilter} />

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <InvoicesTab locationFilter={locationFilter} />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethodsTab />
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <PaymentHistoryTab locationFilter={locationFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
