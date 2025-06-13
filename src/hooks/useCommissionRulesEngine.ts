import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommissionRule } from "@/types/commission";
import { commissionRuleSchema, CommissionRuleFormData } from "@/schemas/commissionValidation";
import { commissionRuleTemplates } from "@/data/commissionTemplates";
import { useCommissionRules } from "@/hooks/useCommissionRules";

export const useCommissionRulesEngine = () => {
  const { 
    activeRules, 
    createRule, 
    updateRule, 
    toggleRuleStatus, 
    deleteRule, 
    bulkToggleStatus, 
    bulkDeleteRules,
    auditLog,
    getRuleHistory,
    getRecentActivity
  } = useCommissionRules();
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);
  const [activeTab, setActiveTab] = useState('active-rules');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);
  const [highlightedRuleIds, setHighlightedRuleIds] = useState<string[]>([]);

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
      category: '',
      isActive: true,
      advancedConditions: {
        logic: 'AND',
        conditions: []
      }
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
      setIsCreating(false);
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
      }
    });
    setActiveTab('create-rule');
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setIsCreating(false);
    form.reset();
    setActiveTab('active-rules');
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = commissionRuleTemplates.find(t => t.id === templateId);
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
        }
      });
    }
    setEditingRule(null);
    setIsCreating(true);
    setActiveTab('create-rule');
  };

  const handleRuleSelection = (ruleId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedRuleIds([...selectedRuleIds, ruleId]);
    } else {
      setSelectedRuleIds(selectedRuleIds.filter(id => id !== ruleId));
    }
  };

  const handleSelectAll = () => {
    if (selectedRuleIds.length === activeRules.length) {
      setSelectedRuleIds([]);
    } else {
      setSelectedRuleIds(activeRules.map(rule => rule.id));
    }
  };

  const handleBulkEnable = () => {
    bulkToggleStatus(selectedRuleIds, true);
    setSelectedRuleIds([]);
  };

  const handleBulkDisable = () => {
    bulkToggleStatus(selectedRuleIds, false);
    setSelectedRuleIds([]);
  };

  const handleBulkDelete = () => {
    bulkDeleteRules(selectedRuleIds);
    setSelectedRuleIds([]);
  };

  const handleHighlightRules = (ruleIds: string[]) => {
    setHighlightedRuleIds(ruleIds);
  };

  const handleClearHighlight = () => {
    setHighlightedRuleIds([]);
  };

  const startCreating = () => {
    setEditingRule(null);
    setIsCreating(true);
    setActiveTab('create-rule');
    form.reset();
  };

  return {
    // State
    activeRules,
    isCreating,
    editingRule,
    activeTab,
    selectedRuleIds,
    highlightedRuleIds,
    form,
    auditLog,
    
    // Setters
    setActiveTab,
    setSelectedRuleIds,
    
    // Handlers
    handleCreateRule,
    handleEditRule,
    handleCancelEdit,
    handleTemplateSelect,
    handleRuleSelection,
    handleSelectAll,
    handleBulkEnable,
    handleBulkDisable,
    handleBulkDelete,
    handleHighlightRules,
    handleClearHighlight,
    startCreating,
    
    // Rule operations
    toggleRuleStatus,
    deleteRule,
    
    // Audit functions
    getRuleHistory,
    getRecentActivity
  };
};
