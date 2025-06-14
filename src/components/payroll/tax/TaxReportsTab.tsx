
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar, Eye } from "lucide-react";

const TaxReportsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-12');
  const [reportType, setReportType] = useState('all');

  // Mock tax reports data
  const taxReports = [
    {
      id: 'TR001',
      reportType: 'Form 16',
      period: '2024-25',
      employees: 45,
      generatedAt: '2024-12-15',
      status: 'completed',
      downloadPath: '/reports/form16-2024-25.pdf'
    },
    {
      id: 'TR002',
      reportType: 'TDS Certificate',
      period: '2024-12',
      employees: 45,
      generatedAt: '2024-12-10',
      status: 'completed',
      downloadPath: '/reports/tds-cert-2024-12.pdf'
    },
    {
      id: 'TR003',
      reportType: 'PF Statement',
      period: '2024-12',
      employees: 45,
      generatedAt: '2024-12-05',
      status: 'completed',
      downloadPath: '/reports/pf-statement-2024-12.pdf'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tax Reports & Documents
          </CardTitle>
          <CardDescription>
            Generate and download tax-related reports and certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-12">December 2024</SelectItem>
                <SelectItem value="2024-11">November 2024</SelectItem>
                <SelectItem value="2024-25">FY 2024-25</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="form16">Form 16</SelectItem>
                <SelectItem value="tds">TDS Certificates</SelectItem>
                <SelectItem value="pf">PF Statements</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>

          {/* Quick Report Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Form 16 (All)</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>TDS Certificates</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Annual Return</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Eye className="h-6 w-6" />
              <span>Compliance Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports History */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>Previously generated tax reports and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {report.reportType}
                    </div>
                  </TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.employees} employees</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
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

export default TaxReportsTab;
