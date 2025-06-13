
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { CommissionRule } from "@/types/commission";
import { RuleConflict, analyzeRuleConflicts } from "@/utils/ruleConflictAnalyzer";

interface RuleConflictAnalyzerProps {
  rules: CommissionRule[];
  onHighlightRules?: (ruleIds: string[]) => void;
  onClearHighlight?: () => void;
}

const RuleConflictAnalyzer = ({ rules, onHighlightRules, onClearHighlight }: RuleConflictAnalyzerProps) => {
  const conflicts = analyzeRuleConflicts(rules);
  const activeRulesCount = rules.filter(rule => rule.isActive).length;

  const getSeverityIcon = (severity: RuleConflict['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: RuleConflict['severity']) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
    }
  };

  const getTypeLabel = (type: RuleConflict['type']) => {
    switch (type) {
      case 'overlap':
        return 'Rule Overlap';
      case 'duplicate':
        return 'Duplicate Name';
      case 'hierarchy':
        return 'Rate Variance';
      case 'condition':
        return 'Similar Conditions';
    }
  };

  const handleHighlightRules = (ruleIds: string[]) => {
    onHighlightRules?.(ruleIds);
  };

  const handleClearHighlight = () => {
    onClearHighlight?.();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              {conflicts.length === 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
              <span>Rule Conflict Analysis</span>
            </CardTitle>
            <CardDescription>
              Analyzing {activeRulesCount} active rules for conflicts and dependencies
            </CardDescription>
          </div>
          {onClearHighlight && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHighlight}
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Clear Highlights
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {conflicts.length === 0 ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              No conflicts detected. All active rules appear to be properly configured.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Found {conflicts.length} potential conflict{conflicts.length !== 1 ? 's' : ''}</span>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                <span>{conflicts.filter(c => c.severity === 'high').length} High</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-3 w-3 text-orange-500" />
                <span>{conflicts.filter(c => c.severity === 'medium').length} Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-3 w-3 text-blue-500" />
                <span>{conflicts.filter(c => c.severity === 'low').length} Low</span>
              </div>
            </div>

            <div className="space-y-3">
              {conflicts.map((conflict, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(conflict.severity)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{getTypeLabel(conflict.type)}</span>
                          <Badge variant={getSeverityColor(conflict.severity)} className="text-xs">
                            {conflict.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {conflict.description}
                        </p>
                      </div>
                    </div>
                    {onHighlightRules && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleHighlightRules(conflict.rules.map(rule => rule.id))}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Highlight
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Affected Rules:</p>
                    <div className="flex flex-wrap gap-2">
                      {conflict.rules.map((rule) => (
                        <Badge key={rule.id} variant="outline" className="text-xs">
                          {rule.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {conflict.suggestion && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Suggestion:</strong> {conflict.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RuleConflictAnalyzer;
