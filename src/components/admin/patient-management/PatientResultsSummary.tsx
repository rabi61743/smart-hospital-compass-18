
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface PatientResultsSummaryProps {
  filteredCount: number;
  totalCount: number;
  statusFilter: string;
  registrationTypeFilter: string;
  searchTerm: string;
}

const PatientResultsSummary = ({
  filteredCount,
  totalCount,
  statusFilter,
  registrationTypeFilter,
  searchTerm
}: PatientResultsSummaryProps) => {
  const hasActiveFilters = statusFilter !== 'all' || registrationTypeFilter !== 'all' || searchTerm;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="px-3 py-1">
          {filteredCount} of {totalCount} registrations
        </Badge>
        {hasActiveFilters && (
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            Filters Active
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PatientResultsSummary;
