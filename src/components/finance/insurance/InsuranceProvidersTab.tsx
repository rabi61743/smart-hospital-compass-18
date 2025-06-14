
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, Edit, Settings, TrendingUp, TrendingDown } from "lucide-react";

const InsuranceProvidersTab = () => {
  const [providers] = useState([
    {
      id: '1',
      name: 'Star Health Insurance',
      code: 'SH',
      contactPerson: 'Rahul Mehta',
      email: 'rahul.mehta@starhealth.in',
      phone: '+91-98765-43210',
      totalClaims: 125,
      approvedClaims: 118,
      approvalRate: 94.4,
      avgProcessingDays: 5.2,
      totalAmount: 4250000,
      status: 'active',
      contractExpiry: '2024-12-31'
    },
    {
      id: '2',
      name: 'HDFC ERGO Health',
      code: 'HE',
      contactPerson: 'Priya Sharma',
      email: 'priya.sharma@hdfcergo.com',
      phone: '+91-87654-32109',
      totalClaims: 98,
      approvedClaims: 89,
      approvalRate: 90.8,
      avgProcessingDays: 7.1,
      totalAmount: 3280000,
      status: 'active',
      contractExpiry: '2025-03-31'
    },
    {
      id: '3',
      name: 'ICICI Lombard',
      code: 'IL',
      contactPerson: 'Amit Gupta',
      email: 'amit.gupta@icicilombard.com',
      phone: '+91-76543-21098',
      totalClaims: 87,
      approvedClaims: 79,
      approvalRate: 90.8,
      avgProcessingDays: 6.8,
      totalAmount: 2890000,
      status: 'active',
      contractExpiry: '2024-09-30'
    },
    {
      id: '4',
      name: 'New India Assurance',
      code: 'NIA',
      contactPerson: 'Sunita Reddy',
      email: 'sunita.reddy@newindia.co.in',
      phone: '+91-65432-10987',
      totalClaims: 76,
      approvedClaims: 68,
      approvalRate: 89.5,
      avgProcessingDays: 9.3,
      totalAmount: 2150000,
      status: 'active',
      contractExpiry: '2025-01-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (rate: number) => {
    return rate >= 90 ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Insurance Providers</h3>
          <p className="text-sm text-muted-foreground">Manage insurance provider relationships and performance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Insurance Provider</DialogTitle>
              <DialogDescription>
                Add a new insurance provider to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="providerName">Provider Name</Label>
                  <Input id="providerName" placeholder="e.g., Star Health Insurance" />
                </div>
                <div>
                  <Label htmlFor="providerCode">Provider Code</Label>
                  <Input id="providerCode" placeholder="e.g., SH" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Contact person name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@provider.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91-XXXXX-XXXXX" />
                </div>
                <div>
                  <Label htmlFor="contractExpiry">Contract Expiry</Label>
                  <Input id="contractExpiry" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes about the provider..." rows={3} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Provider</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Provider Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{providers.length}</p>
              <p className="text-sm text-muted-foreground">Active Providers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Math.round(providers.reduce((sum, p) => sum + p.approvalRate, 0) / providers.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Approval Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Math.round(providers.reduce((sum, p) => sum + p.avgProcessingDays, 0) / providers.length)} days
              </p>
              <p className="text-sm text-muted-foreground">Avg Processing Time</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                ₹{(providers.reduce((sum, p) => sum + p.totalAmount, 0) / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground">Total Claims Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Providers</CardTitle>
          <CardDescription>Manage relationships with insurance providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Claims</TableHead>
                <TableHead>Approval Rate</TableHead>
                <TableHead>Avg Processing</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Contract Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-muted-foreground">{provider.code}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{provider.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{provider.email}</div>
                      <div className="text-sm text-muted-foreground">{provider.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{provider.totalClaims} total</div>
                      <div className="text-sm text-green-600">{provider.approvedClaims} approved</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(provider.approvalRate)}
                      <span className="font-medium">{provider.approvalRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{provider.avgProcessingDays} days</TableCell>
                  <TableCell>₹{(provider.totalAmount / 100000).toFixed(1)}L</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(provider.contractExpiry).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(provider.status)}>
                      {provider.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceProvidersTab;
