
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
}

interface DocumentsTabProps {
  documents: Document[];
  isEditing: boolean;
}

const DocumentsTab = ({ documents, isEditing }: DocumentsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Employee Documents</CardTitle>
            <CardDescription>Uploaded documents and certifications</CardDescription>
          </div>
          {isEditing && (
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.type} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={doc.status === 'Verified' ? 'default' : 'secondary'}>
                  {doc.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
