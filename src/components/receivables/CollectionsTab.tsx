
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Filter, Phone, Mail, Plus, Calendar } from "lucide-react";

const CollectionsTab = () => {
  const [collectionActivities] = useState([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      patientId: 'P001',
      invoiceNumber: 'INV-2023-445',
      outstandingAmount: 25000,
      lastContactDate: '2024-01-10',
      contactMethod: 'Phone',
      contactResult: 'Payment promised by month end',
      nextFollowUp: '2024-01-30',
      collectionStage: 'first_reminder',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      patientId: 'P002',
      invoiceNumber: 'INV-2024-012',
      outstandingAmount: 15000,
      lastContactDate: '2024-01-20',
      contactMethod: 'Email',
      contactResult: 'Requested payment plan',
      nextFollowUp: '2024-01-25',
      collectionStage: 'negotiation',
      assignedTo: 'Mike Chen'
    },
    {
      id: '3',
      patientName: 'Mohammed Ali',
      patientId: 'P003',
      invoiceNumber: 'INV-2024-025',
      outstandingAmount: 8500,
      lastContactDate: null,
      contactMethod: null,
      contactResult: null,
      nextFollowUp: '2024-01-23',
      collectionStage: 'new',
      assignedTo: 'Sarah Johnson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'first_reminder': return 'bg-yellow-100 text-yellow-800';
      case 'second_reminder': return 'bg-orange-100 text-orange-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'final_notice': return 'bg-red-100 text-red-800';
      case 'collections_agency': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = collectionActivities.filter(activity => {
    const matchesSearch = activity.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || activity.collectionStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Collections Management</h3>
          <p className="text-sm text-muted-foreground">Manage collection activities and follow-ups</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Collection Contact</DialogTitle>
              <DialogDescription>Record a new collection contact attempt</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact-method">Contact Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact-result">Contact Result</Label>
                <Textarea id="contact-result" placeholder="Enter contact result..." />
              </div>
              <div>
                <Label htmlFor="next-followup">Next Follow-up Date</Label>
                <Input id="next-followup" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowAddDialog(false)}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Collection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">48.5K</p>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-muted-foreground">Active Cases</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹1.2L</p>
              <p className="text-sm text-muted-foreground">Collected This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search collection activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="first_reminder">First Reminder</SelectItem>
                <SelectItem value="second_reminder">Second Reminder</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="final_notice">Final Notice</SelectItem>
                <SelectItem value="collections_agency">Collections Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Activities</CardTitle>
          <CardDescription>Track and manage collection efforts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Next Follow-up</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{activity.patientName}</div>
                      <div className="text-sm text-muted-foreground">{activity.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{activity.invoiceNumber}</TableCell>
                  <TableCell>₹{activity.outstandingAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(activity.collectionStage)}>
                      {activity.collectionStage.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {activity.lastContactDate ? (
                      <div>
                        <div className="text-sm">{new Date(activity.lastContactDate).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">{activity.contactMethod}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No contact</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(activity.nextFollowUp).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{activity.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
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

export default CollectionsTab;
