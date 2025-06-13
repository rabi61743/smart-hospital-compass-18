
import { useState } from 'react';
import { CommissionRule } from "@/types/commission";

export const useCommissionRulesSelection = (
  activeRules: CommissionRule[],
  bulkToggleStatus: (ruleIds: string[], status: boolean) => void,
  bulkDeleteRules: (ruleIds: string[]) => void
) => {
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);
  const [highlightedRuleIds, setHighlightedRuleIds] = useState<string[]>([]);

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

  return {
    selectedRuleIds,
    highlightedRuleIds,
    setSelectedRuleIds,
    handleRuleSelection,
    handleSelectAll,
    handleBulkEnable,
    handleBulkDisable,
    handleBulkDelete,
    handleHighlightRules,
    handleClearHighlight
  };
};
