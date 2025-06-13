import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CommissionRule } from "@/types/commission";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";
import { useAuditTrail } from "./useAuditTrail";
import { AdvancedConditions, ConditionRule } from "@/types/conditions";

const initialRules: CommissionRule[] = [
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
    category: 'surgery',
    advancedConditions: {
      logic: 'AND',
      conditions: [
        {
          id: '1',
          field: 'amount',
          operator: 'gt',
          value: 50000,
          rateOverride: {
            rateType: 'percentage',
            rate: 25
          }
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Referral Agent Standard',
    type: 'agent',
    rateType: 'fixed',
    rate: 850,
    conditions: 'Per successful patient referral',
    isActive: true,
    category: 'referral',
    advancedConditions: {
      logic: 'OR',
      conditions: [
        {
          id: '1',
          field: 'amount',
          operator: 'between',
          value: 10000,
          secondValue: 50000,
          rateOverride: {
            rateType: 'fixed',
            rate: 1200
          }
        },
        {
          id: '2',
          field: 'amount',
          operator: 'gt',
          value: 50000,
          rateOverride: {
            rateType: 'percentage',
            rate: 3
          }
        }
      ]
    }
  }
];

export const useCommissionRules = () => {
  const { toast } = useToast();
  const [activeRules, setActiveRules] = useState<CommissionRule[]>(initialRules);
  const {
    auditLog,
    logRuleCreation,
    logRuleUpdate,
    logRuleStatusChange,
    logRuleDeletion,
    getRuleHistory,
    getRecentActivity
  } = useAuditTrail();

  // Helper function to ensure AdvancedConditions has required properties with proper ConditionRule objects
  const normalizeAdvancedConditions = (conditions?: Partial<AdvancedConditions>): AdvancedConditions | undefined => {
    if (!conditions) return undefined;
    
    const normalizedConditions: ConditionRule[] = (conditions.conditions || []).map((condition, index) => ({
      id: condition.id || `condition-${Date.now()}-${index}`,
      field: condition.field || 'amount',
      operator: condition.operator || 'gt',
      value: condition.value || '',
      secondValue: condition.secondValue,
      rateOverride: condition.rateOverride
    }));
    
    return {
      logic: conditions.logic || 'AND',
      conditions: normalizedConditions
    };
  };

  const createRule = (data: CommissionRuleFormData) => {
    console.log("Creating rule with validated data:", data);
    
    try {
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
        return false;
      }
      
      const newRule: CommissionRule = {
        id: Date.now().toString(),
        name: data.name,
        type: data.type,
        rateType: data.rateType,
        rate: data.rate,
        minAmount: data.minAmount,
        maxAmount: data.maxAmount,
        conditions: data.conditions,
        category: data.category,
        isActive: data.isActive,
        advancedConditions: normalizeAdvancedConditions(data.advancedConditions),
      };
      
      setActiveRules([...activeRules, newRule]);
      logRuleCreation(newRule);
      
      toast({
        title: "Rule Created",
        description: `New commission rule "${newRule.name}" has been created successfully.`,
      });
      return true;
    } catch (error) {
      console.error("Error creating rule:", error);
      toast({
        title: "Error",
        description: "Failed to create the commission rule. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateRule = (editingRule: CommissionRule, data: CommissionRuleFormData) => {
    console.log("Updating rule with validated data:", data);
    
    try {
      const updatedRule: CommissionRule = {
        id: editingRule.id,
        name: data.name,
        type: data.type,
        rateType: data.rateType,
        rate: data.rate,
        minAmount: data.minAmount,
        maxAmount: data.maxAmount,
        conditions: data.conditions,
        category: data.category,
        isActive: data.isActive,
        advancedConditions: normalizeAdvancedConditions(data.advancedConditions),
      };
      
      setActiveRules(rules => 
        rules.map(rule => rule.id === editingRule.id ? updatedRule : rule)
      );
      
      logRuleUpdate(editingRule, data);
      
      toast({
        title: "Rule Updated",
        description: `Commission rule "${updatedRule.name}" has been updated successfully.`,
      });
      return true;
    } catch (error) {
      console.error("Error updating rule:", error);
      toast({
        title: "Error",
        description: "Failed to update the commission rule. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    setActiveRules(rules =>
      rules.map(rule => {
        if (rule.id === ruleId) {
          const updatedRule = { ...rule, isActive: !rule.isActive };
          logRuleStatusChange(rule, updatedRule.isActive);
          return updatedRule;
        }
        return rule;
      })
    );
  };

  const deleteRule = (ruleId: string) => {
    const ruleToDelete = activeRules.find(rule => rule.id === ruleId);
    if (ruleToDelete) {
      logRuleDeletion(ruleToDelete);
    }
    
    setActiveRules(rules => rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Commission rule has been deleted successfully.",
    });
  };

  const bulkToggleStatus = (ruleIds: string[], isActive: boolean) => {
    setActiveRules(rules =>
      rules.map(rule => {
        if (ruleIds.includes(rule.id)) {
          logRuleStatusChange(rule, isActive);
          return { ...rule, isActive };
        }
        return rule;
      })
    );
    
    const action = isActive ? 'enabled' : 'disabled';
    toast({
      title: "Bulk Operation Complete",
      description: `${ruleIds.length} rule${ruleIds.length !== 1 ? 's' : ''} ${action} successfully.`,
    });
  };

  const bulkDeleteRules = (ruleIds: string[]) => {
    const rulesToDelete = activeRules.filter(rule => ruleIds.includes(rule.id));
    rulesToDelete.forEach(rule => logRuleDeletion(rule));
    
    setActiveRules(rules => rules.filter(rule => !ruleIds.includes(rule.id)));
    
    toast({
      title: "Bulk Delete Complete",
      description: `${ruleIds.length} rule${ruleIds.length !== 1 ? 's' : ''} deleted successfully.`,
    });
  };

  return {
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
  };
};
