
import { useState } from 'react';
import { AuditLogEntry } from '@/types/audit';
import { CommissionRule } from '@/types/commission';
import { CommissionRuleFormData } from '@/schemas/commissionValidation';

export const useAuditTrail = () => {
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);

  const logAction = (
    ruleId: string,
    ruleName: string,
    action: AuditLogEntry['action'],
    changes?: AuditLogEntry['changes']
  ) => {
    const entry: AuditLogEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ruleId,
      ruleName,
      action,
      timestamp: new Date(),
      changes,
      userName: 'Current User' // In a real app, this would come from auth context
    };

    setAuditLog(prev => [entry, ...prev]);
  };

  const logRuleCreation = (rule: CommissionRule) => {
    logAction(rule.id, rule.name, 'created');
  };

  const logRuleUpdate = (oldRule: CommissionRule, newData: CommissionRuleFormData) => {
    const changes: AuditLogEntry['changes'] = [];
    
    if (oldRule.name !== newData.name) {
      changes.push({ field: 'name', oldValue: oldRule.name, newValue: newData.name });
    }
    if (oldRule.rate !== newData.rate) {
      changes.push({ field: 'rate', oldValue: oldRule.rate, newValue: newData.rate });
    }
    if (oldRule.rateType !== newData.rateType) {
      changes.push({ field: 'rateType', oldValue: oldRule.rateType, newValue: newData.rateType });
    }
    if (oldRule.conditions !== newData.conditions) {
      changes.push({ field: 'conditions', oldValue: oldRule.conditions, newValue: newData.conditions });
    }
    if (oldRule.category !== newData.category) {
      changes.push({ field: 'category', oldValue: oldRule.category, newValue: newData.category });
    }
    if (oldRule.minAmount !== newData.minAmount) {
      changes.push({ field: 'minAmount', oldValue: oldRule.minAmount, newValue: newData.minAmount });
    }
    if (oldRule.maxAmount !== newData.maxAmount) {
      changes.push({ field: 'maxAmount', oldValue: oldRule.maxAmount, newValue: newData.maxAmount });
    }

    if (changes.length > 0) {
      logAction(oldRule.id, newData.name, 'updated', changes);
    }
  };

  const logRuleStatusChange = (rule: CommissionRule, newStatus: boolean) => {
    const action = newStatus ? 'enabled' : 'disabled';
    logAction(rule.id, rule.name, action);
  };

  const logRuleDeletion = (rule: CommissionRule) => {
    logAction(rule.id, rule.name, 'deleted');
  };

  const getRuleHistory = (ruleId: string) => {
    return auditLog.filter(entry => entry.ruleId === ruleId);
  };

  const getRecentActivity = (limit: number = 50) => {
    return auditLog.slice(0, limit);
  };

  return {
    auditLog,
    logRuleCreation,
    logRuleUpdate,
    logRuleStatusChange,
    logRuleDeletion,
    getRuleHistory,
    getRecentActivity
  };
};
