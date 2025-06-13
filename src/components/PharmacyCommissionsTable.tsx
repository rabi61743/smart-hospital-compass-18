
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PharmacyCommission {
  category: string;
  sales: string;
  commission: string;
  rate: string;
}

interface PharmacyCommissionsTableProps {
  pharmacyCommissions: PharmacyCommission[];
}

const PharmacyCommissionsTable = ({ pharmacyCommissions }: PharmacyCommissionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pharmacy Commission Tracking</CardTitle>
        <CardDescription>Monitor pharmacy sales and related commissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Sales Amount</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Commission Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pharmacyCommissions.map((pharmacy, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{pharmacy.category}</TableCell>
                <TableCell>{pharmacy.sales}</TableCell>
                <TableCell>{pharmacy.rate}</TableCell>
                <TableCell className="font-bold text-green-600">{pharmacy.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PharmacyCommissionsTable;
