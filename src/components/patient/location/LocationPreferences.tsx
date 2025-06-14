
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Save } from "lucide-react";
import { PatientLocation, LocationPreference } from "./types";
import { useToast } from "@/hooks/use-toast";

interface LocationPreferencesProps {
  locations: PatientLocation[];
  preferences: LocationPreference;
  onPreferencesUpdate: (preferences: LocationPreference) => void;
}

const LocationPreferences = ({ 
  locations, 
  preferences, 
  onPreferencesUpdate 
}: LocationPreferencesProps) => {
  const { toast } = useToast();
  const [localPreferences, setLocalPreferences] = useState<LocationPreference>(preferences);

  const handleSave = () => {
    onPreferencesUpdate(localPreferences);
    toast({
      title: "Preferences Saved",
      description: "Your location preferences have been updated successfully.",
    });
  };

  const activeLoc = locations.filter(loc => loc.isActive);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="preferred-location">Preferred Location</Label>
            <Select
              value={localPreferences.preferredLocationId}
              onValueChange={(value) => 
                setLocalPreferences(prev => ({ ...prev, preferredLocationId: value }))
              }
            >
              <SelectTrigger id="preferred-location" className="mt-2">
                <SelectValue placeholder="Select your preferred location" />
              </SelectTrigger>
              <SelectContent>
                {activeLoc.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name} - {location.address.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="secondary-location">Secondary Location (Optional)</Label>
            <Select
              value={localPreferences.secondaryLocationId || ""}
              onValueChange={(value) => 
                setLocalPreferences(prev => ({ 
                  ...prev, 
                  secondaryLocationId: value || undefined 
                }))
              }
            >
              <SelectTrigger id="secondary-location" className="mt-2">
                <SelectValue placeholder="Select a backup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {activeLoc
                  .filter(loc => loc.id !== localPreferences.preferredLocationId)
                  .map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} - {location.address.city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-select"
              checked={localPreferences.autoSelectNearest || false}
              onCheckedChange={(checked) =>
                setLocalPreferences(prev => ({ ...prev, autoSelectNearest: checked }))
              }
            />
            <Label htmlFor="auto-select">
              Automatically suggest nearest location for appointments
            </Label>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPreferences;
