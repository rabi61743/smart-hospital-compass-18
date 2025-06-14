
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface EmployeeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  departments: string[];
}

const EmployeeFilters = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  departments
}: EmployeeFiltersProps) => {
  return (
    <div className="flex gap-4 items-center mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.slice(1).map(dept => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeFilters;
