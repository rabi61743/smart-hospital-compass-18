
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Shield, FileText, Calendar } from "lucide-react";

const TaxComplianceTab = () => {
  const complianceItems = [
    {
      title: "GST Registration Status",
      description: "Valid GST registration and compliance",
      status: "compliant",
      lastChecked: "2024-06-15",
      nextAction: "Annual renewal due in March 2025"
    },
    {
      title: "GSTR Filing Compliance",
      description: "Timely filing of all GST returns",
      status: "warning",
      lastChecked: "2024-06-15",
      nextAction: "GSTR-1 for June 2024 pending"
    },
    {
      title: "TDS Compliance",
      description: "Tax deducted at source compliance",
      status: "compliant",
      lastChecked: "2024-06-14",
      nextAction: "Next TDS return due July 31"
    },
    {
      title: "Professional Tax",
      description: "State professional tax compliance",
      status: "compliant",
      lastChecked: "2024-06-10",
      nextAction: "Annual payment completed"
    },
    {
      title: "Income Tax Return",
      description: "Annual ITR filing compliance",
      status: "pending",
      lastChecked: "2024-06-01",
      nextAction: "ITR for AY 2024-25 due July 31"
    }
  ];

  const upcomingDeadlines = [
    {
      task: "GSTR-1 Filing",
      dueDate: "2024-07-11",
      daysLeft: 5,
      priority: "high",
      penalty: "₹200 per day"
    },
    {
      task: "GSTR-3B Filing",
      dueDate: "2024-07-20",
      daysLeft: 14,
      priority: "medium",
      penalty: "₹100 per day"
    },
    {
      task: "TDS Return",
      dueDate: "2024-07-31",
      daysLeft: 25,
      priority: "medium",
      penalty: "₹200 per day"
    },
    {
      task: "Income Tax Return",
      dueDate: "2024-07-31",
      daysLeft: 25,
      priority: "high",
      penalty: "₹5,000 + interest"
    }
  ];

  const auditTrail = [
    {
      activity: "GSTR-3B Filed for May 2024",
      timestamp: "2024-06-19 14:30",
      user: "Finance Manager",
      status: "success"
    },
    {
      activity: "GST Payment of ₹5.85L processed",
      timestamp: "2024-06-18 16:45",
      user: "Accounts Team",
      status: "success"
    },
    {
      activity: "GSTR-1 Filed for May 2024",
      timestamp: "2024-06-11 11:20",
      user: "Finance Manager",
      status: "success"
    },
    {
      activity: "TDS Return Filed for Q1 2024",
      timestamp: "2024-05-31 09:15",
      user: "Tax Consultant",
      status: "success"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-red-600" />;
      default: return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <Progress value={94} className="mt-2" />
            <p className="text-xs text-green-600 mt-1">Good standing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-red-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On-time Filings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11/12</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Penalties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹800</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
          <CardDescription>Current compliance status across all tax obligations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(item.status)}
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Last checked: {item.lastChecked}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.nextAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Important tax filing and payment deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{deadline.task}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {deadline.dueDate} | Penalty: {deadline.penalty}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium">{deadline.daysLeft} days left</div>
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority} priority
                    </Badge>
                  </div>
                  <Button size="sm">
                    Action Required
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Audit Trail</CardTitle>
          <CardDescription>Recent compliance activities and filings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditTrail.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.activity}</div>
                  <div className="text-sm text-muted-foreground">
                    {activity.timestamp} by {activity.user}
                  </div>
                </div>
                <Badge variant="secondary">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Tools</CardTitle>
          <CardDescription>Automated compliance monitoring and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Shield className="h-6 w-6" />
              <span>Run Compliance Check</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Compliance Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Set Deadline Alerts</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxComplianceTab;
