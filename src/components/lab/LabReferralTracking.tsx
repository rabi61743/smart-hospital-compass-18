
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCheck, TrendingUp, Users, DollarSign, Download, Calendar } from "lucide-react";

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

interface LabReferralTrackingProps {
  period: string;
  selectedCategory: string;
}

const LabReferralTracking = ({ period, selectedCategory }: LabReferralTrackingProps) => {
  const [sortBy, setSortBy] = useState('commission');

  // Mock referral data
  const referralData: ReferralData[] = [
    {
      doctorId: 'DOC001',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Internal Medicine',
      totalReferrals: 45,
      completedReferrals: 38,
      totalRevenue: 95000,
      commissionRate: '8%',
      commissionAmount: 7600,
      topReferredTests: ['MRI Scan', 'Blood Tests', 'CT Scan'],
      conversionRate: 84.4
    },
    {
      doctorId: 'DOC002',
      doctorName: 'Dr. Michael Chen',
      department: 'Cardiology',
      totalReferrals: 32,
      completedReferrals: 30,
      totalRevenue: 128000,
      commissionRate: '10%',
      commissionAmount: 12800,
      topReferredTests: ['Cardiac MRI', 'ECG', 'Stress Test'],
      conversionRate: 93.8
    },
    {
      doctorId: 'DOC003',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Neurology',
      totalReferrals: 28,
      completedReferrals: 25,
      totalRevenue: 87500,
      commissionRate: '9%',
      commissionAmount: 7875,
      topReferredTests: ['Brain MRI', 'CT Scan', 'EEG'],
      conversionRate: 89.3
    },
    {
      doctorId: 'DOC004',
      doctorName: 'Dr. James Wilson',
      department: 'Orthopedics',
      totalReferrals: 22,
      completedReferrals: 20,
      totalRevenue: 65000,
      commissionRate: '7%',
      commissionAmount: 4550,
      topReferredTests: ['X-Ray', 'MRI Scan', 'Bone Scan'],
      conversionRate: 90.9
    },
    {
      doctorId: 'DOC005',
      doctorName: 'Dr. Lisa Thompson',
      department: 'Gastroenterology',
      totalReferrals: 19,
      completedReferrals: 17,
      totalRevenue: 52000,
      commissionRate: '8%',
      commissionAmount: 4160,
      topReferredTests: ['Endoscopy', 'CT Scan', 'Blood Tests'],
      conversionRate: 89.5
    }
  ];

  const sortedData = [...referralData].sort((a, b) => {
    switch (sortBy) {
      case 'commission':
        return b.commissionAmount - a.commissionAmount;
      case 'referrals':
        return b.totalReferrals - a.totalReferrals;
      case 'conversion':
        return b.conversionRate - a.conversionRate;
      case 'revenue':
        return b.totalRevenue - a.totalRevenue;
      default:
        return 0;
    }
  });

  const totalStats = {
    totalReferrals: referralData.reduce((sum, doc) => sum + doc.totalReferrals, 0),
    totalCommission: referralData.reduce((sum, doc) => sum + doc.commissionAmount, 0),
    totalRevenue: referralData.reduce((sum, doc) => sum + doc.totalRevenue, 0),
    averageConversion: referralData.reduce((sum, doc) => sum + doc.conversionRate, 0) / referralData.length
  };

  const handleExportReferralData = () => {
    console.log('Exporting referral tracking data for period:', period);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">{totalStats.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Across all doctors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold">₹{totalStats.totalCommission.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Referral Revenue</p>
                <p className="text-2xl font-bold">₹{totalStats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">From referred tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Conversion</p>
                <p className="text-2xl font-bold">{totalStats.averageConversion.toFixed(1)}%</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Referral to completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls and Table */}
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

      {/* Referral Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Performance Insights</CardTitle>
          <CardDescription>Key findings from referral commission analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Top Performers</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Highest Commission: Dr. Michael Chen</span>
                  <Badge className="bg-green-100 text-green-800">₹12,800</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Best Conversion: Dr. Michael Chen</span>
                  <Badge className="bg-blue-100 text-blue-800">93.8%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Most Referrals: Dr. Sarah Johnson</span>
                  <Badge className="bg-purple-100 text-purple-800">45 total</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Growth Opportunities</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Cardiology shows highest commission rates (10%)</p>
                <p>• MRI and CT scans are most frequently referred</p>
                <p>• Average conversion rate of 89.6% is excellent</p>
                <p>• Consider incentivizing high-value test referrals</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabReferralTracking;
