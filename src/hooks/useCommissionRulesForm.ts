
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommissionRule } from "@/types/commission";
import { commissionRuleSchema, CommissionRuleFormData } from "@/schemas/commissionValidation";
import { extendedCommissionTemplates } from "@/data/extendedCommissionTemplates";

export const useCommissionRulesForm = (
  createRule: (data: CommissionRuleFormData) => boolean,
  updateRule: (rule: CommissionRule, data: CommissionRuleFormData) => boolean,
  setActiveTab: (tab: string) => void
) => {
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);

  const form = useForm<CommissionRuleFormData>({
    resolver: zodResolver(commissionRuleSchema),
    defaultValues: {
      name: '',
      type: 'doctor',
      rateType: 'percentage',
      rate: 0,
      minAmount: undefined,
      maxAmount: undefined,
      conditions: '',
      category: 'general-consultation',
      isActive: true,
      advancedConditions: {
        logic: 'AND',
        conditions: []
      },
      timeBasedRates: []
    }
  });

  const handleCreateRule = (data: CommissionRuleFormData) => {
    let success = false;
    
    if (editingRule) {
      success = updateRule(editingRule, data);
      setEditingRule(null);
    } else {
      success = createRule(data);
    }
    
    if (success) {
      setActiveTab('active-rules');
      form.reset();
    }
  };

  const handleEditRule = (rule: CommissionRule) => {
    setEditingRule(rule);
    form.reset({
      name: rule.name,
      type: rule.type,
      rateType: rule.rateType,
      rate: rule.rate,
      minAmount: rule.minAmount,
      maxAmount: rule.maxAmount,
      conditions: rule.conditions,
      category: rule.category,
      isActive: rule.isActive,
      advancedConditions: rule.advancedConditions || {
        logic: 'AND',
        conditions: []
      },
      timeBasedRates: rule.timeBasedRates || []
    });
    setActiveTab('create-rule');
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    form.reset();
    setActiveTab('active-rules');
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = extendedCommissionTemplates.find(t => t.id === templateId);
    if (template) {
      form.reset({
        name: template.name,
        type: template.type as any,
        rateType: template.rateType as any,
        rate: template.rate,
        category: template.category,
        conditions: template.description,
        minAmount: undefined,
        maxAmount: undefined,
        isActive: true,
        advancedConditions: template.advancedConditions || {
          logic: 'AND',
          conditions: []
        },
        timeBasedRates: template.timeBasedRates || []
      });
    }
    setEditingRule(null);
    setActiveTab('create-rule');
  };

  return {
    editingRule,
    form,
    handleCreateRule,
    handleEditRule,
    handleCancelEdit,
    handleTemplateSelect
  };
};
