
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AgentCommission {
  id: number;
  name: string;
  type: string;
  referrals?: number;
  converted?: number;
  policies?: number;
  claims?: number;
  companies?: number;
  employees?: number;
  patients?: number;
  revenue?: string;
  commission: string;
  rate: string;
}

interface AgentCommissionsTableProps {
  agentCommissions: AgentCommission[];
}

const AgentCommissionsTable = ({ agentCommissions }: AgentCommissionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Commission Tracking</CardTitle>
        <CardDescription>Monitor commissions for referral agents and external partners</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Total Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentCommissions.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>{agent.type}</TableCell>
                <TableCell>
                  {agent.referrals && `${agent.converted}/${agent.referrals} converted`}
                  {agent.policies && `${agent.policies} policies`}
                  {agent.companies && `${agent.employees} employees`}
                  {agent.patients && `${agent.patients} patients`}
                </TableCell>
                <TableCell>{agent.rate}</TableCell>
                <TableCell className="font-bold text-green-600">{agent.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AgentCommissionsTable;
