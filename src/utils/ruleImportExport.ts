
import { CommissionRule } from "@/types/commission";

export interface RuleExportData {
  version: string;
  exportDate: string;
  rules: CommissionRule[];
  metadata: {
    totalRules: number;
    activeRules: number;
    inactiveRules: number;
  };
}

export const exportRules = (rules: CommissionRule[]): string => {
  const exportData: RuleExportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    rules: rules,
    metadata: {
      totalRules: rules.length,
      activeRules: rules.filter(rule => rule.isActive).length,
      inactiveRules: rules.filter(rule => !rule.isActive).length,
    }
  };

  return JSON.stringify(exportData, null, 2);
};

export const downloadRulesFile = (rules: CommissionRule[], filename?: string) => {
  const exportData = exportRules(rules);
  const blob = new Blob([exportData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `commission-rules-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateImportData = (data: any): { isValid: boolean; error?: string } => {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid file format' };
  }

  if (!data.version) {
    return { isValid: false, error: 'Missing version information' };
  }

  if (!Array.isArray(data.rules)) {
    return { isValid: false, error: 'Rules data is not in correct format' };
  }

  // Validate each rule has required fields
  for (const rule of data.rules) {
    if (!rule.id || !rule.name || !rule.type || !rule.rateType || typeof rule.rate !== 'number') {
      return { isValid: false, error: 'Invalid rule data structure' };
    }
  }

  return { isValid: true };
};

export const parseImportFile = (fileContent: string): Promise<RuleExportData> => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(fileContent);
      const validation = validateImportData(data);
      
      if (!validation.isValid) {
        reject(new Error(validation.error));
        return;
      }

      resolve(data as RuleExportData);
    } catch (error) {
      reject(new Error('Failed to parse file. Please ensure it\'s a valid JSON file.'));
    }
  });
};
