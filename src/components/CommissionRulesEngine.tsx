
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CommissionRule, CommissionRuleTemplate } from "@/types/commission";
import { commissionRuleSchema, CommissionRuleFormData } from "@/schemas/commissionValidation";
import CommissionRuleCard from "./CommissionRuleCard";
import CommissionRuleForm from "./CommissionRuleForm";
import CommissionRuleTemplates from "./CommissionRuleTemplates";

const CommissionRulesEngine = () => {
  const { toast } = useToast();
  const [activeRules, setActiveRules] = useState<CommissionRule[]>([
    {
      id: '1',
      name: 'Standard Doctor Consultation',
      type: 'doctor',
      rateType: 'percentage',
      rate: 15,
      conditions: 'Per consultation completed',
      isActive: true,
      category: 'consultation'
    },
    {
      id: '2',
      name: 'Surgery Commission',
      type: 'doctor',
      rateType: 'percentage',
      rate: 18,
      minAmount: 5000,
      conditions: 'Major surgical procedures',
      isActive: true,
      category: 'surgery'
    },
    {
      id: '3',
      name: 'Referral Agent Standard',
      type: 'agent',
      rateType: 'fixed',
      rate: 850,
      conditions: 'Per successful patient referral',
      isActive: true,
      category: 'referral'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);
  const [activeTab, setActiveTab] = useState('active-rules');

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

  const ruleTemplates: CommissionRuleTemplate[] = [
    {
      id: 'doctor-consultation',
      name: 'Doctor Consultation',
      description: 'Standard percentage-based commission for consultations',
      type: 'doctor',
      rateType: 'percentage',
      rate: 15,
      category: 'consultation'
    },
    {
      id: 'doctor-surgery',
      name: 'Surgery Commission',
      description: 'Higher percentage for surgical procedures',
      type: 'doctor',
      rateType: 'percentage',
      rate: 18,
      category: 'surgery'
    },
    {
      id: 'agent-referral',
      name: 'Referral Agent',
      description: 'Fixed amount per successful referral',
      type: 'agent',
      rateType: 'fixed',
      rate: 850,
      category: 'referral'
    },
    {
      id: 'lab-percentage',
      name: 'Lab Commission',
      description: 'Percentage-based lab test commission',
      type: 'department',
      rateType: 'percentage',
      rate: 15,
      category: 'laboratory'
    },
    {
      id: 'pharmacy-tiered',
      name: 'Pharmacy Tiered',
      description: 'Tiered commission based on sales volume',
      type: 'department',
      rateType: 'tiered',
      rate: 10,
      category: 'pharmacy'
    }
  ];

  const handleCreateRule = (data: CommissionRuleFormData) => {
    console.log("Creating/updating rule with validated data:", data);
    
    try {
      if (editingRule) {
        const updatedRule: CommissionRule = {
          ...editingRule,
          ...data,
        };
        
        setActiveRules(rules => 
          rules.map(rule => rule.id === editingRule.id ? updatedRule : rule)
        );
        
        toast({
          title: "Rule Updated",
          description: `Commission rule "${updatedRule.name}" has been updated successfully.`,
        });
        setEditingRule(null);
      } else {
        // Check for duplicate rule names
        const existingRule = activeRules.find(rule => 
          rule.name.toLowerCase() === data.name.toLowerCase()
        );
        
        if (existingRule) {
          toast({
            title: "Validation Error",
            description: "A rule with this name already exists. Please choose a different name.",
            variant: "destructive"
          });
          return;
        }
        
        const newRule: CommissionRule = {
          id: Date.now().toString(),
          ...data,
        };
        
        setActiveRules([...activeRules, newRule]);
        toast({
          title: "Rule Created",
          description: `New commission rule "${newRule.name}" has been created successfully.`,
        });
      }
      
      setIsCreating(false);
      setActiveTab('active-rules');
      form.reset();
    } catch (error) {
      console.error("Error saving rule:", error);
      toast({
        title: "Error",
        description: "Failed to save the commission rule. Please try again.",
        variant: "destructive"
      });
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
    const template = ruleTemplates.find(t => t.id === templateId);
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

  const toggleRuleStatus = (ruleId: string) => {
    setActiveRules(rules =>
      rules.map(rule =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const deleteRule = (ruleId: string) => {
    setActiveRules(rules => rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Commission rule has been deleted successfully.",
    });
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

          <div className="grid gap-4">
            {activeRules.map((rule) => (
              <CommissionRuleCard
                key={rule.id}
                rule={rule}
                onToggleStatus={toggleRuleStatus}
                onEdit={handleEditRule}
                onDelete={deleteRule}
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
            templates={ruleTemplates}
            onTemplateSelect={handleTemplateSelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionRulesEngine;
