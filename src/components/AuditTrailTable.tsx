
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AuditLogEntry } from '@/types/audit';
import { formatDistanceToNow } from 'date-fns';

interface AuditTrailTableProps {
  entries: AuditLogEntry[];
  title?: string;
  description?: string;
}

const AuditTrailTable = ({ 
  entries, 
  title = "Audit Trail", 
  description = "Track all changes made to commission rules"
}: AuditTrailTableProps) => {
  const getActionBadgeVariant = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'created': return 'default';
      case 'updated': return 'secondary';
      case 'enabled': return 'default';
      case 'disabled': return 'secondary';
      case 'deleted': return 'destructive';
      default: return 'outline';
    }
  };

  const formatChanges = (changes?: AuditLogEntry['changes']) => {
    if (!changes || changes.length === 0) return null;
    
    return (
      <div className="space-y-1">
        {changes.map((change, index) => (
          <div key={index} className="text-xs text-muted-foreground">
            <span className="font-medium">{change.field}:</span>{' '}
            <span className="line-through">{String(change.oldValue)}</span> →{' '}
            <span className="text-green-600">{String(change.newValue)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No audit entries found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Rule Name</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-sm">
                    <div>{entry.timestamp.toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {entry.timestamp.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {entry.ruleName}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(entry.action)}>
                      {entry.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatChanges(entry.changes)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.userName || 'System'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditTrailTable;
