
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import CommissionRuleCard from "./CommissionRuleCard";
import BulkOperationsBar from "./BulkOperationsBar";

interface ActiveRulesTabProps {
  activeRules: CommissionRule[];
  selectedRuleIds: string[];
  highlightedRuleIds: string[];
  onStartCreating: () => void;
  onToggleStatus: (ruleId: string) => void;
  onEdit: (rule: CommissionRule) => void;
  onDelete: (ruleId: string) => void;
  onRuleSelection: (ruleId: string, isSelected: boolean) => void;
  onSelectAll: () => void;
  onBulkEnable: () => void;
  onBulkDisable: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

const ActiveRulesTab = ({
  activeRules,
  selectedRuleIds,
  highlightedRuleIds,
  onStartCreating,
  onToggleStatus,
  onEdit,
  onDelete,
  onRuleSelection,
  onSelectAll,
  onBulkEnable,
  onBulkDisable,
  onBulkDelete,
  onClearSelection
}: ActiveRulesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Active Commission Rules</h3>
          <p className="text-sm text-muted-foreground">Manage your current commission rules</p>
        </div>
        <Button onClick={onStartCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {selectedRuleIds.length > 0 && (
        <BulkOperationsBar
          selectedCount={selectedRuleIds.length}
          totalCount={activeRules.length}
          onSelectAll={onSelectAll}
          onBulkEnable={onBulkEnable}
          onBulkDisable={onBulkDisable}
          onBulkDelete={onBulkDelete}
          onClearSelection={onClearSelection}
        />
      )}

      <div className="grid gap-4">
        {activeRules.map((rule) => (
          <CommissionRuleCard
            key={rule.id}
            rule={rule}
            isSelected={selectedRuleIds.includes(rule.id)}
            isHighlighted={highlightedRuleIds.includes(rule.id)}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onRuleSelection}
            showSelection={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveRulesTab;
