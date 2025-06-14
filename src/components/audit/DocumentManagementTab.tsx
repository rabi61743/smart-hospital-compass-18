
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Upload, Download, Eye, FileText, Archive, Shield, Clock } from "lucide-react";

const DocumentManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const documents = [
    {
      id: 'DOC001',
      name: 'Patient Consent Form - P12345',
      category: 'Medical Records',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-06-14',
      uploadedBy: 'Dr. Rajesh Kumar',
      status: 'active',
      retention: '7 years',
      encrypted: true,
      lastAccessed: '2024-06-14'
    },
    {
      id: 'DOC002',
      name: 'Financial Audit Report Q2 2024',
      category: 'Financial',
      type: 'PDF',
      size: '5.8 MB',
      uploadDate: '2024-06-13',
      uploadedBy: 'Finance Manager',
      status: 'active',
      retention: '10 years',
      encrypted: true,
      lastAccessed: '2024-06-13'
    },
    {
      id: 'DOC003',
      name: 'Employee Contract - John Doe',
      category: 'HR',
      type: 'DOCX',
      size: '1.2 MB',
      uploadDate: '2024-06-12',
      uploadedBy: 'HR Manager',
      status: 'active',
      retention: '5 years',
      encrypted: true,
      lastAccessed: '2024-06-12'
    },
    {
      id: 'DOC004',
      name: 'IT Security Policy v2.1',
      category: 'Compliance',
      type: 'PDF',
      size: '3.1 MB',
      uploadDate: '2024-06-10',
      uploadedBy: 'IT Security',
      status: 'archived',
      retention: '3 years',
      encrypted: true,
      lastAccessed: '2024-06-10'
    },
    {
      id: 'DOC005',
      name: 'Insurance Claim Form - C789',
      category: 'Insurance',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-06-09',
      uploadedBy: 'Insurance Clerk',
      status: 'pending_review',
      retention: '7 years',
      encrypted: true,
      lastAccessed: '2024-06-09'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical Records': return 'bg-blue-100 text-blue-800';
      case 'Financial': return 'bg-green-100 text-green-800';
      case 'HR': return 'bg-purple-100 text-purple-800';
      case 'Compliance': return 'bg-red-100 text-red-800';
      case 'Insurance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-bold text-blue-600">3,245</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Encrypted</p>
              <p className="text-2xl font-bold text-green-600">100%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Archive className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Archived</p>
              <p className="text-2xl font-bold text-purple-600">1,089</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Medical Records">Medical Records</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="pending_review">Pending Review</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Repository</CardTitle>
          <CardDescription>Secure document storage with audit trails and retention policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type/Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Retention</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          {doc.encrypted && <Shield className="h-3 w-3" />}
                          ID: {doc.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doc.type}</div>
                      <div className="text-xs text-muted-foreground">{doc.size}</div>
                    </div>
                  </TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{doc.retention}</div>
                      <div className="text-xs text-muted-foreground">
                        Last accessed: {new Date(doc.lastAccessed).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Storage by Category</CardTitle>
            <CardDescription>Document distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Medical Records', count: 1245, percentage: 38 },
                { category: 'Financial', count: 856, percentage: 26 },
                { category: 'HR', count: 534, percentage: 16 },
                { category: 'Compliance', count: 389, percentage: 12 },
                { category: 'Insurance', count: 221, percentage: 8 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.count} docs</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest document management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Document uploaded', doc: 'Patient Consent Form', user: 'Dr. Kumar', time: '2 hours ago' },
                { action: 'Document archived', doc: 'Old Policy Document', user: 'System', time: '4 hours ago' },
                { action: 'Document accessed', doc: 'Financial Report', user: 'Finance Manager', time: '6 hours ago' },
                { action: 'Document reviewed', doc: 'Insurance Claim', user: 'Insurance Clerk', time: '1 day ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.doc} by {activity.user}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManagementTab;
