
import React from 'react';

interface LeaveType {
  value: string;
  label: string;
  available: number;
}

interface LeaveRequestSummaryProps {
  requestedDays: number;
  selectedLeaveType: LeaveType | undefined;
}

const LeaveRequestSummary = ({ requestedDays, selectedLeaveType }: LeaveRequestSummaryProps) => {
  if (requestedDays <= 0) return null;

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Requested Days:</span>
        <span className="text-sm font-bold text-blue-600">{requestedDays} days</span>
      </div>
      {selectedLeaveType && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">Remaining Balance:</span>
          <span className="text-sm text-muted-foreground">
            {selectedLeaveType.available - requestedDays} days
          </span>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestSummary;
