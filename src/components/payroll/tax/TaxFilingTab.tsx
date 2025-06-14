
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload, Download, Calendar, AlertTriangle } from "lucide-react";
import { TaxFiling } from '@/types/taxManagement';

interface TaxFilingTabProps {
  filings: TaxFiling[];
}

const TaxFilingTab = ({ filings }: TaxFilingTabProps) => {
  const getStatusColor = (status: TaxFiling['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilingTypeIcon = (type: TaxFiling['filingType']) => {
    switch (type) {
      case 'tds': return <FileText className="h-4 w-4" />;
      case 'pf': return <Upload className="h-4 w-4" />;
      case 'esi': return <Download className="h-4 w-4" />;
      case 'professional_tax': return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const pendingFilings = filings.filter(f => f.status === 'pending').length;
  const overdueFilings = filings.filter(f => f.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Filing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending Filings</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingFilings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Overdue Filings</p>
              <p className="text-2xl font-bold text-red-600">{overdueFilings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Amount Due</p>
              <p className="text-2xl font-bold">
                ₹{filings.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filing Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tax Filings & Returns
          </CardTitle>
          <CardDescription>Manage tax filings, returns, and compliance deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filing Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filings.map((filing) => (
                <TableRow key={filing.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFilingTypeIcon(filing.filingType)}
                      <div>
                        <p className="font-medium capitalize">{filing.filingType.replace('_', ' ')}</p>
                        <p className="text-sm text-muted-foreground">Monthly Return</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{filing.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(filing.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>₹{filing.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(filing.status)}>
                      {filing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {filing.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          File
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
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
          <CardTitle>Quick Filing Actions</CardTitle>
          <CardDescription>Common tax filing tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>File TDS Return</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Upload className="h-6 w-6" />
              <span>Upload PF Challan</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Download ESI Form</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>View Overdue</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFilingTab;
