
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: string;
  employeeType: string;
}

interface EmployeeTableRowProps {
  employee: Employee;
  onViewProfile: (employeeId: string) => void;
}

const EmployeeTableRow = ({ employee, onViewProfile }: EmployeeTableRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div>
          <p className="font-medium">{employee.name}</p>
          <p className="text-sm text-muted-foreground">{employee.id}</p>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{employee.department}</p>
          <p className="text-sm text-muted-foreground">{employee.position}</p>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <p className="text-sm">Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
          <Badge variant="outline" className="mt-1">{employee.employeeType}</Badge>
        </div>
      </TableCell>
      <TableCell>
        <p className="font-medium">₹{employee.salary.toLocaleString()}/month</p>
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor(employee.status)}>
          {employee.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewProfile(employee.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeTableRow;
