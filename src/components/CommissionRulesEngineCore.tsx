
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { commissionRuleSchema, CommissionRuleFormData } from "@/schemas/commissionValidation";
import { commissionRuleTemplates } from "@/data/commissionTemplates";
import { useCommissionRules } from "@/hooks/useCommissionRules";
import CommissionRuleCard from "./CommissionRuleCard";
import CommissionRuleForm from "./CommissionRuleForm";
import CommissionRuleTemplates from "./CommissionRuleTemplates";
import BulkOperationsBar from "./BulkOperationsBar";

const CommissionRulesEngineCore = () => {
  const { activeRules, createRule, updateRule, toggleRuleStatus, deleteRule, bulkToggleStatus, bulkDeleteRules } = useCommissionRules();
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);
  const [activeTab, setActiveTab] = useState('active-rules');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);

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
      isActive: true
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
      isActive: rule.isActive
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
        isActive: true
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-rules">Active Rules</TabsTrigger>
          <TabsTrigger value="create-rule">
            {editingRule ? 'Edit Rule' : 'Create Rule'}
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active-rules" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Active Commission Rules</h3>
              <p className="text-sm text-muted-foreground">Manage your current commission rules</p>
            </div>
            <Button onClick={() => {
              setEditingRule(null);
              setIsCreating(true);
              setActiveTab('create-rule');
              form.reset();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>

          {selectedRuleIds.length > 0 && (
            <BulkOperationsBar
              selectedCount={selectedRuleIds.length}
              totalCount={activeRules.length}
              onSelectAll={handleSelectAll}
              onBulkEnable={handleBulkEnable}
              onBulkDisable={handleBulkDisable}
              onBulkDelete={handleBulkDelete}
              onClearSelection={() => setSelectedRuleIds([])}
            />
          )}

          <div className="grid gap-4">
            {activeRules.map((rule) => (
              <CommissionRuleCard
                key={rule.id}
                rule={rule}
                isSelected={selectedRuleIds.includes(rule.id)}
                onToggleStatus={toggleRuleStatus}
                onEdit={handleEditRule}
                onDelete={deleteRule}
                onSelect={handleRuleSelection}
                showSelection={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create-rule" className="space-y-4">
          <CommissionRuleForm
            form={form}
            editingRule={editingRule}
            onSubmit={handleCreateRule}
            onCancel={handleCancelEdit}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <CommissionRuleTemplates
            templates={commissionRuleTemplates}
            onTemplateSelect={handleTemplateSelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionRulesEngineCore;
