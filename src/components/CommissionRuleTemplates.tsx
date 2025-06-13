
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { CommissionRuleTemplate } from "@/types/commission";

interface CommissionRuleTemplatesProps {
  templates: CommissionRuleTemplate[];
  onTemplateSelect: (templateId: string) => void;
}

const CommissionRuleTemplates = ({ templates, onTemplateSelect }: CommissionRuleTemplatesProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Commission Rule Templates</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use these pre-configured templates to quickly set up common commission structures
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-xs">{template.description}</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-xl font-bold text-blue-600">
                    {template.rateType === 'percentage' ? `${template.rate}%` : `₹${template.rate}`}
                  </span>
                  <p className="text-xs text-muted-foreground">{template.rateType} commission</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => onTemplateSelect(template.id)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommissionRuleTemplates;
