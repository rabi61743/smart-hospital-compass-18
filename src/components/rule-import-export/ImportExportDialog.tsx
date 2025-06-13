
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileText, AlertCircle } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { downloadRulesFile, parseImportFile, RuleExportData } from "@/utils/ruleImportExport";

interface ImportExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rules: CommissionRule[];
  onImportRules: (rules: CommissionRule[]) => void;
}

const ImportExportDialog = ({ open, onOpenChange, rules, onImportRules }: ImportExportDialogProps) => {
  const [importData, setImportData] = useState<RuleExportData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    try {
      downloadRulesFile(rules);
      toast({
        title: "Export Successful",
        description: `${rules.length} rules exported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export rules. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileContent = await file.text();
      const importData = await parseImportFile(fileContent);
      setImportData(importData);
      
      toast({
        title: "File Loaded",
        description: `Found ${importData.rules.length} rules ready for import.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to read file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = () => {
    if (!importData) return;

    try {
      onImportRules(importData.rules);
      setImportData(null);
      onOpenChange(false);
      
      toast({
        title: "Import Successful",
        description: `${importData.rules.length} rules imported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to import rules. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetImport = () => {
    setImportData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import/Export Rules</DialogTitle>
          <DialogDescription>
            Backup your commission rules or restore from a previous backup
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Rules
              </CardTitle>
              <CardDescription>
                Download your current rules as a backup file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {rules.length} rules will be exported
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">
                      {rules.filter(r => r.isActive).length} Active
                    </Badge>
                    <Badge variant="secondary">
                      {rules.filter(r => !r.isActive).length} Inactive
                    </Badge>
                  </div>
                </div>
                <Button onClick={handleExport} disabled={rules.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Rules
              </CardTitle>
              <CardDescription>
                Restore rules from a backup file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!importData ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Select Backup File'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Select a JSON file exported from this application
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Import Preview</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Rules:</span>
                        <span className="ml-2 font-medium">{importData.metadata.totalRules}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Export Date:</span>
                        <span className="ml-2 font-medium">
                          {new Date(importData.exportDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Rules:</span>
                        <span className="ml-2 font-medium">{importData.metadata.activeRules}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Inactive Rules:</span>
                        <span className="ml-2 font-medium">{importData.metadata.inactiveRules}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <p className="text-sm text-amber-800">
                      This will replace all existing rules. Make sure to export your current rules first if needed.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleImport} className="flex-1">
                      Import Rules
                    </Button>
                    <Button variant="outline" onClick={resetImport}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportExportDialog;
