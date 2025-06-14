
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Settings, Plus, Eye } from "lucide-react";
import { GovernmentForm } from '@/types/statutoryCompliance';

const FormGenerationTab = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');

  // Mock government forms data
  const [governmentForms] = useState<GovernmentForm[]>([
    {
      id: 'GF001',
      formCode: 'Form-XI',
      formName: 'Register of Overtime',
      department: 'labour',
      frequency: 'monthly',
      template: {
        id: 'T001',
        name: 'Overtime Register Template',
        version: '1.0',
        fields: [],
        validationRules: []
      },
      autoGenerate: true,
      fields: []
    },
    {
      id: 'GF002',
      formCode: 'ECR',
      formName: 'Electronic Challan cum Return',
      department: 'pf',
      frequency: 'monthly',
      template: {
        id: 'T002',
        name: 'ECR Template',
        version: '2.1',
        fields: [],
        validationRules: []
      },
      autoGenerate: true,
      fields: []
    },
    {
      id: 'GF003',
      formCode: 'Form-6',
      formName: 'ESIC Monthly Return',
      department: 'esi',
      frequency: 'monthly',
      template: {
        id: 'T003',
        name: 'ESIC Return Template',
        version: '1.5',
        fields: [],
        validationRules: []
      },
      autoGenerate: false,
      fields: []
    }
  ]);

  const getDepartmentColor = (department: GovernmentForm['department']) => {
    switch (department) {
      case 'labour': return 'bg-blue-100 text-blue-800';
      case 'pf': return 'bg-green-100 text-green-800';
      case 'esi': return 'bg-purple-100 text-purple-800';
      case 'income_tax': return 'bg-orange-100 text-orange-800';
      case 'professional_tax': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredForms = governmentForms.filter(form => {
    if (selectedDepartment !== 'all' && form.department !== selectedDepartment) return false;
    if (selectedFrequency !== 'all' && form.frequency !== selectedFrequency) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Form Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Government Form Generation
          </CardTitle>
          <CardDescription>
            Generate statutory forms and reports automatically from payroll data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="labour">Labour Department</SelectItem>
                <SelectItem value="pf">PF Office</SelectItem>
                <SelectItem value="esi">ESIC</SelectItem>
                <SelectItem value="income_tax">Income Tax</SelectItem>
                <SelectItem value="professional_tax">Professional Tax</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedFrequency} onValueChange={setSelectedFrequency}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frequencies</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Form
            </Button>
          </div>

          {/* Quick Generation Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate All Monthly</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Bulk Download</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span>Form Templates</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Eye className="h-6 w-6" />
              <span>Preview Forms</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Forms */}
      <Card>
        <CardHeader>
          <CardTitle>Available Government Forms</CardTitle>
          <CardDescription>Configure and generate statutory forms and returns</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form Code</TableHead>
                <TableHead>Form Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Template Version</TableHead>
                <TableHead>Auto Generate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{form.formCode}</span>
                    </div>
                  </TableCell>
                  <TableCell>{form.formName}</TableCell>
                  <TableCell>
                    <Badge className={getDepartmentColor(form.department)}>
                      {form.department.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {form.frequency}
                    </Badge>
                  </TableCell>
                  <TableCell>{form.template.version}</TableCell>
                  <TableCell>
                    <Badge className={form.autoGenerate ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {form.autoGenerate ? 'Enabled' : 'Manual'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Form Generations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Form Generations</CardTitle>
          <CardDescription>Recently generated forms and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { form: 'Form-XI', period: '2024-12', generatedAt: '2024-12-20', status: 'completed' },
              { form: 'ECR', period: '2024-12', generatedAt: '2024-12-15', status: 'completed' },
              { form: 'Form-6', period: '2024-12', generatedAt: '2024-12-10', status: 'pending_submission' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.form} - {item.period}</p>
                    <p className="text-sm text-muted-foreground">
                      Generated: {new Date(item.generatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormGenerationTab;
