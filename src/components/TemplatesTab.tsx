
import React from 'react';
import { CommissionRuleTemplate } from "@/types/commission";
import CommissionRuleTemplates from "./CommissionRuleTemplates";

interface TemplatesTabProps {
  templates: CommissionRuleTemplate[];
  onTemplateSelect: (templateId: string) => void;
}

const TemplatesTab = ({ templates, onTemplateSelect }: TemplatesTabProps) => {
  return (
    <div className="space-y-4">
      <CommissionRuleTemplates
        templates={templates}
        onTemplateSelect={onTemplateSelect}
      />
    </div>
  );
};

export default TemplatesTab;
