
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { CommissionRule } from "@/types/commission";
import CommissionRuleCard from "./CommissionRuleCard";
import BulkOperationsBar from "./BulkOperationsBar";
import ImportExportDialog from "./rule-import-export/ImportExportDialog";

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
  onImportRules: (rules: CommissionRule[]) => void;
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
  onClearSelection,
  onImportRules
}: ActiveRulesTabProps) => {
  const [showImportExport, setShowImportExport] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Active Commission Rules</CardTitle>
            <CardDescription>
              Manage your commission calculation rules
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImportExport(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import/Export
            </Button>
            <Button onClick={onStartCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedRuleIds.length > 0 && (
            <BulkOperationsBar
              selectedCount={selectedRuleIds.length}
              onSelectAll={onSelectAll}
              onBulkEnable={onBulkEnable}
              onBulkDisable={onBulkDisable}
              onBulkDelete={onBulkDelete}
              onClearSelection={onClearSelection}
            />
          )}

          {activeRules.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No commission rules configured yet. Create your first rule to get started.
              </p>
              <Button onClick={onStartCreating} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create First Rule
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeRules.map((rule) => (
                <CommissionRuleCard
                  key={rule.id}
                  rule={rule}
                  isSelected={selectedRuleIds.includes(rule.id)}
                  isHighlighted={highlightedRuleIds.includes(rule.id)}
                  onToggleStatus={() => onToggleStatus(rule.id)}
                  onEdit={() => onEdit(rule)}
                  onDelete={() => onDelete(rule.id)}
                  onSelect={(isSelected) => onRuleSelection(rule.id, isSelected)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ImportExportDialog
        open={showImportExport}
        onOpenChange={setShowImportExport}
        rules={activeRules}
        onImportRules={onImportRules}
      />
    </div>
  );
};

export default ActiveRulesTab;
