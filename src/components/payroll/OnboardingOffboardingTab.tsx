
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserMinus, FileText, Clock, CheckCircle } from "lucide-react";
import NewHireWorkflowDialog from "./NewHireWorkflowDialog";
import TerminationProcessDialog from "./TerminationProcessDialog";
import ExitInterviewDialog from "./ExitInterviewDialog";

const OnboardingOffboardingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewHireDialog, setShowNewHireDialog] = useState(false);
  const [showTerminationDialog, setShowTerminationDialog] = useState(false);
  const [showExitInterviewDialog, setShowExitInterviewDialog] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  const onboardingCases = [
    {
      id: 'ONB001',
      employeeName: 'Dr. Priya Sharma',
      department: 'Cardiology',
      position: 'Cardiologist',
      startDate: '2024-01-15',
      status: 'In Progress',
      progress: 65,
      assignedTo: 'HR Team',
      type: 'onboarding'
    },
    {
      id: 'ONB002',
      employeeName: 'Nurse Rahul Verma',
      department: 'General Medicine',
      position: 'Staff Nurse',
      startDate: '2024-01-20',
      status: 'Completed',
      progress: 100,
      assignedTo: 'HR Team',
      type: 'onboarding'
    }
  ];

  const offboardingCases = [
    {
      id: 'OFF001',
      employeeName: 'Lab Tech Amit Singh',
      department: 'Laboratory',
      position: 'Lab Technician',
      lastWorkingDay: '2024-02-15',
      status: 'In Progress',
      progress: 45,
      assignedTo: 'HR Team',
      type: 'offboarding'
    }
  ];

  const allCases = [...onboardingCases, ...offboardingCases];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'onboarding' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
  };

  const filteredCases = allCases.filter(case_ => {
    const matchesSearch = case_.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStartOnboarding = () => {
    setShowNewHireDialog(true);
  };

  const handleStartOffboarding = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setShowTerminationDialog(true);
  };

  const handleExitInterview = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setShowExitInterviewDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Employee Onboarding & Offboarding</CardTitle>
              <CardDescription>Manage new hire workflows, termination processes, and exit interviews</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleStartOnboarding}>
                <UserPlus className="h-4 w-4 mr-2" />
                Start Onboarding
              </Button>
              <Button variant="outline" onClick={() => handleStartOffboarding('')}>
                <UserMinus className="h-4 w-4 mr-2" />
                Start Offboarding
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Details</TableHead>
                    <TableHead>Employee Info</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{case_.id}</p>
                          <Badge className={getTypeColor(case_.type)} variant="outline">
                            {case_.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{case_.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{case_.department} - {case_.position}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {case_.type === 'onboarding' ? 'Start' : 'Last Working'}: {' '}
                            {new Date(
                              case_.type === 'onboarding' 
                                ? (case_ as any).startDate 
                                : (case_ as any).lastWorkingDay
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Assigned: {case_.assignedTo}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${case_.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{case_.progress}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          {case_.type === 'offboarding' && case_.status === 'In Progress' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleExitInterview(case_.id)}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="onboarding">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onboardingCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{case_.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{case_.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(case_.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${case_.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{case_.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="offboarding">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Last Working Day</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offboardingCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{case_.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{case_.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(case_.lastWorkingDay).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-red-600 h-2 rounded-full" 
                              style={{ width: `${case_.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{case_.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleExitInterview(case_.id)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NewHireWorkflowDialog 
        open={showNewHireDialog} 
        onOpenChange={setShowNewHireDialog} 
      />

      <TerminationProcessDialog
        open={showTerminationDialog}
        onOpenChange={setShowTerminationDialog}
        employeeId={selectedEmployeeId}
      />

      <ExitInterviewDialog
        open={showExitInterviewDialog}
        onOpenChange={setShowExitInterviewDialog}
        employeeId={selectedEmployeeId}
      />
    </div>
  );
};

export default OnboardingOffboardingTab;
