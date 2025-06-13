
import { useAuditTrail } from "./useAuditTrail";
import { useCommissionRuleOperations } from "./useCommissionRuleOperations";
import { useCommissionRuleBulkOperations } from "./useCommissionRuleBulkOperations";

export const useCommissionRulesData = () => {
  const {
    auditLog,
    getRuleHistory,
    getRecentActivity
  } = useAuditTrail();

  const {
    activeRules,
    createRule,
    updateRule,
    toggleRuleStatus,
    deleteRule,
    setActiveRules
  } = useCommissionRuleOperations();

  const {
    bulkToggleStatus,
    bulkDeleteRules
  } = useCommissionRuleBulkOperations(activeRules, setActiveRules);

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
