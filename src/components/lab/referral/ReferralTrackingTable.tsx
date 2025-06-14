
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCheck, Download } from "lucide-react";

interface ReferralData {
  doctorId: string;
  doctorName: string;
  department: string;
  totalReferrals: number;
  completedReferrals: number;
  totalRevenue: number;
  commissionRate: string;
  commissionAmount: number;
  topReferredTests: string[];
  conversionRate: number;
}

interface ReferralTrackingTableProps {
  period: string;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortedData: ReferralData[];
  handleExportReferralData: () => void;
}

const ReferralTrackingTable = ({ 
  period, 
  sortBy, 
  setSortBy, 
  sortedData, 
  handleExportReferralData 
}: ReferralTrackingTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Doctor Referral Commission Tracking
            </CardTitle>
            <CardDescription>
              Track commissions earned by doctors for referring laboratory tests for {period}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-select">Sort by:</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-select" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="referrals">Referrals</SelectItem>
                <SelectItem value="conversion">Conversion Rate</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReferralData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Referrals</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead>Revenue Generated</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Commission Amount</TableHead>
              <TableHead>Top Tests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((doctor) => (
              <TableRow key={doctor.doctorId}>
                <TableCell>
                  <div>
                    <div className="font-medium">{doctor.doctorName}</div>
                    <div className="text-sm text-muted-foreground">{doctor.doctorId}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{doctor.department}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="font-medium">{doctor.completedReferrals}/{doctor.totalReferrals}</div>
                    <div className="text-sm text-muted-foreground">completed</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`font-medium ${
                      doctor.conversionRate >= 90 ? 'text-green-600' : 
                      doctor.conversionRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {doctor.conversionRate}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">₹{doctor.totalRevenue.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{doctor.commissionRate}</Badge>
                </TableCell>
                <TableCell className="font-bold text-green-600">
                  ₹{doctor.commissionAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {doctor.topReferredTests.slice(0, 2).map((test, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {test}
                      </Badge>
                    ))}
                    {doctor.topReferredTests.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.topReferredTests.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReferralTrackingTable;
