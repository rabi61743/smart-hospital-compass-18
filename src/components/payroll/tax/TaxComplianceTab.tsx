
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle, Clock, Calendar, User } from "lucide-react";
import { TaxCompliance } from '@/types/taxManagement';

interface TaxComplianceTabProps {
  complianceItems: TaxCompliance[];
}

const TaxComplianceTab = ({ complianceItems }: TaxComplianceTabProps) => {
  const getStatusColor = (status: TaxCompliance['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: TaxCompliance['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: TaxCompliance['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const completedTasks = complianceItems.filter(item => item.status === 'completed').length;
  const pendingTasks = complianceItems.filter(item => item.status === 'pending').length;
  const overdueTasks = complianceItems.filter(item => item.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Overdue Tasks</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tax Compliance Tasks
          </CardTitle>
          <CardDescription>
            Track and manage tax compliance requirements and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.complianceType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(item.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {item.assignedTo || 'Unassigned'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {item.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Mark Complete
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Compliance Actions</CardTitle>
          <CardDescription>Common compliance tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span>Add New Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>View Calendar</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Check Overdue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <User className="h-6 w-6" />
              <span>Assign Tasks</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxComplianceTab;
