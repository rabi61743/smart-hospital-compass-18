
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  isDeceased: boolean;
  ageAtDeath?: number;
  causeOfDeath?: string;
  medicalConditions: string[];
  geneticFactors: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
  };
}

interface FamilyTreeTableProps {
  familyMembers: FamilyMember[];
  onDeleteMember: (id: string) => void;
}

const FamilyTreeTable = ({ familyMembers, onDeleteMember }: FamilyTreeTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Medical Tree</CardTitle>
        <CardDescription>Track your family's medical history and conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Age/Status</TableHead>
              <TableHead>Medical Conditions</TableHead>
              <TableHead>Genetic Factors</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familyMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.relationship}</TableCell>
                <TableCell>
                  {member.isDeceased ? (
                    <span className="text-gray-500">
                      Deceased ({member.ageAtDeath})
                    </span>
                  ) : (
                    <span>{member.age} years</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.medicalConditions.map((condition, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.geneticFactors.map((factor, i) => (
                      <Badge key={i} className="bg-purple-100 text-purple-800 text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeleteMember(member.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FamilyTreeTable;
