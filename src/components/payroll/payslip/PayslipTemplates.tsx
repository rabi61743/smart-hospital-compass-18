
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Eye, Plus, Edit, Trash2 } from "lucide-react";
import { PayslipTemplate } from '@/types/payslip';
import { PayslipGenerator } from '@/utils/payslipGeneration';

const PayslipTemplates = () => {
  const [templates, setTemplates] = useState<PayslipTemplate[]>([
    PayslipGenerator.getDefaultTemplate(),
    {
      id: 'modern-template',
      name: 'Modern Hospital Template',
      headerColor: '#059669',
      fontFamily: 'Inter, sans-serif',
      includeSignature: false,
      customFields: [
        {
          id: 'cf1',
          label: 'Employee ID',
          value: '{{employeeId}}',
          position: 'header',
          isVisible: true,
        },
      ],
      footerText: 'Thank you for your service to our hospital.',
      isDefault: false,
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('default-template');
  const [isEditing, setIsEditing] = useState(false);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleSetDefault = (templateId: string) => {
    setTemplates(prev => prev.map(template => ({
      ...template,
      isDefault: template.id === templateId,
    })));
  };

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Payslip Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <span>{template.name}</span>
                      {template.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Template Configuration */}
      {selectedTemplateData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={selectedTemplateData.name}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="header-color">Header Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="header-color"
                    type="color"
                    value={selectedTemplateData.headerColor}
                    disabled={!isEditing}
                    className="w-16 h-10"
                  />
                  <Input
                    value={selectedTemplateData.headerColor}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={selectedTemplateData.fontFamily} disabled={!isEditing}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                    <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                    <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-signature"
                  checked={selectedTemplateData.includeSignature}
                  disabled={!isEditing}
                />
                <Label htmlFor="include-signature">Include digital signature</Label>
              </div>

              <div>
                <Label htmlFor="footer-text">Footer Text</Label>
                <Input
                  id="footer-text"
                  value={selectedTemplateData.footerText || ''}
                  disabled={!isEditing}
                  placeholder="Optional footer text"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-default"
                  checked={selectedTemplateData.isDefault}
                  onCheckedChange={() => handleSetDefault(selectedTemplateData.id)}
                  disabled={!isEditing}
                />
                <Label htmlFor="is-default">Set as default template</Label>
              </div>
            </CardContent>
          </Card>

          {/* Custom Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedTemplateData.customFields.map((field) => (
                  <div key={field.id} className="flex items-center gap-2 p-3 border rounded-lg">
                    <Checkbox checked={field.isVisible} disabled={!isEditing} />
                    <div className="flex-1">
                      <p className="font-medium">{field.label}</p>
                      <p className="text-sm text-muted-foreground">{field.value}</p>
                    </div>
                    <Badge variant="outline">{field.position}</Badge>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Field
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Template List */}
      <Card>
        <CardHeader>
          <CardTitle>All Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{template.name}</h4>
                      {template.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: template.headerColor }}
                        ></div>
                        <span>{template.headerColor}</span>
                      </div>
                      <p className="text-muted-foreground">{template.fontFamily}</p>
                      <p className="text-muted-foreground">
                        {template.customFields.length} custom fields
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipTemplates;
