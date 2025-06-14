
export interface PatientLocation {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  services: string[];
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  features: string[];
  imageUrl?: string;
}

export interface LocationPreference {
  patientId: string;
  preferredLocationId: string;
  secondaryLocationId?: string;
  autoSelectNearest?: boolean;
}
