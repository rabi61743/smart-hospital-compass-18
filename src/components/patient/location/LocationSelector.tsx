import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";
import { PatientLocation } from "./types";

interface LocationSelectorProps {
  locations: PatientLocation[];
  selectedLocationId?: string;
  onLocationSelect: (locationId: string) => void;
  showDetails?: boolean;
}

const LocationSelector = ({ 
  locations, 
  selectedLocationId, 
  onLocationSelect, 
  showDetails = false 
}: LocationSelectorProps) => {
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  const formatAddress = (address: PatientLocation['address']) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const getCurrentDayHours = (operatingHours: PatientLocation['operatingHours']) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().slice(0, 3);
    const todayHours = operatingHours[today];
    if (!todayHours || !todayHours.isOpen) return "Closed";
    return `${todayHours.open} - ${todayHours.close}`;
  };

  return (
    <div className="space-y-4">
      {locations.filter(loc => loc.isActive).map((location) => (
        <Card 
          key={location.id} 
          className={`cursor-pointer transition-all ${
            selectedLocationId === location.id 
              ? 'ring-2 ring-blue-500 bg-blue-50' 
              : 'hover:shadow-md'
          }`}
          onClick={() => onLocationSelect(location.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  {location.name}
                  {selectedLocationId === location.id && (
                    <Star className="h-4 w-4 text-blue-600 fill-current" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{formatAddress(location.address)}</span>
                </div>
              </div>
              <Badge variant="secondary">{location.code}</Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Contact & Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{location.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{getCurrentDayHours(location.operatingHours)}</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm font-medium mb-2">Available Services:</p>
                <div className="flex flex-wrap gap-1">
                  {location.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {location.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{location.services.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Features */}
              {location.features.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {location.features.slice(0, 4).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant={selectedLocationId === location.id ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLocationSelect(location.id);
                  }}
                >
                  {selectedLocationId === location.id ? "Selected" : "Select Location"}
                </Button>
                
                {location.coordinates && (
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                )}
                
                {showDetails && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedLocation(
                        expandedLocation === location.id ? null : location.id
                      );
                    }}
                  >
                    {expandedLocation === location.id ? "Less Info" : "More Info"}
                  </Button>
                )}
              </div>

              {/* Expanded Details */}
              {showDetails && expandedLocation === location.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Operating Hours</h4>
                    <div className="text-xs space-y-1">
                      {Object.entries(location.operatingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize">{day}:</span>
                          <span>
                            {hours.isOpen ? `${hours.open} - ${hours.close}` : "Closed"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">All Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LocationSelector;
