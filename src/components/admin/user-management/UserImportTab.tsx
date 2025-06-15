
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImportProgress from './ImportProgress';
import ImportResults from './ImportResults';

interface UserImportTabProps {
  onImportComplete?: (results: any) => void;
}

const UserImportTab = ({ onImportComplete }: UserImportTabProps) => {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [importResults, setImportResults] = useState<any>(null);
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
    onImportComplete?.(mockResults);

    toast({
      title: "Import Completed",
      description: `Successfully imported ${mockResults.successful} users with ${mockResults.failed} errors.`
    });
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
            <ImportProgress progress={importProgress} />
          )}

          {importStatus === 'completed' && importResults && (
            <ImportResults results={importResults} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserImportTab;
