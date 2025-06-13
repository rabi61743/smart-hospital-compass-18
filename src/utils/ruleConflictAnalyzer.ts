
import { CommissionRule } from "@/types/commission";

export interface RuleConflict {
  type: 'overlap' | 'duplicate' | 'hierarchy' | 'condition';
  severity: 'high' | 'medium' | 'low';
  rules: CommissionRule[];
  description: string;
  suggestion?: string;
}

export const analyzeRuleConflicts = (rules: CommissionRule[]): RuleConflict[] => {
  const conflicts: RuleConflict[] = [];
  const activeRules = rules.filter(rule => rule.isActive);

  // Check for duplicate names
  const nameGroups = groupBy(activeRules, 'name');
  Object.entries(nameGroups).forEach(([name, rulesWithSameName]) => {
    if (rulesWithSameName.length > 1) {
      conflicts.push({
        type: 'duplicate',
        severity: 'high',
        rules: rulesWithSameName,
        description: `Multiple active rules with the same name: "${name}"`,
        suggestion: 'Rename or deactivate duplicate rules to avoid confusion'
      });
    }
  });

  // Check for category and type overlaps
  const categoryTypeGroups = groupBy(activeRules, rule => `${rule.type}-${rule.category}`);
  Object.entries(categoryTypeGroups).forEach(([key, rulesInGroup]) => {
    if (rulesInGroup.length > 1) {
      const [type, category] = key.split('-');
      conflicts.push({
        type: 'overlap',
        severity: 'medium',
        rules: rulesInGroup,
        description: `Multiple rules for ${type} in ${category} category may create ambiguity`,
        suggestion: 'Consider consolidating rules or adding more specific conditions'
      });
    }
  });

  // Check for rate conflicts (same type but very different rates)
  const typeGroups = groupBy(activeRules, 'type');
  Object.entries(typeGroups).forEach(([type, rulesOfType]) => {
    const percentageRules = rulesOfType.filter(rule => rule.rateType === 'percentage');
    if (percentageRules.length > 1) {
      const rates = percentageRules.map(rule => rule.rate);
      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);
      
      if (maxRate - minRate > 20) { // 20% difference threshold
        conflicts.push({
          type: 'hierarchy',
          severity: 'low',
          rules: percentageRules,
          description: `Large rate variation (${minRate}% - ${maxRate}%) for ${type} rules`,
          suggestion: 'Review if such rate differences are intentional'
        });
      }
    }
  });

  // Check for condition overlaps (simplified text matching)
  for (let i = 0; i < activeRules.length; i++) {
    for (let j = i + 1; j < activeRules.length; j++) {
      const rule1 = activeRules[i];
      const rule2 = activeRules[j];
      
      if (rule1.type === rule2.type && 
          rule1.category === rule2.category &&
          haveSimilarConditions(rule1.conditions, rule2.conditions)) {
        conflicts.push({
          type: 'condition',
          severity: 'medium',
          rules: [rule1, rule2],
          description: `Similar conditions detected between "${rule1.name}" and "${rule2.name}"`,
          suggestion: 'Review conditions to ensure they don\'t overlap inappropriately'
        });
      }
    }
  }

  return conflicts.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
};

const groupBy = <T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

const haveSimilarConditions = (condition1: string, condition2: string): boolean => {
  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const words1 = normalize(condition1).split(/\s+/);
  const words2 = normalize(condition2).split(/\s+/);
  
  const commonWords = words1.filter(word => 
    words2.includes(word) && word.length > 3
  );
  
  return commonWords.length >= 2; // At least 2 common significant words
};
