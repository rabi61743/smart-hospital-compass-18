
import { useState, useEffect } from 'react';
import { PatientLocation, LocationPreference } from '@/components/patient/location/types';

// Mock data for patient locations
const mockLocations: PatientLocation[] = [
  {
    id: 'main-hospital',
    name: 'Main Hospital Campus',
    code: 'MAIN',
    address: {
      street: '123 Healthcare Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-1234-5678',
      email: 'main@hospital.com'
    },
    services: [
      'Emergency Care', 'Cardiology', 'Neurology', 'Surgery', 
      'Radiology', 'Laboratory', 'Pharmacy', 'ICU'
    ],
    operatingHours: {
      mon: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      tue: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      wed: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      thu: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      fri: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      sat: { open: '8:00 AM', close: '8:00 PM', isOpen: true },
      sun: { open: '8:00 AM', close: '6:00 PM', isOpen: true }
    },
    coordinates: { lat: 19.0760, lng: 72.8777 },
    isActive: true,
    features: ['24/7 Emergency', 'Parking Available', 'Wheelchair Accessible', 'Pharmacy On-site']
  },
  {
    id: 'downtown-branch',
    name: 'Downtown Medical Center',
    code: 'DOWN',
    address: {
      street: '456 Medical Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400002',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-2345-6789',
      email: 'downtown@hospital.com'
    },
    services: [
      'General Practice', 'Pediatrics', 'Gynecology', 'Dermatology',
      'Orthopedics', 'Laboratory', 'X-Ray', 'Pharmacy'
    ],
    operatingHours: {
      mon: { open: '7:00 AM', close: '9:00 PM', isOpen: true },
      tue: { open: '7:00 AM', close: '9:00 PM', isOpen: true },
      wed: { open: '7:00 AM', close: '9:00 PM', isOpen: true },
      thu: { open: '7:00 AM', close: '9:00 PM', isOpen: true },
      fri: { open: '7:00 AM', close: '9:00 PM', isOpen: true },
      sat: { open: '8:00 AM', close: '6:00 PM', isOpen: true },
      sun: { open: '9:00 AM', close: '5:00 PM', isOpen: true }
    },
    coordinates: { lat: 19.0825, lng: 72.8815 },
    isActive: true,
    features: ['Express Lab', 'Digital X-Ray', 'Online Appointments', 'Valet Parking']
  },
  {
    id: 'suburban-clinic',
    name: 'Suburban Family Clinic',
    code: 'SUB',
    address: {
      street: '789 Family Road',
      city: 'Thane',
      state: 'Maharashtra',
      zipCode: '400601',
      country: 'India'
    },
    contactInfo: {
      phone: '+91-22-3456-7890',
      email: 'suburban@hospital.com'
    },
    services: [
      'Family Medicine', 'Pediatrics', 'Wellness Checkups', 
      'Vaccinations', 'Basic Lab Tests', 'Minor Procedures'
    ],
    operatingHours: {
      mon: { open: '8:00 AM', close: '7:00 PM', isOpen: true },
      tue: { open: '8:00 AM', close: '7:00 PM', isOpen: true },
      wed: { open: '8:00 AM', close: '7:00 PM', isOpen: true },
      thu: { open: '8:00 AM', close: '7:00 PM', isOpen: true },
      fri: { open: '8:00 AM', close: '7:00 PM', isOpen: true },
      sat: { open: '9:00 AM', close: '5:00 PM', isOpen: true },
      sun: { open: '10:00 AM', close: '4:00 PM', isOpen: true }
    },
    coordinates: { lat: 19.2183, lng: 72.9781 },
    isActive: true,
    features: ['Family-Friendly', 'Short Wait Times', 'Free Parking', 'Kids Play Area']
  }
];

const mockPreferences: LocationPreference = {
  patientId: 'patient-1',
  preferredLocationId: 'main-hospital',
  secondaryLocationId: 'downtown-branch',
  autoSelectNearest: true
};

export const usePatientLocations = () => {
  const [locations, setLocations] = useState<PatientLocation[]>(mockLocations);
  const [preferences, setPreferences] = useState<LocationPreference>(mockPreferences);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(preferences.preferredLocationId);
  const [isLoading, setIsLoading] = useState(false);

  const getLocationById = (locationId: string) => {
    return locations.find(loc => loc.id === locationId);
  };

  const getActiveLocations = () => {
    return locations.filter(loc => loc.isActive);
  };

  const updatePreferences = (newPreferences: LocationPreference) => {
    setPreferences(newPreferences);
    console.log('Updated location preferences:', newPreferences);
    // In real implementation, this would save to backend
  };

  const findNearestLocation = (userLat: number, userLng: number) => {
    const locationsWithCoords = locations.filter(loc => 
      loc.isActive && loc.coordinates
    );

    if (locationsWithCoords.length === 0) return null;

    let nearest = locationsWithCoords[0];
    let shortestDistance = calculateDistance(
      userLat, userLng, 
      nearest.coordinates!.lat, nearest.coordinates!.lng
    );

    locationsWithCoords.forEach(location => {
      const distance = calculateDistance(
        userLat, userLng,
        location.coordinates!.lat, location.coordinates!.lng
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = location;
      }
    });

    return nearest;
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getLocationsByService = (serviceName: string) => {
    return locations.filter(loc => 
      loc.isActive && 
      loc.services.some(service => 
        service.toLowerCase().includes(serviceName.toLowerCase())
      )
    );
  };

  return {
    locations: getActiveLocations(),
    preferences,
    selectedLocationId,
    isLoading,
    setSelectedLocationId,
    getLocationById,
    updatePreferences,
    findNearestLocation,
    getLocationsByService
  };
};
