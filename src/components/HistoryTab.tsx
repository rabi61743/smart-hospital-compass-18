
import React from 'react';
import { AuditLogEntry } from '@/types/audit';
import AuditTrailTable from './AuditTrailTable';

interface HistoryTabProps {
  auditLog: AuditLogEntry[];
}

const HistoryTab = ({ auditLog }: HistoryTabProps) => {
  return (
    <div className="space-y-4">
      <AuditTrailTable 
        entries={auditLog}
        title="Commission Rules History"
        description="Complete audit trail of all changes made to commission rules"
      />
    </div>
  );
};

export default HistoryTab;
