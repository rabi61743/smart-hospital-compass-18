
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ApprovalStep {
  step: number;
  role: string;
  action: string;
  timeLimit: string;
}

interface ApprovalWorkflowCardProps {
  approvalWorkflow: ApprovalStep[];
}

const ApprovalWorkflowCard = ({ approvalWorkflow }: ApprovalWorkflowCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Approval Workflow
        </CardTitle>
        <CardDescription>Leave request approval process and timeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvalWorkflow.map((step, index) => (
            <div key={step.step} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="font-medium">{step.role}</p>
                <p className="text-sm text-muted-foreground">{step.action}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {step.timeLimit}
              </Badge>
              {index < approvalWorkflow.length - 1 && (
                <div className="absolute left-8 mt-12 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalWorkflowCard;
