
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
import { Shield, Plus, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { InsurancePreAuth } from "./types";

const PreAuthorizationsTab = () => {
  const [preAuths] = useState<InsurancePreAuth[]>([
    {
      id: '1',
      authNumber: 'AUTH2024001',
      serviceType: 'MRI Scan',
      requestDate: '2024-01-10',
      approvedDate: '2024-01-12',
      expirationDate: '2024-04-12',
      approvedAmount: 15000,
      status: 'approved',
      notes: 'Pre-authorization approved for lumbar spine MRI'
    },
    {
      id: '2',
      authNumber: 'AUTH2024002',
      serviceType: 'Physical Therapy',
      requestDate: '2024-01-20',
      status: 'pending',
      notes: 'Awaiting approval for 12 sessions of physical therapy'
    },
    {
      id: '3',
      authNumber: 'AUTH2024003',
      serviceType: 'Specialist Consultation',
      requestDate: '2024-01-25',
      status: 'denied',
      notes: 'Denied - requires additional documentation'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'expired': return <XCircle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Pre-Authorizations</h3>
          <p className="text-sm text-muted-foreground">Manage pre-authorization requests for medical services</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request Pre-Auth
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Pre-Authorization</DialogTitle>
              <DialogDescription>
                Submit a new pre-authorization request for medical services
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mri">MRI Scan</SelectItem>
                    <SelectItem value="ct">CT Scan</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="pt">Physical Therapy</SelectItem>
                    <SelectItem value="specialist">Specialist Consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requestedDate">Requested Service Date</Label>
                <Input type="date" id="requestedDate" />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Provide any additional information about the service request..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit Request</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pre-Auth Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{preAuths.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {preAuths.filter(auth => auth.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {preAuths.filter(auth => auth.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Denied</p>
                <p className="text-2xl font-bold text-red-600">
                  {preAuths.filter(auth => auth.status === 'denied').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pre-Authorizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Authorization History</CardTitle>
          <CardDescription>View all your pre-authorization requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auth Number</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Approved Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preAuths.map((auth) => (
                <TableRow key={auth.id}>
                  <TableCell className="font-medium">{auth.authNumber}</TableCell>
                  <TableCell>{auth.serviceType}</TableCell>
                  <TableCell>{new Date(auth.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {auth.approvedDate ? new Date(auth.approvedDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {auth.expirationDate ? new Date(auth.expirationDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {auth.approvedAmount ? `₹${auth.approvedAmount.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(auth.status)}
                      <Badge className={getStatusColor(auth.status)}>
                        {auth.status.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{auth.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreAuthorizationsTab;
