
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  AlertCircle, 
  CheckCircle,
  X,
  FileSpreadsheet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkUserImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
}

const BulkUserImportExportDialog = ({ isOpen, onClose, users }: BulkUserImportExportDialogProps) => {
  const [activeTab, setActiveTab] = useState('import');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [importResults, setImportResults] = useState<any>(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFilters, setExportFilters] = useState({
    roles: [] as string[],
    status: 'all',
    departments: [] as string[],
    includePermissions: true,
    includeLastLogin: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv') || 
          file.type === 'application/vnd.ms-excel' || file.name.endsWith('.xlsx')) {
        setImportFile(file);
        setImportStatus('idle');
        setImportResults(null);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a CSV or Excel file.",
          variant: "destructive"
        });
      }
    }
  };

  const simulateImport = async () => {
    if (!importFile) return;

    setImportStatus('processing');
    setImportProgress(0);

    // Simulate file processing
    for (let i = 0; i <= 100; i += 10) {
      setImportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate import results
    const mockResults = {
      totalRows: 150,
      successful: 142,
      failed: 8,
      duplicates: 3,
      errors: [
        { row: 15, error: "Invalid email format: user@invalid" },
        { row: 23, error: "Missing required field: department" },
        { row: 47, error: "Invalid role: SuperUser" },
        { row: 89, error: "Duplicate email: existing@hospital.com" },
        { row: 112, error: "Invalid phone format: 123-456" }
      ]
    };

    setImportResults(mockResults);
    setImportStatus('completed');

    toast({
      title: "Import Completed",
      description: `Successfully imported ${mockResults.successful} users with ${mockResults.failed} errors.`
    });
  };

  const handleExport = () => {
    const filteredUsers = users.filter(user => {
      const roleMatch = exportFilters.roles.length === 0 || exportFilters.roles.includes(user.role);
      const statusMatch = exportFilters.status === 'all' || user.status.toLowerCase() === exportFilters.status;
      return roleMatch && statusMatch;
    });

    // Create CSV content
    const headers = [
      'Name', 'Email', 'Role', 'Department', 'Status',
      ...(exportFilters.includePermissions ? ['Permissions'] : []),
      ...(exportFilters.includeLastLogin ? ['Last Login'] : [])
    ];

    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.department,
        user.status,
        ...(exportFilters.includePermissions ? [user.permissions.join(';')] : []),
        ...(exportFilters.includeLastLogin ? [user.lastLogin] : [])
      ].join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: `Successfully exported ${filteredUsers.length} users to ${exportFormat.toUpperCase()}.`
    });
  };

  const handleRoleFilter = (role: string, checked: boolean) => {
    setExportFilters(prev => ({
      ...prev,
      roles: checked 
        ? [...prev.roles, role]
        : prev.roles.filter(r => r !== role)
    }));
  };

  const downloadTemplate = () => {
    const templateHeaders = [
      'Name', 'Email', 'Role', 'Department', 'Phone', 'Password', 'Permissions'
    ];
    
    const sampleRows = [
      'John Doe,john.doe@hospital.com,Doctor,Cardiology,+91 98765 43210,temp123,Patient Records;Prescriptions',
      'Jane Smith,jane.smith@hospital.com,Nurse,Emergency,+91 98765 43211,temp456,Patient Care;Medical Records'
    ];

    const csvContent = [templateHeaders.join(','), ...sampleRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "User import template has been downloaded successfully."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk User Import/Export
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Users
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Import Users from File</CardTitle>
                <CardDescription>
                  Upload a CSV or Excel file to bulk import users into the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    onClick={downloadTemplate}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Download Template
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Supported formats: CSV, Excel (.xlsx)
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    {importFile ? (
                      <div>
                        <p className="text-lg font-medium">{importFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(importFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium">Drop your file here or click to browse</p>
                        <p className="text-sm text-muted-foreground">CSV or Excel files only</p>
                      </div>
                    )}
                  </div>

                  {importFile && importStatus === 'idle' && (
                    <Button onClick={simulateImport} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Start Import
                    </Button>
                  )}

                  {importStatus === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Processing...</span>
                        <span className="text-sm text-muted-foreground">{importProgress}%</span>
                      </div>
                      <Progress value={importProgress} className="w-full" />
                    </div>
                  )}

                  {importStatus === 'completed' && importResults && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{importResults.totalRows}</div>
                          <div className="text-sm text-blue-600">Total Rows</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{importResults.successful}</div>
                          <div className="text-sm text-green-600">Successful</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{importResults.failed}</div>
                          <div className="text-sm text-red-600">Failed</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{importResults.duplicates}</div>
                          <div className="text-sm text-yellow-600">Duplicates</div>
                        </div>
                      </div>

                      {importResults.errors.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            Import Errors
                          </h4>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {importResults.errors.map((error: any, index: number) => (
                              <div key={index} className="text-sm p-2 bg-red-50 rounded text-red-700">
                                Row {error.row}: {error.error}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export User Data</CardTitle>
                <CardDescription>
                  Export user data with custom filters and formatting options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Export Format</label>
                      <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Filter by Status</label>
                      <Select value={exportFilters.status} onValueChange={(value) => 
                        setExportFilters(prev => ({ ...prev, status: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active Only</SelectItem>
                          <SelectItem value="inactive">Inactive Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Filter by Role</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {['Admin', 'Doctor', 'Nurse', 'Pharmacist', 'Finance'].map(role => (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox 
                              id={role}
                              checked={exportFilters.roles.includes(role)}
                              onCheckedChange={(checked) => handleRoleFilter(role, checked as boolean)}
                            />
                            <label htmlFor={role} className="text-sm">{role}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-3 block">Include Additional Data</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="permissions"
                        checked={exportFilters.includePermissions}
                        onCheckedChange={(checked) => 
                          setExportFilters(prev => ({ ...prev, includePermissions: checked as boolean }))
                        }
                      />
                      <label htmlFor="permissions" className="text-sm">User Permissions</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="lastLogin"
                        checked={exportFilters.includeLastLogin}
                        onCheckedChange={(checked) => 
                          setExportFilters(prev => ({ ...prev, includeLastLogin: checked as boolean }))
                        }
                      />
                      <label htmlFor="lastLogin" className="text-sm">Last Login Information</label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">
                      {users.filter(user => {
                        const roleMatch = exportFilters.roles.length === 0 || exportFilters.roles.includes(user.role);
                        const statusMatch = exportFilters.status === 'all' || user.status.toLowerCase() === exportFilters.status;
                        return roleMatch && statusMatch;
                      }).length} users will be exported
                    </span>
                  </div>
                  <Button onClick={handleExport} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUserImportExportDialog;
