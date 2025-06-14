
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  Search, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2,
  Calendar,
  User,
  FileText
} from "lucide-react";

const MedicalImagingViewer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const imagingStudies = [
    {
      id: 'img1',
      patientName: 'Sarah Johnson',
      studyType: 'Chest X-Ray',
      date: '2024-01-30',
      status: 'Completed',
      urgency: 'Routine',
      description: 'Follow-up chest X-ray for pneumonia',
      images: 2,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'img2',
      patientName: 'Michael Chen',
      studyType: 'CT Scan - Abdomen',
      date: '2024-01-29',
      status: 'Completed',
      urgency: 'Urgent',
      description: 'Abdominal pain investigation',
      images: 45,
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop'
    },
    {
      id: 'img3',
      patientName: 'Emily Davis',
      studyType: 'MRI - Brain',
      date: '2024-01-28',
      status: 'Pending Review',
      urgency: 'Stat',
      description: 'Headache and neurological symptoms',
      images: 120,
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Stat': return 'bg-red-100 text-red-800';
      case 'Urgent': return 'bg-orange-100 text-orange-800';
      case 'Routine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStudies = imagingStudies.filter(study =>
    study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.studyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="h-5 w-5 mr-2" />
            Medical Imaging Viewer
          </CardTitle>
          <CardDescription>View and analyze medical imaging studies</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="studies" className="space-y-4">
            <TabsList>
              <TabsTrigger value="studies">Imaging Studies</TabsTrigger>
              <TabsTrigger value="viewer">Image Viewer</TabsTrigger>
            </TabsList>

            <TabsContent value="studies" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient name or study type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudies.map((study) => (
                  <Card key={study.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={study.thumbnail} 
                          alt={study.studyType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{study.studyType}</h3>
                          <Badge className={getUrgencyColor(study.urgency)}>
                            {study.urgency}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{study.patientName}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{study.date}</span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">{study.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(study.status)}>
                            {study.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {study.images} images
                          </span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => setSelectedImage(study.id)}
                        >
                          <Image className="h-4 w-4 mr-2" />
                          View Images
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="viewer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Image Viewer</CardTitle>
                  <CardDescription>
                    {selectedImage ? 'Viewing medical images' : 'Select a study to view images'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedImage ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
                          alt="Medical imaging"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Study Information</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <div><strong>Patient:</strong> Sarah Johnson</div>
                            <div><strong>Study Type:</strong> Chest X-Ray</div>
                            <div><strong>Date:</strong> 2024-01-30</div>
                            <div><strong>Radiologist:</strong> Dr. Smith</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Radiologist Report</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>Follow-up chest X-ray shows improvement in previously noted infiltrates. No acute cardiopulmonary process. Heart size normal.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No study selected</h3>
                      <p className="text-gray-600">Select an imaging study from the list to view images</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalImagingViewer;
