
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DoctorCommission {
  id: number;
  name: string;
  department: string;
  consultations: number;
  surgeries: number;
  commission: string;
  rate: string;
}

interface DoctorCommissionsTableProps {
  doctorCommissions: DoctorCommission[];
}

const DoctorCommissionsTable = ({ doctorCommissions }: DoctorCommissionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Commission Tracking</CardTitle>
        <CardDescription>Track consultation and procedure-based commissions for all doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Consultations</TableHead>
              <TableHead>Surgeries</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Total Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorCommissions.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell>{doctor.consultations}</TableCell>
                <TableCell>{doctor.surgeries}</TableCell>
                <TableCell>{doctor.rate}</TableCell>
                <TableCell className="font-bold text-green-600">{doctor.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DoctorCommissionsTable;
