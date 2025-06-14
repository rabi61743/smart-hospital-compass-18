
import React from 'react';
import LeavePoliciesTable from './LeavePoliciesTable';
import ApprovalWorkflowCard from './ApprovalWorkflowCard';
import LeaveRulesCards from './LeaveRulesCards';

const LeavePoliciesTab = () => {
  const leavePolicies = [
    {
      id: 'POL001',
      name: 'Annual Leave Policy',
      type: 'Annual Leave',
      accrualRate: '2.5 days/month',
      maxAccrual: '40 days',
      carryOver: '10 days',
      status: 'Active'
    },
    {
      id: 'POL002',
      name: 'Sick Leave Policy',
      type: 'Sick Leave',
      accrualRate: '1.25 days/month',
      maxAccrual: '15 days',
      carryOver: '5 days',
      status: 'Active'
    },
    {
      id: 'POL003',
      name: 'Personal Leave Policy',
      type: 'Personal Leave',
      accrualRate: '0.83 days/month',
      maxAccrual: '10 days',
      carryOver: '0 days',
      status: 'Active'
    },
    {
      id: 'POL004',
      name: 'Maternity/Paternity Leave',
      type: 'Family Leave',
      accrualRate: 'N/A',
      maxAccrual: '180 days',
      carryOver: 'N/A',
      status: 'Active'
    }
  ];

  const approvalWorkflow = [
    { step: 1, role: 'Direct Supervisor', action: 'Initial Review', timeLimit: '2 business days' },
    { step: 2, role: 'Department Head', action: 'Approval/Rejection', timeLimit: '3 business days' },
    { step: 3, role: 'HR Manager', action: 'Final Approval', timeLimit: '1 business day' },
    { step: 4, role: 'System', action: 'Auto-notification', timeLimit: 'Immediate' }
  ];

  return (
    <div className="space-y-6">
      <LeavePoliciesTable leavePolicies={leavePolicies} />
      <ApprovalWorkflowCard approvalWorkflow={approvalWorkflow} />
      <LeaveRulesCards />
    </div>
  );
};

export default LeavePoliciesTab;
