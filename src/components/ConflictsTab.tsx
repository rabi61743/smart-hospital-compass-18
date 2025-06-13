
import React from 'react';
import { CommissionRule } from "@/types/commission";
import RuleConflictAnalyzer from "./RuleConflictAnalyzer";

interface ConflictsTabProps {
  rules: CommissionRule[];
  onHighlightRules: (ruleIds: string[]) => void;
  onClearHighlight: () => void;
}

const ConflictsTab = ({ rules, onHighlightRules, onClearHighlight }: ConflictsTabProps) => {
  return (
    <div className="space-y-4">
      <RuleConflictAnalyzer
        rules={rules}
        onHighlightRules={onHighlightRules}
        onClearHighlight={onClearHighlight}
      />
    </div>
  );
};

export default ConflictsTab;
