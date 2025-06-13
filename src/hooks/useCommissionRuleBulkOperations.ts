
import { useToast } from "@/hooks/use-toast";
import { CommissionRule } from "@/types/commission";
import { useAuditTrail } from "./useAuditTrail";

export const useCommissionRuleBulkOperations = (
  activeRules: CommissionRule[],
  setActiveRules: React.Dispatch<React.SetStateAction<CommissionRule[]>>
) => {
  const { toast } = useToast();
  const { logRuleStatusChange, logRuleDeletion } = useAuditTrail();

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
    bulkToggleStatus,
    bulkDeleteRules
  };
};
