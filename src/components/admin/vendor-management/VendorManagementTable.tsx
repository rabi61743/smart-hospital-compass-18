
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Phone, 
  Mail,
  Building,
  Star,
  Calendar,
  FileText
} from "lucide-react";

interface Vendor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  registrationDate: string;
  status: string;
  contractValue: number;
  contractExpiry: string;
  performanceRating: number;
  lastOrderDate: string;
  totalOrders: number;
  paymentTerms: string;
  complianceStatus: string;
}

interface VendorManagementTableProps {
  vendors: Vendor[];
}

const VendorManagementTable = ({ vendors }: VendorManagementTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'review-required': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'non-compliant': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical Supplies': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pharmaceuticals': return 'bg-green-100 text-green-800 border-green-200';
      case 'Laboratory Equipment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'IT Services': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Vendor</TableHead>
            <TableHead className="font-semibold text-gray-700">Contact</TableHead>
            <TableHead className="font-semibold text-gray-700">Category & Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Contract Details</TableHead>
            <TableHead className="font-semibold text-gray-700">Performance</TableHead>
            <TableHead className="font-semibold text-gray-700">Compliance</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor, index) => (
            <TableRow key={vendor.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
              <TableCell className="py-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold">
                      {getInitials(vendor.companyName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{vendor.companyName}</div>
                    <div className="text-sm text-gray-500">ID: {vendor.id}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{vendor.contactPerson}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{vendor.phone}</span>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-2">
                  <Badge className={`${getCategoryColor(vendor.category)} border font-medium`}>
                    {vendor.category}
                  </Badge>
                  <div>
                    <Badge className={`${getStatusColor(vendor.status)} border font-medium flex items-center gap-1 w-fit`}>
                      <Building className="h-3 w-3" />
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{formatCurrency(vendor.contractValue)}</div>
                  <div className="text-sm text-gray-600">Expires: {vendor.contractExpiry}</div>
                  <div className="text-xs text-gray-500">{vendor.paymentTerms}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="font-medium">{vendor.performanceRating}</span>
                  </div>
                  <div className="text-sm text-gray-600">{vendor.totalOrders} orders</div>
                  <div className="text-xs text-gray-500">Last: {vendor.lastOrderDate}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge className={`${getComplianceColor(vendor.complianceStatus)} border font-medium`}>
                  {vendor.complianceStatus.replace('-', ' ')}
                </Badge>
              </TableCell>
              
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 border-0 shadow-lg">
                    <DropdownMenuItem className="hover:bg-blue-50 focus:bg-blue-50">
                      <Eye className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-blue-600">View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50">
                      <Edit className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-600">Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 focus:bg-purple-50">
                      <FileText className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-purple-600">View Contract</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-orange-50 focus:bg-orange-50">
                      <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                      <span className="text-orange-600">Schedule Review</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendorManagementTable;
