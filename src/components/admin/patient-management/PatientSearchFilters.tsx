
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface PatientSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  registrationTypeFilter: string;
  setRegistrationTypeFilter: (value: string) => void;
}

const PatientSearchFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  registrationTypeFilter,
  setRegistrationTypeFilter
}: PatientSearchFiltersProps) => {
  const statuses = ['all', 'completed', 'in-progress', 'pending', 'incomplete'];
  const registrationTypes = ['all', 'walk-in', 'online', 'referral', 'emergency'];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, email, or patient ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-300 focus:border-green-500 h-11"
        />
      </div>
      
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 border-gray-300 focus:border-green-500 h-11">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={registrationTypeFilter} onValueChange={setRegistrationTypeFilter}>
          <SelectTrigger className="w-48 border-gray-300 focus:border-green-500 h-11">
            <SelectValue placeholder="Registration Type" />
          </SelectTrigger>
          <SelectContent>
            {registrationTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatientSearchFilters;
