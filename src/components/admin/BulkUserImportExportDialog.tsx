
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Users, X } from "lucide-react";
import UserImportTab from './user-management/UserImportTab';
import UserExportTab from './user-management/UserExportTab';

interface BulkUserImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
}

const BulkUserImportExportDialog = ({ isOpen, onClose, users }: BulkUserImportExportDialogProps) => {
  const [activeTab, setActiveTab] = useState('import');

  const handleImportComplete = (results: any) => {
    console.log('Import completed:', results);
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
            <UserImportTab onImportComplete={handleImportComplete} />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <UserExportTab users={users} />
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
