
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image, X, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: Date;
  size: string;
  description?: string;
}

const MedicalDocumentUpload = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentCategory, setDocumentCategory] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: '1',
      name: 'Blood Test Results - January 2024.pdf',
      type: 'pdf',
      category: 'lab_results',
      uploadDate: new Date('2024-01-15'),
      size: '2.3 MB',
      description: 'Complete blood count and lipid profile'
    },
    {
      id: '2',
      name: 'X-Ray Chest - December 2023.jpg',
      type: 'image',
      category: 'imaging',
      uploadDate: new Date('2023-12-10'),
      size: '1.8 MB',
      description: 'Chest X-ray for routine checkup'
    }
  ]);

  const documentCategories = [
    { value: 'lab_results', label: 'Lab Results' },
    { value: 'imaging', label: 'Medical Imaging' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'discharge_summary', label: 'Discharge Summary' },
    { value: 'insurance', label: 'Insurance Documents' },
    { value: 'vaccination', label: 'Vaccination Records' },
    { value: 'other', label: 'Other' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Please upload PDF or image files.`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB. Please choose a smaller file.`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    if (!documentCategory) {
      toast({
        title: "Category required",
        description: "Please select a document category.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newDocuments: UploadedDocument[] = selectedFiles.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        category: documentCategory,
        uploadDate: new Date(),
        size: formatFileSize(file.size),
        description: documentDescription
      }));

      setUploadedDocuments(prev => [...newDocuments, ...prev]);
      setSelectedFiles([]);
      setDocumentCategory('');
      setDocumentDescription('');
      setIsUploading(false);

      toast({
        title: "Upload successful",
        description: `${selectedFiles.length} document(s) uploaded successfully.`
      });
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryLabel = (category: string) => {
    return documentCategories.find(cat => cat.value === category)?.label || category;
  };

  const getFileIcon = (type: string) => {
    return type === 'pdf' ? <FileText className="w-4 h-4" /> : <Image className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      lab_results: 'bg-green-100 text-green-800',
      imaging: 'bg-blue-100 text-blue-800',
      prescription: 'bg-purple-100 text-purple-800',
      discharge_summary: 'bg-orange-100 text-orange-800',
      insurance: 'bg-gray-100 text-gray-800',
      vaccination: 'bg-yellow-100 text-yellow-800',
      other: 'bg-red-100 text-red-800'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Medical Documents
          </CardTitle>
          <CardDescription>
            Upload your medical documents securely. Supported formats: PDF, JPG, PNG (max 10MB each)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div>
            <Label htmlFor="file-upload">Select Files</Label>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="mt-1"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Category */}
          <div>
            <Label htmlFor="category">Document Category *</Label>
            <Select value={documentCategory} onValueChange={setDocumentCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select document category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Document Description */}
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional notes about these documents..."
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Upload Button */}
          <Button 
            onClick={handleUpload} 
            disabled={isUploading || selectedFiles.length === 0}
            className="w-full"
          >
            {isUploading ? (
              <>
                <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Your Medical Documents</CardTitle>
          <CardDescription>
            All your uploaded medical documents are stored securely and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent>
          {uploadedDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{doc.uploadDate.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        {doc.description && (
                          <>
                            <span>•</span>
                            <span>{doc.description}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(doc.category)}>
                      {getCategoryLabel(doc.category)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalDocumentUpload;
