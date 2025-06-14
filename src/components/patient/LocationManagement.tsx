
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Settings, Search } from "lucide-react";
import LocationFinder from "./location/LocationFinder";
import LocationPreferences from "./location/LocationPreferences";
import { usePatientLocations } from "@/hooks/usePatientLocations";

const LocationManagement = () => {
  const {
    locations,
    preferences,
    selectedLocationId,
    setSelectedLocationId,
    updatePreferences
  } = usePatientLocations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Location Management</h2>
          <p className="text-muted-foreground">
            Find locations and manage your preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="finder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="finder" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Find Locations
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            My Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finder" className="space-y-4">
          <LocationFinder
            locations={locations}
            selectedLocationId={selectedLocationId}
            onLocationSelect={setSelectedLocationId}
          />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationPreferences
              locations={locations}
              preferences={preferences}
              onPreferencesUpdate={updatePreferences}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{locations.length}</p>
                      <p className="text-sm text-muted-foreground">Available Locations</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {Array.from(new Set(locations.flatMap(loc => loc.services))).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Services</p>
                    </div>
                  </div>
                  
                  {preferences.preferredLocationId && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-sm mb-1">Current Preferred Location:</p>
                      <p className="text-yellow-800">
                        {locations.find(loc => loc.id === preferences.preferredLocationId)?.name || 'Unknown'}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationManagement;
