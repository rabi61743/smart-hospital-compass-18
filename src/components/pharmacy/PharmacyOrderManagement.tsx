
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Search, 
  Plus, 
  Eye, 
  CheckCircle,
  Clock,
  AlertCircle,
  Truck
} from "lucide-react";

const PharmacyOrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD001',
      supplier: 'MedSupply Co.',
      orderDate: '2024-01-15',
      expectedDate: '2024-01-20',
      status: 'Pending',
      items: 15,
      totalAmount: 45280,
      priority: 'High'
    },
    {
      id: 'ORD002',
      supplier: 'PharmaDistributors Ltd.',
      orderDate: '2024-01-14',
      expectedDate: '2024-01-18',
      status: 'Shipped',
      items: 8,
      totalAmount: 28940,
      priority: 'Medium'
    },
    {
      id: 'ORD003',
      supplier: 'Generic Medicines Inc.',
      orderDate: '2024-01-12',
      expectedDate: '2024-01-16',
      status: 'Delivered',
      items: 22,
      totalAmount: 67890,
      priority: 'Low'
    }
  ];

  const prescriptionOrders = [
    {
      id: 'RX001',
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      prescriptionDate: '2024-01-15',
      status: 'Ready',
      items: 3,
      totalAmount: 245
    },
    {
      id: 'RX002',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Johnson',
      prescriptionDate: '2024-01-15',
      status: 'Processing',
      items: 2,
      totalAmount: 180
    },
    {
      id: 'RX003',
      patientName: 'Bob Wilson',
      doctorName: 'Dr. Brown',
      prescriptionDate: '2024-01-14',
      status: 'Collected',
      items: 4,
      totalAmount: 320
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Collected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="supply" className="space-y-6">
        <TabsList>
          <TabsTrigger value="supply">Supply Orders</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescription Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-6">
          {/* Supply Orders Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Supply Orders
                  </CardTitle>
                  <CardDescription>
                    Manage orders from suppliers and track deliveries
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Supply Orders Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{order.supplier}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">Ordered: {order.orderDate}</p>
                          <p className="text-sm text-muted-foreground">Expected: {order.expectedDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === 'Shipped' && (
                            <Button size="sm" variant="outline">
                              <Truck className="h-4 w-4" />
                            </Button>
                          )}
                          {order.status === 'Delivered' && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          {/* Prescription Orders Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Prescription Orders
              </CardTitle>
              <CardDescription>
                Track and fulfill prescription orders from patients
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Prescription Orders Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prescription ID</TableHead>
                    <TableHead>Patient Details</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptionOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{order.patientName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{order.doctorName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{order.prescriptionDate}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">₹{order.totalAmount}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === 'Processing' && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyOrderManagement;
