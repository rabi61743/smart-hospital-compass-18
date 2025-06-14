
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  Edit, 
  Trash2,
  Filter,
  Download,
  Scan
} from "lucide-react";

const PharmacyInventoryTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const inventory = [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      manufacturer: 'Cipla',
      batchNo: 'PC2024001',
      expiryDate: '2025-12-15',
      stock: 450,
      minStock: 100,
      maxStock: 1000,
      unitPrice: 2.5,
      mrp: 5.0,
      location: 'A1-B2',
      status: 'In Stock'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      manufacturer: 'Sun Pharma',
      batchNo: 'AM2024015',
      expiryDate: '2024-08-20',
      stock: 25,
      minStock: 50,
      maxStock: 500,
      unitPrice: 8.0,
      mrp: 15.0,
      location: 'B2-C1',
      status: 'Low Stock'
    },
    {
      id: 'MED003',
      name: 'Omeprazole 20mg',
      category: 'Gastric',
      manufacturer: 'Dr. Reddy\'s',
      batchNo: 'OM2024008',
      expiryDate: '2025-03-10',
      stock: 180,
      minStock: 75,
      maxStock: 400,
      unitPrice: 12.0,
      mrp: 25.0,
      location: 'C1-D2',
      status: 'In Stock'
    },
    {
      id: 'MED004',
      name: 'Insulin Glargine',
      category: 'Diabetes',
      manufacturer: 'Novo Nordisk',
      batchNo: 'IN2024022',
      expiryDate: '2024-11-30',
      stock: 5,
      minStock: 10,
      maxStock: 50,
      unitPrice: 450.0,
      mrp: 890.0,
      location: 'COLD-A1',
      status: 'Critical'
    }
  ];

  const categories = ['All Categories', 'Pain Relief', 'Antibiotics', 'Gastric', 'Diabetes', 'Vitamins'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Out of Stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'low' && item.stock <= item.minStock) ||
                        (stockFilter === 'critical' && item.stock < item.minStock * 0.5);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Management
              </CardTitle>
              <CardDescription>
                Manage medicine stock, track expiry dates, and monitor inventory levels
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input placeholder="Enter manufacturer" />
                    </div>
                    <div className="space-y-2">
                      <Label>Batch Number</Label>
                      <Input placeholder="Enter batch number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Initial Stock</Label>
                      <Input type="number" placeholder="Enter quantity" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Price</Label>
                      <Input type="number" placeholder="Enter unit price" />
                    </div>
                    <div className="space-y-2">
                      <Label>MRP</Label>
                      <Input type="number" placeholder="Enter MRP" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Notes</Label>
                      <Textarea placeholder="Additional notes..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add Product</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Scan className="h-4 w-4 mr-2" />
                Scan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Details</TableHead>
                <TableHead>Batch Info</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.id} • {item.manufacturer}</p>
                      <Badge variant="outline" className="mt-1">{item.category}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">Batch: {item.batchNo}</p>
                      <p className="text-sm text-muted-foreground">Exp: {item.expiryDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.stock} units</p>
                      <p className="text-sm text-muted-foreground">Min: {item.minStock} • Max: {item.maxStock}</p>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">₹{item.mrp}</p>
                      <p className="text-sm text-muted-foreground">Cost: ₹{item.unitPrice}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.location}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
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

export default PharmacyInventoryTab;
