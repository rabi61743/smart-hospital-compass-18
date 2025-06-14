
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit, Plus, Calendar, Star } from "lucide-react";

const PerformanceReviewsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const performanceReviews = [
    {
      id: 'REV001',
      employeeName: 'Dr. Sarah Wilson',
      employeeId: 'EMP001',
      position: 'Senior Cardiologist',
      department: 'Cardiology',
      reviewType: 'Annual Review',
      reviewPeriod: 'Q2 2024',
      status: 'completed',
      score: 4.8,
      reviewer: 'Dr. Rajesh Kumar',
      reviewDate: '2024-06-10',
      dueDate: '2024-06-15',
      goals: ['Patient Care Excellence', 'Research Publication', 'Team Leadership']
    },
    {
      id: 'REV002',
      employeeName: 'Priya Sharma',
      employeeId: 'EMP002',
      position: 'Nurse Manager',
      department: 'Emergency',
      reviewType: 'Mid-Year Review',
      reviewPeriod: 'Q2 2024',
      status: 'in_progress',
      score: null,
      reviewer: 'Ms. Rita Patel',
      reviewDate: null,
      dueDate: '2024-06-20',
      goals: ['Staff Development', 'Process Improvement', 'Quality Metrics']
    },
    {
      id: 'REV003',
      employeeName: 'John Martinez',
      employeeId: 'EMP003',
      position: 'Lab Technician',
      department: 'Laboratory',
      reviewType: 'Probation Review',
      reviewPeriod: 'Q2 2024',
      status: 'scheduled',
      score: null,
      reviewer: 'Dr. Michael Chen',
      reviewDate: null,
      dueDate: '2024-06-25',
      goals: ['Technical Skills', 'Accuracy Improvement', 'Protocol Compliance']
    },
    {
      id: 'REV004',
      employeeName: 'Lisa Thompson',
      employeeId: 'EMP004',
      position: 'Pharmacist',
      department: 'Pharmacy',
      reviewType: 'Quarterly Review',
      reviewPeriod: 'Q1 2024',
      status: 'completed',
      score: 4.5,
      reviewer: 'Dr. Amanda Rodriguez',
      reviewDate: '2024-04-15',
      dueDate: '2024-04-20',
      goals: ['Medication Safety', 'Patient Counseling', 'Inventory Management']
    },
    {
      id: 'REV005',
      employeeName: 'Michael Brown',
      employeeId: 'EMP005',
      position: 'Finance Manager',
      department: 'Administration',
      reviewType: 'Annual Review',
      reviewPeriod: 'Q2 2024',
      status: 'overdue',
      score: null,
      reviewer: 'Ms. Jennifer Davis',
      reviewDate: null,
      dueDate: '2024-06-05',
      goals: ['Budget Management', 'Cost Optimization', 'Reporting Excellence']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Review': return 'bg-purple-100 text-purple-800';
      case 'Mid-Year Review': return 'bg-blue-100 text-blue-800';
      case 'Quarterly Review': return 'bg-green-100 text-green-800';
      case 'Probation Review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReviews = performanceReviews.filter(review => {
    const matchesSearch = review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesType = typeFilter === 'all' || review.reviewType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {performanceReviews.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Edit className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {performanceReviews.filter(r => r.status === 'in_progress').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600">
                {performanceReviews.filter(r => r.status === 'scheduled').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {performanceReviews.filter(r => r.status === 'overdue').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Annual Review">Annual Review</SelectItem>
                  <SelectItem value="Mid-Year Review">Mid-Year Review</SelectItem>
                  <SelectItem value="Quarterly Review">Quarterly Review</SelectItem>
                  <SelectItem value="Probation Review">Probation Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>Manage and track all employee performance reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Review Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{review.employeeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.position} • {review.department}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getReviewTypeColor(review.reviewType)}>
                      {review.reviewType}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.reviewPeriod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {review.score ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{review.score}/5.0</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>
                    <span className={review.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                      {new Date(review.dueDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
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

export default PerformanceReviewsTab;
