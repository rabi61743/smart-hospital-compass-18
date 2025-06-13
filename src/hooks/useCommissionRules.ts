
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CommissionRule } from "@/types/commission";
import { CommissionRuleFormData } from "@/schemas/commissionValidation";

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
];

export const useCommissionRules = () => {
  const { toast } = useToast();
  const [activeRules, setActiveRules] = useState<CommissionRule[]>(initialRules);

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
      };
      
      setActiveRules([...activeRules, newRule]);
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
      };
      
      setActiveRules(rules => 
        rules.map(rule => rule.id === editingRule.id ? updatedRule : rule)
      );
      
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

  return {
    activeRules,
    createRule,
    updateRule,
    toggleRuleStatus,
    deleteRule
  };
};
