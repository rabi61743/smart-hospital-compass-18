
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Navigation, Phone, Clock } from "lucide-react";
import { PatientLocation } from "./types";
import LocationSelector from "./LocationSelector";

interface LocationFinderProps {
  locations: PatientLocation[];
  onLocationSelect: (locationId: string) => void;
  selectedLocationId?: string;
}

const LocationFinder = ({ 
  locations, 
  onLocationSelect, 
  selectedLocationId 
}: LocationFinderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  // Get all unique services across locations
  const allServices = Array.from(
    new Set(locations.flatMap(loc => loc.services))
  ).sort();

  const filteredLocations = locations.filter(location => {
    if (!location.isActive) return false;
    
    const matchesSearch = searchTerm === '' || 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = serviceFilter === '' || 
      location.services.some(service => 
        service.toLowerCase().includes(serviceFilter.toLowerCase())
      );
    
    return matchesSearch && matchesService;
  });

  const handleGetDirections = (location: PatientLocation) => {
    if (location.coordinates) {
      const url = `https://maps.google.com/maps?daddr=${location.coordinates.lat},${location.coordinates.lng}`;
      window.open(url, '_blank');
    } else {
      const address = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zipCode}`;
      const url = `https://maps.google.com/maps?daddr=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Find a Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Filter by service (e.g., Cardiology)..."
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Popular Services Quick Filter */}
          <div>
            <p className="text-sm font-medium mb-2">Popular Services:</p>
            <div className="flex flex-wrap gap-2">
              {allServices.slice(0, 6).map((service) => (
                <Badge
                  key={service}
                  variant={serviceFilter === service ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setServiceFilter(serviceFilter === service ? '' : service)}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Found {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
        </p>
        {(searchTerm || serviceFilter) && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setServiceFilter('');
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Location Results */}
      {filteredLocations.length > 0 ? (
        <LocationSelector
          locations={filteredLocations}
          selectedLocationId={selectedLocationId}
          onLocationSelect={onLocationSelect}
          showDetails={true}
        />
      ) : (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Locations Found</h3>
              <p className="text-gray-600 mb-4">
                No locations match your current search criteria.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setServiceFilter('');
                }}
              >
                Show All Locations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationFinder;
