
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Eye, Edit, Plus, Award, TrendingUp, Users, CheckCircle } from "lucide-react";

const PromotionTrackingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const promotionCandidates = [
    {
      id: 'PROM001',
      employeeName: 'Dr. Sarah Wilson',
      employeeId: 'EMP001',
      currentPosition: 'Senior Cardiologist',
      proposedPosition: 'Chief of Cardiology',
      department: 'Cardiology',
      yearsInCurrentRole: 3.5,
      performanceScore: 4.8,
      status: 'under_review',
      nominatedBy: 'Dr. Rajesh Kumar',
      nominationDate: '2024-05-15',
      targetPromotionDate: '2024-08-01',
      requirements: [
        { criteria: 'Performance Score > 4.5', met: true, score: 4.8 },
        { criteria: 'Years in Role > 3', met: true, score: 3.5 },
        { criteria: 'Leadership Training', met: true, score: 100 },
        { criteria: 'Peer Reviews', met: false, score: 75 }
      ],
      readinessScore: 85
    },
    {
      id: 'PROM002',
      employeeName: 'John Martinez',
      employeeId: 'EMP003',
      currentPosition: 'Lab Technician',
      proposedPosition: 'Senior Lab Technician',
      department: 'Laboratory',
      yearsInCurrentRole: 2.0,
      performanceScore: 4.3,
      status: 'approved',
      nominatedBy: 'Dr. Michael Chen',
      nominationDate: '2024-04-20',
      targetPromotionDate: '2024-07-01',
      requirements: [
        { criteria: 'Performance Score > 4.0', met: true, score: 4.3 },
        { criteria: 'Years in Role > 1.5', met: true, score: 2.0 },
        { criteria: 'Technical Certification', met: true, score: 100 },
        { criteria: 'Safety Record', met: true, score: 100 }
      ],
      readinessScore: 95
    },
    {
      id: 'PROM003',
      employeeName: 'Priya Sharma',
      employeeId: 'EMP002',
      currentPosition: 'Nurse Manager',
      proposedPosition: 'Director of Nursing',
      department: 'Emergency',
      yearsInCurrentRole: 4.2,
      performanceScore: 4.6,
      status: 'pending_approval',
      nominatedBy: 'Ms. Rita Patel',
      nominationDate: '2024-06-01',
      targetPromotionDate: '2024-09-01',
      requirements: [
        { criteria: 'Performance Score > 4.5', met: true, score: 4.6 },
        { criteria: 'Years in Role > 4', met: true, score: 4.2 },
        { criteria: 'Management Training', met: true, score: 100 },
        { criteria: 'Budget Management Experience', met: false, score: 60 }
      ],
      readinessScore: 78
    },
    {
      id: 'PROM004',
      employeeName: 'Lisa Thompson',
      employeeId: 'EMP004',
      currentPosition: 'Pharmacist',
      proposedPosition: 'Chief Pharmacist',
      department: 'Pharmacy',
      yearsInCurrentRole: 5.0,
      performanceScore: 4.5,
      status: 'rejected',
      nominatedBy: 'Dr. Amanda Rodriguez',
      nominationDate: '2024-03-15',
      targetPromotionDate: '2024-06-01',
      requirements: [
        { criteria: 'Performance Score > 4.5', met: true, score: 4.5 },
        { criteria: 'Years in Role > 3', met: true, score: 5.0 },
        { criteria: 'Advanced Certification', met: false, score: 40 },
        { criteria: 'Research Publications', met: false, score: 20 }
      ],
      readinessScore: 65
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredCandidates = promotionCandidates.filter(candidate => {
    const matchesSearch = candidate.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.proposedPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Promotion Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {promotionCandidates.filter(c => c.status === 'approved').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Under Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {promotionCandidates.filter(c => c.status === 'under_review').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {promotionCandidates.filter(c => c.status === 'pending_approval').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Avg Readiness</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(promotionCandidates.reduce((sum, c) => sum + c.readinessScore, 0) / promotionCandidates.length)}%
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
                  placeholder="Search promotion candidates..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nominate for Promotion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Promotion Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Candidates</CardTitle>
          <CardDescription>Track and manage employee promotion nominations and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Current → Proposed</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Readiness</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidate.employeeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {candidate.department} • {candidate.yearsInCurrentRole} years
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{candidate.currentPosition}</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-medium text-sm">{candidate.proposedPosition}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{candidate.performanceScore}/5.0</span>
                      <Award className="h-4 w-4 text-yellow-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className={`font-medium ${getReadinessColor(candidate.readinessScore)}`}>
                        {candidate.readinessScore}%
                      </div>
                      <Progress value={candidate.readinessScore} className="h-2 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(candidate.targetPromotionDate).toLocaleDateString()}
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

      {/* Promotion Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Requirements Analysis</CardTitle>
          <CardDescription>Detailed view of candidate readiness against promotion criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredCandidates.slice(0, 2).map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{candidate.employeeName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {candidate.currentPosition} → {candidate.proposedPosition}
                    </p>
                  </div>
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">{req.criteria}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{req.score}{typeof req.score === 'number' && req.score <= 5 ? '/5' : '%'}</span>
                        {req.met ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-red-300"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionTrackingTab;
