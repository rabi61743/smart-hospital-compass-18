
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Search, Filter, Calendar, AlertCircle, CheckCircle, Clock, Eye } from "lucide-react";
import { format, subDays } from "date-fns";

interface LabResult {
  id: string;
  testName: string;
  category: 'blood' | 'urine' | 'imaging' | 'biopsy' | 'other';
  orderDate: Date;
  collectionDate: Date;
  resultDate: Date;
  status: 'pending' | 'completed' | 'reviewed';
  doctorName: string;
  department: string;
  priority: 'routine' | 'urgent' | 'stat';
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }[];
  notes?: string;
  reportUrl?: string;
}

const LabResultsPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

  // Mock lab results data
  const labResults: LabResult[] = [
    {
      id: 'lab001',
      testName: 'Complete Blood Count (CBC)',
      category: 'blood',
      orderDate: subDays(new Date(), 7),
      collectionDate: subDays(new Date(), 5),
      resultDate: subDays(new Date(), 3),
      status: 'completed',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Internal Medicine',
      priority: 'routine',
      results: [
        { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '12.0-15.5', status: 'normal' },
        { parameter: 'White Blood Cells', value: '7.8', unit: '×10³/μL', referenceRange: '4.5-11.0', status: 'normal' },
        { parameter: 'Platelets', value: '295', unit: '×10³/μL', referenceRange: '150-450', status: 'normal' },
        { parameter: 'Hematocrit', value: '42.1', unit: '%', referenceRange: '36.0-46.0', status: 'normal' }
      ],
      notes: 'All values within normal range. Continue current treatment.',
      reportUrl: '/reports/lab001.pdf'
    },
    {
      id: 'lab002',
      testName: 'Lipid Panel',
      category: 'blood',
      orderDate: subDays(new Date(), 14),
      collectionDate: subDays(new Date(), 12),
      resultDate: subDays(new Date(), 10),
      status: 'reviewed',
      doctorName: 'Dr. Michael Chen',
      department: 'Cardiology',
      priority: 'routine',
      results: [
        { parameter: 'Total Cholesterol', value: '220', unit: 'mg/dL', referenceRange: '<200', status: 'high' },
        { parameter: 'LDL Cholesterol', value: '145', unit: 'mg/dL', referenceRange: '<100', status: 'high' },
        { parameter: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
        { parameter: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '<150', status: 'high' }
      ],
      notes: 'Cholesterol levels elevated. Recommend dietary changes and follow-up in 3 months.',
      reportUrl: '/reports/lab002.pdf'
    },
    {
      id: 'lab003',
      testName: 'Chest X-Ray',
      category: 'imaging',
      orderDate: subDays(new Date(), 2),
      collectionDate: subDays(new Date(), 1),
      resultDate: new Date(),
      status: 'pending',
      doctorName: 'Dr. Emily Davis',
      department: 'Pulmonology',
      priority: 'urgent',
      results: [],
      notes: 'Awaiting radiologist review.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'reviewed': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'routine': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'high': return 'text-red-600';
      case 'low': return 'text-blue-600';
      case 'critical': return 'text-red-800 font-bold';
      default: return 'text-gray-600';
    }
  };

  const filteredResults = labResults.filter(result => {
    const matchesSearch = result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || result.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDownload = (result: LabResult) => {
    if (result.reportUrl) {
      // In a real app, this would trigger actual file download
      console.log(`Downloading report for ${result.testName}`);
      // window.open(result.reportUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold">{labResults.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {labResults.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {labResults.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Abnormal</p>
                <p className="text-2xl font-bold text-red-600">
                  {labResults.filter(r => r.results.some(res => res.status !== 'normal')).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="results">Lab Results</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="results" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search test names or doctors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="blood">Blood Tests</SelectItem>
                    <SelectItem value="urine">Urine Tests</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="biopsy">Biopsy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{result.testName}</h3>
                        <Badge className={getStatusColor(result.status)}>
                          {getStatusIcon(result.status)}
                          <span className="ml-1">{result.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(result.priority)}>
                          {result.priority}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Ordered: {format(result.orderDate, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Collected: {format(result.collectionDate, "MMM dd, yyyy")}</span>
                        </div>
                        {result.resultDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Results: {format(result.resultDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Ordered by {result.doctorName} • {result.department}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedResult(result)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedResult?.testName}</DialogTitle>
                            <DialogDescription>
                              Test results from {selectedResult?.doctorName} • {selectedResult?.department}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedResult && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <label className="font-medium">Order Date</label>
                                  <p>{format(selectedResult.orderDate, "PPP")}</p>
                                </div>
                                <div>
                                  <label className="font-medium">Collection Date</label>
                                  <p>{format(selectedResult.collectionDate, "PPP")}</p>
                                </div>
                                <div>
                                  <label className="font-medium">Status</label>
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(selectedResult.status)}
                                    <span>{selectedResult.status}</span>
                                  </div>
                                </div>
                                <div>
                                  <label className="font-medium">Priority</label>
                                  <Badge className={getPriorityColor(selectedResult.priority)}>
                                    {selectedResult.priority}
                                  </Badge>
                                </div>
                              </div>
                              
                              {selectedResult.results.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Test Results</h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Parameter</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead>Reference Range</TableHead>
                                        <TableHead>Status</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedResult.results.map((res, index) => (
                                        <TableRow key={index}>
                                          <TableCell className="font-medium">{res.parameter}</TableCell>
                                          <TableCell>{res.value} {res.unit}</TableCell>
                                          <TableCell>{res.referenceRange}</TableCell>
                                          <TableCell>
                                            <span className={getResultStatusColor(res.status)}>
                                              {res.status.toUpperCase()}
                                            </span>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                              
                              {selectedResult.notes && (
                                <div>
                                  <h4 className="font-medium mb-2">Clinical Notes</h4>
                                  <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                                    {selectedResult.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {result.reportUrl && (
                        <Button size="sm" onClick={() => handleDownload(result)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
              <CardDescription>Track your test results over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Trending Analysis</h3>
                <p className="text-gray-600 mb-4">View trends and patterns in your lab results over time</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LabResultsPortal;
