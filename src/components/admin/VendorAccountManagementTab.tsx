
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Download, 
  Search, 
  Filter,
  UserPlus,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VendorRegistrationStats from './vendor-management/VendorRegistrationStats';
import VendorManagementTable from './vendor-management/VendorManagementTable';
import VendorRegistrationDialog from './vendor-management/VendorRegistrationDialog';

const VendorAccountManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock vendor data
  const vendors = [
    {
      id: 'VEN001',
      companyName: 'MediSupply Corp',
      contactPerson: 'John Smith',
      email: 'john.smith@medisupply.com',
      phone: '+91 98765 43210',
      category: 'Medical Supplies',
      registrationDate: '2024-01-15',
      status: 'active',
      contractValue: 2500000,
      contractExpiry: '2024-12-31',
      performanceRating: 4.8,
      lastOrderDate: '2024-01-20',
      totalOrders: 156,
      paymentTerms: 'Net 30',
      address: '123 Medical Lane, Mumbai, Maharashtra',
      gstNumber: 'GST123456789',
      panNumber: 'PAN123456789',
      complianceStatus: 'compliant'
    },
    {
      id: 'VEN002',
      companyName: 'PharmaTech Solutions',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@pharmatech.com',
      phone: '+91 98765 43211',
      category: 'Pharmaceuticals',
      registrationDate: '2024-01-10',
      status: 'active',
      contractValue: 1800000,
      contractExpiry: '2024-11-30',
      performanceRating: 4.6,
      lastOrderDate: '2024-01-18',
      totalOrders: 89,
      paymentTerms: 'Net 15',
      address: '456 Pharma Street, Delhi, India',
      gstNumber: 'GST987654321',
      panNumber: 'PAN987654321',
      complianceStatus: 'compliant'
    },
    {
      id: 'VEN003',
      companyName: 'LabEquipment Pro',
      contactPerson: 'Michael Chen',
      email: 'michael.chen@labequipment.com',
      phone: '+91 98765 43212',
      category: 'Laboratory Equipment',
      registrationDate: '2024-01-05',
      status: 'pending',
      contractValue: 3200000,
      contractExpiry: '2025-01-31',
      performanceRating: 4.9,
      lastOrderDate: '2024-01-15',
      totalOrders: 23,
      paymentTerms: 'Net 45',
      address: '789 Equipment Plaza, Bangalore, Karnataka',
      gstNumber: 'GST456789123',
      panNumber: 'PAN456789123',
      complianceStatus: 'review-required'
    },
    {
      id: 'VEN004',
      companyName: 'TechMed Systems',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@techmed.com',
      phone: '+91 98765 43213',
      category: 'IT Services',
      registrationDate: '2024-01-12',
      status: 'inactive',
      contractValue: 950000,
      contractExpiry: '2024-06-30',
      performanceRating: 3.8,
      lastOrderDate: '2023-12-20',
      totalOrders: 45,
      paymentTerms: 'Net 30',
      address: '321 Tech Park, Hyderabad, Telangana',
      gstNumber: 'GST789123456',
      panNumber: 'PAN789123456',
      complianceStatus: 'non-compliant'
    }
  ];

  const statuses = ['all', 'active', 'pending', 'inactive', 'suspended'];
  const categories = ['all', 'Medical Supplies', 'Pharmaceuticals', 'Laboratory Equipment', 'IT Services', 'Maintenance', 'Consulting'];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Vendor data is being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Vendor Registration Statistics */}
      <VendorRegistrationStats vendors={vendors} />

      {/* Main Vendor Account Management */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                Vendor/Partner Account Management
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-base">
                Manage vendor partnerships, contracts, and performance tracking
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExport} className="border-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={() => setIsRegistrationDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700 shadow-md">
                <UserPlus className="h-4 w-4 mr-2" />
                Register Vendor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by company name, contact person, email, or vendor ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-purple-500 h-11"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 border-gray-300 focus:border-purple-500 h-11">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48 border-gray-300 focus:border-purple-500 h-11">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  {filteredVendors.length} of {vendors.length} vendors
                </Badge>
                {(statusFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
                  <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                    Filters Active
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Vendor Management Table */}
          <VendorManagementTable vendors={filteredVendors} />
        </CardContent>
      </Card>

      {/* Vendor Registration Dialog */}
      <VendorRegistrationDialog
        open={isRegistrationDialogOpen}
        onOpenChange={setIsRegistrationDialogOpen}
      />
    </div>
  );
};

export default VendorAccountManagementTab;
