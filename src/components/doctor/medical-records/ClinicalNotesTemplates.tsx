import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Save, 
  Copy, 
  Edit, 
  Trash2,
  FileTemplate,
  Clock,
  User
} from "lucide-react";

const ClinicalNotesTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const templates = [
    {
      id: 'template1',
      name: 'General Consultation',
      category: 'Consultation',
      description: 'Standard consultation note template',
      content: `CHIEF COMPLAINT:
[Patient's primary concern]

HISTORY OF PRESENT ILLNESS:
[Detailed description of current symptoms]

PAST MEDICAL HISTORY:
[Relevant past medical conditions]

MEDICATIONS:
[Current medications and dosages]

ALLERGIES:
[Known allergies]

PHYSICAL EXAMINATION:
General: [General appearance]
Vital Signs: BP ___ HR ___ RR ___ Temp ___
Head/Neck: [Findings]
Cardiovascular: [Findings]
Respiratory: [Findings]
Abdomen: [Findings]
Extremities: [Findings]
Neurological: [Findings]

ASSESSMENT:
[Clinical impression and diagnosis]

PLAN:
[Treatment plan and follow-up]`
    },
    {
      id: 'template2',
      name: 'Follow-up Visit',
      category: 'Follow-up',
      description: 'Template for follow-up appointments',
      content: `FOLLOW-UP VISIT

INTERVAL HISTORY:
[Changes since last visit]

CURRENT MEDICATIONS:
[Medication adherence and changes]

REVIEW OF SYSTEMS:
[Relevant system review]

PHYSICAL EXAMINATION:
[Focused examination findings]

ASSESSMENT:
[Progress assessment]

PLAN:
[Continued or modified treatment plan]`
    },
    {
      id: 'template3',
      name: 'Discharge Summary',
      category: 'Discharge',
      description: 'Hospital discharge summary template',
      content: `DISCHARGE SUMMARY

ADMISSION DATE: [Date]
DISCHARGE DATE: [Date]

PRINCIPAL DIAGNOSIS:
[Primary diagnosis]

SECONDARY DIAGNOSES:
[Additional diagnoses]

HOSPITAL COURSE:
[Summary of hospital stay]

DISCHARGE MEDICATIONS:
[List of discharge medications]

DISCHARGE INSTRUCTIONS:
[Patient care instructions]

FOLLOW-UP:
[Scheduled appointments and recommendations]`
    }
  ];

  const recentNotes = [
    {
      id: 'note1',
      patient: 'Sarah Johnson',
      type: 'General Consultation',
      date: '2024-01-30',
      status: 'Completed'
    },
    {
      id: 'note2',
      patient: 'Michael Chen',
      type: 'Follow-up Visit',
      date: '2024-01-30',
      status: 'Draft'
    },
    {
      id: 'note3',
      patient: 'Emily Davis',
      type: 'Discharge Summary',
      date: '2024-01-29',
      status: 'Completed'
    }
  ];

  const useTemplate = (template: any) => {
    setSelectedTemplate(template.id);
    setNoteContent(template.content);
  };

  const saveNote = () => {
    console.log('Saving note:', noteContent);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Clinical Notes Templates
          </CardTitle>
          <CardDescription>Create clinical notes using standardized templates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="editor">Note Editor</TabsTrigger>
              <TabsTrigger value="recent">Recent Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex flex-col gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => useTemplate(template)}
                          className="flex-1"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Use Template
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </TabsContent>

            <TabsContent value="editor" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Clinical Note Editor</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm" onClick={saveNote}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Patient</Label>
                      <Input
                        id="patient"
                        placeholder="Select patient..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="noteType">Note Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select note type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up Visit</SelectItem>
                          <SelectItem value="discharge">Discharge Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="noteContent">Clinical Note</Label>
                    <Textarea
                      id="noteContent"
                      placeholder="Start typing or select a template..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="flex flex-col gap-4">
                {recentNotes.map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{note.type}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{note.patient}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{note.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={note.status === 'Completed' ? 'default' : 'secondary'}>
                            {note.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalNotesTemplates;
