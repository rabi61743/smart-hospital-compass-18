
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  Activity,
  FileText,
  AlertTriangle,
  Clock
} from "lucide-react";

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: Date;
  nextAppointment?: Date;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  insuranceProvider?: string;
  status: 'active' | 'critical' | 'stable' | 'monitoring';
}

interface PatientProfileCardProps {
  patient: PatientProfile;
  onViewDetails: (patientId: string) => void;
  onScheduleAppointment: (patientId: string) => void;
}

const PatientProfileCard = ({ patient, onViewDetails, onScheduleAppointment }: PatientProfileCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stable': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/api/placeholder/48/48`} alt={patient.name} />
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <CardDescription>
                {patient.age} years • {patient.gender} • {patient.bloodType}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(patient.status)}>
            {patient.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{patient.email}</span>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{patient.address}</span>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-2">
          {patient.allergies.length > 0 && (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Allergies:</span>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {patient.chronicConditions.length > 0 && (
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Conditions:</span>
              <div className="flex flex-wrap gap-1">
                {patient.chronicConditions.slice(0, 2).map((condition, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {condition}
                  </Badge>
                ))}
                {patient.chronicConditions.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{patient.chronicConditions.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Visit Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Last visit: {patient.lastVisit.toLocaleDateString()}</span>
          </div>
          {patient.nextAppointment && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Next: {patient.nextAppointment.toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(patient.id)}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button 
            size="sm" 
            onClick={() => onScheduleAppointment(patient.id)}
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;
