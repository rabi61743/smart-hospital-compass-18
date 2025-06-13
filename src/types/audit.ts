
export interface AuditLogEntry {
  id: string;
  ruleId: string;
  ruleName: string;
  action: 'created' | 'updated' | 'enabled' | 'disabled' | 'deleted';
  timestamp: Date;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  userId?: string;
  userName?: string;
}

export interface RuleHistory {
  ruleId: string;
  ruleName: string;
  entries: AuditLogEntry[];
}
